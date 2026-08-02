import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";

const NAV = ["Home", "Shop", "About", "Journal", "Contact"];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link to="/" className="font-display text-3xl font-extrabold tracking-tight text-hero-foreground">
          kumo
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#collection"
              className="relative text-sm font-medium text-hero-foreground/80 transition-colors hover:text-hero-foreground"
            >
              {item}
              {i === 0 ? (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-matcha-light" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5 text-hero-foreground/85">
          <button type="button" aria-label="Search" className="transition-colors hover:text-hero-foreground">
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <button type="button" aria-label="Account" className="hidden transition-colors hover:text-hero-foreground sm:block">
            <User className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <button type="button" aria-label="Cart" className="relative transition-colors hover:text-hero-foreground">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
            <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-matcha-light text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
