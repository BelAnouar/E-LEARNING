<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payement extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'amount',
        'payment_intent',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

 

    public function cours()
{
    return $this->belongsTo(Cours::class, 'course_id', 'idCours');
}

}
