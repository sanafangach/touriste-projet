<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
        'name', 'city', 'latitude', 'longitude', 
        'category_id', 'rating', 'duration'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function savedByUsers()
    {
        return $this->hasMany(SavedDestination::class);
    }
}
