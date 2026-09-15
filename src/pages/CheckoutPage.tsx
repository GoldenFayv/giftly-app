import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../services/api";
import { useCart } from "../hooks/use-cart";
import Paystack from "@paystack/inline-js";
import type { IPayment } from "../types/payment";

interface CheckoutResponse {
  data: {
    reference: string;
    customer: {
      name: string;
      email: string;
      phone: string | null;
    };
    items: {
      id: Id;
      product_id: Id;
      product_name: string;
      quantity: number;
      unit_price: number;
      subtotal: number;
    }[];
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
    payment_status: string;
    payment: IPayment[];
  };
}

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formattedSubtotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(subtotal);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await http().post<CheckoutResponse>("/checkout", {
        payload: {
          customer_name: name,
          customer_email: email,
          customer_phone: phone || null,
          products: items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        },
      });

      const payment = response.data.payment[0];

      if (!payment?.access_code) {
        throw new Error("Payment access code was not returned.");
      }

      const paystack = new Paystack();

      paystack.resumeTransaction(payment.access_code, {
        onSuccess: (transaction) => {
          console.log("Payment successful:", transaction);

          navigate(`/payment/success?reference=${transaction.reference}`);
        },

        onCancel: () => {
          console.log("Payment cancelled.");

          navigate(`/payment/failed?reference=${payment.reference}`);
        },

        onError: (error) => {
          console.error("Paystack error:", error);

          setError("Something went wrong while processing your payment.");
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create your order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-4 text-slate-600">
          Add a gift card before proceeding to checkout.
        </p>

        <Link
          to="/gift-cards"
          className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Browse Gift Cards
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Checkout
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Complete your order
        </h1>

        <p className="mt-4 text-slate-600">
          Enter your details and continue securely to Paystack.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            Customer information
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                minLength={3}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700"
              >
                Phone number
              </label>

              <input
                id="phone"
                type="tel"
                autoComplete="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="08012345678"
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating order..." : "Continue to payment"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Order summary
          </h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-medium text-slate-900">
                  ₦
                  {(item.product.price.amount * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>

              <span className="font-semibold text-slate-900">
                {formattedSubtotal}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="font-semibold text-slate-900">Total</span>

              <span className="text-xl font-bold text-slate-900">
                {formattedSubtotal}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
