<?php

namespace App\Http\Controllers\Api;

use App\Enums\BlockType;
use App\Http\Controllers\Controller;
use App\Services\CreateUserService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CreateUserController extends Controller
{
    use ApiResponse;

    protected $createUserService;

    public function __construct(CreateUserService $createUserService)
    {
        $this->createUserService = $createUserService;
    }

    public function listManageUnit(Request $request)
    {

        $data = $this->createUserService->listManageUnit();

        try {
            return $this->successResponse($data, 'Danh sách đơn vị quản lý',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function listUser(Request $request)
    {

        $data = $this->createUserService->listUser();

        try {
            return $this->successResponse($data, 'Danh sách khách hàng',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function listProvince(Request $request)
    {

        $data = $this->createUserService->listProvince();

        try {
            return $this->successResponse($data, 'Danh sách tỉnh/thành phố',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
    public function listDistrict(Request $request)
    {

        $data = $this->createUserService->listDistrict($request->id);

        try {
            return $this->successResponse($data, 'Danh sách khách quận/huyện',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
    public function listWard(Request $request)
    {

        $data = $this->createUserService->listWard($request->id);

        try {
            return $this->successResponse($data, 'Danh sách phường/xã',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
    public function getUser(Request $request)
    {
        Log::info('data:'.$request->id);
        $data = $this->createUserService->findById($request->id);

        try {
            return $this->successResponse($data, 'Thông tin người dùng',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
    public function create(Request $request)
    {

        try {
            $validated = Validator::make($request->all(), [
                'image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                // 'license_expiration'=> 'required|date_format:Y-m-d',
                'phone_number'      => ['required','numeric','regex:/^(0|\+84)[0-9]{9,10}$/','unique:users,phone_number'],
                'email'             => ['required','email','unique:users,email'],
                // 'password'          => ['required','min:8','confirmed','regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'],
                'username'          => ['required','string','max:255','unique:users,username'],
            ]);

            if ($validated->fails()) {
                return $this->errorResponse($validated->errors(), 400);
            }

            $data = $this->createUserService->create($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function edit(Request $request)
    {
        try {

            $validated = Validator::make($request->all(), [
                'image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                // 'phone_number'      => ['required','numeric','regex:/^(0|\+84)[0-9]{9,10}$/','unique:users,phone_number'],
                // 'email'             => ['required','email','unique:users,email'],
            ]);

            if ($validated->fails()) {
                return $this->errorResponse($validated->errors(), 400);
            }

            $data = $this->createUserService->edit($request->all());
            return $this->successResponse($data, 'Edit thành công');

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function delete(Request $request)
    {

        try {
            $this->createUserService->delete($request->all());

            return $this->successResponse([], 'Xóa thành công');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function block(Request $request)
    {

        try {

            $this->createUserService->block($request->all());

            return $this->successResponse([], 'Block thành công',200 );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
}
