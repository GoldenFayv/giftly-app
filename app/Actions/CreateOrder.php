<?php

namespace App\Actions;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Email;
use Illuminate\Support\Str;

class CreateOrder
{
    public function handle(array $data): Order
    {
        $validated = Validator::make($data, [
            'customer_name' => ['required', 'string', 'min:3'],
            'customer_email' => ['required', 'email', Email::default()],
            'customer_phone' => ['sometimes']
        ])->validate();

        $validated['reference'] = $this->generateOrderReference();

        return Order::create($validated);
    }

    private function generateOrderReference(): string
    {
        return 'GFT-' . strtoupper(Str::random(12));
    }
}
