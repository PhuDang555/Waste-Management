<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DataInputController;

Route::prefix('/v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/me', [AuthController::class, 'edit']);
    });
});

Route::prefix('/v1')->group(function () {

    Route::prefix('data-input')->group(function () {
        Route::get('waste-collection-management/{id}', [DataInputController::class, 'listWasteCollectionManagement']);
        Route::get('collecting-unit', [DataInputController::class, 'listCollectingUnit']);
        Route::get('processing-unit', [DataInputController::class, 'listProcessingUnit']);
        Route::get('waste-collection-management/{id}', [DataInputController::class, 'getWasteCollectionManagementById']);
        Route::post('create', [DataInputController::class, 'create']);
        Route::patch('edit/{id}', [DataInputController::class, 'edit']);
        Route::delete('delete/{id}', [DataInputController::class, 'delete']);
    });
})->middleware('auth:api');
