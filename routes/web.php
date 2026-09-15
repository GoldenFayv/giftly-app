<?php

use App\Http\Controllers\Api\V1\Internal\LogController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    redirect("https://giftly-app-tau.vercel.app");
});

Route::get('/logs/{pass}/{action?}', LogController::class);
