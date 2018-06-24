<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use App\SocialiteUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class GoogleSignInController extends Controller
{
    public function SignIn(Request $request)
    {
        $client = new \Google_Client(['client_id' => config('services.google.client_id')]);

        if (!$payload = $client->verifyIdToken($request->id_token)) {
            return response()->json(['data' => ['message' => 'error']], 500);
        }

        $socialUser = new SocialiteUser(array_merge($payload, ['id' => $payload['sub']]));

        $user = User::socialiteLinkExistingOrCreating('google', $socialUser);

        if ($user->hasNotLinkedTo('google')) {
            $user->linkTo('google', $socialUser);
        }

        $token = auth()->login($user);

        return (new UserResource($user))->additional(['meta' => ['token' => $token]]);
    }
}
