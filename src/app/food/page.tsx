import type { Metadata } from "next";
import { FoodCard } from "@/components/food-card";
import { FoodMap } from "@/components/food-map";
import { FoodQuiz } from "@/components/food-quiz";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TastePlate } from "@/components/taste-plate";
import { dishes, foodCategories } from "@/lib/kolkata";
import { foodPlaces } from "@/lib/kolkata/food-places";

export const metadata: Metadata = {
  title: "Taste Kolkata",
  description:
    "An interactive plate, a food map of thirty-five places, a quiz that builds you a food trail, and twelve dishes with their histories.",
};

export default function FoodPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Taste Kolkata"
        title="Start with the plate"
        lede="Mustard oil, freshwater fish, fresh curd cheese, and a relationship with sugar that other Indian cuisines find excessive. Click a dish and it opens."
        scene="streetfood"
        photo="hero-streetfood"
        meta={[
          { label: "Dishes", value: String(dishes.length) },
          { label: "Places mapped", value: String(foodPlaces.length) },
          { label: "Cheapest", value: "Cha in a clay cup, ₹7" },
        ]}
      />

      {/* The plate. */}
      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <TastePlate />
        </Reveal>
      </section>

      {/* Rules. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-14 sm:py-20`}>
          <Reveal>
            <SectionHeading
              eyebrow="Rules"
              title="Four things worth knowing before you order"
            />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Sour, not sweet",
                d: "Phuchka water here is tamarind-sour with no sugar in it. The Delhi version tastes like dessert to a Bengali.",
              },
              {
                n: "02",
                t: "The potato is not optional",
                d: "It arrived with an exiled court in 1856 and has been in the biryani ever since. The egg is modern.",
              },
              {
                n: "03",
                t: "Shops close in the afternoon",
                d: "Most kitchens shut between three and six. Plan lunch before three or accept a snack.",
              },
              {
                n: "04",
                t: "Winter is a different menu",
                d: "Nolen gur runs roughly mid-December to mid-February. Every sweet gets a better version, and then it stops.",
              },
            ].map((rule, i) => (
              <Reveal as="li" key={rule.n} delay={i * 80} className="h-full">
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-[0.6rem] text-terracotta">{rule.n}</p>
                  <p className="mt-2 font-display text-lg font-semibold">{rule.t}</p>
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
      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Food map"
              title="Where to actually eat"
              lede="Thirty-five places, plotted at their real coordinates and filterable by kind. Hover a dot for what to order."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <FoodMap />
          </Reveal>
        </div>
      </section>

      {/* The quiz. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
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

      {/* Every dish, by category. */}
      {foodCategories.map((cat) => {
        const group = dishes.filter((d) => d.category === cat.id);
        if (group.length === 0) return null;
        return (
          <section key={cat.id} className="border-t border-border">
            <div className={`${pageShell} py-14 sm:py-20`}>
              <Reveal>
                <SectionHeading eyebrow={`${group.length} of them`} title={cat.label} />
              </Reveal>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((dish, i) => (
                  <Reveal as="li" key={dish.slug} delay={(i % 3) * 80} className="h-full">
                    <FoodCard dish={dish} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </main>
  );
}
