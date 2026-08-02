const COLUMNS = [
  { title: "Shop", links: ["Ceremonial", "Premium", "Latte Mix", "Cooking Grade"] },
  { title: "Company", links: ["Our Story", "Sourcing", "Journal", "Contact"] },
  { title: "Help", links: ["Shipping", "Returns", "Brewing Guide", "FAQ"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-hero-deep py-14 text-hero-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:px-10">
        <div>
          <p className="font-display text-3xl font-extrabold">kumo</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-hero-foreground/60">
            Single-origin Japanese matcha, milled slow and shipped fresh.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-matcha-light">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#collection"
                    className="text-sm text-hero-foreground/65 transition-colors hover:text-hero-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-[1400px] border-t border-hero-foreground/10 px-6 pt-6 text-xs text-hero-foreground/45 lg:px-10">
        © {new Date().getFullYear()} kumo matcha. Uji, Japan.
      </div>
    </footer>
  );
}
