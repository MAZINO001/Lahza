<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    // use HasFactory;

    protected $fillable = ['client_id', 'date_devis', 'statut', 'montant_total'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_devis')->withPivot('quantite', 'prix');
    }

    public function fichiers()
    {
        return $this->morphMany(Fichier::class, 'fileable');
    }
}
