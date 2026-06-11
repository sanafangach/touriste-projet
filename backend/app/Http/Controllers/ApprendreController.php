<?php

namespace App\Http\Controllers;

use App\Models\ApprendreFavorite;
use App\Models\ApprendreMission;
use App\Models\ApprendreProgress;
use App\Models\ApprendreSavedContent;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApprendreController extends Controller
{
    // ──────────────────────────────────────────────
    //  Missions (seed data / listing)
    // ──────────────────────────────────────────────

    public function missions()
    {
        return ApprendreMission::orderBy('track')->orderBy('mission_number')->get();
    }

    // ──────────────────────────────────────────────
    //  Progress
    // ──────────────────────────────────────────────

    public function getProgress()
    {
        $userId = auth()->id();

        return ApprendreProgress::where('user_id', $userId)
            ->where('completed', true)
            ->with('mission')
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'mission_id' => $p->mission_id,
                    'completed' => $p->completed,
                    'completed_at' => $p->completed_at,
                    'track' => $p->mission->track,
                    'mission_number' => $p->mission->mission_number,
                ];
            });
    }

    public function storeProgress(Request $request)
    {
        $data = $request->validate([
            'mission_id' => ['required', 'integer', 'exists:apprendre_missions,id'],
        ]);

        $userId = auth()->id();

        $progress = ApprendreProgress::updateOrCreate(
            [
                'user_id' => $userId,
                'mission_id' => $data['mission_id'],
            ],
            [
                'completed' => true,
                'completed_at' => now(),
            ]
        );

        // Automatically issue a certificate when this completion finishes the
        // track. Reuses the existing CertificateService (idempotent — never
        // creates duplicates) and is fully isolated: any failure here must not
        // affect saving progress, which is the contract of this endpoint.
        try {
            $mission = ApprendreMission::find($data['mission_id']);
            if ($mission && CertificateService::isValidTrack($mission->track)) {
                app(CertificateService::class)->issueIfEligible(auth()->user(), $mission->track);
            }
        } catch (\Throwable $e) {
            report($e);
        }

        return response()->json([
            'message' => 'Progress saved',
            'progress' => [
                'id' => $progress->id,
                'mission_id' => $progress->mission_id,
                'completed' => $progress->completed,
                'completed_at' => $progress->completed_at,
            ],
        ]);
    }

    // ──────────────────────────────────────────────
    //  Favorites
    // ──────────────────────────────────────────────

    public function getFavorites()
    {
        $userId = auth()->id();

        return ApprendreFavorite::where('user_id', $userId)
            ->with('mission')
            ->get()
            ->map(function ($f) {
                return [
                    'id' => $f->id,
                    'mission_id' => $f->mission_id,
                    'track' => $f->mission->track,
                    'mission_number' => $f->mission->mission_number,
                ];
            });
    }

    public function storeFavorite(Request $request)
    {
        $data = $request->validate([
            'mission_id' => ['required', 'integer', 'exists:apprendre_missions,id'],
        ]);

        $userId = auth()->id();

        $existing = ApprendreFavorite::where('user_id', $userId)
            ->where('mission_id', $data['mission_id'])
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already favorited', 'favorite' => $existing], 200);
        }

        $favorite = ApprendreFavorite::create([
            'user_id' => $userId,
            'mission_id' => $data['mission_id'],
        ]);

        $favorite->load('mission');

        return response()->json([
            'message' => 'Favorited',
            'favorite' => [
                'id' => $favorite->id,
                'mission_id' => $favorite->mission_id,
                'track' => $favorite->mission->track,
                'mission_number' => $favorite->mission->mission_number,
            ],
        ], 201);
    }

    public function destroyFavorite($id)
    {
        $userId = auth()->id();

        $favorite = ApprendreFavorite::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found'], 404);
        }

        $favorite->delete();

        return response()->json(['message' => 'Removed from favorites']);
    }

    // ──────────────────────────────────────────────
    //  Saved Content
    // ──────────────────────────────────────────────

    public function getSaved()
    {
        $userId = auth()->id();

        return ApprendreSavedContent::where('user_id', $userId)
            ->with('mission')
            ->get()
            ->map(function ($s) {
                return [
                    'id' => $s->id,
                    'mission_id' => $s->mission_id,
                    'category' => $s->category,
                    'type' => $s->type,
                    'content' => $s->content,
                    'translation' => $s->translation,
                    'track' => $s->mission->track,
                    'mission_number' => $s->mission->mission_number,
                ];
            });
    }

    public function storeSaved(Request $request)
    {
        $data = $request->validate([
            'mission_id' => ['required', 'integer', 'exists:apprendre_missions,id'],
            'category' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:50'],
            'content' => ['required', 'string'],
            'translation' => ['nullable', 'string'],
        ]);

        $userId = auth()->id();

        // Idempotent: the natural key is (user_id, mission_id, content). Re-saving the
        // same word must not create a duplicate row.
        $saved = ApprendreSavedContent::firstOrCreate(
            [
                'user_id' => $userId,
                'mission_id' => $data['mission_id'],
                'content' => $data['content'],
            ],
            [
                'category' => $data['category'] ?? null,
                'type' => $data['type'] ?? 'vocab',
                'translation' => $data['translation'] ?? null,
            ]
        );

        $saved->load('mission');

        return response()->json([
            'message' => $saved->wasRecentlyCreated ? 'Content saved' : 'Already saved',
            'saved' => [
                'id' => $saved->id,
                'mission_id' => $saved->mission_id,
                'category' => $saved->category,
                'type' => $saved->type,
                'content' => $saved->content,
                'translation' => $saved->translation,
                'track' => $saved->mission->track,
                'mission_number' => $saved->mission->mission_number,
            ],
        ], $saved->wasRecentlyCreated ? 201 : 200);
    }

    public function destroySaved($id)
    {
        $userId = auth()->id();

        $saved = ApprendreSavedContent::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$saved) {
            return response()->json(['message' => 'Saved content not found'], 404);
        }

        $saved->delete();

        return response()->json(['message' => 'Content removed']);
    }

    // Delete by natural key (mission_id + content). The client tracks saved items by a
    // deterministic key, not the DB auto-increment id, so deletion must not depend on it.
    public function destroySavedByContent(Request $request)
    {
        $data = $request->validate([
            'mission_id' => ['required', 'integer', 'exists:apprendre_missions,id'],
            'content' => ['required', 'string'],
        ]);

        $userId = auth()->id();

        $deleted = ApprendreSavedContent::where('user_id', $userId)
            ->where('mission_id', $data['mission_id'])
            ->where('content', $data['content'])
            ->delete();

        return response()->json([
            'message' => $deleted ? 'Content removed' : 'Saved content not found',
            'deleted' => $deleted,
        ]);
    }
}
