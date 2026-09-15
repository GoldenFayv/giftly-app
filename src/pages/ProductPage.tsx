import { Link, useNavigate, useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProducts";
import { useCart } from "../hooks/use-cart";
import PageLoader from "../components/ui/PageLoader";

function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { data: product, isLoading, isError } = useProduct(slug ?? "");

  if (isLoading) {
    return <PageLoader text="Loading gift card..." />;
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-bold text-slate-900">
          Gift card not found
        </h1>

        <Link to="/gift-cards" className="mt-4 inline-block text-emerald-600">
          Back to gift cards
        </Link>
      </div>
    );
  }

  const price = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: product.price.currency,
    maximumFractionDigits: 0,
  }).format(product.price.amount);

  function handleAddToCart() {
    if (!product) {
      return;
    }

    addItem(product);
    navigate("/cart");
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-3xl bg-emerald-50">
          <span className="px-8 text-center text-3xl font-bold text-emerald-700">
            {product.name}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <Link
            to="/gift-cards"
            className="mb-8 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to gift cards
          </Link>

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Digital Gift Card
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {product.description ??
              "A thoughtful digital gift for someone special."}
          </p>

          <p className="mt-8 text-3xl font-bold text-slate-900">{price}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-lg bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
