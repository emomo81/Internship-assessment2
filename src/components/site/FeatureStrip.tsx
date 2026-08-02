import { Leaf, MapPin, HeartPulse, Truck } from "lucide-react";

const ITEMS = [
  { icon: Leaf, title: "100% Organic", copy: "Pure & natural matcha" },
  { icon: MapPin, title: "Made in Japan", copy: "Authentic & traditional" },
  { icon: HeartPulse, title: "Rich in Antioxidants", copy: "Good for your health" },
  { icon: Truck, title: "Fast Delivery", copy: "Quick & reliable shipping" },
];

export function FeatureStrip() {
  return (
    <section className="relative z-10 bg-sand">
      <div className="mx-auto grid max-w-[1400px] gap-x-6 gap-y-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-ink/10 lg:px-10">
        {ITEMS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex min-w-0 items-center gap-4 lg:px-8 lg:first:pl-0">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-matcha">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-bold text-ink">{title}</p>
              <p className="truncate text-sm text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
