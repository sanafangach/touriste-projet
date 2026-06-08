<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentaireController extends Controller
{
    /**
     * GET /api/commentaires
     */
    public function index()
    {
        $commentaires = Commentaire::with('user')
            ->where('approved', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($commentaire) {
                return [
                    'id' => $commentaire->id,
                    'contenu' => $commentaire->contenu,
                    'note' => $commentaire->note,
                    'date' => $commentaire->created_at->diffForHumans(),
                    'user' => [
                        'id' => $commentaire->user->id,
                        'name' => $commentaire->user->name,
                        'avatar' => $this->getInitials($commentaire->user->name),
                    ]
                ];
            });

        return response()->json($commentaires);
    }

    /**
     * POST /api/commentaires
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contenu' => 'required|string|min:3|max:1000',
            'note' => 'required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $commentaire = Commentaire::create([
            'user_id' => auth()->id(),
            'contenu' => $request->contenu,
            'note' => $request->note,
            'approved' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Commentaire ajouté avec succès et en attente d\'approbation',
            'commentaire' => [
                'id' => $commentaire->id,
                'contenu' => $commentaire->contenu,
                'note' => $commentaire->note,
                'date' => 'À l\'instant',
                'user' => [
                    'id' => $commentaire->user->id,
                    'name' => $commentaire->user->name,
                    'avatar' => $this->getInitials($commentaire->user->name),
                ]
            ]
        ], 201);
    }

    /**
     * DELETE /api/commentaires/{id}
     */
    public function destroy($id)
    {
        $commentaire = Commentaire::findOrFail($id);

        if (!auth()->user()->isAdmin() && $commentaire->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $commentaire->delete();

        return response()->json([
            'success' => true,
            'message' => 'Commentaire supprimé'
        ]);
    }

    /**
     * GET /api/admin/comments
     */
    public function adminIndex()
    {
        $commentaires = Commentaire::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($commentaire) {
                return [
                    'id' => $commentaire->id,
                    'contenu' => $commentaire->contenu,
                    'note' => $commentaire->note,
                    'approved' => (bool)$commentaire->approved,
                    'created_at' => $commentaire->created_at ? $commentaire->created_at->toIso8601String() : null,
                    'user' => [
                        'id' => $commentaire->user->id,
                        'name' => $commentaire->user->name,
                        'email' => $commentaire->user->email,
                    ]
                ];
            });

        return response()->json($commentaires);
    }

    /**
     * PUT /api/admin/comments/{id}/approve
     */
    public function approve($id)
    {
        $commentaire = Commentaire::findOrFail($id);
        $commentaire->approved = true;
        $commentaire->save();

        return response()->json([
            'success' => true,
            'message' => 'Commentaire approuvé avec succès',
            'commentaire' => $commentaire
        ]);
    }

    /**
     * Helper: Initials
     */
    private function getInitials($name)
    {
        $words = explode(' ', $name);
        $initials = '';
        foreach ($words as $word) {
            $initials .= strtoupper(substr($word, 0, 1));
        }
        return substr($initials, 0, 2);
    }
}