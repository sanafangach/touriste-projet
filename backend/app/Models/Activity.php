<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'city_id',
        'name',
        'image',
        'price',
        'duration',
        'rating',
        'description'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}