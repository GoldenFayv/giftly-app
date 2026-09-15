<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Amazon Gift Card',
                'description' => 'Give them the freedom to choose from millions of products on Amazon.',
                'price' => 10000,
                'currency' => 'NGN',
            ],
            [
                'name' => 'Netflix Gift Card',
                'description' => 'A thoughtful gift for movie and series lovers.',
                'price' => 15000,
                'currency' => 'NGN',
            ],
            [
                'name' => 'Spotify Gift Card',
                'description' => 'Give the gift of music, podcasts and entertainment.',
                'price' => 10000,
                'currency' => 'NGN',
            ],
            [
                'name' => 'Uber Gift Card',
                'description' => 'A convenient gift for rides, trips and everyday journeys.',
                'price' => 10000,
                'currency' => 'NGN',
            ],
            [
                'name' => 'Corporate Appreciation Card',
                'description' => 'A flexible digital gift designed for employee and client appreciation.',
                'price' => 25000,
                'currency' => 'NGN',
            ],
            [
                'name' => 'Premium Corporate Gift Card',
                'description' => 'A premium gift option for rewarding employees, clients and business partners.',
                'price' => 50000,
                'currency' => 'NGN',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate([
                'slug' => \Illuminate\Support\Str::slug($product['name']),
            ],[
                ...$product,
                'slug' => \Illuminate\Support\Str::slug($product['name']),
                'type' => 'digital',
                'is_active' => true,
            ]);
        }
    }
}
