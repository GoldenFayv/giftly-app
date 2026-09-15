import { useCallback, useMemo, useState, type ReactNode } from "react";

import type { IProduct as IProduct } from "../types/product";
import type { ICartItem as ICartItem } from "../types/cart";
import { CartContext } from "../hooks/use-cart";

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ICartItem[]>([]);

  const addItem = useCallback((product: IProduct, quantity = 1) => {
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

      return [
        ...currentItems,
        {
          product,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: Id) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: Id, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
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
