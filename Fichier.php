<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fichier extends Model
{
    //  use HasFactory;

    protected $fillable = ['chemin', 'type', 'utilisateur_id', 'fileable_id', 'fileable_type'];

    public function fileable()
    {
        return $this->morphTo();
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
}
