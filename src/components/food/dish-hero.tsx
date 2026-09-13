import Link from "next/link";
import { Alpana } from "@/components/food/alpana";
import { FoodCutout } from "@/components/food/food-cutout";
import { pageShell } from "@/components/page-header";
import { CityScene } from "@/components/scenes/city-scene";
import { foodCategories } from "@/lib/kolkata/food";
import { toBanglaDigits } from "@/lib/kolkata/bangla";
import type { Dish } from "@/lib/kolkata/types";

/**
 * A dish page opens on homespun cloth rather than a photograph: the dish
 * cut out and floating, its Bengali name written large behind it.
 */
export function DishHero({ dish }: { dish: Dish }) {
  const category = foodCategories.find((c) => c.id === dish.category);
  const meta = [
    { label: "Origin", value: dish.origin },
    ...(dish.originYear ? [{ label: "Since", value: String(dish.originYear) }] : []),
    { label: "Price", value: dish.price },
    { label: dish.season ? "Season" : "Best in", value: dish.season ?? dish.bestIn },
  ];

  return (
    <>
      <header className="relative isolate overflow-hidden bg-khadi">
        <Alpana className="absolute top-1/2 -right-80 size-248 -translate-y-1/2 text-alta/[0.07]" />
        <p
          aria-hidden
          lang="bn"
          className="pointer-events-none absolute bottom-[-0.2em] left-0 font-bangla-display text-[clamp(8rem,26vw,22rem)] leading-none whitespace-nowrap text-alta/5 select-none"
        >
          {dish.bengali}
        </p>

        <div className={`${pageShell} relative grid items-center gap-10 pt-24 pb-16 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pb-20`}>
          <div>
            <Link
              href="/food"
              className="font-mono text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-alta"
            >
              ← Taste Kolkata
            </Link>
            <p className="mt-7 font-mono text-[0.62rem] tracking-[0.28em] text-alta uppercase">
              {category?.label} ·{" "}
              <span lang="bn" className="text-[0.85rem] tracking-normal">
                {category?.bengali}
              </span>
            </p>
            <p
              lang="bn"
              className="mt-3 font-bangla-display text-[clamp(3.2rem,9vw,6.5rem)] leading-[1.05] text-alta"
            >
              {dish.bengali}
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-balance">
              {dish.name}
            </h1>
            <p className="mt-6 max-w-xl font-display text-[1.2rem] leading-snug text-foreground/75 italic">
              {dish.summary}
            </p>
            <dl className="mt-9 flex max-w-2xl flex-wrap gap-x-10 gap-y-5 border-t border-dashed border-alta/30 pt-6">
              {meta.map((m) => (
                <div key={m.label} className="max-w-[16rem]">
                  <dt className="font-mono text-[0.56rem] tracking-[0.2em] text-muted-foreground uppercase">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-[0.9rem] font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-136">
            <div aria-hidden className="absolute inset-[18%] rounded-full bg-marigold/35 blur-3xl" />
            {dish.cutout ? (
              <div className="hero-float absolute inset-[6%] grid place-items-center">
                <FoodCutout
                  id={dish.cutout}
                  preload
                  sizes="(max-width: 1024px) 80vw, 480px"
                />
              </div>
            ) : (
              <CityScene
                name={dish.scene}
                photo={dish.photo}
                className="absolute inset-[16%] rounded-full"
              />
            )}
            {/\d/.test(dish.price) ? (
              <p className="absolute right-[3%] bottom-[7%] -rotate-6 rounded-sm bg-khadi px-4 py-2 text-center shadow-[0_12px_26px_-10px_oklch(0.2_0.04_40/0.5)]">
                <span className="block font-mono text-[0.5rem] tracking-[0.2em] text-muted-foreground uppercase">
                  Price
                </span>
                <span
                  lang="bn"
                  className="block font-bangla-display text-[1.6rem] leading-tight text-alta"
                >
                  {toBanglaDigits(dish.price)}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </header>
      <div aria-hidden className="lal-paar-band" />
    </>
  );
}
