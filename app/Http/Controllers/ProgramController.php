<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class ProgramController extends Controller
{
    /**
     * Display a listing of programs with advanced filtering, pagination, and sorting
     */
    public function index(Request $request): JsonResponse
    {
        try {
         
            $validated = $request->validate([
                'limit' => 'integer|min:1|max:100',
                'offset' => 'integer|min:0',
                'search' => 'string|max:255',
                'category' => 'string|max:100',
                'level' => 'string|in:Certificate,Diploma,Undergraduate,Graduate',
                'status' => 'string|in:active,inactive,completed,cancelled',
                'minPrice' => 'numeric|min:0',
                'maxPrice' => 'numeric|min:0',
                'sort' => 'string|in:createdAt,updatedAt,price,title,startDate,endDate,maxStudents',
                'order' => 'string|in:asc,desc'
            ]);

         
            $limit = min($validated['limit'] ?? 20, 100);
            $offset = $validated['offset'] ?? 0;
            $sort = $validated['sort'] ?? 'createdAt';
            $order = $validated['order'] ?? 'desc';
            $query = Program::query();

         
            if (!empty($validated['search'])) {
                $search = $validated['search'];
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%");
                });
            }
            if (!empty($validated['category'])) {
                $query->where('category', $validated['category']);
            }

            if (!empty($validated['level'])) {
                $query->where('level', $validated['level']);
            }

            if (!empty($validated['status'])) {
                $query->where('status', $validated['status']);
            }

         
            if (isset($validated['minPrice'])) {
                $query->where('price', '>=', $validated['minPrice']);
            }

            if (isset($validated['maxPrice'])) {
                $query->where('price', '<=', $validated['maxPrice']);
            }

      
            $sortColumn = match($sort) {
                'createdAt' => 'created_at',
                'updatedAt' => 'updated_at',
                'startDate' => 'start_date',
                'endDate' => 'end_date',
                'maxStudents' => 'max_students',
                default => $sort
            };

            $query->orderBy($sortColumn, $order);

            $programs = $query->offset($offset)->limit($limit)->get();

            $transformedPrograms = $programs->map(function ($program) {
                return [
                    'id' => $program->id,
                    'title' => $program->title,
                    'description' => $program->description,
                    'duration' => $program->duration,
                    'level' => $program->level,
                    'category' => $program->category,
                    'price' => (float) $program->price,
                    'startDate' => $program->start_date,
                    'endDate' => $program->end_date,
                    'maxStudents' => $program->max_students,
                    'currentEnrollments' => $program->current_enrollments ?? 0,
                    'status' => $program->status,
                    'createdAt' => $program->created_at->toISOString(),
                    'updatedAt' => $program->updated_at->toISOString()
                ];
            });

            return response()->json($transformedPrograms, 200);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created program
     */
    public function store(Request $request): JsonResponse
    {
        try {
         
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'duration' => 'required|string|max:100',
                'level' => 'required|string|in:Certificate,Diploma,Undergraduate,Graduate',
                'category' => 'required|string|max:100',
                'price' => 'required|numeric|min:0',
                'startDate' => 'required|date',
                'endDate' => 'required|date|after:startDate',
                'maxStudents' => 'required|integer|min:1',
                'status' => 'string|in:active,inactive,completed,cancelled'
            ]);

            $validated['status'] = $validated['status'] ?? 'active';
            $validated['current_enrollments'] = 0;

          
            $programData = [
                'title' => trim($validated['title']),
                'description' => isset($validated['description']) ? trim($validated['description']) : null,
                'duration' => trim($validated['duration']),
                'level' => trim($validated['level']),
                'category' => trim($validated['category']),
                'price' => $validated['price'],
                'start_date' => $validated['startDate'],
                'end_date' => $validated['endDate'],
                'max_students' => $validated['maxStudents'],
                'current_enrollments' => $validated['current_enrollments'],
                'status' => trim($validated['status'])
            ];

 
            $program = Program::create($programData);

         
            $response = [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'duration' => $program->duration,
                'level' => $program->level,
                'category' => $program->category,
                'price' => (float) $program->price,
                'startDate' => $program->start_date,
                'endDate' => $program->end_date,
                'maxStudents' => $program->max_students,
                'currentEnrollments' => $program->current_enrollments,
                'status' => $program->status,
                'createdAt' => $program->created_at->toISOString(),
                'updatedAt' => $program->updated_at->toISOString()
            ];

            return response()->json($response, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified program
     */
    public function show(string $id): JsonResponse
    {
        try {
       
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

      
            $program = Program::findOrFail($id);

     
            $response = [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'duration' => $program->duration,
                'level' => $program->level,
                'category' => $program->category,
                'price' => (float) $program->price,
                'startDate' => $program->start_date,
                'endDate' => $program->end_date,
                'maxStudents' => $program->max_students,
                'currentEnrollments' => $program->current_enrollments,
                'status' => $program->status,
                'createdAt' => $program->created_at->toISOString(),
                'updatedAt' => $program->updated_at->toISOString()
            ];

            return response()->json($response, 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Program not found'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified program
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
     
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

            $program = Program::findOrFail($id);

    
            if (!$request->hasAny(['title', 'description', 'duration', 'level', 'category', 'price', 'startDate', 'endDate', 'maxStudents', 'currentEnrollments', 'status'])) {
                return response()->json([
                    'error' => 'Request body cannot be empty',
                    'code' => 'EMPTY_REQUEST_BODY'
                ], 400);
            }

            $rules = [];
            if ($request->has('title')) $rules['title'] = 'required|string|max:255';
            if ($request->has('description')) $rules['description'] = 'nullable|string';
            if ($request->has('duration')) $rules['duration'] = 'required|string|max:100';
            if ($request->has('level')) $rules['level'] = 'required|string|in:Certificate,Diploma,Undergraduate,Graduate';
            if ($request->has('category')) $rules['category'] = 'required|string|max:100';
            if ($request->has('price')) $rules['price'] = 'required|numeric|min:0';
            if ($request->has('startDate')) $rules['startDate'] = 'required|date';
            if ($request->has('endDate')) $rules['endDate'] = 'required|date';
            if ($request->has('maxStudents')) $rules['maxStudents'] = 'required|integer|min:1';
            if ($request->has('currentEnrollments')) $rules['currentEnrollments'] = 'required|integer|min:0';
            if ($request->has('status')) $rules['status'] = 'required|string|in:active,inactive,completed,cancelled';

            $validated = $request->validate($rules);

            $updateData = [];
            
            if (isset($validated['title'])) {
                $updateData['title'] = trim($validated['title']);
            }
            if (isset($validated['description'])) {
                $updateData['description'] = $validated['description'] ? trim($validated['description']) : null;
            }
            if (isset($validated['duration'])) {
                $updateData['duration'] = trim($validated['duration']);
            }
            if (isset($validated['level'])) {
                $updateData['level'] = trim($validated['level']);
            }
            if (isset($validated['category'])) {
                $updateData['category'] = trim($validated['category']);
            }
            if (isset($validated['price'])) {
                $updateData['price'] = $validated['price'];
            }
            if (isset($validated['startDate'])) {
                $updateData['start_date'] = $validated['startDate'];
            }
            if (isset($validated['endDate'])) {
                $updateData['end_date'] = $validated['endDate'];
            }
            if (isset($validated['maxStudents'])) {
                $updateData['max_students'] = $validated['maxStudents'];
            }
            if (isset($validated['currentEnrollments'])) {
                $updateData['current_enrollments'] = $validated['currentEnrollments'];
            }
            if (isset($validated['status'])) {
                $updateData['status'] = trim($validated['status']);
            }

            if (isset($updateData['start_date']) && isset($updateData['end_date'])) {
                if (strtotime($updateData['end_date']) <= strtotime($updateData['start_date'])) {
                    return response()->json([
                        'error' => 'End date must be after start date',
                        'code' => 'INVALID_DATE_RANGE'
                    ], 400);
                }
            }

            $program->update($updateData);

            $program->refresh();

            $response = [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'duration' => $program->duration,
                'level' => $program->level,
                'category' => $program->category,
                'price' => (float) $program->price,
                'startDate' => $program->start_date,
                'endDate' => $program->end_date,
                'maxStudents' => $program->max_students,
                'currentEnrollments' => $program->current_enrollments,
                'status' => $program->status,
                'createdAt' => $program->created_at->toISOString(),
                'updatedAt' => $program->updated_at->toISOString()
            ];

            return response()->json($response, 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Program not found'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified program
     */
    public function destroy(string $id): JsonResponse
    {
        try {
  
            if (!is_numeric($id)) {
                return response()->json([
                    'error' => 'Valid ID is required',
                    'code' => 'INVALID_ID'
                ], 400);
            }

            $program = Program::findOrFail($id);
            
            
            $deletedProgramData = [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'duration' => $program->duration,
                'level' => $program->level,
                'category' => $program->category,
                'price' => (float) $program->price,
                'startDate' => $program->start_date,
                'endDate' => $program->end_date,
                'maxStudents' => $program->max_students,
                'currentEnrollments' => $program->current_enrollments,
                'status' => $program->status,
                'createdAt' => $program->created_at->toISOString(),
                'updatedAt' => $program->updated_at->toISOString()
            ];

   
            $program->delete();

            return response()->json([
                'message' => 'Program deleted successfully',
                'deletedProgram' => $deletedProgramData
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Program not found'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }
}