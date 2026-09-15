<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'min:3'],
            'customer_email' => ['required', 'email'],
            'customer_phone' => ['nullable', 'string'],

            'products' => ['required', 'array', 'min:1'],

            'products.*.id' => ['distinct', Rule::exists('products', 'id')->where('is_active', true)],

            'products.*.quantity' => ['required', 'integer', 'min:1',],
        ];
    }
}
