<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contenu',
        'note',
        'approved',
    ];

    // Relation: Commentaire appartient à UN User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}