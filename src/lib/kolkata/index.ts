import { heritageSites } from "./heritage";
import { neighbourhoods } from "./neighbourhoods";
import type { MapPoint } from "./types";

export * from "./types";
export * from "./heritage";
export * from "./food";
export * from "./neighbourhoods";
export * from "./stories";
export * from "./events";
export * from "./culture";
export * from "./famous-for";
export * from "./food-places";
export * from "./food-quiz";
export * from "./pujo";
export * from "./day";
export * from "./adda";
export * from "./hidden";
export * from "./kumartuli";
export * from "./architecture";
export * from "./cinema";
export * from "./literature";
export * from "./football";
export * from "./tram";
export * from "./river";
export * from "./moods";
export * from "./personality";
export * from "./gallery";
export * from "./today";

/** Points on the site map that are not heritage sites or quarters. */
const riverAndRail: MapPoint[] = [
  {
    id: "prinsep-ghat",
    name: "Prinsep Ghat",
    coords: { lat: 22.557, lng: 88.332 },
    kind: "river",
    note: "1841 Palladian portico. The sunset spot.",
  },
  {
    id: "babughat",
    name: "Babughat",
    coords: { lat: 22.5673, lng: 88.3374 },
    kind: "river",
    note: "Ferries, and the main Dashami immersion point.",
  },
  {
    id: "mullick-ghat",
    name: "Mullick Ghat Flower Market",
    coords: { lat: 22.5842, lng: 88.3436 },
    kind: "river",
    note: "Two thousand traders under the bridge, from four in the morning.",
  },
  {
    id: "howrah-station",
    name: "Howrah Station",
    coords: { lat: 22.5839, lng: 88.3425 },
    kind: "station",
    note: "23 platforms. Among the busiest railway stations in the world.",
  },
  {
    id: "sealdah",
    name: "Sealdah Station",
    coords: { lat: 22.5675, lng: 88.3705 },
    kind: "station",
    note: "Where the first tram line started, in 1873.",
  },
  {
    id: "esplanade",
    name: "Esplanade",
    coords: { lat: 22.5645, lng: 88.3512 },
    kind: "station",
    note: "Tram depot, bus terminus, and the top of the Maidan.",
  },
];

const allPoints: MapPoint[] = [
  ...heritageSites.map<MapPoint>((s) => ({
    id: s.slug,
    name: s.name,
    coords: s.coords,
    kind: "heritage",
    href: `/heritage/${s.slug}`,
    note: s.style,
  })),
  ...neighbourhoods.map<MapPoint>((n) => ({
    id: n.slug,
    name: n.name,
    coords: n.coords,
    kind: "neighbourhood",
    href: `/neighbourhoods/${n.slug}`,
    note: n.knownFor,
  })),
  ...riverAndRail,
];

/**
 * Some ghats and stations are also quarters (Prinsep Ghat, Babughat,
 * Esplanade). Keep the first entry for each id, which carries a page link,
 * so ids stay unique for React keys and route lookups.
 */
export const mapPoints: MapPoint[] = allPoints.filter(
  (p, i) => allPoints.findIndex((q) => q.id === p.id) === i,
);

/** 22°34′N 88°22′E — the line the homepage types out. */
export const CITY_COORDS_DISPLAY = "22°34′N 88°22′E";

/** The pages in the menu and footer. The first six sit in the top bar. */
export const sections = [
  {
    href: "/neighbourhoods",
    label: "Neighbourhoods",
    blurb: "Twenty-seven quarters, on a map of the city",
  },
  {
    href: "/heritage",
    label: "Landmarks",
    blurb: "The big sights, worth the trip",
  },
  {
    href: "/food",
    label: "Taste Kolkata",
    blurb: "A plate, a map and a food trail",
  },
  {
    href: "/durga-puja",
    label: "Durga Puja",
    blurb: "Five days when the city stops being a city",
  },
  {
    href: "/events",
    label: "Events",
    blurb: "Photo and video contests for creators",
  },
  {
    href: "/cinema",
    label: "Cinema",
    blurb: "Ray, Ghatak, Sen, and the locations",
  },
  {
    href: "/literature",
    label: "The City of Words",
    blurb: "Literary Kolkata, mapped",
  },
  {
    href: "/football",
    label: "Football",
    blurb: "Three clubs, one field, one argument",
  },
  {
    href: "/tram",
    label: "The Tram",
    blurb: "Esplanade to Shyambazar, seven stops",
  },
  {
    href: "/river",
    label: "The Hooghly",
    blurb: "The river that watches Kolkata",
  },
  { href: "/stories", label: "Stories", blurb: "Longer reads" },
] as const;
