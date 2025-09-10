<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Exception;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories with filtering, searching, pagination, and sorting
     */
    public function index(Request $request): JsonResponse
    {
        try {
         
            $request->validate([
                'search' => 'nullable|string|max:255',
                'startDate' => 'nullable|date',
                'endDate' => 'nullable|date|after_or_equal:startDate',
                'limit' => 'nullable|integer|min:1|max:100',
                'offset' => 'nullable|integer|min:0',
                'sort' => 'nullable|in:name,created_at,program_count',
                'order' => 'nullable|in:asc,desc',
                'includePrograms' => 'nullable|boolean'
            ]);

            $search = $request->get('search');
            $startDate = $request->get('startDate');
            $endDate = $request->get('endDate');
            $limit = min($request->get('limit', 20), 100);
            $offset = $request->get('offset', 0);
            $sort = $request->get('sort', 'created_at');
            $order = $request->get('order', 'desc');
            $includePrograms = $request->boolean('includePrograms', false);

    
            $query = Category::query();

            $query->withCount('programs');

         
            if ($includePrograms) {
                $query->with(['programs' => function ($q) {
                    $q->where('status', 'active')
                      ->select('id', 'title', 'category', 'level', 'duration', 'price', 'status');
                }]);
            }

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%")
                      ->orWhere('slug', 'LIKE', "%{$search}%");
                });
            }

           
            if ($startDate) {
                $query->where('created_at', '>=', Carbon::parse($startDate)->startOfDay());
            }

            if ($endDate) {
                $query->where('created_at', '<=', Carbon::parse($endDate)->endOfDay());
            }

            switch ($sort) {
                case 'name':
                    $query->orderBy('name', $order);
                    break;
                case 'program_count':
                    $query->orderBy('programs_count', $order);
                    break;
                default:
                    $query->orderBy('created_at', $order);
                    break;
            }

           
            $categories = $query->offset($offset)->limit($limit)->get();

            
            $transformedCategories = $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'slug' => $category->slug,
                    'programCount' => $category->programs_count,
                    'programs' => $category->programs ?? null,
                    'createdAt' => $category->created_at->toISOString(),
                    'updatedAt' => $category->updated_at->toISOString()
                ];
            });

            return response()->json($transformedCategories);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validation rules
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name',
                'description' => 'nullable|string|max:1000'
            ], [
                'name.required' => 'Category name is required',
                'name.unique' => 'A category with this name already exists',
                'name.max' => 'Category name must not exceed 255 characters',
                'description.max' => 'Description must not exceed 1000 characters'
            ]);

           
            $baseSlug = Str::slug($validatedData['name']);
            $slug = $baseSlug;
            $counter = 1;

            while (Category::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

          
            $category = Category::create([
                'name' => trim($validatedData['name']),
                'description' => $validatedData['description'] ? trim($validatedData['description']) : null,
                'slug' => $slug,
                'created_at' => now(),
                'updated_at' => now()
            ]);

          
            $category->loadCount('programs');

            return response()->json([
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'slug' => $category->slug,
                'programCount' => $category->programs_count,
                'createdAt' => $category->created_at->toISOString(),
                'updatedAt' => $category->updated_at->toISOString()
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Display the specified category
     */
    public function show(Request $request, $id): JsonResponse
    {
        try {
            
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid category ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

           
            $includePrograms = $request->boolean('includePrograms', false);

    
            $query = Category::withCount('programs');

            if ($includePrograms) {
                $query->with(['programs' => function ($q) {
                    $q->where('status', 'active')
                      ->select('id', 'title', 'category', 'level', 'duration', 'price', 'start_date', 'end_date', 'max_students', 'current_enrollments', 'status');
                }]);
            }

            $category = $query->findOrFail($id);

           
            $totalPrograms = $category->programs_count;
            $activePrograms = Program::where('category', $category->name)
                                   ->where('status', 'active')
                                   ->count();
            $totalStudents = Program::where('category', $category->name)
                                  ->sum('current_enrollments');

            return response()->json([
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'slug' => $category->slug,
                'programCount' => $category->programs_count,
                'programs' => $category->programs ?? null,
                'statistics' => [
                    'totalPrograms' => $totalPrograms,
                    'activePrograms' => $activePrograms,
                    'totalStudents' => $totalStudents
                ],
                'createdAt' => $category->created_at->toISOString(),
                'updatedAt' => $category->updated_at->toISOString()
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Category not found',
                'code' => 'CATEGORY_NOT_FOUND'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
           
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid category ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

         
            $category = Category::findOrFail($id);

         
            $rules = [];
            $messages = [
                'name.unique' => 'A category with this name already exists',
                'name.max' => 'Category name must not exceed 255 characters',
                'description.max' => 'Description must not exceed 1000 characters'
            ];

            if ($request->has('name')) {
                $rules['name'] = 'string|max:255|unique:categories,name,' . $id;
            }

            if ($request->has('description')) {
                $rules['description'] = 'nullable|string|max:1000';
            }

            $validatedData = $request->validate($rules, $messages);

            $updateData = ['updated_at' => now()];
            if (isset($validatedData['name'])) {
                $newName = trim($validatedData['name']);
                if ($newName !== $category->name) {
                    $updateData['name'] = $newName;

                    $baseSlug = Str::slug($newName);
                    $slug = $baseSlug;
                    $counter = 1;

                    while (Category::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }
                    
                    $updateData['slug'] = $slug;
                }
            }

        
            if ($request->has('description')) {
                $updateData['description'] = $validatedData['description'] ? trim($validatedData['description']) : null;
            }
            $category->update($updateData);
            $category->loadCount('programs');

            return response()->json([
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'slug' => $category->slug,
                'programCount' => $category->programs_count,
                'createdAt' => $category->created_at->toISOString(),
                'updatedAt' => $category->updated_at->toISOString()
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Category not found',
                'code' => 'CATEGORY_NOT_FOUND'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Remove the specified category
     */
    public function destroy($id): JsonResponse
    {
        try {
     
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid category ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

        
            $category = Category::findOrFail($id);

  
            $programCount = Program::where('category', $category->name)->count();
            
            if ($programCount > 0) {
                return response()->json([
                    'error' => "Cannot delete category with {$programCount} associated programs",
                    'code' => 'CATEGORY_HAS_PROGRAMS',
                    'programCount' => $programCount
                ], 409);
            }
            $deletedCategory = [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'slug' => $category->slug,
                'createdAt' => $category->created_at->toISOString(),
                'updatedAt' => $category->updated_at->toISOString()
            ];
            $category->delete();

            return response()->json([
                'message' => 'Category deleted successfully',
                'deletedCategory' => $deletedCategory
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Category not found',
                'code' => 'CATEGORY_NOT_FOUND'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Get category statistics and analytics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $totalCategories = Category::count();
            $categoriesWithPrograms = Category::has('programs')->count();
            $totalPrograms = Program::count();
            $totalActivePrograms = Program::where('status', 'active')->count();
            $totalStudents = Program::sum('current_enrollments');
            $categoryBreakdown = Category::withCount('programs')
                ->orderBy('programs_count', 'desc')
                ->get()
                ->map(function ($category) {
                    return [
                        'name' => $category->name,
                        'slug' => $category->slug,
                        'programCount' => $category->programs_count
                    ];
                });
            $recentCategories = Category::withCount('programs')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'slug' => $category->slug,
                        'programCount' => $category->programs_count,
                        'createdAt' => $category->created_at->toISOString()
                    ];
                });

            return response()->json([
                'overview' => [
                    'totalCategories' => $totalCategories,
                    'categoriesWithPrograms' => $categoriesWithPrograms,
                    'totalPrograms' => $totalPrograms,
                    'totalActivePrograms' => $totalActivePrograms,
                    'totalStudents' => $totalStudents,
                    'averageProgramsPerCategory' => $totalCategories > 0 ? round($totalPrograms / $totalCategories, 2) : 0
                ],
                'categoryBreakdown' => $categoryBreakdown,
                'recentCategories' => $recentCategories
            ]);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Get popular categories by program count
     */
    public function getPopular(Request $request): JsonResponse
    {
        try {
            $limit = min($request->get('limit', 10), 50);

            $popularCategories = Category::withCount('programs')
                ->having('programs_count', '>', 0)
                ->orderBy('programs_count', 'desc')
                ->take($limit)
                ->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'description' => $category->description,
                        'slug' => $category->slug,
                        'programCount' => $category->programs_count,
                        'createdAt' => $category->created_at->toISOString(),
                        'updatedAt' => $category->updated_at->toISOString()
                    ];
                });

            return response()->json($popularCategories);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }

    /**
     * Get categories with their active programs
     */
    public function getWithPrograms(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'limit' => 'nullable|integer|min:1|max:100',
                'offset' => 'nullable|integer|min:0',
                'onlyWithPrograms' => 'nullable|boolean'
            ]);

            $limit = min($request->get('limit', 20), 100);
            $offset = $request->get('offset', 0);
            $onlyWithPrograms = $request->boolean('onlyWithPrograms', true);

            $query = Category::with(['programs' => function ($q) {
                $q->where('status', 'active')
                  ->select('id', 'title', 'category', 'level', 'duration', 'price', 'start_date', 'end_date', 'max_students', 'current_enrollments')
                  ->orderBy('created_at', 'desc');
            }]);

            if ($onlyWithPrograms) {
                $query->has('programs');
            }

            $categories = $query->orderBy('name')
                              ->offset($offset)
                              ->limit($limit)
                              ->get();

            $transformedCategories = $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'slug' => $category->slug,
                    'programCount' => $category->programs->count(),
                    'programs' => $category->programs->map(function ($program) {
                        return [
                            'id' => $program->id,
                            'title' => $program->title,
                            'level' => $program->level,
                            'duration' => $program->duration,
                            'price' => $program->price,
                            'startDate' => $program->start_date,
                            'endDate' => $program->end_date,
                            'maxStudents' => $program->max_students,
                            'currentEnrollments' => $program->current_enrollments
                        ];
                    }),
                    'createdAt' => $category->created_at->toISOString(),
                    'updatedAt' => $category->updated_at->toISOString()
                ];
            });

            return response()->json($transformedCategories);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'code' => 'VALIDATION_ERROR',
                'details' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage(),
                'code' => 'INTERNAL_ERROR'
            ], 500);
        }
    }
}