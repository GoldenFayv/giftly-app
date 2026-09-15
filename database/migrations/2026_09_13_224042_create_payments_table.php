<?php

use App\Enum\PaymentStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete('orders');

            $table->string('reference')->unique();

            $table->string('provider')->default('paystack');

            $table->unsignedBigInteger('amount');
            $table->string('currency', 3)->default('NGN');

            $table->string('status')->default(PaymentStatusEnum::PENDING);

            $table->json('gateway_response')->nullable();
            // $table->string('authorization_url')->nullable();
            // $table->string('access_code')->nullable();

            $table->timestamp('paid_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
