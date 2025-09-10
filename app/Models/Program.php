<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class Program extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'programs';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'description',
        'duration',
        'level',
        'category',
        'price',
        'start_date',
        'end_date',
        'max_students',
        'current_enrollments',
        'status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'max_students' => 'integer',
        'current_enrollments' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        'formatted_price',
        'enrollment_percentage',
        'is_full',
        'days_until_start',
        'duration_formatted',
    ];

    /**
     * Default attribute values.
     */
    protected $attributes = [
        'current_enrollments' => 0,
        'status' => 'active',
    ];

    // RELATIONSHIPS

    /**
     * Get the applications for the program.
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'program_id');
    }

    /**
     * Get the pending applications for the program.
     */
    public function pendingApplications()
    {
        return $this->applications()->where('status', 'pending');
    }

    /**
     * Get the approved applications for the program.
     */
    public function approvedApplications()
    {
        return $this->applications()->where('status', 'approved');
    }

    // QUERY SCOPES

    /**
     * Scope a query to only include active programs.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive programs.
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter by level.
     */
    public function scopeByLevel(Builder $query, string $level): Builder
    {
        return $query->where('level', $level);
    }

    /**
     * Scope a query to filter by price range.
     */
    public function scopePriceBetween(Builder $query, float $minPrice, float $maxPrice): Builder
    {
        return $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    /**
     * Scope a query to filter by minimum price.
     */
    public function scopePriceMin(Builder $query, float $minPrice): Builder
    {
        return $query->where('price', '>=', $minPrice);
    }

    /**
     * Scope a query to filter by maximum price.
     */
    public function scopePriceMax(Builder $query, float $maxPrice): Builder
    {
        return $query->where('price', '<=', $maxPrice);
    }

    /**
     * Scope a query to search programs by title and description.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to filter programs starting after a date.
     */
    public function scopeStartingAfter(Builder $query, $date): Builder
    {
        return $query->where('start_date', '>=', $date);
    }

    /**
     * Scope a query to filter programs starting before a date.
     */
    public function scopeStartingBefore(Builder $query, $date): Builder
    {
        return $query->where('start_date', '<=', $date);
    }

    /**
     * Scope a query to filter programs with available spots.
     */
    public function scopeWithAvailableSpots(Builder $query): Builder
    {
        return $query->whereColumn('current_enrollments', '<', 'max_students');
    }

    /**
     * Scope a query to filter full programs.
     */
    public function scopeFull(Builder $query): Builder
    {
        return $query->whereColumn('current_enrollments', '>=', 'max_students');
    }

    /**
     * Scope a query to order by popularity (current enrollments).
     */
    public function scopePopular(Builder $query): Builder
    {
        return $query->orderBy('current_enrollments', 'desc');
    }

    /**
     * Scope a query to order by newest first.
     */
    public function scopeNewest(Builder $query): Builder
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope a query to order by price (low to high).
     */
    public function scopeCheapest(Builder $query): Builder
    {
        return $query->orderBy('price', 'asc');
    }

    /**
     * Scope a query to order by price (high to low).
     */
    public function scopeExpensive(Builder $query): Builder
    {
        return $query->orderBy('price', 'desc');
    }

    // ACCESSOR METHODS

    /**
     * Get the formatted price.
     */
    protected function formattedPrice(): Attribute
    {
        return Attribute::make(
            get: fn () => '$' . number_format($this->price, 2)
        );
    }

    /**
     * Get the enrollment percentage.
     */
    protected function enrollmentPercentage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->max_students > 0 
                ? round(($this->current_enrollments / $this->max_students) * 100, 1)
                : 0
        );
    }

    /**
     * Check if the program is full.
     */
    protected function isFull(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->current_enrollments >= $this->max_students
        );
    }

    /**
     * Get days until program starts.
     */
    protected function daysUntilStart(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->start_date > now() 
                ? now()->diffInDays($this->start_date)
                : null
        );
    }

    /**
     * Get formatted duration.
     */
    protected function durationFormatted(): Attribute
    {
        return Attribute::make(
            get: function () {
                $duration = strtolower($this->duration);
                
                // Convert common duration formats
                if (preg_match('/(\d+)\s*(year|years)/', $duration, $matches)) {
                    $years = (int)$matches[1];
                    return $years === 1 ? '1 Year' : "{$years} Years";
                }
                
                if (preg_match('/(\d+)\s*(month|months)/', $duration, $matches)) {
                    $months = (int)$matches[1];
                    return $months === 1 ? '1 Month' : "{$months} Months";
                }
                
                if (preg_match('/(\d+)\s*(week|weeks)/', $duration, $matches)) {
                    $weeks = (int)$matches[1];
                    return $weeks === 1 ? '1 Week' : "{$weeks} Weeks";
                }
                
                return ucwords($this->duration);
            }
        );
    }

    /**
     * Get available spots count.
     */
    protected function availableSpots(): Attribute
    {
        return Attribute::make(
            get: fn () => max(0, $this->max_students - $this->current_enrollments)
        );
    }

    /**
     * Check if program is starting soon (within 30 days).
     */
    protected function isStartingSoon(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->start_date && $this->start_date->isFuture() 
                && $this->start_date->diffInDays(now()) <= 30
        );
    }

    /**
     * Check if program has ended.
     */
    protected function hasEnded(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->end_date && $this->end_date->isPast()
        );
    }

    // STATIC VALIDATION RULES

    /**
     * Get validation rules for creating a program.
     */
    public static function createValidationRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'duration' => ['required', 'string', 'max:100'],
            'level' => ['required', 'string', 'in:Certificate,Diploma,Undergraduate,Graduate'],
            'category' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'start_date' => ['required', 'date', 'after:today'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'max_students' => ['required', 'integer', 'min:1', 'max:10000'],
            'current_enrollments' => ['nullable', 'integer', 'min:0', 'lte:max_students'],
            'status' => ['nullable', 'string', 'in:active,inactive,completed,cancelled'],
        ];
    }

    /**
     * Get validation rules for updating a program.
     */
    public static function updateValidationRules($id = null): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'duration' => ['sometimes', 'string', 'max:100'],
            'level' => ['sometimes', 'string', 'in:Certificate,Diploma,Undergraduate,Graduate'],
            'category' => ['sometimes', 'string', 'max:100'],
            'price' => ['sometimes', 'numeric', 'min:0', 'max:999999.99'],
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['sometimes', 'date', 'after:start_date'],
            'max_students' => ['sometimes', 'integer', 'min:1', 'max:10000'],
            'current_enrollments' => ['sometimes', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'in:active,inactive,completed,cancelled'],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public static function validationMessages(): array
    {
        return [
            'title.required' => 'Program title is required.',
            'title.max' => 'Program title cannot exceed 255 characters.',
            'duration.required' => 'Program duration is required.',
            'level.required' => 'Program level is required.',
            'level.in' => 'Program level must be Certificate, Diploma, Undergraduate, or Graduate.',
            'category.required' => 'Program category is required.',
            'price.required' => 'Program price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',
            'start_date.required' => 'Start date is required.',
            'start_date.after' => 'Start date must be in the future.',
            'end_date.required' => 'End date is required.',
            'end_date.after' => 'End date must be after start date.',
            'max_students.required' => 'Maximum students is required.',
            'max_students.min' => 'Maximum students must be at least 1.',
            'current_enrollments.lte' => 'Current enrollments cannot exceed maximum students.',
            'status.in' => 'Status must be active, inactive, completed, or cancelled.',
        ];
    }

    // MODEL EVENTS

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        // Ensure current_enrollments doesn't exceed max_students
        static::saving(function ($program) {
            if ($program->current_enrollments > $program->max_students) {
                $program->current_enrollments = $program->max_students;
            }
        });

        // Auto-set status to completed when end_date is past
        static::saving(function ($program) {
            if ($program->end_date && $program->end_date->isPast() && $program->status !== 'cancelled') {
                $program->status = 'completed';
            }
        });
    }

    // HELPER METHODS

    /**
     * Increment current enrollments.
     */
    public function incrementEnrollments(int $count = 1): bool
    {
        if ($this->current_enrollments + $count <= $this->max_students) {
            $this->increment('current_enrollments', $count);
            return true;
        }
        return false;
    }

    /**
     * Decrement current enrollments.
     */
    public function decrementEnrollments(int $count = 1): bool
    {
        if ($this->current_enrollments - $count >= 0) {
            $this->decrement('current_enrollments', $count);
            return true;
        }
        return false;
    }

    /**
     * Check if program can accept new enrollments.
     */
    public function canAcceptEnrollments(): bool
    {
        return $this->status === 'active' 
            && !$this->is_full 
            && $this->start_date->isFuture();
    }

    /**
     * Get similar programs based on category and level.
     */
    public function getSimilarPrograms(int $limit = 5)
    {
        return static::where('id', '!=', $this->id)
            ->where(function ($query) {
                $query->where('category', $this->category)
                      ->orWhere('level', $this->level);
            })
            ->active()
            ->withAvailableSpots()
            ->limit($limit)
            ->get();
    }

    /**
     * Get program statistics.
     */
    public function getStatistics(): array
    {
        return [
            'total_applications' => $this->applications()->count(),
            'pending_applications' => $this->pendingApplications()->count(),
            'approved_applications' => $this->approvedApplications()->count(),
            'enrollment_rate' => $this->enrollment_percentage,
            'available_spots' => $this->available_spots,
            'days_until_start' => $this->days_until_start,
        ];
    }
}