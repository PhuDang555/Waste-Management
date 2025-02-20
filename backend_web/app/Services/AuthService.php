<?php

namespace App\Services;

use App\Interfaces\Auth\AuthRepositoryInterface;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected $authRepository;

    public  function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(array $credentials)
    {
        $token = $this->authRepository->login($credentials);

        if(!$token){
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập không chính xác.']
            ]);
        }

        return ['token' => $token];
    }

    public function logout()
    {
        $this->authRepository->logout();

        return ['message' => 'Đăng xuất thành công'];
    }

    public function refresh()
    {
        return ['token' => $this->authRepository->refresh()];
    }

    public function me()
    {
        return $this->authRepository->me();
    }
}
