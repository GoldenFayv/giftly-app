<?php

namespace App\Services;

use App\Actions\BuildOrderItems;
use App\Actions\CreateOrder;
use App\Actions\CreatePayment;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class CheckoutService
{
    public function __construct(
        private BuildOrderItems $buildOrderItems,
        private CreateOrder $createOrder,
        private CreatePayment $createPayment,
        private PaystackService $paystackService
    ) {}

    public function createOrder(array $items): Order
    {
        $orderItems = $this->buildOrderItems->handle($items);

        $order = DB::transaction(function () use ($orderItems, $items) {
            $order = $this->createOrder->handle($items);

            $order->items()->createMany($orderItems);

            $order->recalculate();

            $payment = $this->createPayment->handle($order);

            return $order->load(['items', 'payments']);
        });

        $payment = $order->payments->first();

        if (!$payment) {
            throw new RuntimeException('Order payment could not be created.');
        }

        $paystack = $this->paystackService->initialize($payment);

        $payment->update([
            'gateway_response' => $paystack,
        ]);

        return $order->fresh('items', 'payments');
    }
}
