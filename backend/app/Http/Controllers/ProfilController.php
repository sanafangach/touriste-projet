<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfilController extends Controller
{
    /**
     * GET /api/profile
     * Retourne le profil de l'utilisateur connecté
     */
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'success' => true,
            'data' => $this->formatUser($user),
        ]);
    }

    /**
     * POST /api/profile
     * Met à jour le profil (nom, ville, bio, photo)
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name'  => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'bio'   => 'nullable|string|max:1000',
            'photo' => 'nullable|string',          // base64 data URL
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096', // file upload fallback
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Update text fields if present
        if ($request->filled('name')) {
            $user->name = $request->name;
        }
        if ($request->filled('ville')) {
            $user->ville = $request->ville;
        }
        if ($request->has('ville') && !$request->filled('ville')) {
            $user->ville = null;
        }
        if ($request->filled('bio')) {
            $user->bio = $request->bio;
        }
        if ($request->has('bio') && !$request->filled('bio')) {
            $user->bio = null;
        }

        // Handle base64 photo (sent as JSON body)
        if ($request->filled('photo') && str_starts_with($request->photo, 'data:image')) {
            $imagePath = $this->saveBase64Image($request->photo, $user->image);
            if ($imagePath) {
                $user->image = $imagePath;
            }
        }

        // Handle multipart file upload (fallback)
        if ($request->hasFile('image')) {
            $this->deleteOldImage($user->image);
            
            $file = $request->file('image');
            $folder = 'profils';
            $directory = public_path("uploads/{$folder}");
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $filename = uniqid('avatar_', true) . '.' . $file->getClientOriginalExtension();
            $file->move($directory, $filename);

            $user->image = "{$folder}/{$filename}";
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'data'    => $this->formatUser($user->fresh()),
        ]);
    }

    /**
     * DELETE /api/profile/image
     * Supprime la photo de profil
     */
    public function deleteImage()
    {
        $user = Auth::user();

        $this->deleteOldImage($user->image);
        $user->image = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Photo supprimée avec succès',
        ]);
    }

    /* ─── Private helpers ─────────────────────────────────── */

    private function formatUser(User $user): array
    {
        return [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'role'  => $user->role,
            'ville' => $user->ville,
            'bio'   => $user->bio,
            'image' => $user->image,
        ];
    }

    private function saveBase64Image(string $base64, ?string $oldPath): ?string
    {
        try {
            // Extract the image type and data
            [$meta, $data] = explode(',', $base64, 2);
            preg_match('/data:image\/(\w+);/', $meta, $matches);
            $extension = $matches[1] ?? 'jpg';

            $binaryData = base64_decode($data);
            if ($binaryData === false) {
                return null;
            }

            // Delete the old image first
            $this->deleteOldImage($oldPath);

            $folder = 'profils';
            $directory = public_path("uploads/{$folder}");
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            $filename = uniqid('avatar_', true) . '.' . $extension;
            file_put_contents($directory . '/' . $filename, $binaryData);

            return "{$folder}/{$filename}";
        } catch (\Throwable $e) {
            \Log::error('[ProfilController] base64 save error: ' . $e->getMessage());
            return null;
        }
    }

    private function deleteOldImage(?string $path): void
    {
        if ($path && !str_starts_with($path, 'http')) {
            $fullPath = public_path("uploads/{$path}");
            if (file_exists($fullPath)) {
                @unlink($fullPath);
            }
        }
    }
}
