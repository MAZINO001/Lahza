<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    protected $fillable = [
        'team_id',   // if you want to mass assign
        'user_id',   // needed for your registration logic
        'poste',     // optional, but included if set
    ];
}
