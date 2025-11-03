<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quotes extends Model
{
      protected $fillable = [
        'client_id',
        'quotation_date',
        'status',
        'total_amount',
    ];
}
