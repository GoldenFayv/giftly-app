<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\CompletePayment;
use App\Data\PaymentVerificationData;
use App\Enum\PaymentStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Services\PaystackService;

class VerifyPaymentController extends Controller
{
    public function __invoke(string $reference, PaystackService $paystack, CompletePayment $completePayment): PaymentResource
    {
        $payment = Payment::query()->where('reference', $reference)->firstOrFail();

        if ($payment->status === PaymentStatusEnum::SUCCESS) {
            return new PaymentResource($payment);
        }

        $response = $paystack->verify($payment->reference);

        if (($response['status'] ?? null) === 'success') {
            $completePayment->handle($payment, PaymentVerificationData::validateAndCreate($payment, [...$response, "gateway_response" => $response]));

            $payment->refresh();
        }

        return new PaymentResource($payment);
    }
}
