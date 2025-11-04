<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    // use HasFactory;

    protected $fillable = ['utilisateur_id', 'entreprise', 'telephone', 'telephone2', 'adresse', 'ville', 'pays', 'tva', 'siren', 'ice' ,'type_client'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function devis()
    {
        return $this->hasMany(Devis::class);
    }
    public function fichiers()
    {
        return $this->morphMany(Fichier::class, 'fileable');
    }
}
