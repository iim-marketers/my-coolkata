"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { mapPoints } from "@/lib/kolkata";
import type { MapPoint } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

const COLOUR: Record<MapPoint["kind"], string> = {
  heritage: "var(--terracotta)",
  neighbourhood: "var(--marigold)",
  river: "var(--verdigris)",
  station: "var(--indigo)",
  food: "var(--alta)",
};

const KINDS = [
  { id: "heritage", label: "Heritage" },
  { id: "neighbourhood", label: "Neighbourhoods" },
  { id: "river", label: "On the river" },
  { id: "station", label: "Stations" },
] as const;

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
                <span
                  className={cn("size-1.5 rounded-full", !on && "opacity-30")}
                  style={{ background: COLOUR[k.id] }}
                />
                {k.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        className={cn(
          "relative isolate w-full overflow-hidden rounded-lg border border-border bg-background",
          compact ? "aspect-square" : "aspect-[4/5] sm:aspect-[4/3]",
        )}
        onMouseLeave={() => setActive(null)}
      >
        <PinMap
          pins={visible.map<MapPin>((p) => ({
            id: p.id,
            lat: p.coords.lat,
            lng: p.coords.lng,
            colour: COLOUR[p.kind],
            title: p.name,
            size: active?.id === p.id ? "lg" : "md",
            active: active?.id === p.id,
          }))}
          onPinActivate={(id) =>
            setActive(visible.find((p) => p.id === id) ?? null)
          }
        />

        {/* Readout, above the attribution so it never covers the credit. */}
        <div className="pointer-events-none absolute inset-x-3 bottom-7 z-1000">
          <div
            className={cn(
              "rounded-md border border-border bg-card/95 p-3.5 backdrop-blur transition-opacity duration-200",
              active ? "pointer-events-auto opacity-100" : "opacity-0",
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
                Hover or tap a point.
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
        {visible.length} points · pinch or use + / − to zoom
      </p>
    </div>
  );
}
