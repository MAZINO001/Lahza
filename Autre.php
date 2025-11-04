<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Autre extends Model
{
    //  use HasFactory;

    protected $fillable = ['utilisateur_id', 'description'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
