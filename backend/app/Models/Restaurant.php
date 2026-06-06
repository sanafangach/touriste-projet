<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'city_id',
        'name',
        'image',
        'cuisine',
        'rating',
        'description',
        'phone',
        'opening_hours'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
