<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

// PUBLIC - ma khassch token
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// PROTECTED - khas token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // ADMIN ONLY
    Route::middleware('admin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'getAllUsers']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
        Route::put('/admin/users/{id}/role', [AdminController::class, 'updateRole']);
        Route::get('/admin/stats', [AdminController::class, 'getStats']);
    });
});