import { sections } from "./index";

type Section = (typeof sections)[number];

export interface SectionGroup {
  label: string;
  blurb: string;
  items: Section[];
}

/** The index, grouped so thirty-odd pages read as four short lists. */
const GROUPS: { label: string; blurb: string; hrefs: string[] }[] = [
  {
    label: "Places",
    blurb: "Quarters, buildings, the river and the streets between them.",
    hrefs: [
      "/neighbourhoods",
      "/heritage",
      "/architecture",
      "/river",
      "/tram",
      "/college-street",
      "/kumartuli",
      "/hidden",
      "/map",
    ],
  },
  {
    label: "Culture",
    blurb: "Food, festivals, films, football and the people behind them.",
    hrefs: [
      "/food",
      "/durga-puja",
      "/culture",
      "/people",
      "/adda",
      "/cinema",
      "/literature",
      "/football",
      "/sounds",
      "/famous-for",
    ],
  },
  {
    label: "History",
    blurb: "Pick a year, read a longer story, set then against now.",
    hrefs: ["/through-time", "/timeline", "/then-and-now", "/gallery", "/stories"],
  },
  {
    label: "Plan a visit",
    blurb: "Itineraries, moods, the calendar, and a quiz for the road.",
    hrefs: [
      "/plan",
      "/build-my-day",
      "/a-day-in-kolkata",
      "/mood",
      "/today",
      "/events",
      "/how-kolkata-are-you",
    ],
  },
];

const grouped = new Set(GROUPS.flatMap((g) => g.hrefs));

export const sectionGroups: SectionGroup[] = [
  ...GROUPS.map((g) => ({
    label: g.label,
    blurb: g.blurb,
    items: g.hrefs
      .map((href) => sections.find((s) => s.href === href))
      .filter((s) => s !== undefined),
  })),
  // Anything added to `sections` later still shows up somewhere.
  {
    label: "More",
    blurb: "Everything else.",
    items: sections.filter((s) => !grouped.has(s.href)),
  },
].filter((g) => g.items.length > 0);
