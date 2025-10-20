<?php

use App\Http\Controllers\api\HistoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\UserManagementController;
use App\Http\Controllers\api\EmergencyRequestController;
use App\Http\Controllers\api\EmergencyResponseController;
use App\Http\Controllers\api\NotificationController;
use App\Http\Controllers\api\AnalyticsController;
use App\Http\Controllers\api\SystemLogsControllers;
use App\Http\Controllers\api\ExportReportController;
use App\Http\Controllers\api\AiAnalysisController;

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware(['auth:sanctum'])->prefix('user')->group(function () {

    Route::middleware('admin.only')->prefix('admin.only')->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::post('register/staff', 'registerEmployees');
        });

        Route::controller(UserManagementController::class)->group(function () {
            Route::get('list', 'index');
            Route::post('approve/{id}', 'approveUser');
            Route::post('reject/{id}', 'rejectUser');
        });
    });

    Route::controller(UserManagementController::class)->group(function () {
        Route::get('info', 'getUserInformation');
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('change/password', 'changePassword');
    });



});

Route::controller(EmergencyRequestController::class)->prefix('emergency')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('submit', 'submitRequest');
        Route::get('retrieve', 'index');

        Route::middleware('admin.only')->prefix('admin.only')->group(function () {
            Route::post('verify/{id}', 'verifyEmergency');
            Route::post('reject/{id}', 'rejectEmergency');
        });
    });
});

Route::controller(EmergencyResponseController::class)->prefix('emergency/response')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('respond', 'createResponse');
        Route::get('get/specific/{id}', 'trackSpecificResponse');

        Route::middleware('admin.only')->prefix('admin.only')->group(function () {
            Route::get('ongoing', 'index');
        });
    });

});


Route::controller(NotificationController::class)->prefix('notification')->group(function () {

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('get', 'index');
    });
});


Route::controller(AnalyticsController::class)->prefix('analytics')->group(function () {
    Route::get('/summary', 'summary');
    Route::get('/by-type', 'byType');
    Route::get('monthly', 'monthly');
    Route::get('/top-user', 'topUsers');

});

Route::controller(SystemLogsControllers::class)->prefix('logs')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::middleware('admin.only')->prefix('admin.only')->group(function () {
            Route::get('retrives.logs', 'index');
            Route::post('delete.log{id}', 'deleteLogs');
        });
    });



});

Route::controller(HistoryController::class)->prefix('history')->group(function () {
    Route::middleware(['auth:sanctum', 'admin.only'])->group(function () {
        Route::get('get', 'index');
    });
});

Route::controller(ExportReportController::class)->prefix('export-report')->group(function () {
    Route::middleware(['auth:sanctum', 'admin.only'])->group(function () {
        Route::get('retrieve', 'exportReport');
    });
});

Route::controller(AiAnalysisController::class)->prefix('ai')->group(function () {
    Route::middleware(['auth:sanctum', 'admin.only'])->group(function () {
        Route::post('analyze', 'analyze');
    });
});