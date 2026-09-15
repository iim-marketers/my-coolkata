"use client";

import L, { type LatLngTuple, type LeafletEventHandlerFnMap } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, Polyline, useMap } from "react-leaflet";
import type { MapPin, PinMapProps } from "@/components/map/pin-map";
import { CITY_LATLNG_BOUNDS, RealMap } from "@/components/map/real-map";

/** Leaflet half of `PinMap`; load with `ssr: false`. */
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
        // Leaflet writes stroke as an attribute and the class wins over it.
        // It goes on as a prop: Leaflet only reads `className` when it
        // builds the path, and react-leaflet applies `pathOptions` after.
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

/** The points worth framing: undimmed pins and the line. */
function frame(pins: MapPin[], line?: [number, number][]) {
  const points: LatLngTuple[] = [
    ...pins.filter((p) => !p.dim).map<LatLngTuple>((p) => [p.lat, p.lng]),
    ...(line ?? []),
  ];
  return points.length ? points : undefined;
}

/**
 * Re-frames when the framed points change. Keyed on their serialised form,
 * so a hover that only restyles a pin never moves the map. The first run
 * is skipped: the map already opened on these bounds.
 */
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
  // Leaflet turns Enter on a focused marker into a click.
  const activate = () => onPinActivate(pin.id);
  return { mouseover: activate, click: activate };
}

const SIZE = { sm: "size-2", md: "size-2.5", lg: "size-3.5", xl: "size-4" };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const icons = new Map<string, L.DivIcon>();

/**
 * Pins are HTML for Leaflet, cached by appearance so react-leaflet only
 * swaps an icon that actually changed. Each pin fills its icon box, which
 * Leaflet centres on the point, so the marker element itself is the hover
 * and focus target.
 */
function pinIcon(pin: MapPin) {
  const { colour, size = "md", active, dim, label, showLabel, number } = pin;
  const key = JSON.stringify([colour, size, active, dim, label, showLabel, number]);
  const cached = icons.get(key);
  if (cached) return cached;

  const bg = `style="background:${escape(colour)}"`;
  let html: string;
  let box: [number, number];

  if (number !== undefined) {
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

  const icon = L.divIcon({ className: "", iconSize: box, html });
  icons.set(key, icon);
  return icon;
}
