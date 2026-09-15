import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { verifyPayment } from "../services/payment";
import { getOrder } from "../services/order";
import type { IOrder } from "../types/order";
import { useCart } from "../hooks/use-cart";
import PageLoader from "../components/ui/PageLoader";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const hasVerified = useRef(false);
  const { clearCart } = useCart();

  const [status, setStatus] = useState<
    "verifying" | "loading-order" | "success" | "failed"
  >("verifying");

  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (!reference || hasVerified.current) {
      return;
    }

    hasVerified.current = true;

    const paymentReference = reference;

    async function verify() {
      try {
        const paymentResponse = await verifyPayment(paymentReference);

        if (paymentResponse.status !== "success") {
          setStatus("failed");
          return;
        }

        setStatus("loading-order");

        const orderResponse = await getOrder(paymentResponse.order_id);

        setOrder(orderResponse);

        clearCart();

        setStatus("success");
      } catch (error) {
        console.error("Payment verification failed:", error);

        setStatus("failed");
      }
    }

    verify();
  }, [reference, clearCart]);

  if (status === "verifying") {
    return <PageLoader text="Confirming your payment..." />;
  }

  if (status === "loading-order") {
    return <PageLoader text="Preparing your receipt..." />;
  }

  if (status === "failed" || !order) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          We couldn't confirm your payment
        </h1>

        <p className="mt-4 text-slate-600">
          Your payment may still be processing. Please check your transaction
          status before trying again.
        </p>

        <Link
          to="/gift-cards"
          className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Back to Gift Cards
        </Link>
      </section>
    );
  }

  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: order.total.currency,
    maximumFractionDigits: 0,
  }).format(order.total.amount);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
          ✓
        </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Payment successful!
        </h1>

        <p className="mt-3 text-slate-600">
          Thank you, {order.customer.name}. Your order has been confirmed.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Order reference</p>

            <p className="mt-1 font-semibold text-slate-900">
              {order.reference}
            </p>
          </div>

          <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Paid
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">Order items</h2>

          <div className="mt-4 divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-6 py-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.product_name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-slate-900">
                  ₦{item.subtotal.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>

            <span className="font-medium text-slate-900">
              ₦{order.subtotal.amount.toLocaleString()}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-slate-600">Discount</span>

            <span className="font-medium text-slate-900">
              ₦{order.discount.amount.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
            <span className="text-lg font-semibold text-slate-900">
              Total paid
            </span>

            <span className="text-xl font-bold text-slate-900">
              {formattedTotal}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-6">
        <h2 className="font-semibold text-slate-900">Receipt details</h2>

        <p className="mt-2 text-sm text-slate-600">
          A confirmation has been recorded for{" "}
          <span className="font-medium text-slate-900">
            {order.customer.email}
          </span>
          .
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/gift-cards"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}

export default PaymentSuccessPage;
