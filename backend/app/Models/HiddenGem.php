<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HiddenGem extends Model
{
    protected $fillable = [
        'city_id',
        'name',
        'image',
        'description',
        'location',
        'best_time'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}