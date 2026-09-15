export interface OrderItem {
    id: Id;
    product_id: Id;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface IOrder {
    id: Id;
    reference: string;

    customer: {
        name: string;
        email: string;
        phone: string | null;
    };

    items: OrderItem[];

    subtotal: {
        amount: number;
        currency: string;
    };

    discount: {
        amount: number;
        currency: string;
    };

    total: {
        amount: number;
        currency: string;
    };

    status: string;
    payment_status: "success|failed|pending";

    created_at: string;
}