<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DataInputService;
use App\Services\FeaturePermissionService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FeaturePermissionController extends Controller
{
    use ApiResponse;

    protected $featurePermissionService;

    public function __construct(FeaturePermissionService $featurePermissionService)
    {
        $this->featurePermissionService = $featurePermissionService;
    }

    public function listFeaturePermission(Request $request)
    {

        $data = $this->featurePermissionService->listFeaturePermission($request->id);

        try {
            return $this->successResponse($data, 'Danh sách thu gom rác',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function updateListFeaturePermission(Request $request)
    {
        try {

            $this->featurePermissionService->updateListFeaturePermission($request->all());

            return $this->successResponse([], 'Update list thành công',200);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function create(Request $request)
    {
        try {

            $data = $this->featurePermissionService->create($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function edit(Request $request, int $id)
    {
        try {

            $data = $this->featurePermissionService->edit($request->all(), $id);
            return $this->successResponse($data, 'Edit thành công');

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function delete(int $id)
    {
        $data = $this->featurePermissionService->delete($id);

        try {
            return $this->successResponse($data, 'Xóa thành công');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
}
