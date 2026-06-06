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
<<<<<<< HEAD
=======
    public function favorites()
{
    return $this->morphMany(Favorite::class, 'favoritable');
}
>>>>>>> 27cef02d8a3c291f193d74224d98c69aa22d46a8
}