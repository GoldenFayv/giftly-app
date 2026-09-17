<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function Pest\Laravel\get;

#[Fillable(['name', 'slug', 'description', 'price', 'currency', 'type', 'is_active'])]
class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, HasUuids;

    protected $attributes = [
        'type' => 'digital',
        'is_active' => true
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected function Price(): Attribute
    {
        return Attribute::make(
            // get: Closure::fromCallable([$this, 'toNaira'])
            get: $this->toNaira(...)
        );
    }

    private function toNaira(float $amount): float
    {
        return $amount / 100;
    }
}
