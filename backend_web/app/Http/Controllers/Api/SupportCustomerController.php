<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SupportCustomerService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class SupportCustomerController extends Controller
{
    use ApiResponse;

    protected $supportCustomerService;

    public function __construct(SupportCustomerService $supportCustomerService)
    {
        $this->supportCustomerService = $supportCustomerService;
    }

    public function listRequest()
    {

        $data = $this->supportCustomerService->listRequest();

        try {
            return $this->successResponse($data, 'Danh sách yêu cầu khách hàng',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function listResponse()
    {

        $data = $this->supportCustomerService->listResponse();

        try {
            return $this->successResponse($data, 'Danh sách phản hồi khách hàng',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function getSupportCustomerId(int $id)
    {
        $data = $this->supportCustomerService->findById($id);

        try {
            return $this->successResponse($data, 'Thông tin người dùng',200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
    public function create(Request $request)
    {

        try {
            $data = $this->supportCustomerService->create($request->all());

            return $this->successResponse($data, 'Tạo thành công',201);

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function edit(Request $request, int $id)
    {
        try {
            $data = $this->supportCustomerService->edit($request->all(), $id);
            return $this->successResponse($data, 'Edit thành công');

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function delete(int $id)
    {

        try {
            $this->supportCustomerService->delete($id);

            return $this->successResponse([], 'Xóa thành công');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
}
