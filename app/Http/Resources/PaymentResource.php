<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'reference' => $this->reference,
            'provider' => $this->provider,
            'amount' => (int) $this->amount,
            'currency' => $this->currency,
            'status' => $this->status,
            'gateway_response' => $this->gateway_response,
            'paid_at' => $this->paid_at,
            'authorization_url' => data_get(
                $this->gateway_response,
                'authorization_url'
            ),
            'access_code' => data_get(
                $this->gateway_response,
                'access_code'
            ),
        ];
    }
}
