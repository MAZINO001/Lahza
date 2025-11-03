<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intern extends Model
{


    protected $fillable = [
        'user_id',
        'department',
        'linkedin',
        'github',
        'cv',
        'portfolio',
        'start_date',
        'end_date',
    ];

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function cv()
    {
        return $this->files()->where('type', 'cv')->latest()->first();
    }
}
