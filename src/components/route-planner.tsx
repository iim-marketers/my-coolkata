"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Route, X } from "lucide-react";
import { KolkataMap } from "@/components/kolkata-map";
import { mapPoints, project } from "@/lib/kolkata";
import type { Coords, MapPoint } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** Haversine, in kilometres. Straight-line, so the real walk is longer. */
function distanceKm(a: Coords, b: Coords) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Nearest-neighbour from the first pick. Not optimal, but legible. */
function order(points: MapPoint[]) {
  if (points.length < 3) return points;
  const remaining = points.slice(1);
  const path = [points[0]];
  while (remaining.length) {
    const from = path[path.length - 1];
    let best = 0;
    let bestD = Infinity;
    remaining.forEach((p, i) => {
      const d = distanceKm(from.coords, p.coords);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    path.push(remaining.splice(best, 1)[0]);
  }
  return path;
}

const SELECTABLE = mapPoints.filter(
  (p) => p.kind === "heritage" || p.kind === "neighbourhood",
);

export function RoutePlanner({ className }: { className?: string }) {
  const [picked, setPicked] = useState<string[]>([
    "howrah-bridge",
    "kumartuli",
    "college-street",
  ]);

  const route = useMemo(() => {
    const chosen = picked
      .map((id) => SELECTABLE.find((p) => p.id === id))
      .filter((p): p is MapPoint => Boolean(p));
    return order(chosen);
  }, [picked]);

  const legs = route.slice(1).map((p, i) => distanceKm(route[i].coords, p.coords));
  const total = legs.reduce((a, b) => a + b, 0);
  // 4.5 km/h on foot, plus twenty minutes standing at each stop.
  const minutes = Math.round((total / 4.5) * 60 + route.length * 20);

  const toggle = (id: string) =>
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1fr_1.1fr]", className)}>
      <div>
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          Build a route
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold">
          Pick your stops
        </h3>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
          Choose anything. The order is worked out by proximity from your first
          pick, so start with whichever end of the city you are staying in.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {SELECTABLE.map((p) => {
            const on = picked.includes(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors",
                    on
                      ? "border-terracotta/60 bg-terracotta/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  {on ? <X className="size-3" /> : <Plus className="size-3" />}
                  {p.name}
                </button>
              </li>
            );
          })}
        </ul>

        {route.length > 1 ? (
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-5">
            <div>
              <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Stops
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                {route.length}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Straight line
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                {total.toFixed(1)}
                <span className="ml-1 text-sm text-muted-foreground">km</span>
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                Allow
              </p>
              <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                {Math.floor(minutes / 60)}
                <span className="mx-0.5 text-sm text-muted-foreground">h</span>
                {String(minutes % 60).padStart(2, "0")}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-background">
          <KolkataMap id="rp" />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {route.length > 1 ? (
              <polyline
                points={route
                  .map((p) => {
                    const { x, y } = project(p.coords);
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="0.7"
                strokeDasharray="2 1.4"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </svg>

          {route.map((p, i) => {
            const { x, y } = project(p.coords);
            return (
              <span
                key={p.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terracotta font-mono text-[0.58rem] font-semibold text-white ring-2 ring-background"
              >
                {i + 1}
              </span>
            );
          })}

          {route.length === 0 ? (
            <p className="absolute inset-0 grid place-items-center px-8 text-center text-[0.86rem] text-muted-foreground">
              Pick a stop to start a route.
            </p>
          ) : null}
        </div>

        {route.length > 0 ? (
          <ol className="mt-5 space-y-3">
            {route.map((p, i) => (
              <li key={p.id} className="flex gap-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-terracotta/50 font-mono text-[0.58rem] text-terracotta">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    {p.href ? (
                      <Link href={p.href} className="text-sm font-medium hover:text-primary">
                        {p.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium">{p.name}</span>
                    )}
                    {i > 0 ? (
                      <span className="shrink-0 font-mono text-[0.58rem] text-muted-foreground/70">
                        <Route className="mr-1 inline size-3" />
                        {legs[i - 1].toFixed(1)} km
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{p.note}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        <p className="mt-5 text-[0.76rem] leading-relaxed text-muted-foreground/70">
          Distances are straight-line. Kolkata&rsquo;s streets are not, and the real
          walk is usually a third longer. Take the Metro for anything over three
          kilometres.
        </p>
      </div>
    </div>
  );
}
