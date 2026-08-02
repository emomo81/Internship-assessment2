import { ArrowRight, Plus } from "lucide-react";
import ceremonial from "@/assets/p-ceremonial.jpg.asset.json";
import premium from "@/assets/p-premium.jpg.asset.json";
import latte from "@/assets/p-latte.jpg.asset.json";
import cooking from "@/assets/p-cooking.jpg.asset.json";

const PRODUCTS = [
  {
    name: "Ceremonial Grade",
    copy: "Finest quality for traditional tea ceremony.",
    price: "$29.00",
    image: ceremonial.url,
    tag: null as string | null,
  },
  {
    name: "Premium Matcha",
    copy: "Perfect balance for daily drinking.",
    price: "$19.00",
    image: premium.url,
    tag: "Popular",
  },
  {
    name: "Matcha Latte Mix",
    copy: "Easy to make, perfect for busy days.",
    price: "$15.00",
    image: latte.url,
    tag: null,
  },
  {
    name: "Cooking Grade",
    copy: "Ideal for baking and smoothies.",
    price: "$12.00",
    image: cooking.url,
    tag: null,
  },
];

export function Collection() {
  return (
    <section id="collection" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,2.3fr)] lg:px-10">
        <div className="max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-matcha">
            Our Collection
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.02] text-ink">
            Find your
            <br />
            perfect <span className="text-matcha">matcha</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            From everyday latte to ceremonial grade, we have the perfect matcha for every
            moment.
          </p>
          <a
            href="#newsletter"
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-matcha-light py-2 pl-7 pr-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            View All Products
            <span className="grid h-9 w-9 place-items-center rounded-full bg-hero-deep text-hero-foreground transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-3xl bg-card ring-1 ring-border transition-all duration-500 hover:-translate-y-1.5 hover:ring-matcha/40"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={700}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {p.tag ? (
                  <span className="absolute left-4 top-4 rounded-full bg-hero-deep px-3 py-1 text-[11px] font-semibold text-matcha-light">
                    {p.tag}
                  </span>
                ) : null}
              </div>
              <div className="relative p-5">
                <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{p.copy}</p>
                <p className="mt-5 font-display text-lg font-bold text-ink">{p.price}</p>
                <button
                  type="button"
                  aria-label={`Add ${p.name} to cart`}
                  className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-secondary text-ink transition-colors duration-300 hover:bg-matcha-light"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
