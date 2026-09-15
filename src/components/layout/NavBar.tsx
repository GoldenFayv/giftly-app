import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks/use-cart";

function Navbar() {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-emerald-600"
        : "text-slate-600 hover:text-emerald-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
            G
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Giftly
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/gift-cards"
            className={navLinkClass}
          >
            Gift Cards
          </NavLink>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            How It Works
          </a>
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-600"
            aria-label="Shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835L5.61 6.75m0 0h14.14c.894 0 1.563.833 1.36 1.704l-1.35 6.075a1.5 1.5 0 0 1-1.464 1.175H8.08a1.5 1.5 0 0 1-1.464-1.175L5.61 6.75Zm2.25 12.75a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm10.5 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z"
              />
            </svg>

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <Link
            to="/gift-cards"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Shop Gift Cards
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-slate-600"
            aria-label="Shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835L5.61 6.75m0 0h14.14c.894 0 1.563.833 1.36 1.704l-1.35 6.075a1.5 1.5 0 0 1-1.464 1.175H8.08a1.5 1.5 0 0 1-1.464-1.175L5.61 6.75Zm2.25 12.75a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm10.5 0a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z"
              />
            </svg>

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/gift-cards"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Gift Cards
            </NavLink>

            <a
              href="/#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-slate-600"
            >
              How It Works
            </a>

            <Link
              to="/gift-cards"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Shop Gift Cards
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;