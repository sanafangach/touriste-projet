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
<<<<<<< HEAD
=======
    public function favorites()
{
    return $this->morphMany(Favorite::class, 'favoritable');
}
>>>>>>> 27cef02d8a3c291f193d74224d98c69aa22d46a8
}