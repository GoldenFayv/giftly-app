<?php

namespace App\Actions;

use App\Data\PaymentVerificationData;
use App\Enum\PaymentStatusEnum;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class CompletePayment
{
    public function handle(Payment $payment, PaymentVerificationData $validated): Payment
    {
        return DB::transaction(function () use($payment, $validated): Payment {

            $payment = Payment::query()->whereKey($payment->id)->lockForUpdate()->firstOrFail();
            if ($payment->status === PaymentStatusEnum::SUCCESS) {
                return $payment;
            }

            $payment->update([
                'status' => PaymentStatusEnum::SUCCESS,
                'gateway_response' => $validated->gateway_response,
                'paid_at' => $validated->paid_at ?? now(),
            ]);

            $payment->order()->update([
                'payment_status' => $payment->fresh()->status,
                'paid_at' => $payment->paid_at,
            ]);

            return $payment->fresh('order');
        });
    }
}
