import { searchCity, type SearchRecord } from "@/lib/search-index";
import { foodPlaces } from "@/lib/kolkata/food-places";
import { heritageSites } from "@/lib/kolkata/heritage";
import { neighbourhoods } from "@/lib/kolkata/neighbourhoods";
import { people } from "@/lib/kolkata/people";
import { plates } from "@/lib/kolkata/gallery";
import { dishes } from "@/lib/kolkata/food";

/**
 * A small intent layer over the plain index, so queries phrased as
 * questions do something sensible: "places related to Tagore", "old
 * buildings near College Street", "Kolkata food under ₹500".
 *
 * This is rule-based, not a model. It recognises a handful of shapes and
 * falls back to substring search for everything else.
 */
export interface SmartAnswer {
  /** What the query was understood as. Shown so the reader can correct it. */
  reading: string;
  results: SearchRecord[];
  /** Optional one-line note about how the answer was assembled. */
  note?: string;
}

const rec = (
  id: string,
  title: string,
  kind: string,
  href: string,
  blurb: string,
): SearchRecord => ({ id, title, kind, href, blurb, terms: "" });

const NORTH = new Set(["north"]);
const SOUTH = new Set(["south"]);

function parseRupees(q: string): number | null {
  const m = q.match(/(?:₹|rs\.?\s?|rupees?\s?)(\d{2,5})/i) ?? q.match(/under\s+(\d{2,5})/i);
  return m ? Number(m[1]) : null;
}

/** Prices in the data are ranges like "₹180–400"; take the upper bound. */
function upperPrice(price: string): number | null {
  const nums = price.match(/\d+/g);
  if (!nums) return null;
  return Math.max(...nums.map(Number));
}

