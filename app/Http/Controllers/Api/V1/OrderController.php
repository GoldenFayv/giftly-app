<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;

class OrderController extends Controller
{
    public function show(string $orderId): OrderResource
    {
        $order = Order::query()
            ->with([
                'items',
                'payments',
            ])
            ->where('id', $orderId)
            ->firstOrFail();

        return new OrderResource($order);
    }
}