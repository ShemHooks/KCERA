<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\UserManagementController;

Route::controller(AuthController::class)->prefix('auth')->group(function(){
        Route::post('register', 'register');
        Route::post('login', 'login');
});

Route::middleware(['auth:sanctum'])->prefix('user')->group(function(){
    
    Route::middleware('admin.only')->prefix('admin.only')->group(function(){
        
        Route::controller(AuthController::class)->group(function(){
            Route::post('register/staff', 'registerEmployees');
        });
        
        Route::controller(UserManagementController::class)->group( function(){
            Route::get('list', 'index');
            Route::post('approve/{id}', 'approveUser');
        });
    }); 

    Route::controller(AuthController::class)->group(function(){
        Route::post('logout', 'logout');
        Route::post('change/password', 'changePassword');
    });
});
