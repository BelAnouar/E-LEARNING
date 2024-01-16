<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weeks extends Model
{
    use HasFactory;

    protected $primaryKey = 'idweek';

    protected $fillable = [
        'idCour',
        'titre',
        "description"

    ];
    public function cours()
    {
        return $this->belongsTo(Cours::class, 'idCour');
    }

    public function scopefilter($query,array $filters){
        if($filters['idCour']??false){
            $query->where("idCour",'=',request('idCour'));
        }
       
    }
     
    public function File()
    {
        return $this->hasMany(File::class, 'idweek');
    }

}
