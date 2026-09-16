"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MapPlaceholder } from "@/components/map/map-placeholder";

const PinMapCanvas = dynamic(() => import("@/components/map/pin-map-canvas"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

export type MapPin = {
  id: string;
  lat: number;
  lng: number;
  colour: string;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  active?: boolean;
  dim?: boolean;
  label?: string;
  showLabel?: boolean;
  number?: number;
};

export type PinMapProps = {
  pins: MapPin[];
  line?: [number, number][];
  lineDashed?: boolean;
  lineOpacity?: number;
  maxZoom?: number;
  refit?: boolean;
  onPinActivate?: (id: string) => void;
};

// The parent needs a size and `relative isolate`: `isolate` keeps Leaflet's
// z-indexed panes under the site nav.
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
