import { Link } from "react-router-dom";
import type { IProduct } from "../../types/product";

interface GiftCardProps {
  product: IProduct;
}

function GiftCard({ product }: GiftCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: product.price.currency,
    maximumFractionDigits: 0,
  }).format(product.price.amount);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex aspect-[4/3] items-center justify-center bg-emerald-50">
        <span className="text-lg font-bold text-emerald-700">
          {product.name}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-slate-900">{product.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description ?? "A thoughtful digital gift."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-bold text-slate-900">{formattedPrice}</span>

          <Link
            to={`/gift-cards/${product.slug}`}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default GiftCard;
