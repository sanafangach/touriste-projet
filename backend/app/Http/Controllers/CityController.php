<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
   public function show($slug)
{
    $city = City::with([
        'activities',
        'restaurants',
        'places',
        'hiddenGems'
    ])->where('slug', $slug)->first();

    if (!$city) {
        return response()->json([
            'message' => 'City not found'
        ], 404);
    }

    return response()->json([
        'city' => $city,
        'activities' => $city->activities,
        'restaurants' => $city->restaurants,
        'places' => $city->places,
        'hidden_gems' => $city->hiddenGems
    ]);

    }
}