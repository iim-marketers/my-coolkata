import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoodCard } from "@/components/food-card";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { dishes, foodCategories, getDish } from "@/lib/kolkata";
import { toBanglaDigits } from "@/lib/kolkata/bangla";

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

  const category = foodCategories.find((c) => c.id === dish.category);

  // Same kind first; a category of one borrows from the rest of the menu.
  const others = dishes.filter((d) => d.slug !== dish.slug);
  const alsoTry = [
    ...others.filter((d) => d.category === dish.category),
    ...others.filter((d) => d.category !== dish.category),
  ].slice(0, 3);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={`${category?.label ?? dish.category} · ${dish.bestIn}`}
        title={dish.name}
        lede={dish.summary}
        scene={dish.scene}
        photo={dish.photo}
        back={{ href: "/food", label: "Taste Kolkata" }}
        meta={[
          { label: "In Bengali", value: dish.bengali },
          { label: "Origin", value: dish.origin },
          ...(dish.originYear
            ? [{ label: "Since", value: String(dish.originYear) }]
            : []),
          { label: "Price", value: dish.price },
          ...(dish.season ? [{ label: "Season", value: dish.season }] : []),
        ]}
      />

      <div
        className={`${pageShell} grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20`}
      >
        <article>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-[1.02rem] leading-[1.75] text-foreground/85">
              {dish.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[1.14rem] leading-[1.7] first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-alta"
                      : undefined
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </article>

        <aside className="self-start lg:sticky lg:top-24">
          <Reveal>
            <div className="kantha rounded-[1.4rem] bg-khadi p-7">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] text-alta uppercase">
                Eat it at ·{" "}
                <span lang="bn" className="text-[0.85rem] tracking-normal">
                  কোথায় খাবেন
                </span>
              </p>
              <ol className="mt-5 space-y-5">
                {dish.eatItAt.map((place, i) => (
                  <li
                    key={place.place}
                    className="flex gap-4 border-t border-dashed border-alta/25 pt-4 first:border-0 first:pt-0"
                  >
                    <span
                      lang="bn"
                      className="w-6 shrink-0 font-bangla-display text-[1.7rem] leading-none text-alta/70"
                    >
                      {toBanglaDigits(i + 1)}
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold">
                        {place.place}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.58rem] tracking-[0.16em] text-kansa-deep uppercase">
                        {place.where}
                      </p>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                        {place.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </aside>
      </div>

      {alsoTry.length > 0 ? (
        <section className="paper border-t border-border">
          <div className={`${pageShell} relative py-16 sm:py-24`}>
            <p
              lang="bn"
              className="font-bangla-display text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.1] text-alta"
            >
              এটাও খান
            </p>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              While you are at it
            </h2>
            <ul className="mt-4 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
