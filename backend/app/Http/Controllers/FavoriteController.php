<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $query = Favorite::with([
            'city',
            'activity',
            'restaurant',
            'place',
            'gem'
        ]);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        return $query->latest()->get();
    }

    public function toggle(Request $request)
    {
        $favorite = Favorite::where('user_id', $request->user_id)
            ->where('item_type', $request->item_type)
            ->where('item_id', $request->item_id)
            ->first();

        if ($favorite) {
            $favorite->delete();

            return response()->json([
                'saved' => false
            ]);
        }

        $favorite = Favorite::create([
            'user_id' => $request->user_id,
            'item_type' => $request->item_type,
            'item_id' => $request->item_id
        ])->load([
            'city',
            'activity',
            'restaurant',
            'place',
            'gem'
        ]);

        return response()->json([
            'saved' => true,
            'favorite' => $favorite
        ]);
    }

    public function destroy($id)
    {
        Favorite::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
