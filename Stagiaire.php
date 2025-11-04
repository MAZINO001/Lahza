<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    // use HasFactory;

    protected $fillable = ['utilisateur_id', 'specialite', 'date_debut', 'date_fin'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
    public function fichiers()
    {
        return $this->morphMany(Fichier::class, 'fileable');
    }
}
