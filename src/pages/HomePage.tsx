import { Link } from "react-router-dom";
import FeaturedGiftCards from "../components/gift-cards/FeaturedGiftCards";
import GiftingAudience from "../components/home/GiftingAudience";

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="mb-5 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              Corporate & personal gifting
            </span>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Give them a gift they'll actually love.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Send digital gift cards for birthdays, celebrations, employee
              rewards, customer appreciation, and every moment worth
              celebrating.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/gift-cards"
                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Browse Gift Cards
              </Link>

              <a
                href="#how-it-works"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-3xl bg-emerald-600 p-8 shadow-xl">
              <div className="rounded-2xl bg-white p-8">
                <p className="text-sm font-medium text-slate-500">GIFTLY</p>

                <p className="mt-12 text-3xl font-bold text-slate-900">
                  ₦50,000
                </p>

                <p className="mt-2 text-slate-500">
                  Premium Corporate Gift Card
                </p>

                <div className="mt-12 flex justify-between text-sm text-slate-400">
                  <span>Giftly</span>
                  <span>Digital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedGiftCards />

      <GiftingAudience />

      {/* Benefits */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-slate-900">Instant delivery</h3>
            <p className="mt-2 text-sm text-slate-600">
              Digital gift cards delivered without the wait.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Built for businesses
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Reward employees and appreciate customers with ease.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Secure payments</h3>
            <p className="mt-2 text-sm text-slate-600">
              Fast and secure checkout powered by Paystack.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Give in three simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-4xl font-bold text-emerald-600">01</span>

              <h3 className="mt-4 font-semibold text-slate-900">
                Choose a gift
              </h3>

              <p className="mt-2 text-slate-600">
                Pick a gift card that matches the occasion and recipient.
              </p>
            </div>

            <div>
              <span className="text-4xl font-bold text-emerald-600">02</span>

              <h3 className="mt-4 font-semibold text-slate-900">
                Checkout securely
              </h3>

              <p className="mt-2 text-slate-600">
                Complete your order and pay securely through Paystack.
              </p>
            </div>

            <div>
              <span className="text-4xl font-bold text-emerald-600">03</span>

              <h3 className="mt-4 font-semibold text-slate-900">
                Make someone's day
              </h3>

              <p className="mt-2 text-slate-600">
                Your digital gift is delivered to the recipient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to give a better gift?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Browse our collection of digital gift cards and find something
            they'll appreciate.
          </p>

          <Link
            to="/gift-cards"
            className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            Explore Gift Cards
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
