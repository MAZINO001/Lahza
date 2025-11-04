<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    // use HasFactory;

    protected $fillable = ['nom', 'email_contact', 'telephone', 'adresse', 'site_web', 'description'];
}
