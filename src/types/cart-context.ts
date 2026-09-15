import type { ICartItem } from "./cart";
import type { IProduct } from "./product";

export interface CartContextValue {
    items: ICartItem[];
    addItem: (product: IProduct, quantity?: number) => void;
    removeItem: (productId: Id) => void;
    updateQuantity: (productId: Id, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
}