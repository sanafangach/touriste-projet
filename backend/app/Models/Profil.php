<?php
// app/Models/Profil.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    use HasFactory;

    // Table name (b7al ma 3andek f database)
    protected $table = 'profils';

    protected $fillable = [
        'user_id',
        'image',
        'ville',
        'bio',
    ];

    // Relation m3a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor b7al tjbed l'image URL kamla
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}