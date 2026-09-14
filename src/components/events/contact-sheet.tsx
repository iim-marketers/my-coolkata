"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Camera, Check, Clapperboard } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import { contestThemes, currentSeason, pad } from "@/lib/kolkata/contest";
import { cn } from "@/lib/utils";

/**
 * Suggested paras, laid out like a photographer's contact sheet. Picking a
 * frame rings it in red grease pencil, the way a keeper gets marked, and the
 * brief for that para opens alongside. Any other neighbourhood can be entered.
 */
export function ContactSheet() {
  const [picked, setPicked] = useState(0);
  const theme = contestThemes[picked];

  return (
    <div className="sticky-split grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
      <div className="rounded-2xl bg-ink p-3 shadow-[0_30px_60px_-35px_oklch(0.2_0.03_265/0.7)] sm:p-5">
        <div className="mb-3 flex justify-between px-1 font-mono text-[0.54rem] tracking-[0.24em] text-marigold/80 uppercase">
          <span>Kolkata 400 · Coolkata</span>
          <span>Season {pad(currentSeason.number)}</span>
        </div>
        <ul className="grid grid-cols-2 gap-x-2.5 gap-y-3 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4">
          {contestThemes.map((t, i) => {
            const on = i === picked;
            return (
              <li key={t.slug}>
                <button
                  type="button"
                  onClick={() => setPicked(i)}
                  aria-pressed={on}
                  data-picked={on}
                  className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marigold"
                >
                  <span className="relative block">
                    <CityScene
                      photo={t.photo}
                      sizes="(max-width: 640px) 50vw, 220px"
                      className={cn(
                        "aspect-4/3 w-full rounded-[3px] transition-[filter] duration-500",
                        !on && "grayscale-[65%] group-hover:grayscale-0",
                      )}
                    />
                    <svg
                      viewBox="0 0 100 75"
                      preserveAspectRatio="none"
                      aria-hidden
                      className="pointer-events-none absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] overflow-visible"
                    >
                      <path
                        className="grease-draw"
                        pathLength={1}
                        d="M52 4C80 2 97 16 96 37C95 61 72 72 46 71C19 70 3 57 4 36C5 15 27 4 60 6"
                        fill="none"
                        stroke="var(--alta)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {on ? (
                      <span className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-alta text-khadi shadow">
                        <Check className="size-3.5" />
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 flex items-baseline justify-between gap-2 font-mono text-[0.52rem] tracking-[0.14em] uppercase">
                    <span
                      className={cn(
                        "truncate",
                        on ? "text-khadi" : "text-khadi/60",
                      )}
                    >
                      {t.name}
                    </span>
                    <span className="text-marigold/80">{pad(i + 1)}A</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-dashed border-khadi/15 px-1 pt-3 text-[0.8rem] text-khadi/70">
          <span>Not on the sheet? Any para in Kolkata counts.</span>
          <Link
            href="/neighbourhoods"
            className="font-mono text-[0.56rem] tracking-[0.18em] text-marigold uppercase hover:text-khadi"
          >
            Browse neighbourhoods →
          </Link>
        </p>
      </div>

      <div>
        <div
          key={theme.slug}
          aria-live="polite"
          className="rounded-[1.5rem] border border-border bg-card p-7 shadow-sm sm:p-8"
          style={{ animation: "rise-in 450ms ease both" }}
        >
          <p
            lang="bn"
            className="mt-3 font-bangla-display text-[clamp(2.4rem,5vw,3.4rem)] leading-[1.1] text-alta"
          >
            {theme.bengali}
          </p>
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-tight">
            {theme.name}
          </h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-muted-foreground">
            {theme.prompt}
          </p>

          <div className="mt-6 space-y-3 border-t border-dashed border-border pt-5 text-[0.9rem] leading-snug">
            <p className="flex gap-3">
              <Camera className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">Photo idea: </span>
                {theme.photoIdea}
              </span>
            </p>
            <p className="flex gap-3">
              <Clapperboard className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">Video idea: </span>
                {theme.videoIdea}
              </span>
            </p>
          </div>

          <Link
            href={theme.href}
            className="group mt-7 inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-[0.86rem] font-semibold text-primary transition-colors hover:border-primary"
          >
            Scout {theme.name} first
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
