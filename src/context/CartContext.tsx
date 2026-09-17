import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { IProduct as IProduct } from "../types/product";
import type { ICartItem } from "../types/cart";
import { CartContext } from "../hooks/use-cart";

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ICartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cart-items");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addItem = useCallback((product: IProduct, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      const updated = [...currentItems, { product, quantity }];

      localStorage.setItem("cart-items", JSON.stringify(updated));

      return updated;
    });
  }, []);

  const removeItem = useCallback((productId: Id) => {
    setItems((currentItems) => {
      const updated = currentItems.filter(
        (item) => item.product.id !== productId,
      );

      localStorage.setItem("cart-items", JSON.stringify(updated));

      return updated;
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: Id, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((currentItems) => {
        const updated = currentItems.map((item) =>item.product.id === productId ? { ...item, quantity } : item);

        localStorage.setItem("cart-items", JSON.stringify(updated));

        return updated;
      });
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    localStorage.removeItem('cart-items');
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price.amount * item.quantity,
        0,
      ),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
