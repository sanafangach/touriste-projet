<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\City;
use App\Models\Favorite;
use App\Models\HiddenGem;
use App\Models\Place;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FavoriteController extends Controller
{
    private const ITEM_TYPES = [
        'city',
        'activity',
        'restaurant',
        'place',
        'gem',
    ];

    public function index(Request $request)
    {
        $query = Favorite::with($this->favoriteRelations());

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        return $query
            ->latest()
            ->get()
            ->map(fn (Favorite $favorite) => $this->favoritePayload($favorite));
    }

    public function toggle(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'item_type' => ['required', Rule::in(self::ITEM_TYPES)],
            'item_id' => ['required', 'integer'],
        ]);

        if (!$this->itemExists($data['item_type'], $data['item_id'])) {
            return response()->json([
                'message' => 'The selected favorite item does not exist.',
            ], 422);
        }

        $favorite = Favorite::where('user_id', $data['user_id'])
            ->where('item_type', $data['item_type'])
            ->where('item_id', $data['item_id'])
            ->first();

        if ($favorite) {
            $favorite->delete();

            return response()->json([
                'saved' => false
            ]);
        }

        $favorite = Favorite::create([
            'user_id' => $data['user_id'],
            'item_type' => $data['item_type'],
            'item_id' => $data['item_id']
        ])->load($this->favoriteRelations());

        return response()->json([
            'saved' => true,
            'favorite' => $this->favoritePayload($favorite)
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::find($id);

        if (!$favorite && $this->hasItemDeletePayload($request)) {
            return $this->destroyByItem($request);
        }

        if (!$favorite) {
            return response()->json([
                'message' => 'Favorite not found.',
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }

    public function destroyByItem(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'item_type' => ['required', Rule::in(self::ITEM_TYPES)],
            'item_id' => ['required', 'integer'],
        ]);

        $deleted = Favorite::where('user_id', $data['user_id'])
            ->where('item_type', $data['item_type'])
            ->where('item_id', $data['item_id'])
            ->delete();

        return response()->json([
            'message' => $deleted ? 'Deleted' : 'Favorite not found.',
            'deleted' => $deleted > 0,
        ], $deleted ? 200 : 404);
    }

    private function favoriteRelations(): array
    {
        return [
            'city',
            'activity.city',
            'restaurant.city',
            'place.city',
            'gem.city',
        ];
    }

    private function favoritePayload(Favorite $favorite): Favorite
    {
        $favorite->setAttribute('favorite_id', $favorite->id);
        $favorite->setRelation('item', $this->favoriteItem($favorite));

        return $favorite;
    }

    private function favoriteItem(Favorite $favorite): mixed
    {
        return match ($favorite->item_type) {
            'city' => $favorite->relationLoaded('city') ? $favorite->city : null,
            'activity' => $favorite->relationLoaded('activity') ? $favorite->activity : null,
            'restaurant' => $favorite->relationLoaded('restaurant') ? $favorite->restaurant : null,
            'place' => $favorite->relationLoaded('place') ? $favorite->place : null,
            'gem' => $favorite->relationLoaded('gem') ? $favorite->gem : null,
            default => null,
        };
    }

    private function itemExists(string $itemType, int $itemId): bool
    {
        return match ($itemType) {
            'city' => City::whereKey($itemId)->exists(),
            'activity' => Activity::whereKey($itemId)->exists(),
            'restaurant' => Restaurant::whereKey($itemId)->exists(),
            'place' => Place::whereKey($itemId)->exists(),
            'gem' => HiddenGem::whereKey($itemId)->exists(),
            default => false,
        };
    }

    private function hasItemDeletePayload(Request $request): bool
    {
        return $request->filled('user_id')
            && $request->filled('item_type')
            && $request->filled('item_id');
    }
}
