<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UtilisateurPermission extends Model
{
    //  use HasFactory;

    protected $fillable = ['utilisateur_id', 'permission_id'];
}
