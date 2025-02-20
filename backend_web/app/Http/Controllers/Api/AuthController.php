<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
    use ApiResponse;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username','password');

        try {
            $data = $this->authService->login($credentials);
            return $this->successResponse($data, 'Đăng nhập thành công');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function logout()
    {
        $this->authService->logout();
        return $this->successResponse([], 'Đăng xuất thành công');
    }

    public function refresh()
    {
        $data = $this->authService->refresh();
        return $this->successResponse($data, 'Token đã được làm mới');
    }

    public function me()
    {
        $data = $this->authService->me();
        return $this->successResponse($data, 'Thông tin người dùng');
    }
}
