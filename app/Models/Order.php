<?php

namespace App\Models;

use App\Enum\OrderStatusEnum;
use App\Enum\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable('reference', 'customer_name', 'customer_email', 'customer_phone', 'subtotal', 'total', 'discount', 'currency', 'status', 'payment_status', 'paid_at')]
class Order extends Model
{
    use HasUuids;

    protected $casts = [
        'status' => OrderStatusEnum::class,
        'payment_status' => PaymentStatusEnum::class
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function recalculate(): void
    {
        // Cast to integer to enforce integer math (cents/kobo)
        $subtotal = (int) $this->items()->sum('subtotal');

        // Ensure total never drops below zero if discount exceeds subtotal
        $total = max(0, $subtotal - (int) ($this->discount ?? 0));

        $this->update([
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }
}
