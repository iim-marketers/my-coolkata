"use client";

import { useMemo, useState } from "react";
import { Timeline } from "@/components/timeline";
import { eras, timeline } from "@/lib/kolkata";
import type { TimelineEntry } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

const MIN = 1490;
const MAX = 2026;

/**
 * Scrub a year and the timeline below it truncates. Era chips jump the
 * handle to the start of a period.
 */
export function TimelineSlider() {
  const [year, setYear] = useState(MAX);
  const [era, setEra] = useState<TimelineEntry["era"] | "all">("all");

  const shown = useMemo(
    () =>
      timeline.filter((e) => e.year <= year && (era === "all" || e.era === era)),
    [year, era],
  );

  const pct = ((year - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      <div className="rounded-lg border border-border bg-card p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
              Showing everything up to
            </p>
            <p className="mt-1 font-display text-[clamp(2.4rem,7vw,4rem)] leading-none font-semibold tabular-nums text-terracotta">
              {year}
            </p>
          </div>
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
            {shown.length} of {timeline.length} moments
          </p>
        </div>

        <div className="relative mt-7">
          {/* Tick for every entry, so the density of history is visible. */}
          <div className="pointer-events-none absolute inset-x-0 -top-3 h-3">
            {timeline.map((e) => (
              <span
                key={`${e.year}-${e.title}`}
                className={cn(
                  "absolute bottom-0 w-px",
                  e.year <= year ? "bg-terracotta" : "bg-border",
                  e.pivotal ? "h-3" : "h-1.5",
                )}
                style={{ left: `${((e.year - MIN) / (MAX - MIN)) * 100}%` }}
              />
            ))}
          </div>

          <input
            type="range"
            min={MIN}
            max={MAX}
            value={year}
            onChange={(ev) => setYear(Number(ev.target.value))}
            aria-label="Year"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-terracotta [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-terracotta"
            style={{
              background: `linear-gradient(to right, var(--terracotta) ${pct}%, var(--border) ${pct}%)`,
            }}
          />
          <div className="mt-2 flex justify-between font-mono text-[0.58rem] text-muted-foreground/60">
            <span>{MIN}</span>
            <span>{MAX}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEra("all");
              setYear(MAX);
            }}
            aria-pressed={era === "all"}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
              era === "all"
                ? "border-foreground/25 bg-secondary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            Everything
          </button>
          {eras.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => {
                setEra(e.id);
                setYear(MAX);
              }}
              aria-pressed={era === e.id}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
                era === e.id
                  ? "border-foreground/25 bg-secondary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {e.label}
              <span className="ml-2 text-muted-foreground/50">{e.span}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Timeline entries={[...shown].reverse()} />
      </div>
    </div>
  );
}
