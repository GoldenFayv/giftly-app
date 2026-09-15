import { createContext, useContext } from "react";
import type { CartContextValue } from "../types/cart-context";

export const CartContext = createContext<CartContextValue | undefined>(undefined);


export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}