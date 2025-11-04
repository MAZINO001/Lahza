<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceDevis extends Model
{
    //  use HasFactory;

    protected $fillable = ['devis_id', 'service_id', 'quantite', 'prix'];
}
