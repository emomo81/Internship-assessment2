export type FlavorId = "matcha" | "strawberry" | "raspberry" | "blueberry" | "cherry";

export type Flavor = {
  id: FlavorId;
  label: string;
  name: string;
  price: string;
  note: string;
  /** liquid tint applied over the cup */
  liquid: string;
  /** soft splash / glow color */
  glow: string;
  /** hero backdrop wash */
  wash: string;
  image?: string;
  /** position of the floating card inside the hero stage */
  slot?: { left: string; top: string; size: string; delay: string };
};

export const MATCHA: Flavor = {
  id: "matcha",
  label: "Classic",
  name: "Ceremonial Matcha",
  price: "$19.00",
  note: "Stone-ground Uji leaf, whisked smooth.",
  liquid: "oklch(0.66 0.16 132)",
  glow: "oklch(0.78 0.17 128)",
  wash: "oklch(0.34 0.055 134)",
};

export const FRUITS: Flavor[] = [
  {
    id: "strawberry",
    label: "Strawberry",
    name: "Strawberry Matcha",
    price: "$21.00",
    note: "Sun-ripened berries folded into cold matcha.",
    liquid: "oklch(0.68 0.2 18)",
    glow: "oklch(0.78 0.19 20)",
    wash: "oklch(0.36 0.09 20)",
    image: "/images/strawberry.png",
    slot: { left: "22%", top: "26%", size: "132px", delay: "0s" },
  },
  {
    id: "raspberry",
    label: "Raspberry",
    name: "Raspberry Matcha",
    price: "$22.00",
    note: "Tart raspberry against grassy depth.",
    liquid: "oklch(0.6 0.22 3)",
    glow: "oklch(0.72 0.2 5)",
    wash: "oklch(0.34 0.1 355)",
    image: "/images/raspberry.png",
    slot: { left: "12%", top: "56%", size: "124px", delay: "-1.8s" },
  },
  {
    id: "blueberry",
    label: "Blueberry",
    name: "Blueberry Latte",
    price: "$23.00",
    note: "Wild blueberry, oat milk, ceremonial grade.",
    liquid: "oklch(0.5 0.17 285)",
    glow: "oklch(0.66 0.17 288)",
    wash: "oklch(0.32 0.08 288)",
    image: "/images/blueberry.png",
    slot: { left: "80%", top: "28%", size: "128px", delay: "-3.4s" },
  },
  {
    id: "cherry",
    label: "Cherry",
    name: "Cherry Matcha",
    price: "$24.00",
    note: "Dark cherry syrup, whisked to a deep red.",
    liquid: "oklch(0.5 0.21 26)",
    glow: "oklch(0.64 0.21 28)",
    wash: "oklch(0.33 0.1 28)",
    image: "/images/cherry.png",
    slot: { left: "89%", top: "58%", size: "136px", delay: "-5.1s" },
  },
];

export const ALL_FLAVORS: Flavor[] = [MATCHA, ...FRUITS];

export function getFlavor(id: FlavorId): Flavor {
  return ALL_FLAVORS.find((f) => f.id === id) ?? MATCHA;
}
