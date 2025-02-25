<?php

namespace App\Traits;

trait ApiResponse
{
    protected function successResponse($data, $message = 'Thành công', $status = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $status);
    }

    protected function errorResponse($message = 'Lỗi xảy ra', $status = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], $status);
    }

    protected function errorValidate($message = 'Lỗi xảy ra', $validated = "Sai định dạng", $status = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $validated,
        ], $status);
    }
}

