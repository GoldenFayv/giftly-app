import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { retryPayment } from "../services/payment";
import Paystack from "@paystack/inline-js";

function PaymentFailedPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [isRetrying, setIsRetrying] = useState(false);
  const [, setError] = useState("");

  async function handleRetry() {
    if (!reference) {
      return;
    }

    setIsRetrying(true);
    setError("");

    try {
      const payment = await retryPayment(reference);

      if (!payment.access_code) {
        throw new Error("Payment access code was not returned.");
      }

      const paystack = new Paystack();

      paystack.resumeTransaction(payment.access_code, {
        onSuccess: (transaction) => {
          window.location.href = `/payment/success?reference=${transaction.reference}`;
        },

        onCancel: () => {
          setIsRetrying(false);
        },

        onError: (error) => {
          console.error("Paystack retry error:", error);

          setError("Unable to process the payment.");

          setIsRetrying(false);
        },
      });
    } catch (error) {
      console.error("Payment retry failed:", error);

      setError(
        error instanceof Error ? error.message : "Unable to retry payment.",
      );

      setIsRetrying(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
        ×
      </div>

      <h1 className="mt-6 text-4xl font-bold text-slate-900">
        Payment cancelled
      </h1>

      <p className="mt-4 text-slate-600">
        Your order hasn't been charged. You can return to checkout and try
        again.
      </p>

      {reference && (
        <p className="mt-4 text-sm text-slate-500">
          Payment reference:{" "}
          <span className="font-medium text-slate-700">{reference}</span>
        </p>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRetrying ? "Opening payment..." : "Try payment again"}
        </button>

        <Link
          to="/gift-cards"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Browse Gift Cards
        </Link>
      </div>
    </section>
  );
}

export default PaymentFailedPage;
