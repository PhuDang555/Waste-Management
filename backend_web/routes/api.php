<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CreateUserController;
use App\Http\Controllers\Api\DataInputController;
use App\Http\Controllers\Api\FeaturePermissionController;
use App\Http\Controllers\Api\WasteCategoryController;

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
        Route::get('waste-collection-management', [DataInputController::class, 'listWasteCollectionManagement']);
        Route::get('waste-type', [DataInputController::class, 'listWasteTypes']);
        Route::get('waste-owner', [DataInputController::class, 'listWasteOwner']);
        Route::get('collecting-unit', [DataInputController::class, 'listCollectingUnit']);
        Route::get('processing-unit', [DataInputController::class, 'listProcessingUnit']);
        Route::get('waste-collection-management/{id}', [DataInputController::class, 'getWasteCollectionManagementById']);
        Route::post('create', [DataInputController::class, 'create']);
        Route::patch('edit/{id}', [DataInputController::class, 'edit']);
        Route::delete('delete/{id}', [DataInputController::class, 'delete']);
    });

    Route::prefix('management')->group(function () {
        // permission feature
        Route::get('feature-permission', [FeaturePermissionController::class, 'listFeaturePermission']);
        Route::post('update-list-feature', [FeaturePermissionController::class, 'updateListFeaturePermission']);

        // create user
        Route::get('list-manage-unit', [CreateUserController::class, 'listManageUnit']);
        Route::get('list-user', [CreateUserController::class, 'listUser']);
        Route::get('list-province', [CreateUserController::class, 'listProvince']);
        Route::get('list-district', [CreateUserController::class, 'listDistrict']);
        Route::get('list-ward', [CreateUserController::class, 'listWard']);
        Route::get('get-user', [CreateUserController::class, 'getUser']);
        Route::post('create-user', [CreateUserController::class, 'create']);
        Route::post('edit-user', [CreateUserController::class, 'edit']);
        Route::post('delete-user', [CreateUserController::class, 'delete']);
        Route::post('block-user', [CreateUserController::class, 'block']);
    });

    Route::prefix('category')->group(function () {

        Route::get('waste-group', [WasteCategoryController::class, 'listWasteGroup']);
        Route::get('waste-type', [WasteCategoryController::class, 'listWasteType']);
        Route::get('waste-detail', [WasteCategoryController::class, 'listWasteDetail']);

        Route::post('create-waste-group', [WasteCategoryController::class, 'createWasteGroup']);
        Route::post('create-waste-type', [WasteCategoryController::class, 'createWasteType']);
        Route::post('create-waste-detail', [WasteCategoryController::class, 'createWasteDetail']);

        Route::patch('edit-waste-group/{id}', [WasteCategoryController::class, 'editWasteGroup']);
        Route::patch('edit-waste-type/{id}', [WasteCategoryController::class, 'editWasteType']);
        Route::patch('edit-waste-detail/{id}', [WasteCategoryController::class, 'editWasteDetail']);

        Route::delete('delete-waste-group/{id}', [WasteCategoryController::class, 'deleteWasteGroup']);
        Route::delete('delete-waste-type/{id}', [WasteCategoryController::class, 'deleteWasteType']);
        Route::delete('delete-waste-detail/{id}', [WasteCategoryController::class, 'deleteWasteDetail']);
    });
})->middleware('auth:api');