export function smartSearch(query: string): SmartAnswer {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { reading: "", results: [] };

  // Budget: "food under ₹500", "eat for 100 rupees"
  const budget = parseRupees(q);
  if (budget !== null && /food|eat|meal|lunch|dinner|budget|cheap/.test(q)) {
    const cheap = dishes
      .filter((d) => {
        const p = upperPrice(d.price);
        return p !== null && p <= budget;
      })
      .map((d) =>
        rec(`b-${d.slug}`, d.name, "Food", `/food/${d.slug}`, `${d.price} · ${d.summary}`),
      );
    return {
      reading: `Food for ₹${budget} or less`,
      results: cheap,
      note: "Prices are the usual street or restaurant range, not a guarantee.",
    };
  }

  // Person: "places related to Tagore"
  const person = people.find((p) => {
    const last = p.name.split(" ").pop()!.toLowerCase();
    return q.includes(last) || q.includes(p.name.toLowerCase());
  });
  if (person && /(place|location|relat|connect|where|address|walk)/.test(q)) {
    const results = [
      rec(
        `pp-${person.slug}`,
        person.name,
        "People",
        `/people/${person.slug}`,
        person.summary,
      ),
      ...(person.locations ?? []).map((l) =>
        rec(`pl-${person.slug}-${l.name}`, l.name, "Place", l.href ?? `/people/${person.slug}`, l.note),
      ),
    ];
    return {
      reading: `Places connected to ${person.name}`,
      results,
      note: `${person.locations?.length ?? 0} addresses you can stand outside.`,
    };
  }

  // Photography: "best places for photography"
  if (/photograph|photo|camera|shoot|instagram|picture/.test(q)) {
    const results = plates
      .filter((p) => ["photography", "streets", "river", "night", "rain"].includes(p.category) || true)
      .slice(0, 10)
      .map((p) => rec(`ph-${p.id}`, p.title, "Photograph", "/gallery", `${p.where} · ${p.caption}`));
    return {
      reading: "Places worth photographing",
      results,
      note: "Mullick Ghat before five and Prinsep Ghat at sunset are the two everyone agrees on.",
    };
  }

  // Old buildings near a quarter: "old buildings near College Street"
  if (/(old building|heritage|architecture|building)/.test(q)) {
    const near = neighbourhoods.find((n) => q.includes(n.name.toLowerCase()));
    let sites = heritageSites;
    if (near) {
      sites = [...heritageSites].sort(
        (a, b) =>
          Math.abs(a.coords.lat - near.coords.lat) +
          Math.abs(a.coords.lng - near.coords.lng) -
          (Math.abs(b.coords.lat - near.coords.lat) +
            Math.abs(b.coords.lng - near.coords.lng)),
      );
    }
    const results = sites
      .slice(0, near ? 6 : 10)
      .map((s) =>
        rec(`hb-${s.slug}`, s.name, "Heritage", `/heritage/${s.slug}`, `${s.built} · ${s.style}`),
      );
    return {
      reading: near ? `Heritage buildings near ${near.name}` : "Heritage buildings",
      results,
      note: near ? "Ordered by straight-line distance." : undefined,
    };
  }

  // Durga Puja
  if (/(durga|puja|pandal|pujo|immersion|dhaak)/.test(q)) {
    return {
      reading: "Durga Puja",
      results: [
        rec("dp-main", "Kolkata During Puja", "Durga Puja", "/durga-puja", "The making, the pandal, the food, the dhaak, the crowd, the rituals, the immersion."),
        rec("dp-kum", "Kumartuli", "Craft", "/kumartuli", "Bamboo to goddess, in six stages."),
        rec("dp-sova", "Sovabazar Rajbari", "Neighbourhood", "/neighbourhoods/sovabazar", "A Puja that has run every year since 1757."),
        rec("dp-bag", "Bagbazar", "Neighbourhood", "/neighbourhoods/bagbazar", "The oldest community Puja in the city, from 1919."),
        rec("dp-ball", "Ballygunge", "Neighbourhood", "/neighbourhoods/ballygunge", "Maddox Square, and the south's pandal-hopping."),
      ],
    };
  }

  // A quarter: "things to see in North Kolkata"
  const zoneWord = q.match(/\b(north|south|central|east)\b/)?.[1];
  if (zoneWord && /(see|do|visit|thing|explore|where)/.test(q)) {
    const zone = NORTH.has(zoneWord)
      ? "north"
      : SOUTH.has(zoneWord)
        ? "south"
        : zoneWord === "east"
          ? "east"
          : "central";
    const quarters = neighbourhoods.filter((n) => n.zone === zone);
    const results = quarters.flatMap((n) => [
      rec(`z-${n.slug}`, n.name, "Neighbourhood", `/neighbourhoods/${n.slug}`, n.tagline),
    ]);
    return {
      reading: `Things to see in ${zoneWord} Kolkata`,
      results,
      note: `${quarters.length} quarters, each with a walk.`,
    };
  }

  // Where to eat near somewhere
  if (/(eat|food|restaurant|dinner|lunch|breakfast|sweet)/.test(q)) {
    const near = neighbourhoods.find((n) => q.includes(n.name.toLowerCase()));
    let places = foodPlaces;
    if (near) {
      places = [...foodPlaces].sort(
        (a, b) =>
          Math.abs(a.coords.lat - near.coords.lat) +
          Math.abs(a.coords.lng - near.coords.lng) -
          (Math.abs(b.coords.lat - near.coords.lat) +
            Math.abs(b.coords.lng - near.coords.lng)),
      );
    }
    const results = places
      .slice(0, near ? 6 : 10)
      .map((p) => rec(`fe-${p.id}`, p.name, "Where to eat", "/food", `${p.where} · ${p.order}`));
    return {
      reading: near ? `Where to eat near ${near.name}` : "Where to eat",
      results,
    };
  }

  // Fall through to the plain index.
  return { reading: `Matches for “${query.trim()}”`, results: searchCity(query, 14) };
}

/** The examples the dialog offers, and the ones the brief asked for. */
export const smartExamples = [
  "places related to Tagore",
  "best places for photography",
  "old buildings near College Street",
  "food under ₹200",
  "places related to Durga Puja",
  "things to see in North Kolkata",
];
