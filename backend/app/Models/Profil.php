<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $fillable = [
        'user_id',
        'profile',
        'image',
        'telephone',
        'ville',
        'bio'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}