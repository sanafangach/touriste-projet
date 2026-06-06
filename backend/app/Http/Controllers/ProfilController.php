<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilUpdateRequest;
use App\Models\Profil;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    /**
     * Afficher le profil du user connecté
     */
    public function show()
    {
        $user = Auth::user();

        $profil = $user->profil;

        if (!$profil) {
            $profil = Profil::create([
                'user_id' => $user->id,
                'ville' => null,
                'bio' => null,
                'image' => null,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $profil->id,
                'user_id' => $profil->user_id,
                'nom_complet' => $user->name,
                'email' => $user->email,
                'ville' => $profil->ville,
                'bio' => $profil->bio,
                'image' => $profil->image, // ⚠️ correction
                'created_at' => $profil->created_at,
                'updated_at' => $profil->updated_at,
            ]
        ]);
    }

    /**
     * Update profile
     */
    public function update(ProfilUpdateRequest $request)
    {
        $user = Auth::user();
        $profil = $user->profil;

        if (!$profil) {
            $profil = new Profil();
            $profil->user_id = $user->id;
        }

        $profil->ville = $request->ville;
        $profil->bio = $request->bio;

        if ($request->hasFile('image')) {

            // delete old image
            if ($profil->image && Storage::disk('public')->exists($profil->image)) {
                Storage::disk('public')->delete($profil->image);
            }

            // store new image
            $path = $request->file('image')->store('profils', 'public');
            $profil->image = $path;
        }

        $profil->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'data' => $profil
        ]);
    }

    /**
     * Delete image only
     */
    public function deleteImage()
    {
        $user = Auth::user();
        $profil = $user->profil;

        if ($profil && $profil->image) {
            if (Storage::disk('public')->exists($profil->image)) {
                Storage::disk('public')->delete($profil->image);
            }

            $profil->image = null;
            $profil->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Image supprimée avec succès'
        ]);
    }
}
