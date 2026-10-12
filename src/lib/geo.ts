import type { Coords } from "@/lib/kolkata/types";

/** Haversine, in kilometres. Straight-line, so the real walk is longer. */
export function distanceKm(a: Coords, b: Coords) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const directionsUrl = ({ lat, lng }: Coords) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const ll = ({ lat, lng }: Coords) => `${lat},${lng}`;

export function walkingRouteUrl(stops: Coords[]) {
  const params = new URLSearchParams({ api: "1", travelmode: "walking" });
  if (stops.length) {
    params.set("origin", ll(stops[0]));
    params.set("destination", ll(stops[stops.length - 1]));
  }
  if (stops.length > 2) params.set("waypoints", stops.slice(1, -1).map(ll).join("|"));
  return `https://www.google.com/maps/dir/?${params}`;
}
