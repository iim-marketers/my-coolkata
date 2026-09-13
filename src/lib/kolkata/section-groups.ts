import { sections } from "./index";

type Section = (typeof sections)[number];

export interface SectionGroup {
  label: string;
  blurb: string;
  items: Section[];
}

/** The index, grouped so the pages read as three short lists. */
const GROUPS: { label: string; blurb: string; hrefs: string[] }[] = [
  {
    label: "Places",
    blurb: "Quarters, buildings, the river and the streets between them.",
    hrefs: ["/neighbourhoods", "/heritage", "/river", "/tram"],
  },
  {
    label: "Culture",
    blurb: "Food, festivals, films, football and longer reads.",
    hrefs: [
      "/food",
      "/durga-puja",
      "/cinema",
      "/literature",
      "/football",
      "/stories",
    ],
  },
  {
    label: "Join in",
    blurb: "Contests for photographers and videographers.",
    hrefs: ["/events"],
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
