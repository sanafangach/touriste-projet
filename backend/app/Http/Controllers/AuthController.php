<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VerificationCode;
use App\Models\PasswordReset;
use App\Mail\VerificationCodeMail;
use App\Mail\ResetPasswordMail;     
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str; 


class AuthController extends Controller
{
    // ===== LOGIN =====
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email incorrect ou utilisateur non trouvé'
            ], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Mot de passe incorrect'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }

    // ===== LOGOUT =====
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // ===== REGISTER STEP 1: Sifet code =====
    public function registerSendCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response()->json([
                'message' => 'Cet email est déjà utilisé'
            ], 422);
        }

        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        VerificationCode::where('email', $request->email)->delete();

        VerificationCode::create([
            'email' => $request->email,
            'code' => $code,
            'expires_at' => now()->addMinutes(10)
        ]);

        try {
            Mail::to($request->email)->send(new VerificationCodeMail($code));
            
            return response()->json([
                'success' => true,
                'message' => 'Code envoyé avec succès',
                'email' => $request->email
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de l\'email: ' . $e->getMessage()
            ], 500);
        }
    }

    // ===== REGISTER STEP 2: Verifier code w creer compte =====
    public function registerVerify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'code' => 'required|string|size:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record = VerificationCode::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$record) {
            return response()->json([
                'verified' => false,
                'message' => 'Code invalide ou expiré'
            ], 400);
        }

        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            $record->delete();

            return response()->json([
                'success' => false,
                'message' => 'Cet email est deja utilise'
            ], 422);
        }

        $record->delete();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'email_verified_at' => now()
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Inscription réussie !',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }

    // ===== Verifier code (bila creer compte) =====
    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record = VerificationCode::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$record) {
            return response()->json([
                'verified' => false,
                'message' => 'Code invalide ou expiré'
            ], 400);
        }

        return response()->json([
            'verified' => true,
            'message' => 'Code vérifié'
        ]);
    }



 // ===== MOT DE PASSE OUBLIÉ =====

    /**
     * Step 1: Sifet lien de reset l-email
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $email = $request->email;

        // Check wach user kayn
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Aucun compte trouvé avec cet email'
            ], 404);
        }

        // Generer token magique
        $token = Str::random(64);

        // Supprimer tokens 9dam
        PasswordReset::where('email', $email)->delete();

        // Creer token jdid
        PasswordReset::create([
            'email' => $email,
            'token' => $token,
            'expires_at' => now()->addMinutes(30)
        ]);

        // Sifet email b lien
        try {
            Mail::to($email)->send(new ResetPasswordMail($token, $email));
            
            return response()->json([
                'success' => true,
                'message' => 'Lien envoyé à votre email'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de l\'email'
            ], 500);
        }
    }

    /**
     * Step 2: Verifier token w badal password
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verifier token
        $record = PasswordReset::where('email', $request->email)
            ->where('token', $request->token)
            ->where('expires_at', '>', now())
            ->first();

        if (!$record) {
            return response()->json([
                'success' => false,
                'message' => 'Lien invalide ou expiré'
            ], 400);
        }

        // Badal password
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Supprimer token
        $record->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mot de passe modifié avec succès !'
        ]);
    }

    /**
     * Verifier wach token s7i7 (optionnel)
     */
    public function verifyResetToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record = PasswordReset::where('email', $request->email)
            ->where('token', $request->token)
            ->where('expires_at', '>', now())
            ->first();

        if (!$record) {
            return response()->json([
                'valid' => false,
                'message' => 'Lien invalide ou expiré'
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Lien valide'
        ]);
    }
}
