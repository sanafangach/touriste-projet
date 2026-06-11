<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\ApprendreController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ProfilController;



// PUBLIC
Route::post('/login', [AuthController::class, 'login']);

// REGISTER
Route::post('/register-send-code', [AuthController::class, 'registerSendCode']);
Route::post('/register-verify', [AuthController::class, 'registerVerify']);
Route::post('/verify-code', [AuthController::class, 'verifyCode']);

// PASSWORD RESET ✅
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/verify-reset-token', [AuthController::class, 'verifyResetToken']);

// ===== google AUTH CALLBACKS =====
Route::post('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// PROTECTED
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile routes
    Route::get('/profile', [ProfilController::class, 'show']);
    Route::post('/profile', [ProfilController::class, 'update']);
    Route::delete('/profile/image', [ProfilController::class, 'deleteImage']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/stats', [AdminController::class, 'getStats']);
        Route::get('/admin/apprendre-stats', [AdminController::class, 'getApprendreStats']);
        // Apprendre drill-down lists (paginated + searchable)
        Route::get('/admin/apprendre/learners', [AdminController::class, 'getApprendreLearners']);
        Route::get('/admin/apprendre/completions', [AdminController::class, 'getApprendreCompletions']);
        Route::get('/admin/apprendre/favorites', [AdminController::class, 'getApprendreFavoritesList']);
        Route::get('/admin/apprendre/saved', [AdminController::class, 'getApprendreSavedList']);
        Route::get('/admin/favorites', [AdminController::class, 'getFavorites']);

        Route::get('/admin/users', [AdminController::class, 'getAllUsers']);
        Route::post('/admin/users', [AdminController::class, 'createUser']);
        Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
        Route::put('/admin/users/{id}/role', [AdminController::class, 'updateRole']);

        Route::get('/admin/cities', [AdminController::class, 'getCities']);
        Route::post('/admin/cities', [AdminController::class, 'createCity']);
        Route::match(['put', 'post'], '/admin/cities/{id}', [AdminController::class, 'updateCity']);
        Route::delete('/admin/cities/{id}', [AdminController::class, 'deleteCity']);

        Route::get('/admin/activities', [AdminController::class, 'getActivities']);
        Route::post('/admin/activities', [AdminController::class, 'createActivity']);
        Route::match(['put', 'post'], '/admin/activities/{id}', [AdminController::class, 'updateActivity']);
        Route::delete('/admin/activities/{id}', [AdminController::class, 'deleteActivity']);

        Route::get('/admin/restaurants', [AdminController::class, 'getRestaurants']);
        Route::post('/admin/restaurants', [AdminController::class, 'createRestaurant']);
        Route::match(['put', 'post'], '/admin/restaurants/{id}', [AdminController::class, 'updateRestaurant']);
        Route::delete('/admin/restaurants/{id}', [AdminController::class, 'deleteRestaurant']);

        Route::get('/admin/places', [AdminController::class, 'getPlaces']);
        Route::post('/admin/places', [AdminController::class, 'createPlace']);
        Route::match(['put', 'post'], '/admin/places/{id}', [AdminController::class, 'updatePlace']);
        Route::delete('/admin/places/{id}', [AdminController::class, 'deletePlace']);

        Route::get('/admin/hidden-gems', [AdminController::class, 'getHiddenGems']);
        Route::post('/admin/hidden-gems', [AdminController::class, 'createHiddenGem']);
        Route::match(['put', 'post'], '/admin/hidden-gems/{id}', [AdminController::class, 'updateHiddenGem']);
        Route::delete('/admin/hidden-gems/{id}', [AdminController::class, 'deleteHiddenGem']);

        // Comments Moderation Endpoints
        Route::get('/admin/comments', [CommentaireController::class, 'adminIndex']);
        Route::put('/admin/comments/{id}/approve', [CommentaireController::class, 'approve']);
        Route::delete('/admin/comments/{id}', [CommentaireController::class, 'destroy']);

        // Hotels CRUD
        Route::get('/admin/hotels', [AdminController::class, 'getHotels']);
        Route::post('/admin/hotels', [AdminController::class, 'createHotel']);
        Route::match(['put', 'post'], '/admin/hotels/{id}', [AdminController::class, 'updateHotel']);
        Route::delete('/admin/hotels/{id}', [AdminController::class, 'deleteHotel']);
    });
    Route::post('/commentaires', [CommentaireController::class, 'store']);
    Route::delete('/commentaires/{id}', [CommentaireController::class, 'destroy']);

    // Apprendre routes (authenticated)
    Route::prefix('apprendre')->group(function () {
        Route::get('/missions', [ApprendreController::class, 'missions']);
        Route::get('/progress', [ApprendreController::class, 'getProgress']);
        Route::post('/progress', [ApprendreController::class, 'storeProgress']);
        Route::get('/favorites', [ApprendreController::class, 'getFavorites']);
        Route::post('/favorites', [ApprendreController::class, 'storeFavorite']);
        Route::delete('/favorites/{id}', [ApprendreController::class, 'destroyFavorite']);
        Route::get('/saved', [ApprendreController::class, 'getSaved']);
        Route::post('/saved', [ApprendreController::class, 'storeSaved']);
        // Delete by natural key (mission_id + content) — must be declared before /{id}
        Route::delete('/saved', [ApprendreController::class, 'destroySavedByContent']);
        Route::delete('/saved/{id}', [ApprendreController::class, 'destroySaved']);

        // Learning certificates (issued automatically for fully-completed tracks)
        Route::get('/certificates', [CertificateController::class, 'index']);
        Route::get('/certificates/{track}/download', [CertificateController::class, 'download']);
    });
});

//Laravel api routes
Route::get('/cities', [CityController::class, 'index']);

Route::get('/cities/{slug}', [CityController::class, 'show']);

Route::get('/favorites', [FavoriteController::class, 'index']);

Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);

Route::delete('/favorites/by-item', [FavoriteController::class, 'destroyByItem']);

Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);

// ⬇ PUBLIC - Ga3 nas y9dro ychofou commentaires
Route::get('/commentaires', [CommentaireController::class, 'index']);

// Public hotels endpoint (filter by city name)
Route::get('/hotels', [AdminController::class, 'getHotelsByCity']);

