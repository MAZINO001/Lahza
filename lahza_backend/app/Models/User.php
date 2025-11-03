<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // important for auth
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    // Fields you allow to be mass-assigned
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // if you have this field
        // add any other fields from your registration form
    ];

    // Hide sensitive fields when returning JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Cast fields if needed
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
