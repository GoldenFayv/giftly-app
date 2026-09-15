import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GiftCard from "../pages/GiftCardsPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentFailedPage from "../pages/PaymentFailedPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gift-cards" element={<GiftCard />} />
      <Route path="/gift-cards/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment/success" element={<PaymentSuccessPage />} />
      <Route path="/payment/failed" element={<PaymentFailedPage />} />
    </Routes>
  );
}
