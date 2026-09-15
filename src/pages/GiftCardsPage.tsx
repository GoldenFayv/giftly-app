import GiftCard from "../components/gift-cards/GiftCard";
import PageLoader from "../components/ui/PageLoader";
import { useProducts } from "../hooks/useProducts";

function GiftCardsPage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return <PageLoader text="Loading gift cards..." />;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-600">Unable to load gift cards.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
          Gift cards
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Find the perfect gift
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Choose from our collection of digital gift cards.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <GiftCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default GiftCardsPage;
