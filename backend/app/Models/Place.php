<?php

namespace App\Models;
use App\Models\Activity;
use App\Models\Restaurant;
use App\Models\Place;
use App\Models\HiddenGem;
use App\Models\City;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    public function city()
{
    return $this->belongsTo(City::class);
}
}
