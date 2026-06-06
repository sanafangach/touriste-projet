<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::withCount([
            'activities',
            'restaurants',
            'places',
            'hiddenGems'
        ])->orderBy('name')->get();

        return response()->json([
            'cities' => $cities
        ]);
    }

    public function show($slug)
    {
        $city = City::with([
            'activities' => fn ($query) => $query->latest(),
            'restaurants' => fn ($query) => $query->latest(),
            'places' => fn ($query) => $query->latest(),
            'hiddenGems' => fn ($query) => $query->latest(),
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
