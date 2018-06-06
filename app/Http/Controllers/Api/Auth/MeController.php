<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Request;

class MeController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }
}
