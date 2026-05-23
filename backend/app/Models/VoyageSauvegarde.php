<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoyageSauvegarde extends Model
{
    protected $fillable = [
        'user_id',
        'city_id',
        'trip_name',
        'start_date',
        'end_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}