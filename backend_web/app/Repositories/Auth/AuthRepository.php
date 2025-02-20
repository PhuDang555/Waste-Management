<?php

namespace App\Repositories\Auth;

use App\Interfaces\Auth\AuthRepositoryInterface;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthRepositoryInterface
{
    public function login(array $credentials)
    {
        return JWTAuth::attempt($credentials);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function refresh()
    {
        return JWTAuth::refresh();
    }

    public function me()
    {
        return Auth::user();
    }
}
