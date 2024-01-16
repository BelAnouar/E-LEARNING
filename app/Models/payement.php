<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class payement extends Model
{
    use HasFactory;

    protected $primaryKey = 'idPayement';

    protected $fillable = [
        "Card_Number",
            "dateN",
            "name_card",
            "email",
            "cvv_code",
            'idCour'

    ];
    public function cours()
    {
        return $this->belongsTo(Cours::class, 'idCour');
    }
}
