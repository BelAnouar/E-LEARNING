<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Cours;
use App\Models\Payement;
use App\Models\File;
use App\Models\Week;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    /**
     * Get overall dashboard statistics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $totalUsers = User::count();
            $totalCourses = Cours::count();
            $totalEnrollments = Payement::count();

            // Calculate total revenue from cours table
            $totalRevenue = Payement::with('cours')
                ->whereHas('cours', fn($q) => $q->whereNotNull('prix'))
                ->get()
                ->sum(fn($payment) => (float) preg_replace('/[^0-9.]/', '', $payment->cours->prix));


            $activeUsers = User::where('updated_at', '>=', Carbon::now()->subDays(30))->count();
            $completedCourses = Payement::count();
            $pendingPayments = 0;
            $totalFiles = File::count();

            // Calculate growth percentages
            $lastMonthUsers = User::whereBetween('created_at', [
                Carbon::now()->subDays(60),
                Carbon::now()->subDays(30)
            ])->count();

            $currentMonthUsers = User::where('created_at', '>=', Carbon::now()->subDays(30))->count();
            $userGrowthPercentage = $lastMonthUsers > 0 ?
                round((($currentMonthUsers - $lastMonthUsers) / $lastMonthUsers) * 100, 1) : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'totalUsers' => $totalUsers,
                    'totalCourses' => $totalCourses,
                    'totalEnrollments' => $totalEnrollments,
                    'totalRevenue' => $totalRevenue,
                    'activeUsers' => $activeUsers,
                    'completedCourses' => $completedCourses,
                    'pendingPayments' => $pendingPayments,
                    'totalFiles' => $totalFiles,
                    'userGrowthPercentage' => $userGrowthPercentage,
                    'trends' => [
                        'users' => $userGrowthPercentage > 0 ? 'up' : 'down',
                        'revenue' => 'up',
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Dashboard statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user growth data for charts
     */
    public function getUserGrowth(): JsonResponse
    {
        try {
            $userGrowth = User::selectRaw('
                    MONTH(created_at) as month, 
                    MONTHNAME(created_at) as month_name, 
                    COUNT(*) as users
                ')
                ->whereYear('created_at', date('Y'))
                ->groupBy('month', 'month_name')
                ->orderBy('month')
                ->get()
                ->map(function ($item) {
                    return [
                        'month' => substr($item->month_name, 0, 3),
                        'users' => (int) $item->users,
                        'full_month' => $item->month_name
                    ];
                });

            // Ensure we always return an array
            $result = $userGrowth->toArray();

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            Log::error('User growth data error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching user growth data',
                'data' => [], // Return empty array on error
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get course popularity data
     */
    public function getCoursePopularity(): JsonResponse
    {
        try {
            $coursePopularity = DB::table('cours')
                ->leftJoin('payements', 'cours.idCours', '=', 'payements.idCour')
                ->select('cours.titre as course', DB::raw('COUNT(payements.idPayement) as enrollments'))
                ->groupBy('cours.idCours', 'cours.titre')
                ->orderByDesc('enrollments')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'course' => $item->course,
                        'enrollments' => (int) $item->enrollments
                    ];
                });

            // Ensure we always return an array
            $result = $coursePopularity->toArray();

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            Log::error('Course popularity data error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching course popularity data',
                'data' => [], // Return empty array on error
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get revenue data by month
     */
    public function getRevenue(): JsonResponse
    {
        try {
            $revenue = DB::table('payements')
                ->join('cours', 'payements.idCour', '=', 'cours.idCours')
                ->selectRaw('
                    MONTH(payements.created_at) as month, 
                    MONTHNAME(payements.created_at) as month_name, 
                    SUM(CAST(REPLACE(REPLACE(cours.prix, "$", ""), ",", "") AS DECIMAL(10,2))) as revenue
                ')
                ->whereYear('payements.created_at', date('Y'))
                ->whereNotNull('cours.prix')
                ->groupBy('month', 'month_name')
                ->orderBy('month')
                ->get()
                ->map(function ($item) {
                    return [
                        'month' => substr($item->month_name, 0, 3),
                        'revenue' => (float) $item->revenue,
                        'full_month' => $item->month_name
                    ];
                });

            // Ensure we always return an array
            $result = $revenue->toArray();

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            Log::error('Revenue data error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching revenue data',
                'data' => [], // Return empty array on error
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent activity feed
     */
    public function getRecentActivity(): JsonResponse
    {
        try {
            $activities = collect();

            // Get recent user registrations
            $recentUsers = User::latest()
                ->limit(5)
                ->get(['id', 'fullName', 'created_at']);

            foreach ($recentUsers as $user) {
                $activities->push([
                    'id' => 'user_' . $user->id,
                    'type' => 'user_registration',
                    'message' => "{$user->fullName} joined the platform",
                    'time' => $user->created_at->diffForHumans(),
                    'timestamp' => $user->created_at,
                    'icon' => '👤'
                ]);
            }


            $recentPayments = DB::table('payements')
                ->join('cours', 'payements.course_id', '=', 'cours.idCours')
                ->select('payements.id as payment_id', 'payements.amount', 'cours.titre', 'cours.prix', 'payements.created_at')
                ->latest('payements.created_at')
                ->limit(5)
                ->get();



            foreach ($recentPayments as $payment) {
                $activities->push([
                    'id' => 'payment_' . $payment->payment_id,
                    'type' => 'payment',
                    'message' => "Payment of {$payment->prix} received for {$payment->titre}",
                    'time' => Carbon::parse($payment->created_at)->diffForHumans(),
                    'timestamp' => Carbon::parse($payment->created_at),
                    'icon' => '💰'
                ]);
            }


            $recentCourses = Cours::latest()
                ->limit(3)
                ->get(['idCours', 'titre', 'created_at']);

            foreach ($recentCourses as $course) {
                $activities->push([
                    'id' => 'course_' . $course->idCours,
                    'type' => 'course_added',
                    'message' => "New course '{$course->titre}' was published",
                    'time' => $course->created_at->diffForHumans(),
                    'timestamp' => $course->created_at,
                    'icon' => '📚'
                ]);
            }

        
            $sortedActivities = $activities
                ->sortByDesc('timestamp')
                ->take(10)
                ->values()
                ->toArray();

            return response()->json([
                'success' => true,
                'data' => $sortedActivities
            ]);
        } catch (\Exception $e) {
            Log::error('Recent activity data error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching recent activity data',
                'data' => [], 
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get enrollments by category
     */
    public function getEnrollmentsByCategory(): JsonResponse
    {
        try {
          
            $enrollmentsByCategory = [
                ['category' => 'Technology', 'enrollments' => 45, 'percentage' => 35],
                ['category' => 'Business', 'enrollments' => 32, 'percentage' => 25],
                ['category' => 'Design', 'enrollments' => 28, 'percentage' => 22],
                ['category' => 'Marketing', 'enrollments' => 23, 'percentage' => 18],
            ];

            return response()->json([
                'success' => true,
                'data' => $enrollmentsByCategory
            ]);
        } catch (\Exception $e) {
            Log::error('Enrollments by category error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching enrollments by category',
                'data' => [],
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
