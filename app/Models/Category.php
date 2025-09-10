<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

/**
 * Category Model
 * 
 * Represents educational categories for organizing programs and courses.
 * Provides comprehensive category management with slug generation,
 * validation, and relationship handling.
 * 
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Program[] $programs
 * @property-read string $formatted_name
 * @property-read string $url
 * @property-read int $programs_count
 * @property-read int $active_programs_count
 */
class Category extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'categories';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = [];

    /**
     * Boot the model and register event listeners.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug before creating
        static::creating(function ($category) {
            if (empty($category->slug) && !empty($category->name)) {
                $category->slug = static::generateUniqueSlug($category->name);
            }
        });

        // Auto-update slug before updating if name changed
        static::updating(function ($category) {
            if ($category->isDirty('name') && empty($category->slug)) {
                $category->slug = static::generateUniqueSlug($category->name, $category->id);
            }
        });

        // Ensure slug uniqueness before saving
        static::saving(function ($category) {
            if ($category->isDirty('slug')) {
                $category->slug = static::generateUniqueSlug($category->slug, $category->id);
            }
        });
    }

    /**
     * RELATIONSHIPS
     */

    /**
     * Get all programs that belong to this category.
     */
    public function programs(): HasMany
    {
        return $this->hasMany(Program::class, 'category', 'name');
    }

    /**
     * Get only active programs that belong to this category.
     */
    public function activePrograms(): HasMany
    {
        return $this->programs()->where('status', 'active');
    }

    /**
     * ACCESSORS
     */

    /**
     * Get the formatted name in title case.
     */
    public function getFormattedNameAttribute(): string
    {
        return Str::title($this->name);
    }

    /**
     * Get the URL-friendly slug.
     */
    public function getUrlAttribute(): string
    {
        return "/categories/{$this->slug}";
    }

    /**
     * Get the count of all programs in this category.
     */
    public function getProgramsCountAttribute(): int
    {
        return $this->programs()->count();
    }

    /**
     * Get the count of active programs in this category.
     */
    public function getActiveProgramsCountAttribute(): int
    {
        return $this->activePrograms()->count();
    }

    /**
     * MUTATORS
     */

    /**
     * Set the name attribute and ensure proper formatting.
     */
    public function setNameAttribute($value): void
    {
        $this->attributes['name'] = trim($value);
    }

    /**
     * Set the slug attribute with automatic generation if empty.
     */
    public function setSlugAttribute($value): void
    {
        if (empty($value) && !empty($this->name)) {
            $this->attributes['slug'] = static::generateUniqueSlug($this->name, $this->id);
        } else {
            $this->attributes['slug'] = Str::slug($value);
        }
    }

    /**
     * Set the description attribute with proper formatting.
     */
    public function setDescriptionAttribute($value): void
    {
        $this->attributes['description'] = !empty($value) ? trim($value) : null;
    }

    /**
     * QUERY SCOPES
     */

    /**
     * Scope to find category by slug.
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope to search categories by name or description.
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Scope to get popular categories (most programs).
     */
    public function scopePopular($query, int $limit = 10)
    {
        return $query->withCount('programs')
                    ->orderBy('programs_count', 'desc')
                    ->limit($limit);
    }

    /**
     * Scope to get categories with active programs.
     */
    public function scopeWithActivePrograms($query)
    {
        return $query->whereHas('activePrograms');
    }

    /**
     * Scope to order by name alphabetically.
     */
    public function scopeAlphabetical($query)
    {
        return $query->orderBy('name', 'asc');
    }

    /**
     * VALIDATION RULES
     */

    /**
     * Get validation rules for creating a category.
     */
    public static function getCreateRules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:categories,name',
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:categories,slug',
                'regex:/^[a-z0-9\-]+$/',
            ],
            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    /**
     * Get validation rules for updating a category.
     */
    public static function getUpdateRules(int $categoryId): array
    {
        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($categoryId),
            ],
            'slug' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories', 'slug')->ignore($categoryId),
                'regex:/^[a-z0-9\-]+$/',
            ],
            'description' => [
                'sometimes',
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public static function getValidationMessages(): array
    {
        return [
            'name.required' => 'The category name is required.',
            'name.unique' => 'A category with this name already exists.',
            'name.max' => 'The category name cannot exceed 255 characters.',
            'slug.unique' => 'A category with this slug already exists.',
            'slug.regex' => 'The slug can only contain lowercase letters, numbers, and hyphens.',
            'slug.max' => 'The slug cannot exceed 255 characters.',
            'description.max' => 'The description cannot exceed 1000 characters.',
        ];
    }

    /**
     * HELPER METHODS
     */

    /**
     * Generate a unique slug from a string.
     */
    public static function generateUniqueSlug(string $text, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($text);
        $slug = $baseSlug;
        $counter = 1;

        while (static::slugExists($slug, $ignoreId)) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Check if a slug already exists.
     */
    public static function slugExists(string $slug, ?int $ignoreId = null): bool
    {
        $query = static::where('slug', $slug);
        
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    /**
     * Get or create a category by name.
     */
    public static function findOrCreateByName(string $name): self
    {
        return static::firstOrCreate(
            ['name' => trim($name)],
            [
                'slug' => static::generateUniqueSlug($name),
                'description' => null,
            ]
        );
    }

    /**
     * Get category statistics.
     */
    public function getStatistics(): array
    {
        return [
            'total_programs' => $this->programs()->count(),
            'active_programs' => $this->activePrograms()->count(),
            'inactive_programs' => $this->programs()->where('status', '!=', 'active')->count(),
            'total_enrollments' => $this->programs()->sum('current_enrollments'),
            'average_price' => $this->programs()->avg('price'),
            'created_at' => $this->created_at->toDateString(),
        ];
    }

    /**
     * Generate the full URL for this category.
     */
    public function getFullUrl(): string
    {
        return url("/categories/{$this->slug}");
    }

    /**
     * Check if category has any programs.
     */
    public function hasPrograms(): bool
    {
        return $this->programs()->exists();
    }

    /**
     * Check if category has any active programs.
     */
    public function hasActivePrograms(): bool
    {
        return $this->activePrograms()->exists();
    }

    /**
     * Get the most recent program in this category.
     */
    public function getLatestProgram()
    {
        return $this->programs()->latest()->first();
    }

    /**
     * Get the most popular program in this category (by enrollments).
     */
    public function getMostPopularProgram()
    {
        return $this->programs()
                    ->orderBy('current_enrollments', 'desc')
                    ->first();
    }

    /**
     * Soft delete prevention - check for associated programs.
     */
    public function canBeDeleted(): bool
    {
        return !$this->hasPrograms();
    }

    /**
     * Convert category to array with additional computed fields.
     */
    public function toArrayWithStats(): array
    {
        return array_merge($this->toArray(), [
            'formatted_name' => $this->formatted_name,
            'url' => $this->url,
            'full_url' => $this->getFullUrl(),
            'programs_count' => $this->programs_count,
            'active_programs_count' => $this->active_programs_count,
            'has_programs' => $this->hasPrograms(),
            'has_active_programs' => $this->hasActivePrograms(),
            'statistics' => $this->getStatistics(),
        ]);
    }
}