import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "The strawberry blend ruined every other iced matcha for me. It tastes like the fruit, not like syrup.",
    name: "Mika T.",
    role: "Osaka",
  },
  {
    quote:
      "Ceremonial grade that actually froths. No bitterness at the bottom of the bowl, which is rare.",
    name: "Daniel R.",
    role: "Portland",
  },
  {
    quote:
      "I bought the tin for the packaging and stayed for the taste. Three orders in six weeks.",
    name: "Priya S.",
    role: "London",
  },
];

export function Reviews() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <h2 className="max-w-lg font-display text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.04] text-ink">
          Drunk daily by
          <br />
          rather particular people
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex h-full flex-col justify-between rounded-3xl bg-cream p-7 ring-1 ring-ink/5"
            >
              <div>
                <div className="flex gap-1 text-matcha">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-ink">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 text-sm">
                <span className="font-semibold text-ink">{r.name}</span>
                <span className="text-muted-foreground"> · {r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
