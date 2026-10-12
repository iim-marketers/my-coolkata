"use client";

import { useState } from "react";
import { ArrowUpRight, Route } from "lucide-react";
import { PinMap } from "@/components/map/pin-map";
import { zoneColour } from "@/components/pandal-map";
import { distanceKm, walkingRouteUrl } from "@/lib/geo";
import { pandalRoutes, pandals } from "@/lib/kolkata/pandals";
import type { Pandal } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

const bySlug = new Map(pandals.map((p) => [p.slug, p]));

export function PandalRoutes({ className }: { className?: string }) {
  const [slug, setSlug] = useState(pandalRoutes[0]?.slug);
  const route = pandalRoutes.find((r) => r.slug === slug) ?? pandalRoutes[0];
  if (!route) return null;

  const stops = route.stops
    .map((s) => bySlug.get(s))
    .filter((p): p is Pandal => Boolean(p));
  const legs = stops.slice(1).map((p, i) => distanceKm(stops[i].coords, p.coords));
  const total = legs.reduce((a, b) => a + b, 0);

  return (
    <div className={className}>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Routes">
        {pandalRoutes.map((r) => {
          const on = r.slug === route.slug;
          return (
            <button
              key={r.slug}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setSlug(r.slug)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors",
                on
                  ? "border-terracotta/60 bg-terracotta/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {r.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
            {route.best}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{route.title}</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
            {route.note}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
            <Stat label="Stops" value={String(stops.length)} />
            <Stat label="Straight line" value={total.toFixed(1)} unit="km" />
            <Stat label="Allow" value={route.duration} />
          </div>

          <ol className="mt-7 space-y-3">
            {stops.map((p, i) => (
              <li key={p.slug} className="flex gap-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-terracotta/50 font-mono text-[0.58rem] text-terracotta">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{p.name}</span>
                    {i > 0 ? (
                      <span className="shrink-0 font-mono text-[0.58rem] text-muted-foreground/70">
                        <Route className="mr-1 inline size-3" />
                        {legs[i - 1].toFixed(1)} km
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{p.area}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={walkingRouteUrl(stops.map((p) => p.coords))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 border-b border-terracotta/40 pb-1.5 font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase transition-colors hover:border-terracotta"
          >
            Open the route in Google Maps
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div>
          <div className="relative isolate aspect-square w-full overflow-hidden rounded-lg border border-border bg-background">
            <PinMap
              pins={stops.map((p, i) => ({
                id: p.slug,
                lat: p.coords.lat,
                lng: p.coords.lng,
                colour: zoneColour(p.zone),
                title: p.name,
                number: i + 1,
              }))}
              line={stops.map<[number, number]>((p) => [p.coords.lat, p.coords.lng])}
              lineDashed
              maxZoom={16}
              refit
            />
          </div>
          <p className="mt-4 text-[0.76rem] leading-relaxed text-muted-foreground/70">
            Distances are straight-line, and the roads around the big pandals are
            barricaded into one-way queues during Puja. The real walk is longer,
            and the queues are most of the time.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
        {value}
        {unit ? <span className="ml-1 text-sm text-muted-foreground">{unit}</span> : null}
      </p>
    </div>
  );
}
