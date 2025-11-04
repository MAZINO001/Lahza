<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    // use HasFactory;

    protected $fillable = ['utilisateur_id', 'poste', 'departement'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
