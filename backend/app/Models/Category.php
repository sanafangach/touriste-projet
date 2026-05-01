<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'category_key', 'color'];

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }
}
