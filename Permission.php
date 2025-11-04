<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    // use HasFactory;

    protected $fillable = ['nom', 'cle', 'description'];

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'utilisateur_permissions');
    }
}
