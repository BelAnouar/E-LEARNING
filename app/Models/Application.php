<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

/**
 * Application Model
 * 
 * Represents student applications to educational programs with comprehensive
 * validation, formatting, and status management capabilities.
 * 
 * @property int $id
 * @property int $program_id
 * @property string $student_name
 * @property string $student_email
 * @property string|null $student_phone
 * @property string|null $message
 * @property string $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property-read Program $program
 * @property-read string $formatted_created_at
 * @property-read string $formatted_updated_at
 * @property-read string $status_label
 * @property-read string $formatted_phone
 */
class Application extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'applications';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'program_id',
        'student_name',
        'student_email',
        'student_phone',
        'message',
        'status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'program_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [];

    /**
     * Application status constants
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    /**
     * Available status values
     */
    public const STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_APPROVED,
        self::STATUS_REJECTED,
    ];

    /**
     * Status labels for display
     */
    public const STATUS_LABELS = [
        self::STATUS_PENDING => 'Pending Review',
        self::STATUS_APPROVED => 'Approved',
        self::STATUS_REJECTED => 'Rejected',
    ];

    /**
     * The model's default values for attributes.
     */
    protected $attributes = [
        'status' => self::STATUS_PENDING,
    ];

    /**
     * Boot the model and register model events.
     */
    protected static function boot(): void
    {
        parent::boot();

        
        static::saving(function (self $application) {
       
            if ($application->student_email) {
                $application->student_email = strtolower(trim($application->student_email));
            }
            $stringFields = ['student_name', 'student_phone', 'message'];
            foreach ($stringFields as $field) {
                if ($application->$field) {
                    $application->$field = trim($application->$field);
                }
            }
            if (empty($application->student_phone)) {
                $application->student_phone = null;
            }
            if (empty($application->message)) {
                $application->message = null;
            }
        });
    }

    /**
     * Get the program that this application belongs to.
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Get formatted created date for API consistency.
     */
    public function getFormattedCreatedAtAttribute(): string
    {
        return $this->created_at->toISOString();
    }

    /**
     * Get formatted updated date for API consistency.
     */
    public function getFormattedUpdatedAtAttribute(): string
    {
        return $this->updated_at->toISOString();
    }

    /**
     * Get human-readable status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return self::STATUS_LABELS[$this->status] ?? ucfirst($this->status);
    }

    /**
     * Get formatted phone number.
     */
    public function getFormattedPhoneAttribute(): ?string
    {
        if (!$this->student_phone) {
            return null;
        }

        // Simple US phone formatting - can be enhanced for international
        $phone = preg_replace('/[^0-9]/', '', $this->student_phone);
        
        if (strlen($phone) === 10) {
            return sprintf('(%s) %s-%s', 
                substr($phone, 0, 3),
                substr($phone, 3, 3),
                substr($phone, 6, 4)
            );
        }

        return $this->student_phone;
    }

    /**
     * Scope to filter by status.
     */
    public function scopeByStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to filter by program.
     */
    public function scopeByProgram(Builder $query, int $programId): Builder
    {
        return $query->where('program_id', $programId);
    }

    /**
     * Scope to filter pending applications.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope to filter approved applications.
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    /**
     * Scope to filter rejected applications.
     */
    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_REJECTED);
    }

    /**
     * Scope to filter by date range.
     */
    public function scopeByDateRange(Builder $query, string $startDate, string $endDate): Builder
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    /**
     * Scope to filter applications from the last N days.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope to search by student name or email.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function (Builder $q) use ($search) {
            $q->where('student_name', 'LIKE', "%{$search}%")
              ->orWhere('student_email', 'LIKE', "%{$search}%");
        });
    }

    /**
     * Approve this application.
     */
    public function approve(): bool
    {
        $this->status = self::STATUS_APPROVED;
        return $this->save();
    }

    /**
     * Reject this application.
     */
    public function reject(): bool
    {
        $this->status = self::STATUS_REJECTED;
        return $this->save();
    }

    /**
     * Reset application to pending status.
     */
    public function resetToPending(): bool
    {
        $this->status = self::STATUS_PENDING;
        return $this->save();
    }

    /**
     * Check if application is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if application is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Check if application is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Check if status can be changed from current status.
     */
    public function canChangeStatusTo(string $newStatus): bool
    {
        if (!in_array($newStatus, self::STATUSES)) {
            return false;
        }

        // Allow any status change for now - can be enhanced with business rules
        return true;
    }

    /**
     * Get statistics for applications.
     */
    public static function getStatistics(array $filters = []): array
    {
        $query = self::query();

        // Apply filters
        if (isset($filters['program_id'])) {
            $query->byProgram($filters['program_id']);
        }

        if (isset($filters['date_from'])) {
            $query->where('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to'])) {
            $query->where('created_at', '<=', $filters['date_to']);
        }

        $total = $query->count();
        $pending = (clone $query)->pending()->count();
        $approved = (clone $query)->approved()->count();
        $rejected = (clone $query)->rejected()->count();

        return [
            'total' => $total,
            'pending' => $pending,
            'approved' => $approved,
            'rejected' => $rejected,
            'approval_rate' => $total > 0 ? round(($approved / $total) * 100, 2) : 0,
            'rejection_rate' => $total > 0 ? round(($rejected / $total) * 100, 2) : 0,
        ];
    }

    /**
     * Get applications grouped by status.
     */
    public static function getGroupedByStatus(): array
    {
        return self::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    /**
     * Get recent applications with program information.
     */
    public static function getRecentWithPrograms(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return self::with('program')
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get validation rules for creating applications.
     */
    public static function getCreateValidationRules(): array
    {
        return [
            'program_id' => [
                'required',
                'integer',
                'exists:programs,id'
            ],
            'student_name' => [
                'required',
                'string',
                'max:255',
                'min:2'
            ],
            'student_email' => [
                'required',
                'email',
                'max:255'
            ],
            'student_phone' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[\+]?[0-9\s\-\(\)]+$/'
            ],
            'message' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'status' => [
                'sometimes',
                Rule::in(self::STATUSES)
            ]
        ];
    }

    /**
     * Get validation rules for updating applications.
     */
    public static function getUpdateValidationRules(?int $applicationId = null): array
    {
        return [
            'program_id' => [
                'sometimes',
                'integer',
                'exists:programs,id'
            ],
            'student_name' => [
                'sometimes',
                'string',
                'max:255',
                'min:2'
            ],
            'student_email' => [
                'sometimes',
                'email',
                'max:255'
            ],
            'student_phone' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[\+]?[0-9\s\-\(\)]+$/'
            ],
            'message' => [
                'nullable',
                'string',
                'max:2000'
            ],
            'status' => [
                'sometimes',
                Rule::in(self::STATUSES)
            ]
        ];
    }

    /**
     * Get custom validation messages.
     */
    public static function getValidationMessages(): array
    {
        return [
            'program_id.required' => 'Please select a program to apply for.',
            'program_id.exists' => 'The selected program does not exist.',
            'student_name.required' => 'Please enter your full name.',
            'student_name.min' => 'Name must be at least 2 characters long.',
            'student_email.required' => 'Please enter your email address.',
            'student_email.email' => 'Please enter a valid email address.',
            'student_phone.regex' => 'Please enter a valid phone number.',
            'message.max' => 'Message cannot exceed 2000 characters.',
            'status.in' => 'Invalid status value. Must be pending, approved, or rejected.',
        ];
    }

    /**
     * Convert model to array for API responses.
     */
    public function toApiArray(): array
    {
        return [
            'id' => $this->id,
            'programId' => $this->program_id,
            'studentName' => $this->student_name,
            'studentEmail' => $this->student_email,
            'studentPhone' => $this->student_phone,
            'message' => $this->message,
            'status' => $this->status,
            'statusLabel' => $this->status_label,
            'formattedPhone' => $this->formatted_phone,
            'createdAt' => $this->formatted_created_at,
            'updatedAt' => $this->formatted_updated_at,
        ];
    }

    /**
     * Convert model to array with program information for API responses.
     */
    public function toApiArrayWithProgram(): array
    {
        $data = $this->toApiArray();
        
        if ($this->relationLoaded('program') && $this->program) {
            $data['program'] = [
                'id' => $this->program->id,
                'title' => $this->program->title,
                'category' => $this->program->category,
                'level' => $this->program->level,
            ];
        }

        return $data;
    }
}