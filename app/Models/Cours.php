<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;
    protected $primaryKey = 'idCours';

    protected $fillable = [
        'titre',
        'description',
        'image',"enseignant",
        'prix',

    ];

    public function weeks()
    {
        return $this->hasMany(Weeks::class, 'idCour');
    }
    public function payemment()
    {
        return $this->hasMany(payement::class, 'idCour');
    }
    public function users()
{
    return $this->belongsToMany(User::class, 'course_user', 'course_id', 'user_id')->withTimestamps();
}

}
