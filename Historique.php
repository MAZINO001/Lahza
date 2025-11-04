<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historique extends Model
{
    // use HasFactory;

    protected $fillable = ['utilisateur_id', 'action'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
