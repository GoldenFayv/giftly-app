import { Link } from "react-router-dom";
import { useCart } from "../hooks/use-cart";

function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart();

  const formattedSubtotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(subtotal);

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-4 text-slate-600">
          Find something thoughtful to give someone.
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
      <h1 className="text-4xl font-bold text-slate-900">
        Your Cart
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold text-slate-900">
                  {item.product.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  ₦{item.product.price.amount.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity - 1,
                    )
                  }
                  className="h-9 w-9 rounded-lg border"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity + 1,
                    )
                  }
                  className="h-9 w-9 rounded-lg border"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() =>
                    removeItem(item.product.id)
                  }
                  className="ml-4 text-sm text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Order summary
          </h2>

          <div className="mt-6 flex justify-between">
            <span className="text-slate-600">
              Subtotal
            </span>

            <span className="font-semibold text-slate-900">
              {formattedSubtotal}
            </span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="font-semibold text-slate-900">
              Total
            </span>

            <span className="text-xl font-bold text-slate-900">
              {formattedSubtotal}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-lg bg-emerald-600 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-700"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;