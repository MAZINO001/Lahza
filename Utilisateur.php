<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nom', 'email', 'mot_de_passe', 
    'role', 'statut'];
    
     protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    protected $table = 'utilisateurs';


     public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'utilisateur_permissions');
    }

    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public function stagiaire()
    {
        return $this->hasOne(Stagiaire::class);
    }

    public function equipe()
    {
        return $this->hasOne(Equipe::class);
    }

    public function autre()
    {
        return $this->hasOne(Autre::class);
    }

    public function historiques()
    {
        return $this->hasMany(Historique::class);
    }
    public function fichiers_uploades()
    {
        return $this->hasMany(Fichier::class, 'utilisateur_id');   // Direct relationship for uploaded files
    }

    public function fichiers()
    {
        return $this->morphMany(Fichier::class, 'fileable'); // Polymorphic relationship for files
    }

}


