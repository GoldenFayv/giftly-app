import { Link } from "react-router-dom";
import GiftCard from "./GiftCard";
import { useProducts } from "../../hooks/useProducts";

function FeaturedGiftCards() {
  const { data: products, isLoading, isError } = useProducts();

  const featuredProducts = products?.slice(0, 4) ?? [];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Popular picks
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Gift cards people love
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Choose from popular gift cards for birthdays, celebrations,
              employee rewards, and everyday surprises.
            </p>
          </div>

          <Link
            to="/gift-cards"
            className="w-fit text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View all gift cards →
          </Link>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-48 animate-pulse bg-slate-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              We couldn't load the featured gift cards.
            </p>

            <Link
              to="/gift-cards"
              className="mt-3 inline-block text-sm font-semibold text-red-700 underline"
            >
              Browse gift cards
            </Link>
          </div>
        )}

        {!isLoading && !isError && featuredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <GiftCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && !isError && featuredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">
              Gift cards are coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedGiftCards;