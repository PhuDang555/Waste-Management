<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DataInputService;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class DataInputController extends Controller
{
    use ApiResponse;

    protected $dataInputService;

    public function __construct(DataInputService $dataInputService)
    {
        $this->dataInputService = $dataInputService;
    }

    public function listWasteCollectionManagement(int $id)
    {
        $data = $this->dataInputService->listWasteCollectionManagement($id);

        try {
            return $this->successResponse($data, 'Danh sách thu gom rác');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function listCollectingUnit()
    {
        $data = $this->dataInputService->listCollectingUnit();

        try {
            return $this->successResponse($data, 'Danh sách đơn vị thu gom');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function listProcessingUnit()
    {
        $data = $this->dataInputService->listProcessingUnit();

        try {
            return $this->successResponse($data, 'Danh sách đơn vị xử lý');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function getWasteCollectionManagementById(int $id)
    {
        $data = $this->dataInputService->getWasteCollectionManagementById($id);

        try {
            return $this->successResponse($data, 'Thông tin thu gom rác');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function create(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'license_plate'  => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'processing_time'=> 'required|date_format:Y-m-d H:i:s',
                'volume'         => 'required|numeric|min:0',
                'note'           => 'nullable|string|max:500',
            ]);

            if ($validated->fails()) {
                return $this->errorResponse('Dữ liệu không hợp lệ',$validated->errors(), 400);
            }

            $data = $this->dataInputService->create($request->all());
            return $this->successResponse($data, 'Tạo thành công');

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }

    public function edit(Request $request, int $id)
    {


        try {

            $validated = Validator::make($request->all(), [
                'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'license_plate'  => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'processing_time'=> 'required|date_format:Y-m-d H:i:s',
                'volume'         => 'required|numeric|min:0',
                'note'           => 'nullable|string|max:500',
            ]);

            if ($validated->fails()) {
                return $this->errorResponse('Dữ liệu không hợp lệ',$validated->errors(), 400);
            }

            $data = $this->dataInputService->edit($request->all(), $id);
            return $this->successResponse($data, 'Edit thành công');

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }

    }

    public function delete(int $id)
    {
        $data = $this->dataInputService->delete($id);

        try {
            return $this->successResponse($data, 'Xóa thành công');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 401);
        }
    }
}
