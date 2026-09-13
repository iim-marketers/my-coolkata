"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Alpana } from "@/components/food/alpana";
import { FoodCutout } from "@/components/food/food-cutout";
import { CityScene } from "@/components/scenes/city-scene";
import { dishes } from "@/lib/kolkata";
import type { CutoutId } from "@/lib/kolkata/cutouts";
import { cn, round2 } from "@/lib/utils";

/**
 * The plate. Six dishes sit in a ring on an alpana; clicking one brings it
 * into the middle and opens it alongside, with a photograph.
 */
const PLATE: { slug: string; label: string; cutout: CutoutId }[] = [
  { slug: "kathi-roll", label: "Kathi roll", cutout: "kathi-roll" },
  { slug: "phuchka", label: "Phuchka", cutout: "phuchka" },
  { slug: "kolkata-biryani", label: "Biryani", cutout: "kolkata-biryani" },
  { slug: "shorshe-ilish", label: "Shorshe ilish", cutout: "shorshe-ilish" },
  { slug: "rosogolla", label: "Rosogolla", cutout: "rosogolla" },
  { slug: "cha-in-bhaar", label: "Cha", cutout: "cha-bhaar" },
];

export function TastePlate({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const item = PLATE[active];
  const dish = dishes.find((d) => d.slug === item.slug);

  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_1fr] lg:gap-16",
        className,
      )}
    >
      {/* The plate itself. */}
      <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
        <div aria-hidden className="absolute inset-[16%] rounded-full bg-marigold/30 blur-3xl" />
        <Alpana className="absolute inset-[2%] text-alta/15" />

        {/* Six positions around the rim. */}
        {PLATE.map((p, i) => {
          const a = (i / PLATE.length) * Math.PI * 2 - Math.PI / 2;
          const on = i === active;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              aria-label={p.label}
              style={{
                left: `${round2(50 + Math.cos(a) * 34)}%`,
                top: `${round2(50 + Math.sin(a) * 34)}%`,
              }}
              className={cn(
                "group absolute w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-alta",
                !on && "hover:scale-110",
              )}
            >
              <span
                className={cn(
                  "block transition-opacity duration-500",
                  on && "opacity-30",
                )}
              >
                <FoodCutout
                  id={p.cutout}
                  sizes="(max-width: 640px) 24vw, 130px"
                />
              </span>
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.12em] whitespace-nowrap uppercase shadow-sm transition-colors sm:text-[0.54rem]",
                  on
                    ? "bg-alta text-khadi"
                    : "bg-khadi text-foreground/70 group-hover:text-alta",
                )}
              >
                {p.label}
              </span>
            </button>
          );
        })}

        {/* The one you picked is served into the middle. */}
        <div className="pointer-events-none absolute inset-[31%] grid place-items-center">
          <div key={item.slug} className="thali-serve w-full">
            <FoodCutout
              id={item.cutout}
              sizes="(max-width: 640px) 40vw, 220px"
            />
          </div>
        </div>
      </div>

      {/* The dish. */}
      {dish ? (
        <article
          key={dish.slug}
          style={{ animation: "rise-in 500ms ease both" }}
        >
          <CityScene
            name={dish.scene}
            photo={dish.photo}
            detail="card"
            className="mb-8 aspect-[16/10] w-full -rotate-1 rounded-xl border-[6px] border-khadi shadow-[0_26px_50px_-30px_oklch(0.2_0.04_40/0.6)]"
          />
          {/* <p className="font-mono text-[0.6rem] tracking-[0.26em] text-alta uppercase">
            {dish.originYear ? `Since ${dish.originYear}` : dish.category}
          </p> */}
          <p
            lang="bn"
            className="mt-2 font-bangla-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] text-alta"
          >
            {dish.bengali}
          </p>
          <h3 className="font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold">
            {dish.name}
          </h3>
          <p className="mt-4 font-display text-[1.1rem] leading-snug text-foreground/80 italic">
            {dish.summary}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-dashed border-alta/30 pt-6 sm:grid-cols-3">
            {[
              ["Origin", dish.origin],
              ["Price", dish.price],
              [dish.season ? "Season" : "Best in", dish.season ?? dish.bestIn],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                  {k}
                </dt>
                <dd className="mt-1 text-[0.86rem] font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <p className="font-mono text-[0.56rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
              Where to try it
            </p>
            <ul className="mt-3 space-y-2">
              {dish.eatItAt.slice(0, 3).map((e) => (
                <li
                  key={e.place}
                  className="flex flex-wrap gap-x-3 text-[0.88rem]"
                >
                  <span className="font-medium">{e.place}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span className="text-muted-foreground">{e.where}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/food/${dish.slug}`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-alta/40 pb-1 font-mono text-[0.64rem] tracking-[0.2em] text-alta uppercase transition-colors hover:border-alta"
          >
            The whole story
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ) : null}
    </div>
  );
}
