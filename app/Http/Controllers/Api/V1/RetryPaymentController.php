<?php

namespace App\Http\Controllers\Api\V1;

use App\Enum\PaymentStatusEnum;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Services\PaystackService;

class RetryPaymentController
{
    public function __invoke(string $reference, PaystackService $paystackService)
    {
        $payment = Payment::query()->with('order')->where('reference', $reference)->firstOrFail();

        if ($payment->status === PaymentStatusEnum::SUCCESS) {
            return new PaymentResource($payment);
        }

        $paystackResponse = $paystackService->initialize($payment);

        $payment->update([
            'status' => PaymentStatusEnum::PENDING,
            'gateway_response' => $paystackResponse,
        ]);

        return new PaymentResource(
            $payment->fresh('order')
        );
    }
}
