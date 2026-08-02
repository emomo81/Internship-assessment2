const ROWS = [
  {
    n: "01",
    name: "Tencha leaf",
    copy: "Shade-grown, de-stemmed and de-veined before milling.",
  },
  { n: "02", name: "L-theanine", copy: "The amino acid behind matcha's calm, level focus." },
  { n: "03", name: "Catechins", copy: "Antioxidants concentrated by drinking the whole leaf." },
  { n: "04", name: "Nothing else", copy: "No sugar, no fillers, no anti-caking agents. Ever." },
];

export function Ingredients() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-4 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-md font-display text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.04] text-ink">
            Four things in
            <br />
            every tin
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            A short ingredient list is the whole point. Everything here earns its place.
          </p>
        </div>

        <ul>
          {ROWS.map((r) => (
            <li
              key={r.n}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-colors hover:bg-secondary/50 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)]"
            >
              <span className="font-display text-sm font-bold text-matcha">{r.n}</span>
              <h3 className="font-display text-xl font-bold text-ink transition-transform duration-300 group-hover:translate-x-1">
                {r.name}
              </h3>
              <p className="col-start-2 text-[15px] text-muted-foreground md:col-start-3">
                {r.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
