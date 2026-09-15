<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,

            'customer' => [
                'name' => $this->customer_name,
                'email' => $this->customer_email,
                'phone' => $this->customer_phone,
            ],

            'items' => OrderItemResource::collection($this->whenLoaded('items')),

            'subtotal' => [
                'amount' => $this->subtotal,
                'currency' => $this->currency,
            ],

            'discount' => [
                'amount' => $this->discount,
                'currency' => $this->currency,
            ],

            'total' => [
                'amount' => $this->total,
                'currency' => $this->currency,
            ],

            'status' => $this->status,
            'payment_status' => $this->payment_status,

            'payment' => PaymentResource::collection($this->whenLoaded('payments')),

            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
