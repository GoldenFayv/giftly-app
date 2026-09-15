<?php

namespace App\Actions;

use App\Models\Product;

class BuildOrderItems
{
    public function handle(array $validated): array
    {
        $productIds = collect($validated['products'])->pluck('id')->unique();

        $products = Product::query()->whereIn('id', $productIds)->where('is_active', true)->get()->keyBy('id');

        return collect($validated['products'])->map(function (array $item) use ($products) {
            $product = $products->get($item['id']);
            $quantity = $item['quantity'];

            return [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $quantity,
                'unit_price' => $product->price,
                'subtotal' => $product->price * $quantity,
            ];
        })
            ->values()
            ->all();
    }
}
