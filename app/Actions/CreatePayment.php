<?php

namespace App\Actions;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Str;

class CreatePayment
{
    public function handle(Order $order): Payment
    {
        return Payment::create([
            'order_id' => $order->id,
            'reference' => $this->generatePaymentReference(),
            'amount' => $order->total
        ]);
    }

    private function generatePaymentReference(): string
    {
        return 'PAY-' . strtoupper(Str::random(16));
    }
}
