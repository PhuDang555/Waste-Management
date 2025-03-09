<?php

namespace App\Providers;

use App\Interfaces\Auth\AuthRepositoryInterface;
use App\Interfaces\DataInputRepositoryInterface;
use App\Interfaces\FeaturePermissionRepositoryInterface;
use App\Repositories\Auth\AuthRepository;
use App\Repositories\DataInputRepository;
use App\Repositories\FeaturePermissionRepository;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(DataInputRepositoryInterface::class, DataInputRepository::class);
        $this->app->bind(FeaturePermissionRepositoryInterface::class, FeaturePermissionRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::middleware('api')
        ->prefix('api')
        ->group(base_path('routes/api.php'));
    }
}
