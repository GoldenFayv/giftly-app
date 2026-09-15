<?php

namespace App\Models;

use App\Enum\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $id
 * @property string $order_id
 * @property string $reference
 * @property string $provider
 * @property int $amount
 * @property string $currency
 * @property PaymentStatusEnum $status
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable(['reference', 'amount', 'status', 'order_id', 'provider', 'currency', 'gateway_response', 'paid_at', /*'authorization_url', 'access_code'*/])]
class Payment extends Model
{
    use HasUuids;

    protected $casts = [
        'status' => PaymentStatusEnum::class,
        'gateway_response' => 'json'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
