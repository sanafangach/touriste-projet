<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use GuzzleHttp\Client;

class SocialAuthController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function handleGoogleCallback(Request $request)
    {
        \Log::info('Google callback received', [
            'has_code' => $request->filled('code'),
            'redirect_uri' => $request->input('redirect_uri'),
        ]);

        try {
            $validated = $request->validate([
                'code' => 'required|string',
                'redirect_uri' => 'required|string'
            ]);

            $tokenResponse = $this->exchangeGoogleCode(
                $validated['code'], 
                $validated['redirect_uri']
            );

            if (!$tokenResponse || isset($tokenResponse['error']) || !isset($tokenResponse['access_token'])) {
                \Log::error('Erreur token Google', $tokenResponse ?? []);
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur Google: ' . 
                        ($tokenResponse['error_description'] ?? $tokenResponse['error'] ?? 'Inconnue')
                ], 400);
            }

            $userInfo = $this->getGoogleUserInfo($tokenResponse['access_token']);

            if (!$userInfo || !isset($userInfo['email'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Infos utilisateur non récupérées'
                ], 400);
            }

            return $this->createOrLoginUser($userInfo, 'google');

        } catch (\Exception $e) {
            \Log::error('Exception', ['msg' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    private function createOrLoginUser(array $userInfo, string $provider)
        {
            \Log::info('=== GOOGLE LOGIN ===', [
                'email' => $userInfo['email'] ?? 'NO EMAIL',
                'name'  => $userInfo['name'] ?? 'NO NAME',
                'id'    => $userInfo['id'] ?? 'NO ID',
            ]);

            $user = User::where('email', $userInfo['email'])->first();
            \Log::info('User exists?', ['found' => $user ? 'YES id='.$user->id : 'NO']);

            $accountCreated = false;

            if (!$user) {
                try {
                    $user = User::create([
                        'name'              => $userInfo['name'] ?? explode('@', $userInfo['email'])[0],
                        'email'             => $userInfo['email'],
                        'password'          => Hash::make(Str::random(16)),
                        'role'              => 'user',
                        'email_verified_at' => now(),
                        'provider'          => $provider,
                        'provider_id'       => $userInfo['id'] ?? null,
                    ]);
                    $accountCreated = true;
                    \Log::info('User CREATED', ['id' => $user->id]);
                } catch (\Exception $e) {
                    \Log::error('User CREATE FAILED', ['error' => $e->getMessage()]);
                    return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
                }
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => $accountCreated ? 'Account created successfully.' : 'Logged in successfully.',
                'is_new_user' => $accountCreated,
                'user' => [
                    'id'    => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                    'role'  => $user->role,
                ],
                'token' => $token
            ]);
        }
    private function exchangeGoogleCode(string $code, string $redirectUri)
    {
        try {
            $response = $this->client->post('https://oauth2.googleapis.com/token', [
                'verify' => false, 
                'http_errors' => false,
                'form_params' => [
                    'code' => $code,
                    'client_id' => env('GOOGLE_CLIENT_ID'),
                    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
                    'redirect_uri' => $redirectUri,
                    'grant_type' => 'authorization_code'
                ]
            ]);
            $tokenResponse = json_decode((string) $response->getBody(), true);

            if ($response->getStatusCode() >= 400) {
                \Log::error('Google token exchange failed', [
                    'status' => $response->getStatusCode(),
                    'body' => $tokenResponse,
                ]);
            }

            return $tokenResponse;
        } catch (\Exception $e) {
            \Log::error('Guzzle error', ['msg' => $e->getMessage()]);
            return [
                'error' => 'google_request_failed',
                'error_description' => $e->getMessage(),
            ];
        }
    }

    private function getGoogleUserInfo(string $accessToken)
    {
        try {
            $response = $this->client->get('https://www.googleapis.com/oauth2/v2/userinfo', [
                'verify' => false,  
                'http_errors' => false,
                'headers' => ['Authorization' => 'Bearer ' . $accessToken]
            ]);
            $userInfo = json_decode((string) $response->getBody(), true);

            if ($response->getStatusCode() >= 400) {
                \Log::error('Google user info failed', [
                    'status' => $response->getStatusCode(),
                    'body' => $userInfo,
                ]);
                return null;
            }

            return $userInfo;
        } catch (\Exception $e) {
            return null;
        }
    }
}
