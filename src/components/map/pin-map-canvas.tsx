"use client";

import L, { type LatLngTuple, type LeafletEventHandlerFnMap } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, Polyline, useMap } from "react-leaflet";
import type { MapPin, PinMapProps } from "@/components/map/pin-map";
import { CITY_LATLNG_BOUNDS, RealMap } from "@/components/map/real-map";

export default function PinMapCanvas({
  pins,
  line,
  lineDashed,
  lineOpacity = 1,
  maxZoom = 15,
  refit,
  onPinActivate,
}: PinMapProps) {
  const framed = frame(pins, line);

  return (
    <RealMap
      bounds={framed ?? CITY_LATLNG_BOUNDS}
      boundsOptions={{ padding: PADDING, maxZoom }}
    >
      {refit ? (
        <Refit frameKey={JSON.stringify(framed ?? null)} maxZoom={maxZoom} />
      ) : null}
      {line && line.length > 1 ? (
        // `className` must be a prop: Leaflet reads it only when building the
        // path, and react-leaflet applies `pathOptions` afterwards.
        <Polyline
          positions={line}
          className="stroke-terracotta"
          interactive={false}
          pathOptions={{
            weight: 2.5,
            opacity: lineOpacity,
            dashArray: lineDashed ? "6 5" : undefined,
            lineJoin: "round",
          }}
        />
      ) : null}
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={pinIcon(pin)}
          title={pin.title}
          keyboard={Boolean(onPinActivate)}
          zIndexOffset={pin.active ? 1000 : 0}
          eventHandlers={handlers(pin, onPinActivate)}
        />
      ))}
    </RealMap>
  );
}

const PADDING: [number, number] = [32, 32];

function frame(pins: MapPin[], line?: [number, number][]) {
  const points: LatLngTuple[] = [
    ...pins.filter((p) => !p.dim).map<LatLngTuple>((p) => [p.lat, p.lng]),
    ...(line ?? []),
  ];
  return points.length ? points : undefined;
}

// Keyed on the serialised frame so restyling a pin (hover) never moves the map.
function Refit({ frameKey, maxZoom }: { frameKey: string; maxZoom: number }) {
  const map = useMap();
  const opened = useRef(false);
  useEffect(() => {
    if (!opened.current) {
      opened.current = true;
      return;
    }
    const points = JSON.parse(frameKey) as LatLngTuple[] | null;
    map.fitBounds(points ?? CITY_LATLNG_BOUNDS, { padding: PADDING, maxZoom });
  }, [map, frameKey, maxZoom]);
  return null;
}

function handlers(
  pin: MapPin,
  onPinActivate?: (id: string) => void,
): LeafletEventHandlerFnMap {
  if (!onPinActivate || pin.dim) return {};
  const activate = () => onPinActivate(pin.id);
  return { mouseover: activate, click: activate };
}

const SIZE = { sm: "size-2", md: "size-2.5", lg: "size-3.5", xl: "size-4" };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// A two-tier chala roof with a pennant, three lit arches and a string of lights.
const GLYPHS = {
  pandal: `<svg viewBox="0 0 24 24" class="size-6.5" aria-hidden="true"><path d="M12 .9v3" stroke="var(--ink)" stroke-width="1" stroke-linecap="round"/><path d="M12.3 1.1 15.4 2l-3.1.9z" fill="var(--terracotta)"/><path d="M6.4 9.3C8.6 7.9 10.5 5.9 12 3.7c1.5 2.2 3.4 4.2 5.6 5.6.2.2 0 .5-.3.4-1.9-.6-3.6-1-5.3-1s-3.4.4-5.3 1c-.3.1-.5-.2-.3-.4Z" fill="var(--ink)"/><path d="M1.9 14.1C5.6 12.5 9 10.3 12 7.6c3 2.7 6.4 4.9 10.1 6.5.3.1.2.6-.1.6-3.4-.6-6.7-1-10-1s-6.6.4-10 1c-.3 0-.4-.5-.1-.6Z" fill="var(--ink)"/><path d="M4.4 13.9C7 13.5 9.5 13.3 12 13.3s5 .2 7.6.6V21H4.4Z" fill="var(--ink)"/><path d="M10 21v-3.3a2 2 0 0 1 4 0V21zM6.3 21v-2.4a1.3 1.3 0 0 1 2.6 0V21zM15.1 21v-2.4a1.3 1.3 0 0 1 2.6 0V21z" fill="var(--marigold)"/><g fill="var(--marigold)"><circle cx="6.6" cy="15.3" r=".55"/><circle cx="9.3" cy="14.9" r=".55"/><circle cx="12" cy="14.8" r=".55"/><circle cx="14.7" cy="14.9" r=".55"/><circle cx="17.4" cy="15.3" r=".55"/></g><path d="M3 21h18v1.6H3z" fill="var(--ink)"/></svg>`,
};

