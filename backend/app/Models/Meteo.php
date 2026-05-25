<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meteo extends Model
{
    protected $fillable = [
        'city_id',
        'temperature',
        'weather',
        'humidity',
        'wind'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}