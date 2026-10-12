"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { directionsUrl } from "@/lib/geo";
import { pandals } from "@/lib/kolkata/pandals";
import type { Pandal, PandalZone } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

export const ZONES: { id: PandalZone; label: string; colour: string }[] = [
  { id: "north", label: "North", colour: "var(--terracotta)" },
  { id: "central", label: "Central", colour: "var(--indigo)" },
  { id: "south", label: "South", colour: "var(--marigold)" },
  { id: "east", label: "Lake Town & Salt Lake", colour: "var(--verdigris)" },
  { id: "bonedi", label: "Bonedi bari & Belur", colour: "var(--kansa-deep)" },
];

export const zoneColour = (zone: PandalZone) =>
  ZONES.find((z) => z.id === zone)?.colour ?? "var(--terracotta)";

export function PandalMap({ year, className }: { year: number; className?: string }) {
  const [zone, setZone] = useState<PandalZone | "all">("all");
  const [active, setActive] = useState<string | null>(null);
  const list = useRef<HTMLOListElement>(null);

  const visible = useMemo(
    () => (zone === "all" ? pandals : pandals.filter((p) => p.zone === zone)),
    [zone],
  );
  const current = visible.find((p) => p.slug === active) ?? null;

  // Scrolls only inside the list when it is its own scroll box, never the page.
  const reveal = (slug: string) => {
    const box = list.current;
    const item = box?.querySelector<HTMLElement>(`[data-slug="${slug}"]`);
    if (!box || !item || box.scrollHeight <= box.clientHeight) return;
    const top = item.offsetTop;
    if (top < box.scrollTop || top + item.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTo({ top: top - 12, behavior: "smooth" });
    }
  };

  const chips: { id: PandalZone | "all"; label: string; colour?: string }[] = [
    { id: "all", label: "All" },
    ...ZONES,
  ];

  return (
    <div className={className}>
      <div className="mb-5 flex flex-wrap gap-2">
        {chips.map((c) => {
          const on = zone === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setZone(c.id);
                setActive(null);
              }}
              aria-pressed={on}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase transition-colors",
                on
                  ? "border-foreground/25 bg-secondary text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c.colour ? (
                <span className="size-1.5 rounded-full" style={{ background: c.colour }} />
              ) : null}
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-background sm:aspect-[4/3] lg:aspect-auto lg:h-[44rem]">
          <PinMap
            pins={visible.map<MapPin>((p) => ({
              id: p.slug,
              lat: p.coords.lat,
              lng: p.coords.lng,
              colour: zoneColour(p.zone),
              title: p.name,
              label: p.name,
              showLabel: p.slug === active,
              size: p.slug === active ? "lg" : "md",
              active: p.slug === active,
              glyph: "pandal",
            }))}
            maxZoom={16}
            refit
            onPinActivate={(slug) => {
              setActive(slug);
              reveal(slug);
            }}
          />

          {current ? (
            <div className="absolute inset-x-3 bottom-7 z-1000 rounded-md border border-border bg-card/95 p-3.5 backdrop-blur lg:hidden">
              <PandalSummary pandal={current} year={year} />
            </div>
          ) : null}
        </div>

        <ol
          ref={list}
          className="relative divide-y divide-border rounded-lg border border-border lg:h-[44rem] lg:overflow-y-auto"
        >
          {visible.map((p) => (
            <li
              key={p.slug}
              data-slug={p.slug}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={cn(
                "px-4 py-4 transition-colors",
                p.slug === active && "bg-secondary/70",
              )}
            >
              <PandalSummary pandal={p} year={year} />
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-3 font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
        {visible.length} pandals · tap a pin or a name · pinch or use + / − to zoom
      </p>
    </div>
  );
}

function PandalSummary({ pandal: p, year }: { pandal: Pandal; year: number }) {
  const theme = p.themes?.[year];

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-base leading-tight font-semibold">{p.name}</p>
          <p className="mt-1 flex items-center gap-2 font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: zoneColour(p.zone) }}
            />
            {p.area}
            {p.since ? ` · Since ${p.since}` : null}
          </p>
        </div>
        <a
          href={directionsUrl(p.coords)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.56rem] tracking-[0.16em] text-primary uppercase hover:underline"
        >
          Directions
          <ArrowUpRight className="size-3" />
        </a>
      </div>
      <p className="mt-2 text-[0.84rem] leading-relaxed text-muted-foreground">{p.note}</p>
      {theme?.theme ? (
        <p className="mt-2 text-[0.8rem]">
          <span className="font-mono text-[0.54rem] tracking-[0.16em] text-terracotta uppercase">
            {year} theme
          </span>{" "}
          {theme.theme}
          {theme.artist ? <span className="text-muted-foreground"> · {theme.artist}</span> : null}
        </p>
      ) : null}
    </>
  );
}
