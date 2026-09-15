<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\OrderResource;
use App\Services\CheckoutService;

class CheckoutController extends Controller
{
    public function __construct(private CheckoutService $checkoutService) {}

    public function __invoke(CheckoutRequest $request): OrderResource
    {
        return new OrderResource($this->checkoutService->createOrder($request->validated()));
    }
}
