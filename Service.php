<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    // use HasFactory;

    protected $fillable = ['nom', 'description', 'prix_base'];

    public function devis()
    {
        return $this->belongsToMany(Devis::class, 'service_devis')->withPivot('quantite', 'prix');
    }
    public function fichiers()
    {
        return $this->morphMany(Fichier::class, 'fileable');
    }
}
