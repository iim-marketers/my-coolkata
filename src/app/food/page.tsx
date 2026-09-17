import type { Metadata } from "next";
import { FoodCard } from "@/components/food-card";
import { FoodMap } from "@/components/food-map";
import { FoodQuiz } from "@/components/food-quiz";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { dishes } from "@/lib/kolkata";
import { toBanglaDigits } from "@/lib/kolkata/bangla";
import { foodPlaces } from "@/lib/kolkata/food-places";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Taste Kolkata",
  description:
    "The foods Kolkata is famous for and where to find them, a food map of thirty-five places, and a quiz that builds you a food trail.",
  path: "/food",
  photo: "bengali-thali",
});

const RULES = [
  {
    t: "Sour, not sweet",
    d: "Phuchka water here is tamarind-sour with no sugar in it. The Delhi version tastes like dessert to a Bengali.",
  },
  {
    t: "The potato is not optional",
    d: "It arrived with an exiled court in 1856 and has been in the biryani ever since. The egg is modern.",
  },
  {
    t: "Shops close in the afternoon",
    d: "Most kitchens shut between three and six. Plan lunch before three or accept a snack.",
  },
  {
    t: "Winter is a different menu",
    d: "Nolen gur runs roughly mid-December to mid-February. Every sweet gets a better version, and then it stops.",
  },
];

/** A section title with its Bengali written large above the English. */
function KitchenHeading({
  eyebrow,
  bengali,
  title,
  lede,
  tone = "light",
  className,
}: {
  eyebrow: string;
  bengali: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "font-mono text-[0.62rem] tracking-[0.3em] uppercase",
          dark ? "text-marigold" : "text-alta",
        )}
      >
        {eyebrow}
      </p>
      <p
        lang="bn"
        className={cn(
          "mt-3 font-bangla-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.1]",
          dark ? "text-marigold" : "text-alta",
        )}
      >
        {bengali}
      </p>
      <h2
        className={cn(
          "mt-1 font-display text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.05] font-semibold tracking-tight text-balance",
          dark && "text-khadi",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-[0.98rem] leading-relaxed",
            dark ? "text-khadi/75" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export default function FoodPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Taste Kolkata · খাই খাই"
        title="Bitter first, sweet last, fish in between"
        lede="Mustard oil, river fish, fresh chhena, and a relationship with sugar that the rest of India finds excessive. Here is what the city is famous for, and where to eat it."
        scene="streetfood"
        photo="bengali-thali"
        meta={[
          { label: "Cheapest", value: "Cha in a clay cup, ₹7" },
          { label: "Dishes", value: String(dishes.length) },
          { label: "Places mapped", value: String(foodPlaces.length) },
        ]}
      >
        <div className="flex flex-wrap gap-2.5">
          <a
            href="#famous"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-[0.88rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            What Kolkata is famous for
          </a>
          <a
            href="#map"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-[0.88rem] font-medium transition-[translate,border-color,color] hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            Where to eat
          </a>
        </div>
      </PageHeader>

      {/* What the city is famous for, and where to find it. */}
      <section id="famous" className="paper scroll-mt-16">
        <div className={`${pageShell} relative py-20 sm:py-28`}>
          <Reveal>
            <KitchenHeading
              eyebrow="Famous for"
              bengali="কলকাতার বিখ্যাত খাবার"
              title="What Kolkata is famous for, and where to find it"
              lede="The dishes the city is known for, and the places that do them best. Tap one for the whole story."
            />
          </Reveal>
          <ul className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish, i) => (
              <Reveal as="li" key={dish.slug} delay={(i % 3) * 80} className="h-full">
                <FoodCard dish={dish} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Rules, laid out on a banana leaf. */}
      <section className="kolapata relative">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <KitchenHeading
              tone="dark"
              eyebrow="Rules"
              bengali="নিয়ম"
              title="Four things worth knowing before you order"
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RULES.map((rule, i) => (
              <Reveal as="li" key={rule.t} delay={i * 80} className="h-full">
                <div className="kantha h-full rounded-[1.2rem] bg-khadi p-7">
                  <p lang="bn" className="font-bangla-display text-[2.6rem] leading-none text-alta">
                    {toBanglaDigits(i + 1)}
                  </p>
                  <p className="mt-3 font-display text-lg leading-snug font-semibold">{rule.t}</p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {rule.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The food map. */}
      <section id="map" className="scroll-mt-16">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Food map"
              title="Where to actually eat"
              lede={`${foodPlaces.length} places, plotted at their real coordinates and filterable by kind. Hover a dot for what to order.`}
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <FoodMap />
          </Reveal>
        </div>
      </section>

      {/* The quiz. */}
      <section className="paper border-t border-border">
        <div className={`${pageShell} sticky-split relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <Reveal>
            <SectionHeading
              eyebrow="Four questions"
              title="What kind of Kolkata eater are you?"
              lede="Answer four questions and this builds you a trail: five stops, in order, with what to order at each. It is assembled from places that exist on this site."
            />
            <div className="mt-8 space-y-3 text-[0.9rem] leading-relaxed text-muted-foreground">
              <p>
                There is no wrong answer, though there is a Bengali answer, and
                it is usually both.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FoodQuiz />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
