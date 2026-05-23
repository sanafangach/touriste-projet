<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Activity;
use App\Models\Restaurant;
use App\Models\Place;
use App\Models\HiddenGem;

class City extends Model
{
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
}