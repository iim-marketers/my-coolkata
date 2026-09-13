import { heritageSites } from "./heritage";
import { neighbourhoods } from "./neighbourhoods";
import { CITY_BOUNDS, type Coords, type MapPoint } from "./types";

export * from "./types";
export * from "./heritage";
export * from "./food";
export * from "./people";
export * from "./neighbourhoods";
export * from "./stories";
export * from "./timeline";
export * from "./events";
export * from "./culture";
export * from "./famous-for";
export * from "./food-places";
export * from "./food-quiz";
export * from "./eras";
export * from "./pujo";
export * from "./sounds";
export * from "./day";
export * from "./adda";
export * from "./hidden";
export * from "./kumartuli";
export * from "./architecture";
export * from "./then-now";
export * from "./cinema";
export * from "./literature";
export * from "./football";
export * from "./tram";
export * from "./river";
export * from "./moods";
export * from "./planner";
export * from "./personality";
export * from "./gallery";
export * from "./today";
export * from "./plan";

/** Points the stylised map draws that are not heritage sites or quarters. */
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

/**
 * Linear equirectangular projection into a 0–100 viewBox space.
 * Good enough over 20km; a tile server would be overkill for a drawing.
 */
export function project({ lat, lng }: Coords) {
  const x =
    ((lng - CITY_BOUNDS.west) / (CITY_BOUNDS.east - CITY_BOUNDS.west)) * 100;
  const y =
    ((CITY_BOUNDS.north - lat) / (CITY_BOUNDS.north - CITY_BOUNDS.south)) * 100;
  return { x, y };
}

/** 22°34′N 88°22′E — the line the homepage types out. */
export const CITY_COORDS_DISPLAY = "22°34′N 88°22′E";

export const sections = [
  {
    href: "/neighbourhoods",
    label: "Neighbourhoods",
    blurb: "Twenty-seven quarters, on an illustrated map",
  },
  {
    href: "/through-time",
    label: "Through Time",
    blurb: "Drag a year and the whole site changes",
  },
  {
    href: "/heritage",
    label: "Heritage",
    blurb: "Twenty-two buildings, and who paid for them",
  },
  { href: "/food", label: "Taste Kolkata", blurb: "A plate, a map and a food trail" },
  {
    href: "/durga-puja",
    label: "Durga Puja",
    blurb: "Five days when the city stops being a city",
  },
  {
    href: "/kumartuli",
    label: "Kumartuli",
    blurb: "Bamboo to goddess, in six stages",
  },
  { href: "/people", label: "People", blurb: "Twenty-five lives, on one wall" },
  { href: "/hidden", label: "Hidden Kolkata", blurb: "Forty things you didn't know existed" },
  { href: "/sounds", label: "Sounds", blurb: "Close your eyes. Listen." },
  {
    href: "/a-day-in-kolkata",
    label: "A Day in Kolkata",
    blurb: "Half past five to two in the morning",
  },
  { href: "/adda", label: "Adda", blurb: "The argument that settles nothing" },
  { href: "/college-street", label: "College Street", blurb: "Books, students, ideas" },
  { href: "/architecture", label: "Architecture", blurb: "Seven styles, and a guessing game" },
  { href: "/then-and-now", label: "Then & Now", blurb: "Drag between the plate and the present" },
  { href: "/cinema", label: "Cinema", blurb: "Ray, Ghatak, Sen, and the locations" },
  { href: "/literature", label: "The City of Words", blurb: "Literary Kolkata, mapped" },
  { href: "/football", label: "Football", blurb: "Three clubs, one field, one argument" },
  { href: "/tram", label: "The Tram", blurb: "Esplanade to Shyambazar, seven stops" },
  { href: "/river", label: "The Hooghly", blurb: "The river that watches Kolkata" },
  { href: "/gallery", label: "Faces of Kolkata", blurb: "Twenty-seven plates, each with a story" },
  { href: "/mood", label: "By Mood", blurb: "How do you want the day to feel?" },
  { href: "/build-my-day", label: "Build My Day", blurb: "Time available, then interests" },
  { href: "/how-kolkata-are-you", label: "The Quiz", blurb: "How Kolkata are you?" },
  { href: "/today", label: "Kolkata Today", blurb: "What is on, month by month" },
  {
    href: "/famous-for",
    label: "Famous For",
    blurb: "Food, books, football, cinema, art",
  },
  { href: "/culture", label: "Culture", blurb: "Adda, song, pandal, jatra" },
  { href: "/stories", label: "Stories", blurb: "Longer reads" },
  { href: "/timeline", label: "Timeline", blurb: "1495 to now" },
  { href: "/map", label: "Map", blurb: "Everything, plotted" },
  { href: "/events", label: "Events", blurb: "The calendar" },
  { href: "/plan", label: "Plan", blurb: "Itineraries that work" },
] as const;
