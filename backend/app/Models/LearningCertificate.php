<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LearningCertificate extends Model
{
    protected $fillable = [
        'user_id',
        'track',
        'certificate_title',
        'certificate_number',
        'issued_at',
        'pdf_path',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
