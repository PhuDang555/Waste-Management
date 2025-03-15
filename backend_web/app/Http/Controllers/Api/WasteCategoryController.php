<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WasteCategoryService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;

class WasteCategoryController extends Controller
{
    use ApiResponse;

    protected $wasteCategoryService;

    public function __construct(WasteCategoryService $wasteCategoryService)
    {
        $this->wasteCategoryService = $wasteCategoryService;
    }

    public function listWasteGroup(Request $request)
    {

        $data = $this->wasteCategoryService->listWasteGroup();

        try {
            return $this->successResponse($data, 'Danh sách đơn vị quản lý',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function createWasteGroup(Request $request)
    {
        try {

            $data = $this->wasteCategoryService->createWasteGroup($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function createWasteType(Request $request)
    {
        try {

            $data = $this->wasteCategoryService->createWasteType($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function createWasteDetail(Request $request)
    {
        try {

            $data = $this->wasteCategoryService->createWasteDetail($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function deleteWasteGroup(int $id)
    {
        try {

            $data = $this->wasteCategoryService->deleteWasteGroup($id);

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function deleteWasteType(int $id)
    {
        try {

            $data = $this->wasteCategoryService->deleteWasteType($id);

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function deleteWasteDetail(int $id)
    {
        try {

            $data = $this->wasteCategoryService->deleteWasteDetail($id);

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

}
