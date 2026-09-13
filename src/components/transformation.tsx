"use client";

import { useState } from "react";
import { CityScene } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/**
 * A site told as a sequence of dates. The frame cross-fades between
 * stages rather than cutting, so the building appears to change rather
 * than to be replaced.
 */
export function Transformation({
  stages,
  className,
}: {
  stages: { year: string; title: string; body: string; scene: SceneName; photo?: PhotoId }[];
  className?: string;
}) {
  const [i, setI] = useState(stages.length - 1);
  const stage = stages[i];

  return (
    <div className={className}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
        {stages.map((s, n) => (
          <div
            key={s.year}
            className="absolute inset-0"
            style={{
              opacity: n === i ? 1 : 0,
              transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <CityScene
              name={s.scene} photo={s.photo}
              className="h-full w-full"
            />
          </div>
        ))}
        <div className="scrim-bottom absolute inset-0" />
        <div className="film-grain absolute inset-0" />

        <p
          key={stage.year}
          className="absolute top-5 left-5 font-display text-[clamp(2.2rem,7vw,4.5rem)] leading-none font-semibold text-cream tabular-nums"
          style={{ animation: "fade-in 700ms ease both" }}
        >
          {stage.year}
        </p>
        <p className="absolute right-5 bottom-5 left-5 max-w-xl font-display text-lg leading-snug text-cream sm:text-xl">
          {stage.title}
        </p>
      </div>

      {/* The dates, as a track. */}
      <ol className="relative mt-6 flex justify-between">
        <span className="absolute inset-x-3 top-[7px] h-px bg-border" />
        <span
          className="absolute top-[7px] left-3 h-px bg-terracotta transition-[width] duration-500"
          style={{ width: `calc((100% - 1.5rem) * ${i / (stages.length - 1)})` }}
        />
        {stages.map((s, n) => (
          <li key={s.year} className="relative">
            <button
              type="button"
              onClick={() => setI(n)}
              aria-pressed={n === i}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={cn(
                  "block rounded-full ring-4 ring-background transition-all",
                  n === i
                    ? "size-3.5 bg-terracotta"
                    : n < i
                      ? "size-2.5 bg-terracotta/60"
                      : "size-2.5 bg-border group-hover:bg-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[0.62rem] tracking-[0.1em] tabular-nums transition-colors",
                  n === i ? "text-foreground" : "text-muted-foreground/60 group-hover:text-foreground",
                )}
              >
                {s.year}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p
        key={stage.body}
        className="mt-6 max-w-2xl text-[0.96rem] leading-relaxed text-muted-foreground"
        style={{ animation: "fade-in 600ms ease both" }}
      >
        {stage.body}
      </p>
    </div>
  );
}
