<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Application;
use App\Models\Program;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class ApplicationController extends Controller
{
    /**
     * Display a listing of applications with filtering, pagination, and search
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Application::query();
            
            
            if ($request->has('programId') && !empty($request->programId)) {
                $programId = (int) $request->programId;
                if ($programId > 0) {
                    $query->where('program_id', $programId);
                }
            }
          
            if ($request->has('status') && !empty($request->status)) {
                $status = $request->status;
                if (in_array($status, ['pending', 'approved', 'rejected'])) {
                    $query->where('status', $status);
                }
            }
       
            if ($request->has('dateFrom') && !empty($request->dateFrom)) {
                $query->whereDate('created_at', '>=', $request->dateFrom);
            }
            
            if ($request->has('dateTo') && !empty($request->dateTo)) {
                $query->whereDate('created_at', '<=', $request->dateTo);
            }
            
           
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('student_name', 'like', "%{$search}%")
                      ->orWhere('student_email', 'like', "%{$search}%");
                });
            }
    
            if ($request->has('includeProgram') && $request->includeProgram) {
                $query->with('program');
            }
            
            
            $limit = min((int) $request->get('limit', 20), 100);
            $offset = (int) $request->get('offset', 0);
            
        
            $query->orderBy('created_at', 'desc');
            
    
            $applications = $query->offset($offset)->limit($limit)->get();
            
            return response()->json($applications, 200);
            
        } catch (Exception $e) {
            Log::error('Applications index error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Store a newly created application
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
         
            $validated = $request->validate([
                'programId' => 'required|integer|exists:programs,id',
                'studentName' => 'required|string|min:2|max:255',
                'studentEmail' => 'required|email|max:255',
                'studentPhone' => 'nullable|string|max:20',
                'message' => 'nullable|string|max:1000'
            ], [
                'programId.required' => 'Program ID is required',
                'programId.integer' => 'Program ID must be a valid number',
                'programId.exists' => 'Selected program does not exist',
                'studentName.required' => 'Student name is required',
                'studentName.min' => 'Student name must be at least 2 characters',
                'studentEmail.required' => 'Student email is required',
                'studentEmail.email' => 'Invalid email format',
                'studentPhone.max' => 'Phone number cannot exceed 20 characters',
                'message.max' => 'Message cannot exceed 1000 characters'
            ]);
    
            $application = Application::create([
                'program_id' => $validated['programId'],
                'student_name' => trim($validated['studentName']),
                'student_email' => strtolower(trim($validated['studentEmail'])),
                'student_phone' => isset($validated['studentPhone']) ? trim($validated['studentPhone']) : null,
                'message' => isset($validated['message']) ? trim($validated['message']) : null,
                'status' => 'pending'
            ]);
            
            return response()->json($application, 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 400);
            
        } catch (Exception $e) {
            Log::error('Application store error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Display the specified application
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $application = Application::with('program')->find($id);
            
            if (!$application) {
                return response()->json([
                    'error' => 'Application not found'
                ], 404);
            }
            
            return response()->json($application, 200);
            
        } catch (Exception $e) {
            Log::error('Application show error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update the specified application
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $application = Application::find($id);
            
            if (!$application) {
                return response()->json([
                    'error' => 'Application not found'
                ], 404);
            }
            
          
            $rules = [];
            $messages = [];
            
            if ($request->has('programId')) {
                $rules['programId'] = 'integer|exists:programs,id';
                $messages['programId.integer'] = 'Program ID must be a valid number';
                $messages['programId.exists'] = 'Selected program does not exist';
            }
            
            if ($request->has('studentName')) {
                $rules['studentName'] = 'string|min:2|max:255';
                $messages['studentName.min'] = 'Student name must be at least 2 characters';
                $messages['studentName.max'] = 'Student name cannot exceed 255 characters';
            }
            
            if ($request->has('studentEmail')) {
                $rules['studentEmail'] = 'email|max:255';
                $messages['studentEmail.email'] = 'Invalid email format';
                $messages['studentEmail.max'] = 'Email cannot exceed 255 characters';
            }
            
            if ($request->has('studentPhone')) {
                $rules['studentPhone'] = 'nullable|string|max:20';
                $messages['studentPhone.max'] = 'Phone number cannot exceed 20 characters';
            }
            
            if ($request->has('message')) {
                $rules['message'] = 'nullable|string|max:1000';
                $messages['message.max'] = 'Message cannot exceed 1000 characters';
            }
            
            if ($request->has('status')) {
                $rules['status'] = Rule::in(['pending', 'approved', 'rejected']);
                $messages['status.in'] = 'Status must be pending, approved, or rejected';
            }
            
            if (!empty($rules)) {
                $validated = $request->validate($rules, $messages);
                
            
                if (isset($validated['programId'])) {
                    $application->program_id = $validated['programId'];
                }
                
                if (isset($validated['studentName'])) {
                    $application->student_name = trim($validated['studentName']);
                }
                
                if (isset($validated['studentEmail'])) {
                    $application->student_email = strtolower(trim($validated['studentEmail']));
                }
                
                if ($request->has('studentPhone')) {
                    $application->student_phone = $validated['studentPhone'] ? trim($validated['studentPhone']) : null;
                }
                
                if ($request->has('message')) {
                    $application->message = $validated['message'] ? trim($validated['message']) : null;
                }
                
                if (isset($validated['status'])) {
                    $application->status = $validated['status'];
                }
                
                $application->save();
            }
            
            return response()->json($application, 200);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 400);
            
        } catch (Exception $e) {
            Log::error('Application update error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Remove the specified application
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $application = Application::find($id);
            
            if (!$application) {
                return response()->json([
                    'error' => 'Application not found'
                ], 404);
            }
            
            $deletedApplication = $application->toArray();
            $application->delete();
            
            return response()->json([
                'message' => 'Application deleted successfully',
                'application' => $deletedApplication
            ], 200);
            
        } catch (Exception $e) {
            Log::error('Application destroy error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get application statistics
     *
     * @return JsonResponse
     */
    public function statistics(): JsonResponse
    {
        try {
            $stats = [
                'total' => Application::count(),
                'pending' => Application::where('status', 'pending')->count(),
                'approved' => Application::where('status', 'approved')->count(),
                'rejected' => Application::where('status', 'rejected')->count(),
                'recent' => Application::where('created_at', '>=', now()->subDays(30))->count(),
                'by_program' => Application::select('program_id', DB::raw('count(*) as total'))
                    ->with('program:id,title')
                    ->groupBy('program_id')
                    ->orderByDesc('total')
                    ->limit(10)
                    ->get(),
                'by_status_last_30_days' => Application::select('status', DB::raw('count(*) as total'))
                    ->where('created_at', '>=', now()->subDays(30))
                    ->groupBy('status')
                    ->get()
            ];
            
            return response()->json($stats, 200);
            
        } catch (Exception $e) {
            Log::error('Application statistics error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Approve an application
     *
     * @param int $id
     * @return JsonResponse
     */
    public function approve(int $id): JsonResponse
    {
        try {
            $application = Application::find($id);
            
            if (!$application) {
                return response()->json([
                    'error' => 'Application not found'
                ], 404);
            }
            
            if ($application->status === 'approved') {
                return response()->json([
                    'error' => 'Application is already approved',
                    'code' => 'ALREADY_APPROVED'
                ], 400);
            }
            
            $application->status = 'approved';
            $application->save();
            
            return response()->json([
                'message' => 'Application approved successfully',
                'application' => $application
            ], 200);
            
        } catch (Exception $e) {
            Log::error('Application approve error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Reject an application
     *
     * @param int $id
     * @return JsonResponse
     */
    public function reject(int $id): JsonResponse
    {
        try {
            $application = Application::find($id);
            
            if (!$application) {
                return response()->json([
                    'error' => 'Application not found'
                ], 404);
            }
            
            if ($application->status === 'rejected') {
                return response()->json([
                    'error' => 'Application is already rejected',
                    'code' => 'ALREADY_REJECTED'
                ], 400);
            }
            
            $application->status = 'rejected';
            $application->save();
            
            return response()->json([
                'message' => 'Application rejected successfully',
                'application' => $application
            ], 200);
            
        } catch (Exception $e) {
            Log::error('Application reject error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
}