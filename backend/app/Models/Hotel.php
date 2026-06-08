<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = [
        'city_id',
        'name',
        'image',
        'price',
        'rating',
        'reviews',
        'description',
        'source',
        'maps_query',
        'budget_level',
    ];

    protected $casts = [
        'rating' => 'float',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
