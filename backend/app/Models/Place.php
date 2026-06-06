<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'city_id',
        'name',
        'image',
        'category',
        'rating',
        'description',
        'entry_price'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
