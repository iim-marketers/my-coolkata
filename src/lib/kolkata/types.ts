import type { PhotoId } from "./photos";
/**
 * Shared shapes for every collection in the city.
 *
 * `coords` are real WGS84 degrees. They drive the stylised map, which
 * projects them linearly inside `CITY_BOUNDS` rather than using a tile
 * server, so nothing here needs a network call at runtime.
 */
export type Coords = { lat: number; lng: number };

export type Era =
  | "pre-colonial"
  | "company"
  | "raj"
  | "renaissance"
  | "independence"
  | "modern";

export interface HeritageSite {
  slug: string;
  name: string;
  alsoKnownAs?: string;
  built: string;
  builtYear: number;
  architect?: string;
  style: string;
  neighbourhood: string;
  coords: Coords;
  era: Era;
  summary: string;
  body: string[];
  detail: { label: string; value: string }[];
  /** Something a guidebook would leave out. */
  overlooked: string;
  scene: SceneName;
  photo?: PhotoId;
}

export type FoodCategory =
  | "street"
  | "sweet"
  | "meal"
  | "drink"
  | "breakfast";

export interface Dish {
  slug: string;
  name: string;
  bengali: string;
  category: FoodCategory;
  origin: string;
  originYear?: number;
  bestIn: string;
  season?: string;
  price: string;
  summary: string;
  body: string[];
  eatItAt: { place: string; where: string; note: string }[];
  scene: SceneName;
  photo?: PhotoId;
}

export interface Neighbourhood {
  slug: string;
  name: string;
  bengali: string;
  alsoKnownAs?: string;
  zone: Zone;
  /** The one line the map shows when you open the quarter. */
  tagline: string;
  knownFor: string;
  coords: Coords;
  bestHour: string;
  summary: string;
  /** History. The long read. */
  body: string[];
  buildings: { name: string; note: string; href?: string }[];
  eats: { name: string; where: string; note: string }[];
  figures: { name: string; note: string; href?: string }[];
  thingsToSee: { name: string; note: string }[];
  /** Four words for the feel of the place. */
  mood?: string[];
  /** The thing a guidebook leaves out. */
  hiddenStory?: string;
  /** Slugs from `stories`, surfaced on the quarter page. */
  storySlugs?: string[];
  /** Plates for the quarter's gallery. */
  plates: SceneName[];
  /** Specific photographs for the same plates, in order. */
  photos?: PhotoId[];
  walk: { stop: string; minutes: number; note: string }[];
  scene: SceneName;
  photo?: PhotoId;
}

export interface Story {
  slug: string;
  title: string;
  standfirst: string;
  author: string;
  published: string;
  readingMinutes: number;
  tags: string[];
  scene: SceneName;
  photo?: PhotoId;
  body: { kind: "para" | "quote" | "heading"; text: string }[];
}

export interface CityEvent {
  slug: string;
  name: string;
  bengali?: string;
  monthIndex: number;
  when: string;
  duration: string;
  where: string;
  kind: "festival" | "fair" | "arts" | "sport" | "seasonal";
  summary: string;
  tip: string;
}

export interface MapPoint {
  id: string;
  name: string;
  coords: Coords;
  kind: "heritage" | "food" | "neighbourhood" | "river" | "station";
  href?: string;
  note: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  length: string;
  pace: string;
  bestSeason: string;
  summary: string;
  stops: {
    time: string;
    place: string;
    what: string;
    travel?: string;
  }[];
}

export interface CultureStrand {
  slug: string;
  name: string;
  bengali?: string;
  summary: string;
  body: string[];
  seeItAt: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  because: string;
}

/** Each name maps to a fallback photograph in `scene-info.ts`; the files live in `src/assets/photos`. */
export type SceneName =
  | "howrah"
  | "tram"
  | "kumartuli"
  | "pujo"
  | "victoria"
  | "streetfood"
  | "collegestreet"
  | "river"
  | "rooftops";

/** Tightened to the extent of the points actually plotted, so the drawing
 *  is not mostly empty margin. */
export const CITY_BOUNDS = {
  north: 22.67,
  south: 22.505,
  west: 88.305,
  east: 88.43,
} as const;

export const CITY_CENTRE: Coords = { lat: 22.5726, lng: 88.3639 };

/* ------------------------------------------------------------------ */
/* Neighbourhood quarters, for the illustrated map                     */
/* ------------------------------------------------------------------ */

export type Zone = "north" | "central" | "south" | "riverside" | "east";

export interface ZoneMeta {
  id: Zone;
  label: string;
  bengali: string;
  blurb: string;
  /** Fill for the zone shape on the illustrated map. */
  tone: string;
}

export const zones: ZoneMeta[] = [
  {
    id: "north",
    label: "North Kolkata",
    bengali: "উত্তর কলকাতা",
    blurb: "The old city. Courtyard houses, the oldest Pujas, and the trades that named the lanes.",
    tone: "var(--terracotta)",
  },
  {
    id: "central",
    label: "Central Kolkata",
    bengali: "মধ্য কলকাতা",
    blurb: "The colonial core and the commercial one, a few hundred metres apart and nothing alike.",
    tone: "var(--marigold)",
  },
  {
    id: "south",
    label: "South Kolkata",
    bengali: "দক্ষিণ কলকাতা",
    blurb: "Where the professional middle class went, and where the city argues about itself now.",
    tone: "var(--verdigris)",
  },
  {
    id: "riverside",
    label: "Riverside",
    bengali: "গঙ্গার ধার",
    blurb: "The ghats, the bridges and the docks. Everything here arrived by water first.",
    tone: "var(--indigo)",
  },
  {
    id: "east",
    label: "The east",
    bengali: "পূর্ব কলকাতা",
    blurb: "Tanneries, a Chinatown, and two planned cities built on drained marsh.",
    tone: "var(--alta)",
  },
];

/* ------------------------------------------------------------------ */
/* Famous For                                                          */
/* ------------------------------------------------------------------ */

export interface FamousStrand {
  slug: string;
  icon: string;
  title: string;
  line: string;
  items: { name: string; note: string; href?: string }[];
}

/* ------------------------------------------------------------------ */
/* Food map                                                            */
/* ------------------------------------------------------------------ */

export type FoodPlaceKind =
  | "street"
  | "sweets"
  | "bengali"
  | "old"
  | "chinese"
  | "continental";

export interface FoodPlace {
  id: string;
  name: string;
  kind: FoodPlaceKind;
  since?: number;
  where: string;
  coords: Coords;
  order: string;
  note: string;
}

/* ------------------------------------------------------------------ */
/* Durga Puja                                                          */
/* ------------------------------------------------------------------ */

export interface PujoChapter {
  slug: string;
  numeral: string;
  title: string;
  bengali?: string;
  standfirst: string;
  body: string[];
  scene: SceneName;
  photo?: PhotoId;
  detail?: { label: string; value: string }[];
}

export interface PujoDay {
  day: string;
  bengali: string;
  offset: number;
  what: string;
  where: string;
}
