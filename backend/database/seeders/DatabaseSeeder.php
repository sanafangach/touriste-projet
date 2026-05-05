<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Supprimer users l9doma (optionnel)
        // User::truncate();

        // Créer admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@amodox.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Créer user
        User::create([
            'name' => 'Normal User',
            'email' => 'user@amodox.com',
            'password' => Hash::make('user123'),
            'role' => 'user',
        ]);
    }
}