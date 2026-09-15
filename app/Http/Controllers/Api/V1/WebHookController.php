<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\CompletePayment;
use App\Data\PaymentVerificationData;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class WebHookController extends Controller
{
    public function __invoke(Request $request, CompletePayment $completePayment): Response|JsonResponse
    {
        $signature = $request->header('x-paystack-signature');

        $expectedSignature = hash_hmac('sha512', $request->getContent(), config('services.paystack.secret_key'));

        if (!$signature || !hash_equals($expectedSignature, $signature)) {
            return response()->noContent(401);
        }

        $event = $request->json()->all();

        if (($event['event'] ?? null) !== 'charge.success') {
            return response()->noContent();
        }

        $reference = data_get($event, 'data.reference');

        if (!$reference) {
            return response()->noContent();
        }

        $payment = Payment::query()->where('reference', $reference)->first();

        if (!$payment) {
            Log::warning('Paystack payment not found', ['reference' => $reference,]);

            return response()->noContent();
        }

        try {
            $completePayment->handle($payment, PaymentVerificationData::validateAndCreate($payment, $event['data']));
        } catch (\Throwable $exception) {
            Log::error(
                'Failed to complete Paystack payment',
                [
                    'reference' => $reference,
                    'error' => $exception->getMessage(),
                ]
            );

            return response()->json(
                [
                    'message' => 'Unable to process webhook.',
                ],
                500,
            );
        }

        return response()->noContent();
    }
}
