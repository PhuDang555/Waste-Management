<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WasteCategoryService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

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

}
