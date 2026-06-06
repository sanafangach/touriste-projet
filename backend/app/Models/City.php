<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'rating'
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }

    public function places()
    {
        return $this->hasMany(Place::class);
    }

    public function hiddenGems()
    {
        return $this->hasMany(HiddenGem::class);
    }
<<<<<<< HEAD
=======
    public function favorites()
{
    return $this->morphMany(Favorite::class, 'favoritable');
}
>>>>>>> 27cef02d8a3c291f193d74224d98c69aa22d46a8
}