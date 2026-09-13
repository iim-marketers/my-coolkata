"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { KolkataMap } from "@/components/kolkata-map";
import { CITY_BOUNDS, mapPoints, project } from "@/lib/kolkata";
import type { MapPoint } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

const KINDS = [
  { id: "heritage", label: "Heritage", dot: "bg-terracotta" },
  { id: "neighbourhood", label: "Neighbourhoods", dot: "bg-marigold" },
  { id: "river", label: "On the river", dot: "bg-verdigris" },
  { id: "station", label: "Stations", dot: "bg-alta" },
] as const;

const DOT: Record<MapPoint["kind"], string> = {
  heritage: "bg-terracotta",
  neighbourhood: "bg-marigold",
  river: "bg-verdigris",
  station: "bg-alta",
  food: "bg-alta",
};

export function InteractiveMap({
  points = mapPoints,
  className,
  compact = false,
}: {
  points?: MapPoint[];
  className?: string;
  compact?: boolean;
}) {
  const [enabled, setEnabled] = useState<Set<string>>(
    () => new Set(KINDS.map((k) => k.id)),
  );
  const [active, setActive] = useState<MapPoint | null>(null);

  const visible = useMemo(
    () => points.filter((p) => enabled.has(p.kind)),
    [points, enabled],
  );

  const toggle = (id: string) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={className}>
      {!compact ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {KINDS.map((k) => {
            const on = enabled.has(k.id);
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => toggle(k.id)}
                aria-pressed={on}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase transition-colors",
                  on
                    ? "border-foreground/25 bg-secondary text-foreground"
                    : "border-border text-muted-foreground/60 hover:text-foreground",
                )}
              >
                <span className={cn("size-1.5 rounded-full", k.dot, !on && "opacity-30")} />
                {k.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border border-border bg-background",
          compact ? "aspect-square" : "aspect-[4/5] sm:aspect-[4/3]",
        )}
        onMouseLeave={() => setActive(null)}
      >
        <KolkataMap />

        {/* Compass and scale, because a map should say which way is up. */}
        <div className="pointer-events-none absolute top-4 right-4 text-right">
          <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground/60">
            N ↑
          </p>
          <p className="mt-1 font-mono text-[0.55rem] text-muted-foreground/40">
            {CITY_BOUNDS.south}°–{CITY_BOUNDS.north}° N
          </p>
        </div>

        {visible.map((point) => {
          const { x, y } = project(point.coords);
          const isActive = active?.id === point.id;
          return (
            <button
              key={point.id}
              type="button"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setActive(point)}
              onFocus={() => setActive(point)}
              onClick={() => setActive(point)}
              aria-label={point.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none"
            >
              <span
                className={cn(
                  "block rounded-full ring-2 ring-background transition-all duration-200",
                  DOT[point.kind],
                  isActive ? "size-3.5" : "size-2 group-hover:size-3",
                )}
              />
              {isActive ? (
                <span className={cn("absolute inset-0 -z-10 m-auto size-8 animate-ping rounded-full opacity-30", DOT[point.kind])} />
              ) : null}
            </button>
          );
        })}

        {/* Readout, pinned to the corner so it never covers the point. */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3">
          <div
            className={cn(
              "pointer-events-auto rounded-md border border-border bg-card/95 p-3.5 backdrop-blur transition-opacity duration-200",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            {active ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-base leading-tight font-semibold">
                    {active.name}
                  </p>
                  <p className="shrink-0 font-mono text-[0.58rem] text-muted-foreground/70">
                    {active.coords.lat.toFixed(4)}, {active.coords.lng.toFixed(4)}
                  </p>
                </div>
                <p className="mt-1 text-[0.82rem] text-muted-foreground">
                  {active.note}
                </p>
                {active.href ? (
                  <Link
                    href={active.href}
                    className="mt-2 inline-block font-mono text-[0.6rem] tracking-[0.18em] text-primary uppercase hover:underline"
                  >
                    Open →
                  </Link>
                ) : null}
              </>
            ) : (
              <p className="text-[0.82rem] text-muted-foreground">
                Hover a point.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
        {visible.length} points · equirectangular sketch, not to scale
      </p>
    </div>
  );
}
