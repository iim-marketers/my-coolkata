import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoodCard } from "@/components/food-card";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { dishes, getDish } from "@/lib/kolkata";

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/food/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) return { title: "Not found" };
  return { title: dish.name, description: dish.summary };
}

export default async function DishPage({ params }: PageProps<"/food/[slug]">) {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) notFound();

  const alsoTry = dishes
    .filter((d) => d.slug !== dish.slug && d.category === dish.category)
    .slice(0, 3);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={`${dish.category} · ${dish.bestIn}`}
        title={dish.name}
        lede={dish.summary}
        scene={dish.scene}
        back={{ href: "/food", label: "Food" }}
        tall
        meta={[
          { label: "In Bengali", value: dish.bengali },
          { label: "Origin", value: dish.origin },
          ...(dish.originYear
            ? [{ label: "Since", value: String(dish.originYear) }]
            : []),
          { label: "Price", value: dish.price },
          { label: dish.season ? "Season" : "Best in", value: dish.season ?? dish.bestIn },
        ]}
      />

      <div className={`${pageShell} grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20`}>
        <article>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-[1.02rem] leading-[1.75] text-foreground/85">
              {dish.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-[1.14rem] leading-[1.7]" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </article>

        <aside className="self-start lg:sticky lg:top-24">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                Eat it at
              </p>
              <ul className="mt-5 space-y-5">
                {dish.eatItAt.map((place) => (
                  <li key={place.place} className="border-t border-border pt-4">
                    <p className="font-display text-base font-semibold">
                      {place.place}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.58rem] tracking-[0.16em] text-terracotta uppercase">
                      {place.where}
                    </p>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                      {place.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>

      {alsoTry.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className={`${pageShell} py-16 sm:py-24`}>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              While you are at it
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alsoTry.map((d, i) => (
                <Reveal as="li" key={d.slug} delay={i * 90} className="h-full">
                  <FoodCard dish={d} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
