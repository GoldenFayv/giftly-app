<?php

namespace App\Data;

use App\Enum\PaymentStatusEnum;
use App\Models\Payment;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

readonly class PaymentVerificationData
{
    public function __construct(
        public PaymentStatusEnum $status,
        public int $amount,
        public string $currency,
        public array $gateway_response,
        public ?Carbon $paid_at,
    ) {}

    public static function validateAndCreate(Payment $payment, array $raw_data): self
    {
        $paymentAmount = $payment->getAttribute('amount');
        $paymentCurrency = $payment->getAttribute('currency');

        $validated = Validator::make($raw_data, [
            'status' => ['required', Rule::enum(PaymentStatusEnum::class)],
            'amount' => ['required', 'numeric', "gte:{$paymentAmount}"],
            'currency' => ['required', Rule::in([$paymentCurrency])],
            'paid_at' => ['nullable', 'date', 'before_or_equal:now'],
            'gateway_response' => ['required', 'array'],
        ])->validate();

        return new self(
            status: PaymentStatusEnum::from($validated['status']),
            amount: $validated['amount'],
            currency: $validated['currency'],
            gateway_response: (array) $validated['gateway_response'],
            paid_at: isset($validated['paid_at']) ? Carbon::parse($validated['paid_at']) : null,
        );
    }
}
