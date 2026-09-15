<?php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class PaystackService
{
    public function initialize(Payment $payment): array
    {
        $response = Http::withToken(config('services.paystack.secret_key'))
            ->acceptJson()
            ->post(
                config('services.paystack.base_url') . '/transaction/initialize',
                [
                    'email' => $payment->order->customer_email,
                    'amount' => $payment->amount,
                    'currency' => $payment->currency,
                    'reference' => $payment->reference,
                    'metadata' => [
                        'order_reference' => $payment->order->reference,
                        'payment_id' => $payment->id,
                    ],
                ]
            );

        if ($response->failed()) {
            logger()->error("Paystack", $response->json());
            throw new RuntimeException($response->json('data.message') ?? 'Unable to initialize Paystack transaction.');
        }

        $data = $response->json();

        if (!($data['status'] ?? false)) {
            throw new RuntimeException($data['message'] ?? 'Paystack transaction initialization failed.');
        }

        return $data['data'];
    }

    public function verify(string $reference): array
    {
        $response = Http::withToken(config('services.paystack.secret_key'))
            ->acceptJson()
            ->get(config('services.paystack.base_url') . '/transaction/verify/' . urlencode($reference));

        if ($response->failed()) {
            throw new RuntimeException(
                'Unable to verify Paystack transaction.'
            );
        }

        $data = $response->json();

        if (!($data['status'] ?? false)) {
            throw new RuntimeException(
                $data['message'] ?? 'Paystack verification failed.'
            );
        }

        return $data['data'];
    }
}
