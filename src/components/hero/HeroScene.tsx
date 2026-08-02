import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Leaf, MousePointer2 } from "lucide-react";
import { FRUITS, MATCHA, type Flavor } from "@/lib/flavors";
import { FruitCard } from "./FruitCard";
import { MatchaCup } from "./MatchaCup";
import { SiteHeader } from "@/components/site/SiteHeader";

const STOPS = [0.25, 0.4, 0.55, 0.7];

export function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const cupWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const flyRefs = useRef<Record<string, () => void>>({});
  const stepRef = useRef(-1);

  const [flavor, setFlavor] = useState<Flavor>(MATCHA);
  const [splashKey, setSplashKey] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [reduced, setReduced] = useState(false);

  const register = useCallback((id: string, fly: () => void) => {
    flyRefs.current[id] = fly;
  }, []);

  const onArrive = useCallback((next: Flavor) => {
    setFlavor((prev) => (prev.id === next.id ? MATCHA : next));
    setSplashKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    setReduced(motionQuery.matches);
    setEnhanced(wide.matches && !motionQuery.matches);
  }, []);

  /* Smooth scrolling + pinned scroll narrative */
  useEffect(() => {
    if (!enhanced) return;
    let cleanup = () => {};
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          // fruit passes: fire once per crossing, reset when scrubbing back
          let step = -1;
          for (let i = 0; i < STOPS.length; i += 1) if (p >= STOPS[i]!) step = i;
          if (step !== stepRef.current) {
            if (step > stepRef.current && step >= 0) {
              const fruit = FRUITS[step]!;
              flyRefs.current[fruit.id]?.();
            } else if (step < 0) {
              setFlavor(MATCHA);
            } else {
              const fruit = FRUITS[step]!;
              setFlavor(fruit);
              setSplashKey((k) => k + 1);
            }
            stepRef.current = step;
          }

          const settle = gsap.utils.clamp(0, 1, p / 0.1);
          const zoom = gsap.utils.clamp(0, 1, (p - 0.82) / 0.18);
          gsap.set(cupWrapRef.current, {
            scale: 0.86 + settle * 0.14 + zoom * 0.16,
            rotate: zoom * 6,
            y: (1 - settle) * 60 - zoom * 20,
          });
          gsap.set(copyRef.current, {
            opacity: settle * (1 - zoom),
            y: (1 - settle) * 28,
          });
          gsap.set(stageRef.current, { opacity: 1 - zoom * 0.25 });
        },
      });

      cleanup = () => {
        trigger.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enhanced]);

  return (
    <div ref={wrapRef} className={enhanced ? "relative h-[460vh]" : "relative"}>
      <section
        ref={stageRef}
        aria-label="Choose your perfect matcha"
        className={`overflow-hidden bg-hero transition-[background] duration-[900ms] ${
          enhanced ? "sticky top-0 h-screen" : "relative min-h-screen"
        }`}
        style={{
          background: `radial-gradient(120% 90% at 50% 8%, ${flavor.wash} 0%, var(--hero) 42%, var(--hero-deep) 100%)`,
        }}
      >
        <SiteHeader />

        {/* soft powder motes */}
        <div className="grain-noise pointer-events-none absolute inset-0 opacity-[0.07]" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 pb-16 pt-32 lg:px-10 lg:pt-24">
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            {/* Copy */}
            <div ref={copyRef} className="relative z-20 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-hero-foreground/85">
                <Leaf className="h-3.5 w-3.5" /> 100% Organic
              </span>

              <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,5.2rem)] font-extrabold leading-[0.92] text-hero-foreground">
                Choose your
                <br />
                perfect{" "}
                <span className="transition-colors duration-700" style={{ color: flavor.glow }}>
                  {flavor.id === "matcha" ? "matcha." : `${flavor.label.toLowerCase()}.`}
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-hero-foreground/75">
                Pure, authentic matcha from Japan. Made for your daily ritual — then bent
                toward whichever fruit you drop in.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-7">
                <a
                  href="#collection"
                  className="group inline-flex items-center gap-4 rounded-full bg-matcha-light py-2 pl-7 pr-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  Explore Collection
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-hero-deep text-hero-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <a
                  href="#story"
                  className="border-b-2 border-matcha-light/70 pb-1 text-sm font-medium text-hero-foreground/85 transition-colors hover:text-hero-foreground"
                >
                  Learn More
                </a>
              </div>

              {/* live flavour readout */}
              <div className="mt-10 flex items-end gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flavor.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="font-display text-xl font-bold text-hero-foreground">
                      {flavor.name}
                    </p>
                    <p className="mt-1 text-sm text-hero-foreground/60">{flavor.note}</p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={flavor.price}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="font-display text-2xl font-extrabold"
                    style={{ color: flavor.glow }}
                  >
                    {flavor.price}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Stage */}
            <div className="relative h-[52vh] min-h-[360px] lg:h-[76vh]">
              <div
                ref={cupWrapRef}
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-full w-full -translate-x-1/2 -translate-y-1/2"
              >
                <MatchaCup ref={cupRef} flavor={flavor} splashKey={splashKey} />
              </div>


              {FRUITS.map((f) => (
                <FruitCard
                  key={f.id}
                  flavor={f}
                  active={flavor.id === f.id}
                  cupRef={cupRef}
                  onArrive={onArrive}
                  register={register}
                  reduced={reduced}
                />
              ))}

              {/* quality seal */}
              <div className="absolute bottom-[8%] right-[2%] z-30 hidden h-24 w-24 place-items-center rounded-full border border-hero-foreground/20 bg-hero-deep/50 backdrop-blur sm:grid">
                <span className="spin-seal absolute inset-2 rounded-full border border-dashed border-hero-foreground/25" />
                <Leaf className="h-6 w-6 text-matcha-light" />
                <span className="absolute bottom-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-hero-foreground/60">
                  Uji
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-1 text-hero-foreground/55">
            <MousePointer2 className="h-4 w-4" />
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll down</span>
          </div>
        </div>
      </section>
    </div>
  );
}
