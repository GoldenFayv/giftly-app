<?php

use App\Http\Controllers\Api\V1\CheckoutController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\RetryPaymentController;
use App\Http\Controllers\Api\V1\VerifyPaymentController;
use App\Http\Controllers\Api\V1\WebHookController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('products')
        ->controller(ProductController::class)
        ->group(function () {
            Route::get('', 'index');
            Route::get('{slug}', 'show');
        });

    Route::prefix('payments/{reference}/')->group(function () {
        Route::get('verify', VerifyPaymentController::class);
        Route::post('retry', RetryPaymentController::class);
    });
    Route::post('checkout', CheckoutController::class);
    Route::post('webhook', WebHookController::class);
    Route::get('orders/{orderId}', [OrderController::class, 'show']);
});
