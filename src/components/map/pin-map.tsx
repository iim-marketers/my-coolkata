"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MapPlaceholder } from "@/components/map/map-placeholder";

const PinMapCanvas = dynamic(() => import("@/components/map/pin-map-canvas"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

/** One thing on a map. Plain data, so Server Components can pass pins too. */
export type MapPin = {
  id: string;
  lat: number;
  lng: number;
  /** Any CSS colour, theme variables included. */
  colour: string;
  /** Native tooltip and accessible name. */
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  /** Pulses, and sits above its neighbours. */
  active?: boolean;
  /** Faded and inert, for pins a filter has set aside. */
  dim?: boolean;
  /** A name under the dot. */
  label?: string;
  /** Keep the label up; otherwise it shows on hover. */
  showLabel?: boolean;
  /** A numbered badge in place of the dot. */
  number?: number;
};

export type PinMapProps = {
  pins: MapPin[];
  /** A terracotta path through these points, drawn under the pins. */
  line?: [number, number][];
  lineDashed?: boolean;
  lineOpacity?: number;
  /** Closest zoom when framing the pins. */
  maxZoom?: number;
  /** Re-frame whenever the live (undimmed) pins or the line move. */
  refit?: boolean;
  /** Hover, tap or Enter on a pin. */
  onPinActivate?: (id: string) => void;
};

/**
 * A real map with pins, filling its positioned parent. Give the parent a
 * size and `relative isolate`: `isolate` keeps Leaflet's z-indexed panes
 * under the nav. Leaflet mounts only once the box nears the viewport, so a
 * page of small maps does not fetch every tile up front.
 */
export function PinMap(props: PinMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {near ? <PinMapCanvas {...props} /> : <MapPlaceholder />}
    </div>
  );
}
