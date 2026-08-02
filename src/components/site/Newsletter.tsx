import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section id="newsletter" className="bg-cream pb-20 pt-4 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-hero px-8 py-14 text-hero-foreground lg:px-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <h2 className="max-w-md font-display text-[clamp(1.9rem,3.2vw,2.7rem)] font-extrabold leading-[1.05]">
                One letter a month. Recipes, restocks, nothing else.
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're on the list", {
                  description: `We'll write to ${email}.`,
                });
                setEmail("");
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-hero-foreground/25 bg-transparent px-6 py-4 text-sm text-hero-foreground placeholder:text-hero-foreground/40 focus:border-matcha-light focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-matcha-light py-2 pl-7 pr-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                Subscribe
                <span className="grid h-10 w-10 place-items-center rounded-full bg-hero-deep text-hero-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
