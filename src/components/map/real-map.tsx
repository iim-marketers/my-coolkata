"use client";

import "leaflet/dist/leaflet.css";
import type { FitBoundsOptions, LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { CITY_BOUNDS } from "@/lib/kolkata";
import { cn } from "@/lib/utils";

// Leaflet reads `window` on import: load this only via `next/dynamic` with `ssr: false`.

// The live domain must be registered on the Stadia account; localhost works without one.
const TILES = {
  url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
};

export const CITY_LATLNG_BOUNDS: LatLngBoundsExpression = [
  [CITY_BOUNDS.south, CITY_BOUNDS.west],
  [CITY_BOUNDS.north, CITY_BOUNDS.east],
];

export function RealMap({
  children,
  className,
  bounds = CITY_LATLNG_BOUNDS,
  boundsOptions,
}: {
  children?: React.ReactNode;
  className?: string;
  bounds?: LatLngBoundsExpression;
  boundsOptions?: FitBoundsOptions;
}) {
  // One-finger drags would trap page scroll on phones; pinch still zooms.
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    // No fractional `zoomSnap`: scaled raster tiles show hairline seams.
    <MapContainer
      bounds={bounds}
      boundsOptions={boundsOptions}
      scrollWheelZoom={false}
      dragging={!coarse}
      // `!` because leaflet.css is unlayered and would beat these utilities.
      className={cn("absolute inset-0 h-full w-full bg-background! font-sans!", className)}
    >
      <TileLayer {...TILES} />
      <KeepSized />
      {children}
    </MapContainer>
  );
}

function KeepSized() {
  const map = useMap();
  useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}
