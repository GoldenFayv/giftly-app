<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company() . ' Gift Card';

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->optional(0.4)->sentence(12),
            'price' => fake()->randomElement([5000, 10000, 15000, 25000, 50000, 100000,]),
            'currency' => 'NGN',
            'type' => 'digital',
            'is_active' => true,
        ];
    }
}
