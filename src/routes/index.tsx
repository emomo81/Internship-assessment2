import { createFileRoute } from "@tanstack/react-router";
import { HeroScene } from "@/components/hero/HeroScene";
import { FeatureStrip } from "@/components/site/FeatureStrip";
import { Collection } from "@/components/site/Collection";
import { Story } from "@/components/site/Story";
import { Ingredients } from "@/components/site/Ingredients";
import { Reviews } from "@/components/site/Reviews";
import { Newsletter } from "@/components/site/Newsletter";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Momo — Choose Your Perfect Matcha";
const DESCRIPTION =
  "Pure organic matcha from Uji, Japan. Drop a fruit into the cup and watch the drink change — then shop ceremonial, premium, latte and cooking grades.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <HeroScene />
      <FeatureStrip />
      <Collection />
      <Story />
      <Ingredients />
      <Reviews />
      <Newsletter />
      <SiteFooter />
    </main>
  );
}
