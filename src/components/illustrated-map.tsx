"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { neighbourhoods, zones } from "@/lib/kolkata";
import type { Neighbourhood, Zone } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/**
 * The signature map: the city divided into five quarters, with every
 * neighbourhood pinned at its real coordinates. Choosing a zone frames its
 * pins; hovering or tapping a pin opens the quarter.
 */
export function IllustratedMap({
  className,
  initial,
}: {
  className?: string;
  initial?: string;
}) {
  const [zone, setZone] = useState<Zone | "all">("all");
  const [active, setActive] = useState<Neighbourhood | null>(
    () => neighbourhoods.find((n) => n.slug === initial) ?? null,
  );

  const visible = useMemo(
    () =>
      zone === "all"
        ? neighbourhoods
        : neighbourhoods.filter((n) => n.zone === zone),
    [zone],
  );

  const zoneOf = (id: Zone) => zones.find((z) => z.id === id);

  // Every quarter, at its real coordinates. Zone names live in the chips
  // above: floated over the tiles, they collided with each other and the
  // pins at city zoom.
  const pins = neighbourhoods.map<MapPin>((n) => {
    const isActive = active?.slug === n.slug;
    return {
      id: n.slug,
      lat: n.coords.lat,
      lng: n.coords.lng,
      colour: zoneOf(n.zone)?.tone ?? "var(--terracotta)",
      title: n.name,
      size: isActive ? "xl" : "md",
      active: isActive,
      dim: !visible.includes(n),
      // Names appear once a zone is chosen, or on hover.
      label: n.name,
      showLabel: zone !== "all" || isActive,
    };
  });

  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12",
        className,
      )}
    >
      <div>
        {/* Zone filter. */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setZone("all")}
            aria-pressed={zone === "all"}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
              zone === "all"
                ? "border-foreground/25 bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All {neighbourhoods.length}
          </button>
          {zones.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setZone(z.id)}
              aria-pressed={zone === z.id}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors",
                zone === z.id
                  ? "border-foreground/25 bg-secondary text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: z.tone }}
              />
              {z.label}
            </button>
          ))}
        </div>

        <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-background sm:aspect-[5/4]">
          <PinMap
            pins={pins}
            refit
            onPinActivate={(id) =>
              setActive(neighbourhoods.find((n) => n.slug === id) ?? null)
            }
          />
        </div>

        <p className="mt-3 font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
          {visible.length} quarters · pinch or use + / − to zoom
        </p>
      </div>

      {/* The readout. */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {active ? (
          <article className="rounded-lg border border-border bg-card p-6 sm:p-7">
            <p
              className="font-mono text-[0.58rem] tracking-[0.24em] uppercase"
              style={{ color: zoneOf(active.zone)?.tone }}
            >
              {zoneOf(active.zone)?.label}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold">
              {active.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground" lang="bn">
              {active.bengali}
            </p>
            <p className="mt-5 font-display text-[1.12rem] leading-snug text-terracotta italic">
              {active.tagline}
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
              {active.summary}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                  Known for
                </dt>
                <dd className="mt-1 text-[0.84rem]">{active.knownFor}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                  Best hour
                </dt>
                <dd className="mt-1 text-[0.84rem]">{active.bestHour}</dd>
              </div>
            </dl>

            {/* A taste of each facet the quarter page carries. */}
            <ul className="mt-6 grid gap-2.5 border-t border-border pt-5">
              {[
                [
                  "Buildings",
                  active.buildings.length,
                  active.buildings[0]?.name,
                ],
                ["Places to eat", active.eats.length, active.eats[0]?.name],
                [
                  "Things to see",
                  active.thingsToSee.length,
                  active.thingsToSee[0]?.name,
                ],
              ].map(([label, count, first]) => (
                <li
                  key={String(label)}
                  className="flex items-baseline gap-3 text-[0.84rem]"
                >
                  <span className="w-28 shrink-0 font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                    {label}
                  </span>
                  <span className="text-muted-foreground">
                    {count} <span className="text-muted-foreground/50">·</span>{" "}
                    {first}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={`/neighbourhoods/${active.slug}`}
              className="group mt-7 inline-flex items-center gap-2 border-b border-terracotta/40 pb-1 font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase transition-colors hover:border-terracotta"
            >
              Open {active.name}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <p className="font-display text-lg font-semibold">Pick a quarter</p>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
              {neighbourhoods.length} of them, in five zones. Hover a dot, or
              filter by zone to see the names.
            </p>
            <ul className="mt-6 space-y-2 text-left">
              {zones.map((z) => (
                <li key={z.id} className="flex gap-3">
                  <span
                    className="mt-2.5 size-2 shrink-0 rounded-full"
                    style={{ background: z.tone }}
                  />
                  <span>
                    <span className="text-[0.86rem] font-medium">
                      {z.label}
                    </span>
                    <span className="block text-[0.8rem] leading-snug text-muted-foreground">
                      {z.blurb}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