const icons = new Map<string, L.DivIcon>();

function pinIcon(pin: MapPin) {
  const { colour, size = "md", active, dim, label, showLabel, number, glyph } = pin;
  const key = JSON.stringify([colour, size, active, dim, label, showLabel, number, glyph]);
  const cached = icons.get(key);
  if (cached) return cached;

  const bg = `style="background:${escape(colour)}"`;
  let html: string;
  let box: [number, number];
  let anchor: [number, number] | undefined;

  if (glyph && active) {
    // A teardrop: a 40px square with three round corners, turned so the
    // sharp one points down. Its tip sits 28px below the centre.
    box = [44, 52];
    anchor = [22, 50];
    const name = label
      ? `<span class="pointer-events-none absolute top-[54px] left-1/2 -translate-x-1/2 rounded-sm bg-white/90 px-1 font-mono text-[0.5rem] tracking-[0.08em] whitespace-nowrap text-foreground shadow-sm sm:text-[0.56rem]">${escape(label)}</span>`
      : "";
    html = `<span class="relative block size-full"><span class="absolute top-[46px] left-1/2 size-2 -translate-x-1/2 animate-ping rounded-full opacity-60" ${bg}></span><span class="absolute inset-0 origin-[22px_50px] animate-in duration-300 ease-out fade-in zoom-in-50"><span class="absolute top-0.5 left-0.5 grid size-10 -rotate-45 place-items-center rounded-[50%_50%_50%_0] shadow-[0_0_0_2px_#fff,0_8px_14px_-4px_rgb(0_0_0/0.35)]" ${bg}><span class="grid size-8 rotate-45 place-items-center rounded-full bg-cream">${GLYPHS[glyph]}</span></span></span>${name}</span>`;
  } else if (number !== undefined) {
    box = [24, 24];
    html = `<span class="grid size-6 place-items-center rounded-full font-mono text-[0.58rem] font-semibold text-white shadow-sm ring-2 ring-white" ${bg}>${number}</span>`;
  } else {
    box = [28, 28];
    const ping = active
      ? `<span class="absolute size-8 animate-ping rounded-full opacity-30" ${bg}></span>`
      : "";
    const name = label
      ? `<span class="pointer-events-none absolute top-full left-1/2 -mt-1 -translate-x-1/2 rounded-sm bg-white/85 px-1 font-mono text-[0.5rem] tracking-[0.08em] whitespace-nowrap text-foreground transition-opacity sm:text-[0.56rem] ${
          showLabel ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }">${escape(label)}</span>`
      : "";
    html = `<span class="group relative grid size-7 place-items-center transition-opacity ${
      dim ? "pointer-events-none opacity-15" : ""
    }">${ping}<span class="block rounded-full shadow-sm ring-2 ring-white transition-all duration-200 ${SIZE[size]}" ${bg}></span>${name}</span>`;
  }

  const icon = L.divIcon({ className: "", iconSize: box, iconAnchor: anchor, html });
  icons.set(key, icon);
  return icon;
}
