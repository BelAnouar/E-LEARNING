<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;


    protected $primaryKey = "idFiles";
    protected $fillable = [
        'name',
        'type',
        'File',
        'size',
        'lastModified',
        'idWeek'
    ];

    public function week()
    {
        return $this->belongsTo(Weeks::class, 'idWeek');
    }

}
