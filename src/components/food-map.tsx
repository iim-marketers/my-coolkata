"use client";

import { useMemo, useState } from "react";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { foodPlaceKinds, foodPlaces } from "@/lib/kolkata/food-places";
import type { FoodPlace, FoodPlaceKind } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** Every place worth eating at, plotted, and filterable by kind. */
export function FoodMap({ className }: { className?: string }) {
  const [on, setOn] = useState<Set<FoodPlaceKind>>(
    () => new Set(foodPlaceKinds.map((k) => k.id)),
  );
  const [active, setActive] = useState<FoodPlace | null>(null);

  const visible = useMemo(() => foodPlaces.filter((p) => on.has(p.kind)), [on]);
  const kindOf = (id: FoodPlaceKind) => foodPlaceKinds.find((k) => k.id === id);

  const toggle = (id: FoodPlaceKind) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12", className)}>
      <div>
        <ul className="mb-4 flex flex-wrap gap-2">
          {foodPlaceKinds.map((k) => {
            const enabled = on.has(k.id);
            return (
              <li key={k.id}>
                <button
                  type="button"
                  onClick={() => toggle(k.id)}
                  aria-pressed={enabled}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase transition-colors",
                    enabled
                      ? "border-foreground/25 bg-secondary text-foreground"
                      : "border-border text-muted-foreground/60 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn("size-2 rounded-full", !enabled && "opacity-30")}
                    style={{ background: k.dot }}
                  />
                  {k.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-background sm:aspect-square"
          onMouseLeave={() => setActive(null)}
        >
          <PinMap
            pins={visible.map<MapPin>((p) => ({
              id: p.id,
              lat: p.coords.lat,
              lng: p.coords.lng,
              colour: kindOf(p.kind)?.dot ?? "var(--terracotta)",
              title: p.name,
              size: active?.id === p.id ? "lg" : "sm",
              active: active?.id === p.id,
            }))}
            onPinActivate={(id) =>
              setActive(visible.find((p) => p.id === id) ?? null)
            }
          />
        </div>
        <p className="mt-3 font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
          {visible.length} places · pinch or use + / − to zoom
        </p>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        {active ? (
          <div className="rounded-lg border border-border bg-card p-6">
            <p
              className="font-mono text-[0.56rem] tracking-[0.2em] uppercase"
              style={{ color: kindOf(active.kind)?.dot }}
            >
              {kindOf(active.kind)?.label}
              {active.since ? ` · since ${active.since}` : ""}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold">
              {active.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{active.where}</p>
            <p className="mt-5 border-t border-border pt-4 text-[0.92rem]">
              <span className="font-mono text-[0.54rem] tracking-[0.16em] text-terracotta uppercase">
                Order
              </span>
              <br />
              {active.order}
            </p>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">
              {active.note}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6">
            <p className="font-display text-lg font-semibold">
              {foodPlaces.length} places, six categories
            </p>
            <ul className="mt-5 space-y-3">
              {foodPlaceKinds.map((k) => (
                <li key={k.id} className="flex gap-3 border-t border-border pt-3">
                  <span
                    className="mt-1.5 size-2 shrink-0 rounded-full"
                    style={{ background: k.dot }}
                  />
                  <span>
                    <span className="text-[0.88rem] font-medium">{k.label}</span>
                    <span className="block text-[0.82rem] leading-snug text-muted-foreground">
                      {k.line}
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
