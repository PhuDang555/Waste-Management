<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

    Route::prefix('/data-input')->group(function () {
        Route::get('/logout', [AuthController::class, 'logout']);
        Route::get('/refresh', [AuthController::class, 'refresh']);
        Route::post('/create', [AuthController::class, 'create']);
        Route::put('/edit/{id}', [AuthController::class, 'edit']);
        Route::delete('/delete/{id}', [AuthController::class, 'delete']);
    });
})->middleware('auth:api');
