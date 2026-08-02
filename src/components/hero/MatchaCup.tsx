import { forwardRef } from "react";
import type { Flavor } from "@/lib/flavors";

const CUP_SRC = `url("/images/cup.png")`;

/** Mask that limits an overlay to the liquid area of the cup artwork. */
const liquidMask = {
  WebkitMaskImage: `${CUP_SRC}, linear-gradient(to bottom, transparent 12%, #000 17%, #000 92%, transparent 97%)`,
  maskImage: `${CUP_SRC}, linear-gradient(to bottom, transparent 12%, #000 17%, #000 92%, transparent 97%)`,
  WebkitMaskSize: "contain, 100% 100%",
  maskSize: "contain, 100% 100%",
  WebkitMaskRepeat: "no-repeat, no-repeat",
  maskRepeat: "no-repeat, no-repeat",
  WebkitMaskPosition: "center, center",
  maskPosition: "center, center",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
} as const;

type Props = { flavor: Flavor; splashKey: number };

export const MatchaCup = forwardRef<HTMLDivElement, Props>(function MatchaCup(
  { flavor, splashKey },
  ref,
) {
  const tinted = flavor.id !== "matcha";

  return (
    <div ref={ref} className="relative isolate mx-auto h-full w-full max-w-[440px]">
      {/* glow behind the cup */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[78%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-[background] duration-700"
        style={{ background: `radial-gradient(circle, ${flavor.glow} 0%, transparent 68%)`, opacity: 0.45 }}
      />

      <img
        src="/images/cup.png"
        alt={`${flavor.name} in a tall cup`}
        width={912}
        height={1312}
        className="relative h-full w-full object-contain drop-shadow-[0_50px_70px_rgb(0_0_0/0.45)]"
      />

      {/* liquid colour */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background,opacity] duration-[900ms] ease-out"
        style={{
          ...liquidMask,
          background: flavor.liquid,
          mixBlendMode: "color",
          opacity: tinted ? 0.95 : 0,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-[background,opacity] duration-[900ms] ease-out"
        style={{
          ...liquidMask,
          background: `linear-gradient(to bottom, ${flavor.liquid} 0%, transparent 78%)`,
          mixBlendMode: "multiply",
          opacity: tinted ? 0.5 : 0,
        }}
      />

      {/* swirling surface */}
      <div
        className="liquid-wave pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light"
        style={liquidMask}
      />

      {/* splash burst on each flavour change */}
      <div key={splashKey} className="pointer-events-none absolute inset-0">
        {tinted
          ? Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2;
              const dist = 90 + (i % 5) * 26;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-[32%] h-2.5 w-2.5 rounded-full"
                  style={{
                    background: flavor.glow,
                    animation: `kumo-splash 900ms ${i * 18}ms cubic-bezier(0.2,0.8,0.3,1) both`,
                    ["--sx" as string]: `${Math.cos(angle) * dist}px`,
                    ["--sy" as string]: `${Math.sin(angle) * dist - 40}px`,
                  }}
                />
              );
            })
          : null}
      </div>

      <style>{`@keyframes kumo-splash{0%{transform:translate(-50%,-50%) scale(.2);opacity:0}25%{opacity:.95}100%{transform:translate(calc(-50% + var(--sx)),calc(-50% + var(--sy))) scale(0);opacity:0}}`}</style>
    </div>
  );
});
