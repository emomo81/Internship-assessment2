import { useCallback, useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";
import type { Flavor } from "@/lib/flavors";

type Props = {
  flavor: Flavor;
  active: boolean;
  cupRef: React.RefObject<HTMLDivElement | null>;
  onArrive: (flavor: Flavor) => void;
  register: (id: string, fly: () => void) => void;
  reduced: boolean;
};

export function FruitCard({ flavor, active, cupRef, onArrive, register, reduced }: Props) {
  const [scope, animate] = useAnimate<HTMLButtonElement>();
  const flying = useRef(false);
  const slot = flavor.slot!;

  const fly = useCallback(() => {
    const el = scope.current;
    const cup = cupRef.current;
    if (!el || !cup || flying.current) return;
    flying.current = true;

    if (reduced) {
      onArrive(flavor);
      flying.current = false;
      return;
    }

    const c = el.getBoundingClientRect();
    const t = cup.getBoundingClientRect();
    const dx = t.left + t.width / 2 - (c.left + c.width / 2);
    const dy = t.top + t.height * 0.3 - (c.top + c.height / 2);

    void animate(
      el,
      {
        x: [0, dx * 0.45, dx],
        y: [0, dy - 130, dy],
        scale: [1, 1.18, 0.28],
        rotate: [0, 18, 120],
        opacity: [1, 1, 0],
      },
      { duration: 0.72, ease: "easeIn", times: [0, 0.55, 1] },
    ).then(() => {
      onArrive(flavor);
      void animate(
        el,
        { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
      ).then(() => {
        flying.current = false;
      });
    });
  }, [animate, cupRef, flavor, onArrive, reduced, scope]);

  useEffect(() => {
    register(flavor.id, fly);
  }, [fly, flavor.id, register]);

  const hoverProps = reduced ? {} : { whileHover: { scale: 1.08 }, whileTap: { scale: 0.94 } };

  return (
    <button
      ref={scope}
      type="button"
      onClick={fly}
      aria-label={`Add ${flavor.label} to the cup`}
      aria-pressed={active}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: slot.left, top: slot.top }}
      data-fruit={flavor.id}
    >
      <motion.span
        className="float-slow relative grid place-items-center rounded-[26px] bg-cream/95 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.75)] ring-1 ring-hero-foreground/10 backdrop-blur transition-shadow duration-300 group-hover:shadow-[0_32px_70px_-22px_rgb(0_0_0/0.85)] group-focus-visible:ring-2 group-focus-visible:ring-matcha-light"
        style={{ width: slot.size, height: slot.size, animationDelay: slot.delay }}
        {...hoverProps}
      >
        <span
          className="absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `0 0 46px -6px ${flavor.glow}` }}
        />
        <img
          src={flavor.image}
          alt={flavor.label}
          loading="lazy"
          width={512}
          height={512}
          className="relative h-[72%] w-[72%] object-contain drop-shadow-[0_10px_14px_rgb(0_0_0/0.25)]"
        />
        {active ? (
          <span
            className="absolute -bottom-2 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full"
            style={{ background: flavor.glow }}
          />
        ) : null}
      </motion.span>
    </button>
  );
}
