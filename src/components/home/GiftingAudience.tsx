import { Link } from "react-router-dom";

function GiftingAudience() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Made for every occasion
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Gifting made simple
          </h2>

          <p className="mt-3 text-slate-600">
            Whether you're celebrating someone special or rewarding your
            team, Giftly makes sending the right gift effortless.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal */}
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="bg-emerald-50 p-8 sm:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-xl text-white">
                🎁
              </div>

              <p className="mb-2 text-sm font-semibold text-emerald-600">
                For individuals
              </p>

              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Make someone's day
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-slate-600">
                Birthdays, anniversaries, thank-yous or just because.
                Send a gift card they'll actually enjoy, without the
                stress of choosing the perfect physical gift.
              </p>

              <Link
                to="/gift-cards"
                className="mt-8 inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Find a gift
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Corporate */}
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
            <div className="p-8 sm:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
                🏢
              </div>

              <p className="mb-2 text-sm font-semibold text-emerald-400">
                For businesses
              </p>

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Reward your people
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                Recognize employees, appreciate clients, celebrate
                milestones and build stronger relationships with
                meaningful digital rewards.
              </p>

              <Link
                to="/gift-cards"
                className="mt-8 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore corporate gifts
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftingAudience;