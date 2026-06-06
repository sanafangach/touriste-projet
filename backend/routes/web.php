<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfilController;

Route::post('/profile/upload-image/{id}', [ProfilController::class, 'uploadImage']);
Route::get('/profile/{id}', [ProfilController::class, 'show']);
