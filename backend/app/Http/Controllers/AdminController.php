<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ApprendreFavorite;
use App\Models\ApprendreMission;
use App\Models\ApprendreProgress;
use App\Models\ApprendreSavedContent;
use App\Models\City;
use App\Models\Favorite;
use App\Models\HiddenGem;
use App\Models\Hotel;
use App\Models\Place;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function getAllUsers()
    {
        return response()->json(
            User::query()
                ->select($this->existingUserColumns([
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'role',
                    'created_at',
                    'image',
                    'bio',
                    'ville',
                    'provider',    
                ]))
                ->latest()
                ->get()
        );
    }

    public function createUser(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', Rule::in(['admin', 'user'])],
            'image' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'ville' => ['nullable', 'string', 'max:255'],
        ]);

        $data['password'] = Hash::make($data['password']);
        $data = $this->filterUserData($data);

        $user = User::create($data);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $this->freshUserForResponse($user),
        ], 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:6'],
            'role' => ['required', Rule::in(['admin', 'user'])],
            'image' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'ville' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->user()->id === $user->id && $data['role'] !== 'admin') {
            return response()->json([
                'message' => 'You cannot remove your own admin role.',
            ], 422);
        }

        if ($user->role === 'admin' && $data['role'] !== 'admin' && $this->isLastAdmin($user)) {
            return response()->json([
                'message' => 'At least one admin account is required.',
            ], 422);
        }

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $data = $this->filterUserData($data);
        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $this->freshUserForResponse($user),
        ]);
    }

    public function deleteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' => 'You cannot delete your own account.',
            ], 422);
        }

        if ($user->role === 'admin' && $this->isLastAdmin($user)) {
            return response()->json([
                'message' => 'At least one admin account is required.',
            ], 422);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'role' => ['required', Rule::in(['admin', 'user'])],
        ]);

        if ($request->user()->id === $user->id && $data['role'] !== 'admin') {
            return response()->json([
                'message' => 'You cannot remove your own admin role.',
            ], 422);
        }

        if ($user->role === 'admin' && $data['role'] !== 'admin' && $this->isLastAdmin($user)) {
            return response()->json([
                'message' => 'At least one admin account is required.',
            ], 422);
        }

        $user->update(['role' => $data['role']]);

        return response()->json([
            'message' => 'Role updated successfully',
            'user' => $this->freshUserForResponse($user),
        ]);
    }

    public function getStats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'total_regular_users' => User::where('role', 'user')->count(),
            'total_cities' => City::count(),
            'total_activities' => Activity::count(),
            'total_restaurants' => Restaurant::count(),
            'total_places' => Place::count(),
            'total_hidden_gems' => HiddenGem::count(),
            'total_hotels' => Hotel::count(),
            'total_favorites' => Favorite::count(),
        ]);
    }

    public function getFavorites()
    {
        $favorites = Favorite::query()
            ->with($this->adminFavoriteRelations())
            ->latest()
            ->get()
            ->map(function (Favorite $favorite) {
                $favorite->setRelation('item', $this->favoriteItem($favorite));

                return $favorite;
            });

        return response()->json($favorites);
    }

    // ──────────────────────────────────────────────
    //  Apprendre analytics
    //
    //  Every value here is computed directly from the apprendre_* tables.
    //  localStorage is never consulted — the database is the single source of truth.
    // ──────────────────────────────────────────────

    public function getApprendreStats()
    {
        $tracks = ['darija', 'tifinagh', 'culture'];

        // ── Totals (aggregate counts straight from the tables) ──
        $totalMissions    = ApprendreMission::count();
        $totalCompletions = ApprendreProgress::where('completed', true)->count();
        $totalFavorites   = ApprendreFavorite::count();
        $totalSaved       = ApprendreSavedContent::count();

        // Distinct learners: users who have at least one completed mission.
        $activeLearners = ApprendreProgress::where('completed', true)
            ->distinct('user_id')
            ->count('user_id');

        // ── Per-track breakdown ──
        $missionsPerTrack = ApprendreMission::select('track', DB::raw('COUNT(*) as total'))
            ->groupBy('track')
            ->pluck('total', 'track');

        $completionsPerTrack = ApprendreProgress::where('completed', true)
            ->join('apprendre_missions', 'apprendre_progress.mission_id', '=', 'apprendre_missions.id')
            ->select('apprendre_missions.track', DB::raw('COUNT(*) as total'))
            ->groupBy('apprendre_missions.track')
            ->pluck('total', 'track');

        $favoritesPerTrack = ApprendreFavorite::join('apprendre_missions', 'apprendre_favorites.mission_id', '=', 'apprendre_missions.id')
            ->select('apprendre_missions.track', DB::raw('COUNT(*) as total'))
            ->groupBy('apprendre_missions.track')
            ->pluck('total', 'track');

        $savedPerTrack = ApprendreSavedContent::join('apprendre_missions', 'apprendre_saved_content.mission_id', '=', 'apprendre_missions.id')
            ->select('apprendre_missions.track', DB::raw('COUNT(*) as total'))
            ->groupBy('apprendre_missions.track')
            ->pluck('total', 'track');

        $byTrack = collect($tracks)->map(function ($track) use (
            $missionsPerTrack, $completionsPerTrack, $favoritesPerTrack, $savedPerTrack
        ) {
            $missions    = (int) ($missionsPerTrack[$track] ?? 0);
            $completions = (int) ($completionsPerTrack[$track] ?? 0);

            return [
                'track'        => $track,
                'missions'     => $missions,
                'completions'  => $completions,
                'favorites'    => (int) ($favoritesPerTrack[$track] ?? 0),
                'saved'        => (int) ($savedPerTrack[$track] ?? 0),
            ];
        })->values();

        // ── Most-completed missions (top 5) ──
        $topMissions = ApprendreMission::query()
            ->withCount(['progress as completions' => function ($q) {
                $q->where('completed', true);
            }])
            ->orderByDesc('completions')
            ->orderBy('track')
            ->orderBy('mission_number')
            ->take(5)
            ->get()
            ->map(fn ($m) => [
                'id'             => $m->id,
                'track'          => $m->track,
                'mission_number' => $m->mission_number,
                'title'          => $m->title,
                'completions'    => (int) $m->completions,
            ]);

        // Overall completion rate = completed rows / (learners × missions).
        $possible = $activeLearners * $totalMissions;
        $completionRate = $possible > 0
            ? round(($totalCompletions / $possible) * 100)
            : 0;

        return response()->json([
            'totals' => [
                'missions'        => $totalMissions,
                'active_learners' => $activeLearners,
                'completions'     => $totalCompletions,
                'favorites'       => $totalFavorites,
                'saved_content'   => $totalSaved,
                'completion_rate' => $completionRate,
            ],
            'by_track'     => $byTrack,
            'top_missions' => $topMissions,
        ]);
    }

    // ──────────────────────────────────────────────
    //  Apprendre inspection (drill-down lists)
    //
    //  Each endpoint returns paginated, searchable records straight from the
    //  apprendre_* tables so an admin can click a stat card and inspect the real
    //  rows behind the number. Shared query params: ?page, ?per_page, ?search.
    // ──────────────────────────────────────────────

    // Clamp pagination params to a sane range (defaults: page 1, 10 per page, max 100).
    private function apprendrePerPage(Request $request): int
    {
        return (int) min(max((int) $request->query('per_page', 10), 1), 100);
    }

    // Normalise the sort direction param to 'asc' or 'desc' (defaults to 'desc').
    private function apprendreSortDir(Request $request): string
    {
        return strtolower((string) $request->query('dir', 'desc')) === 'asc' ? 'asc' : 'desc';
    }

    // Active learners: users with at least one completed mission, plus their counts.
    public function getApprendreLearners(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $query = User::query()
            ->whereHas('apprendreProgress', fn ($q) => $q->where('completed', true))
            ->withCount([
                'apprendreProgress as completed_count' => fn ($q) => $q->where('completed', true),
                'apprendreFavorites as favorites_count',
                'apprendreSavedContent as saved_count',
            ])
            ->select(['id', 'name', 'email', 'role', 'image', 'created_at']);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return response()->json(
            $query->orderByDesc('completed_count')->orderBy('name')
                ->paginate($this->apprendrePerPage($request))
        );
    }

    // All completion records (mission + learner), newest first.
    public function getApprendreCompletions(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $sort = (string) $request->query('sort', 'date');
        $dir = $this->apprendreSortDir($request);

        $query = ApprendreProgress::query()
            ->where('apprendre_progress.completed', true)
            ->with(['user:id,name,email', 'mission:id,track,mission_number,title'])
            ->select('apprendre_progress.*');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
                  ->orWhereHas('mission', fn ($m) => $m->where('title', 'like', "%{$search}%")->orWhere('track', 'like', "%{$search}%"));
            });
        }

        switch ($sort) {
            case 'user':
                $query->leftJoin('users', 'apprendre_progress.user_id', '=', 'users.id')
                      ->orderBy('users.name', $dir);
                break;
            case 'track':
                $query->leftJoin('apprendre_missions', 'apprendre_progress.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.track', $dir)
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'mission':
                $query->leftJoin('apprendre_missions', 'apprendre_progress.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'date':
            default:
                $query->orderBy('apprendre_progress.completed_at', $dir)->orderBy('apprendre_progress.id', $dir);
        }

        return response()->json(
            $query->paginate($this->apprendrePerPage($request))
        );
    }

    // All favorite records (mission + learner).
    public function getApprendreFavoritesList(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $sort = (string) $request->query('sort', 'date');
        $dir = $this->apprendreSortDir($request);

        $query = ApprendreFavorite::query()
            ->with(['user:id,name,email', 'mission:id,track,mission_number,title'])
            ->select('apprendre_favorites.*');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
                  ->orWhereHas('mission', fn ($m) => $m->where('title', 'like', "%{$search}%")->orWhere('track', 'like', "%{$search}%"));
            });
        }

        switch ($sort) {
            case 'user':
                $query->leftJoin('users', 'apprendre_favorites.user_id', '=', 'users.id')
                      ->orderBy('users.name', $dir);
                break;
            case 'track':
                $query->leftJoin('apprendre_missions', 'apprendre_favorites.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.track', $dir)
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'mission':
                $query->leftJoin('apprendre_missions', 'apprendre_favorites.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'date':
            default:
                $query->orderBy('apprendre_favorites.created_at', $dir)->orderBy('apprendre_favorites.id', $dir);
        }

        return response()->json(
            $query->paginate($this->apprendrePerPage($request))
        );
    }

    // All saved vocabulary records (content + learner + mission).
    public function getApprendreSavedList(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $sort = (string) $request->query('sort', 'date');
        $dir = $this->apprendreSortDir($request);

        $query = ApprendreSavedContent::query()
            ->with(['user:id,name,email', 'mission:id,track,mission_number,title'])
            ->select('apprendre_saved_content.*');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('apprendre_saved_content.content', 'like', "%{$search}%")
                  ->orWhere('apprendre_saved_content.translation', 'like', "%{$search}%")
                  ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
                  ->orWhereHas('mission', fn ($m) => $m->where('title', 'like', "%{$search}%")->orWhere('track', 'like', "%{$search}%"));
            });
        }

        switch ($sort) {
            case 'user':
                $query->leftJoin('users', 'apprendre_saved_content.user_id', '=', 'users.id')
                      ->orderBy('users.name', $dir);
                break;
            case 'word':
                $query->orderBy('apprendre_saved_content.content', $dir);
                break;
            case 'translation':
                $query->orderBy('apprendre_saved_content.translation', $dir);
                break;
            case 'track':
                $query->leftJoin('apprendre_missions', 'apprendre_saved_content.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.track', $dir)
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'mission':
                $query->leftJoin('apprendre_missions', 'apprendre_saved_content.mission_id', '=', 'apprendre_missions.id')
                      ->orderBy('apprendre_missions.mission_number', $dir);
                break;
            case 'date':
            default:
                $query->orderBy('apprendre_saved_content.created_at', $dir)->orderBy('apprendre_saved_content.id', $dir);
        }

        return response()->json(
            $query->paginate($this->apprendrePerPage($request))
        );
    }

    public function getCities()
    {
        return response()->json(
            City::query()
                ->withCount(['activities', 'restaurants', 'places', 'hiddenGems'])
                ->orderBy('name')
                ->get()
        );
    }

    public function createCity(Request $request)
    {
        $data = $this->validatedCityData($request);
        $data['slug'] = $this->uniqueCitySlug($data['slug'] ?: $data['name']);
        $data = $this->attachUploadedImage($request, $data, $data['slug']);

        $city = City::create($data);

        return response()->json([
            'message' => 'City created successfully',
            'city' => $city,
        ], 201);
    }

    public function updateCity(Request $request, $id)
    {
        $city = City::findOrFail($id);
        $data = $this->validatedCityData($request);
        $data['slug'] = $this->uniqueCitySlug($data['slug'] ?: $data['name'], $city->id);
        $data = $this->attachUploadedImage($request, $data, $data['slug']);

        $city->update($data);

        return response()->json([
            'message' => 'City updated successfully',
            'city' => $city->fresh(),
        ]);
    }

    public function deleteCity($id)
    {
        $city = City::with(['activities', 'restaurants', 'places', 'hiddenGems'])->findOrFail($id);

        $this->deleteFavorites('city', [$city->id]);
        $this->deleteFavorites('activity', $city->activities->pluck('id')->all());
        $this->deleteFavorites('restaurant', $city->restaurants->pluck('id')->all());
        $this->deleteFavorites('place', $city->places->pluck('id')->all());
        $this->deleteFavorites('gem', $city->hiddenGems->pluck('id')->all());
        $city->delete();

        return response()->json(['message' => 'City deleted successfully']);
    }

    public function getActivities()
    {
        return response()->json(
            Activity::with('city:id,name,slug')->latest()->get()
        );
    }

    public function createActivity(Request $request)
    {
        $data = $this->validatedActivityData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));
        $data = $this->filterTableData('activities', $data);

        $activity = DB::transaction(function () use ($data) {
            return Activity::query()->create($data)->fresh('city:id,name,slug');
        });

        return response()->json([
            'message' => 'Activity created successfully',
            'activity' => $activity,
        ], 201);
    }

    public function updateActivity(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);
        $data = $this->validatedActivityData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));
        $data = $this->filterTableData('activities', $data);

        $activity = DB::transaction(function () use ($activity, $data) {
            $activity->update($data);

            return $activity->fresh('city:id,name,slug');
        });

        return response()->json([
            'message' => 'Activity updated successfully',
            'activity' => $activity,
        ]);
    }

    public function deleteActivity($id)
    {
        $activity = Activity::findOrFail($id);
        $this->deleteFavorites('activity', [$activity->id]);
        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully']);
    }

    public function getRestaurants()
    {
        return response()->json(
            Restaurant::with('city:id,name,slug')->latest()->get()
        );
    }

    public function createRestaurant(Request $request)
    {
        $data = $this->validatedRestaurantData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));

        $restaurant = Restaurant::create($data);

        return response()->json([
            'message' => 'Restaurant created successfully',
            'restaurant' => $restaurant->load('city:id,name,slug'),
        ], 201);
    }

    public function updateRestaurant(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $data = $this->validatedRestaurantData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));

        $restaurant->update($data);

        return response()->json([
            'message' => 'Restaurant updated successfully',
            'restaurant' => $restaurant->fresh()->load('city:id,name,slug'),
        ]);
    }

    public function deleteRestaurant($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $this->deleteFavorites('restaurant', [$restaurant->id]);
        $restaurant->delete();

        return response()->json(['message' => 'Restaurant deleted successfully']);
    }

    public function getPlaces()
    {
        return response()->json(
            Place::with('city:id,name,slug')->latest()->get()
        );
    }

    public function createPlace(Request $request)
    {
        $data = $this->validatedPlaceData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));

        $place = Place::create($data);

        return response()->json([
            'message' => 'Place created successfully',
            'place' => $place->load('city:id,name,slug'),
        ], 201);
    }

    public function updatePlace(Request $request, $id)
    {
        $place = Place::findOrFail($id);
        $data = $this->validatedPlaceData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));

        $place->update($data);

        return response()->json([
            'message' => 'Place updated successfully',
            'place' => $place->fresh()->load('city:id,name,slug'),
        ]);
    }

    public function deletePlace($id)
    {
        $place = Place::findOrFail($id);
        $this->deleteFavorites('place', [$place->id]);
        $place->delete();

        return response()->json(['message' => 'Place deleted successfully']);
    }

    public function getHiddenGems()
    {
        return response()->json(
            HiddenGem::with('city:id,name,slug')->latest()->get()
        );
    }

    public function createHiddenGem(Request $request)
    {
        $data = $this->validatedHiddenGemData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));
        $data = $this->filterTableData('hidden_gems', $data);

        $hiddenGem = HiddenGem::query()->create($data)->fresh('city:id,name,slug');

        return response()->json([
            'message' => 'Hidden gem created successfully',
            'hidden_gem' => $hiddenGem,
        ], 201);
    }

    public function updateHiddenGem(Request $request, $id)
    {
        $hiddenGem = HiddenGem::findOrFail($id);
        $data = $this->validatedHiddenGemData($request);
        $data = $this->attachUploadedImage($request, $data, $this->citySlug($data['city_id']));
        $data = $this->filterTableData('hidden_gems', $data);

        $hiddenGem->update($data);

        return response()->json([
            'message' => 'Hidden gem updated successfully',
            'hidden_gem' => $hiddenGem->fresh('city:id,name,slug'),
        ]);
    }

    public function deleteHiddenGem($id)
    {
        $hiddenGem = HiddenGem::findOrFail($id);
        $this->deleteFavorites('gem', [$hiddenGem->id]);
        $hiddenGem->delete();

        return response()->json(['message' => 'Hidden gem deleted successfully']);
    }

    private function validatedCityData(Request $request): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'description' => ['nullable', 'string'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
        ]);

        unset($data['image_file']);
        $data['rating'] = $this->numberOrDefault($data['rating'] ?? null);

        return $data;
    }

    private function validatedActivityData(Request $request): array
    {
        return $this->validatedContentData($request, [
            'price' => ['nullable', 'numeric', 'min:0'],
            'duration' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function validatedRestaurantData(Request $request): array
    {
        return $this->validatedContentData($request, [
            'cuisine' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'opening_hours' => ['nullable', 'string', 'max:255'],
        ]);
    }

    private function validatedPlaceData(Request $request): array
    {
        return $this->validatedContentData($request, [
            'category' => ['nullable', 'string', 'max:255'],
            'entry_price' => ['nullable', 'numeric', 'min:0'],
        ]);
    }

    private function validatedHiddenGemData(Request $request): array
    {
        return $this->validatedContentData($request, [
            'location' => ['nullable', 'string', 'max:255'],
            'best_time' => ['nullable', 'string', 'max:255'],
        ], false);
    }

    private function validatedContentData(Request $request, array $extraRules, bool $hasRating = true): array
    {
        $rules = array_merge([
            'city_id' => ['required', 'exists:cities,id'],
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'description' => ['nullable', 'string'],
        ], $extraRules);

        if ($hasRating) {
            $rules['rating'] = ['nullable', 'numeric', 'min:0', 'max:5'];
        }

        $data = $request->validate($rules);

        unset($data['image_file']);

        if ($hasRating) {
            $data['rating'] = $this->numberOrDefault($data['rating'] ?? null);
        }

        foreach (['price', 'entry_price'] as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = $this->numberOrDefault($data[$field]);
            }
        }

        return $data;
    }

    private function attachUploadedImage(Request $request, array $data, string $folder): array
    {
        if (!$request->hasFile('image_file')) {
            return $data;
        }

        $file = $request->file('image_file');
        $folder = Str::slug($folder) ?: 'admin';
        $directory = public_path("uploads/{$folder}");

        File::ensureDirectoryExists($directory);

        $baseName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName = now()->format('YmdHis') . '-' . (Str::slug($baseName) ?: 'image') . '.' . $file->getClientOriginalExtension();

        $file->move($directory, $fileName);
        $data['image'] = "{$folder}/{$fileName}";

        return $data;
    }

    private function uniqueCitySlug(string $value, ?int $ignoreId = null): string
    {
        $base = Str::slug($value) ?: 'city';
        $slug = $base;
        $counter = 2;

        while (
            City::where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function citySlug(int $cityId): string
    {
        return City::findOrFail($cityId)->slug;
    }

    private function isLastAdmin(User $user): bool
    {
        return User::where('role', 'admin')
            ->where('id', '!=', $user->id)
            ->doesntExist();
    }

    private function existingUserColumns(array $columns): array
    {
        $existingColumns = Schema::getColumnListing('users');

        return array_values(array_intersect($columns, $existingColumns));
    }

    private function filterUserData(array $data): array
    {
        return array_intersect_key($data, array_flip(Schema::getColumnListing('users')));
    }

    private function freshUserForResponse(User $user): User
    {
        return User::query()
            ->select($this->existingUserColumns([
                'id',
                'name',
                'email',
                'role',
                'image',
                'bio',
                'ville',
                'provider',
                'email_verified_at',
                'created_at',
            ]))
            ->findOrFail($user->id);
    }

    private function filterTableData(string $table, array $data): array
    {
        return array_intersect_key($data, array_flip(Schema::getColumnListing($table)));
    }

    private function adminFavoriteRelations(): array
    {
        $relations = [
            $this->relationColumns('user', 'users', ['id', 'name', 'email', 'role']),
            $this->relationColumns('city', 'cities', ['id', 'name', 'slug', 'image', 'rating']),
            $this->relationColumns('activity', 'activities', ['id', 'city_id', 'name', 'image', 'price', 'duration', 'rating', 'description']),
            $this->relationColumns('restaurant', 'restaurants', ['id', 'city_id', 'name', 'image', 'cuisine', 'rating', 'phone', 'opening_hours']),
            $this->relationColumns('place', 'places', ['id', 'city_id', 'name', 'image', 'category', 'rating', 'entry_price']),
            $this->relationColumns('gem', 'hidden_gems', ['id', 'city_id', 'name', 'image', 'description', 'location', 'best_time']),
        ];

        foreach ([
            ['activity.city', 'activities'],
            ['restaurant.city', 'restaurants'],
            ['place.city', 'places'],
            ['gem.city', 'hidden_gems'],
        ] as [$relation, $parentTable]) {
            if (Schema::hasTable($parentTable) && Schema::hasColumn($parentTable, 'city_id')) {
                $relations[] = $this->relationColumns($relation, 'cities', ['id', 'name', 'slug']);
            }
        }

        return array_values(array_filter($relations));
    }

    private function relationColumns(string $relation, string $table, array $columns): ?string
    {
        if (!Schema::hasTable($table)) {
            return null;
        }

        $existingColumns = array_values(array_intersect($columns, Schema::getColumnListing($table)));

        return empty($existingColumns) ? null : "{$relation}:" . implode(',', $existingColumns);
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

    private function deleteFavorites(string $type, array $ids): void
    {
        if (empty($ids)) {
            return;
        }

        Favorite::where('item_type', $type)
            ->whereIn('item_id', $ids)
            ->delete();
    }

    /* ─────────────────── HOTELS ─────────────────── */

    public function getHotels()
    {
        return response()->json(
            Hotel::with('city')
                ->latest()
                ->get()
                ->map(fn ($h) => $this->formatHotel($h))
        );
    }

    public function createHotel(Request $request)
    {
        $data = $request->validate([
            'city_id'      => ['required', 'exists:cities,id'],
            'name'         => ['required', 'string', 'max:255'],
            'price'        => ['nullable', 'string', 'max:100'],
            'rating'       => ['nullable', 'numeric', 'min:0', 'max:5'],
            'reviews'      => ['nullable', 'string', 'max:100'],
            'budget_level' => ['nullable', 'in:cheap,moderate,luxury'],
            'description'  => ['nullable', 'string'],
            'source'       => ['nullable', 'string', 'max:100'],
            'maps_query'   => ['nullable', 'string', 'max:500'],
        ]);

        $data = $this->attachUploadedImage($request, $data, 'hotels');

        $hotel = Hotel::create($data);

        return response()->json([
            'message' => 'Hotel created successfully',
            'hotel'   => $this->formatHotel($hotel->load('city')),
        ], 201);
    }

    public function updateHotel(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);

        $data = $request->validate([
            'city_id'      => ['sometimes', 'exists:cities,id'],
            'name'         => ['sometimes', 'string', 'max:255'],
            'price'        => ['nullable', 'string', 'max:100'],
            'rating'       => ['nullable', 'numeric', 'min:0', 'max:5'],
            'reviews'      => ['nullable', 'string', 'max:100'],
            'budget_level' => ['nullable', 'in:cheap,moderate,luxury'],
            'description'  => ['nullable', 'string'],
            'source'       => ['nullable', 'string', 'max:100'],
            'maps_query'   => ['nullable', 'string', 'max:500'],
        ]);

        $data = $this->attachUploadedImage($request, $data, 'hotels');
        $hotel->update($data);

        return response()->json([
            'message' => 'Hotel updated successfully',
            'hotel'   => $this->formatHotel($hotel->fresh()->load('city')),
        ]);
    }

    public function deleteHotel($id)
    {
        $hotel = Hotel::findOrFail($id);

        if ($hotel->image && !str_starts_with($hotel->image, 'http')) {
            $path = public_path('uploads/' . $hotel->image);
            if (file_exists($path)) {
                @unlink($path);
            }
        }

        $hotel->delete();

        return response()->json(['message' => 'Hotel deleted successfully']);
    }

    /**
     * Public endpoint — GET /hotels?city=Marrakech
     */
    public function getHotelsByCity(Request $request)
    {
        $cityName = $request->query('city');

        $query = Hotel::with('city');

        if ($cityName) {
            $query->whereHas('city', fn ($q) => $q->where('name', 'LIKE', "%{$cityName}%"));
        }

        return response()->json(
            $query->latest()->get()->map(fn ($h) => $this->formatHotel($h))
        );
    }

    private function formatHotel(Hotel $hotel): array
    {
        $image = $hotel->image;
        if ($image && !str_starts_with($image, 'http') && !str_starts_with($image, '/')) {
            $image = url('uploads/' . $image);
        }

        return [
            'id'           => $hotel->id,
            'city_id'      => $hotel->city_id,
            'city'         => $hotel->city ? ['id' => $hotel->city->id, 'name' => $hotel->city->name] : null,
            'name'         => $hotel->name,
            'image'        => $image,
            'price'        => $hotel->price,
            'rating'       => $hotel->rating,
            'reviews'      => $hotel->reviews,
            'budget_level' => $hotel->budget_level,
            'description'  => $hotel->description,
            'source'       => $hotel->source,
            'maps_query'   => $hotel->maps_query ?? ($hotel->name . ', ' . ($hotel->city->name ?? '') . ', Morocco'),
            'created_at'   => $hotel->created_at?->toIso8601String(),
            'updated_at'   => $hotel->updated_at?->toIso8601String(),
        ];
    }

    private function numberOrDefault(mixed $value, float $default = 0): float
    {
        if ($value === null || $value === '') {
            return $default;
        }

        return (float) $value;
    }
}
