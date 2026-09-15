<?php

namespace App\Enum;

enum OrderStatusEnum: string
{
    case PENDING = 'pending';
    case PROCCESSING = 'processing';
    case COMPLETED = 'completed';
}
