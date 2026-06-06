<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'item_type',
        'item_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'item_id');
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'item_id');
    }

    public function place()
    {
        return $this->belongsTo(Place::class, 'item_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'item_id');
    }

    public function gem()
    {
        return $this->belongsTo(HiddenGem::class, 'item_id');
    }
}
