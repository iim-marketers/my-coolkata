"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import { dishes } from "@/lib/kolkata";
import { cn, round2 } from "@/lib/utils";

/**
 * The plate. Six dishes arranged around a rim; clicking one opens it with
 * a photograph of the dish.
 */
const PLATE: { slug: string; icon: string; label: string }[] = [
  { slug: "kolkata-biryani", icon: "🍚", label: "Biryani" },
  { slug: "telebhaja", icon: "🥟", label: "Telebhaja" },
  { slug: "rosogolla", icon: "🍬", label: "Sandesh & sweets" },
  { slug: "mishti-doi", icon: "🥛", label: "Mishti doi" },
  { slug: "phuchka", icon: "🌶️", label: "Phuchka" },
  { slug: "kathi-roll", icon: "🥙", label: "Kathi roll" },
];

export function TastePlate({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const item = PLATE[active];
  const dish = dishes.find((d) => d.slug === item.slug);

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[minmax(0,1fr)_1fr] lg:gap-16", className)}>
      {/* The plate itself. */}
      <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="plate-face" cx="42%" cy="34%" r="72%">
              <stop offset="0%" stopColor="var(--card)" />
              <stop offset="72%" stopColor="var(--secondary)" />
              <stop offset="100%" stopColor="var(--muted)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="186" fill="var(--border)" opacity="0.5" />
          <circle cx="200" cy="200" r="178" fill="url(#plate-face)" />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="var(--terracotta)"
            strokeWidth="1.5"
            opacity="0.35"
          />
          <circle
            cx="200"
            cy="200"
            r="112"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* A kalka border, because a Bengali plate would have one. */}
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={round2(200 + Math.cos(a) * 166)}
                cy={round2(200 + Math.sin(a) * 166)}
                r="2.5"
                fill="var(--marigold)"
                opacity="0.5"
              />
            );
          })}
        </svg>

        {/* Six positions around the rim. */}
        {PLATE.map((p, i) => {
          const a = (i / PLATE.length) * Math.PI * 2 - Math.PI / 2;
          const x = round2(50 + Math.cos(a) * 33);
          const y = round2(50 + Math.sin(a) * 33);
          const on = i === active;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-full transition-transform duration-300",
                on ? "scale-110" : "hover:scale-105",
              )}
            >
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-full border text-2xl transition-colors sm:size-16 sm:text-3xl",
                  on
                    ? "border-terracotta bg-terracotta/12"
                    : "border-border bg-card hover:border-foreground/30",
                )}
              >
                {p.icon}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.52rem] tracking-[0.12em] whitespace-nowrap uppercase transition-colors",
                  on ? "text-terracotta" : "text-muted-foreground",
                )}
              >
                {p.label}
              </span>
            </button>
          );
        })}

        {/* The centre reads out whatever is selected. */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="max-w-[9rem] text-center">
            <p
              key={item.slug}
              className="font-display text-[1.15rem] leading-tight font-semibold"
              style={{ animation: "fade-in 500ms ease both" }}
            >
              {dish?.name ?? item.label}
            </p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground" lang="bn">
              {dish?.bengali}
            </p>
          </div>
        </div>
      </div>

      {/* The dish. */}
      {dish ? (
        <article key={dish.slug} style={{ animation: "rise-in 500ms ease both" }}>
          <CityScene
            name={dish.scene}
            photo={dish.photo}
            detail="card"
            className="mb-7 aspect-[16/9] w-full rounded-lg border border-border"
          />
          <p className="font-mono text-[0.6rem] tracking-[0.26em] text-terracotta uppercase">
            {dish.originYear ? `Since ${dish.originYear}` : dish.category}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,2.8rem)] leading-tight font-semibold">
            {dish.name}
          </h3>
          <p className="mt-4 font-display text-[1.15rem] leading-snug text-foreground/85 italic">
            {dish.summary}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-3">
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

          <p className="mt-6 max-w-xl text-[0.94rem] leading-relaxed text-muted-foreground">
            {dish.body[0]}
          </p>

          <div className="mt-7">
            <p className="font-mono text-[0.56rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
              Where to try it
            </p>
            <ul className="mt-3 space-y-2">
              {dish.eatItAt.slice(0, 3).map((e) => (
                <li key={e.place} className="flex gap-3 text-[0.88rem]">
                  <span className="font-medium">{e.place}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span className="text-muted-foreground">{e.where}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/food/${dish.slug}`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-terracotta/40 pb-1 font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase transition-colors hover:border-terracotta"
          >
            The whole story
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ) : null}
    </div>
  );
}
