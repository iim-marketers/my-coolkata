"use client";

import "leaflet/dist/leaflet.css";
import type { FitBoundsOptions, LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { CITY_BOUNDS } from "@/lib/kolkata";
import { cn } from "@/lib/utils";

/**
 * The base plate for every map on the site: Stadia Maps' Alidade Smooth
 * tiles over OpenStreetMap data. Leaflet reads `window` as soon as it is
 * imported, so this module (and anything importing it) must be loaded
 * through `next/dynamic` with `ssr: false` from a Client Component.
 *
 * Alidade Smooth is muted on purpose, so the pigment pins carry the colour.
 * Stadia serves localhost without an account; the live site needs its
 * domain registered on a Stadia account (no key in the code).
 */
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
  /** The opening frame only; Leaflet ignores later changes. */
  bounds?: LatLngBoundsExpression;
  boundsOptions?: FitBoundsOptions;
}) {
  // One-finger drags would trap page scroll on phones; pinch still zooms
  // towards the fingers, which is enough to get around.
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    // Zoom stays on whole levels: fractional zoom scales the raster tiles
    // and opens hairline seams between them.
    <MapContainer
      bounds={bounds}
      boundsOptions={boundsOptions}
      scrollWheelZoom={false}
      dragging={!coarse}
      // Important: leaflet.css is unlayered, so its grey `#ddd` ground and
      // Helvetica would otherwise beat these layered utilities.
      className={cn("absolute inset-0 h-full w-full bg-background! font-sans!", className)}
    >
      <TileLayer {...TILES} />
      <KeepSized />
      {children}
    </MapContainer>
  );
}

/**
 * Leaflet measures its container once. Aspect-ratio boxes settle after
 * fonts load and breakpoints change, so re-measure whenever it resizes.
 */
function KeepSized() {
  const map = useMap();
  useEffect(() => {
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}
