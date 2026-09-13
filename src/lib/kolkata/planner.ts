/**
 * Build My Kolkata Day. A pool of tagged blocks, filtered by interest and
 * packed into the time available. Deterministic, so the same choices give
 * the same day.
 */
export type Interest =
  | "food"
  | "history"
  | "photography"
  | "culture"
  | "shopping"
  | "architecture";

export type Duration = "3h" | "6h" | "1d" | "2d" | "3d";

export const durations: { id: Duration; label: string; blocks: number; note: string }[] = [
  { id: "3h", label: "3 hours", blocks: 3, note: "One quarter, done properly." },
  { id: "6h", label: "6 hours", blocks: 5, note: "Two quarters and a proper lunch." },
  { id: "1d", label: "1 day", blocks: 7, note: "Dawn to dinner, with the afternoon off." },
  { id: "2d", label: "2 days", blocks: 12, note: "North and south, and the river twice." },
  { id: "3d", label: "3 days", blocks: 17, note: "Enough to stop rushing." },
];

export const interests: { id: Interest; icon: string; label: string }[] = [
  { id: "food", icon: "🍛", label: "Food" },
  { id: "history", icon: "🏛️", label: "History" },
  { id: "photography", icon: "📷", label: "Photography" },
  { id: "culture", icon: "🎭", label: "Culture" },
  { id: "shopping", icon: "🛍️", label: "Shopping" },
  { id: "architecture", icon: "🏗️", label: "Architecture" },
];

export interface PlanBlock {
  id: string;
  /** Earliest sensible start, in hours. */
  from: number;
  /** Latest sensible start. */
  to: number;
  hours: number;
  place: string;
  what: string;
  icon: string;
  tags: Interest[];
  href?: string;
  /** Blocks with the same anchor are alternatives; only one is picked. */
  anchor?: string;
}

export const planBlocks: PlanBlock[] = [
  { id: "mullick", from: 4.5, to: 6.5, hours: 1.5, place: "Mullick Ghat Flower Market", what: "Two thousand traders sorting marigold by torchlight under the bridge", icon: "📷", tags: ["photography", "food"], href: "/neighbourhoods/howrah-bridge-strand", anchor: "dawn" },
  { id: "sarobar", from: 5.5, to: 7, hours: 1.5, place: "Rabindra Sarobar", what: "Rowers, walkers, and birds you will not hear anywhere else in the city", icon: "📷", tags: ["photography"], href: "/neighbourhoods/dhakuria", anchor: "dawn" },
  { id: "bagbazar-ghat", from: 5.5, to: 7, hours: 1, place: "Bagbazar Ghat", what: "Swimmers, priests, laundry and the ferry, before the light", icon: "📷", tags: ["photography", "culture"], href: "/neighbourhoods/bagbazar", anchor: "dawn" },

  { id: "territi", from: 6, to: 7.5, hours: 1, place: "Territi Bazar", what: "Pork buns and fish ball soup from baskets on the pavement, over by half seven", icon: "🍛", tags: ["food"], href: "/neighbourhoods/bowbazar", anchor: "breakfast" },
  { id: "putiram", from: 7, to: 10, hours: 1, place: "Putiram, College Street", what: "Kochuri and cholar dal, since 1868, and gone by ten", icon: "🍛", tags: ["food"], href: "/college-street", anchor: "breakfast" },

  { id: "howrah-walk", from: 6.5, to: 9, hours: 1, place: "Howrah Bridge, on foot", what: "Cross it and come back. Look at the wear in the pavement", icon: "🏗️", tags: ["architecture", "photography"], href: "/heritage/howrah-bridge" },
  { id: "kumartuli", from: 7, to: 11, hours: 2, place: "Kumartuli", what: "Lanes two metres wide, full of half-finished ten-armed figures", icon: "🎨", tags: ["culture", "photography"], href: "/kumartuli" },
  { id: "bbd", from: 8, to: 11, hours: 2, place: "BBD Bagh", what: "The Writers' Building, the GPO dome, and Charnock's mausoleum at St. John's", icon: "🏛️", tags: ["history", "architecture"], href: "/neighbourhoods/bbd-bagh" },
  { id: "jorasanko", from: 9, to: 15, hours: 2, place: "Jorasanko Thakurbari", what: "The room Tagore was born and died in, and the Bengal School gallery", icon: "🏛️", tags: ["history", "culture"], href: "/heritage/jorasanko-thakurbari" },
  { id: "college-street", from: 10, to: 16, hours: 2, place: "College Street", what: "A mile and a half of secondhand stalls, and the Coffee House upstairs", icon: "📚", tags: ["culture", "shopping"], href: "/college-street" },
  { id: "marble-palace", from: 10, to: 15, hours: 1.5, place: "Marble Palace", what: "126 kinds of marble, two Rubens, peacocks, and no electric light", icon: "🏛️", tags: ["history", "architecture"], href: "/heritage/marble-palace" },
  { id: "museum", from: 10, to: 16, hours: 2, place: "Indian Museum", what: "The Bharhut gallery, then the mummy, then leave", icon: "🏛️", tags: ["history"], href: "/heritage/indian-museum" },
  { id: "nakhoda", from: 10, to: 17, hours: 1.5, place: "Nakhoda Masjid and Zakaria Street", what: "Red sandstone above the best eating street in the city", icon: "🏗️", tags: ["architecture", "food"], href: "/heritage/nakhoda-masjid" },

  { id: "biryani", from: 12.5, to: 15, hours: 1.5, place: "Lunch: Royal India Hotel", what: "Mutton biryani with the potato, since 1905", icon: "🍛", tags: ["food"], href: "/food/kolkata-biryani", anchor: "lunch" },
  { id: "bengali-lunch", from: 12.5, to: 15, hours: 2, place: "Lunch: 6 Ballygunge Place", what: "Daab chingri, bhetki paturi, shukto, and a tablecloth", icon: "🍛", tags: ["food", "culture"], href: "/neighbourhoods/ballygunge", anchor: "lunch" },
  { id: "cabin-lunch", from: 12.5, to: 15, hours: 1, place: "Lunch: Mitra Cafe", what: "Kobiraji cutlet and a brain chop, since 1920", icon: "🍛", tags: ["food"], href: "/neighbourhoods/shyambazar", anchor: "lunch" },

  { id: "kalighat", from: 14, to: 18, hours: 1.5, place: "Kalighat", what: "The temple, and the alleys where an entire school of painting started", icon: "🎨", tags: ["culture", "history"], href: "/neighbourhoods/kalighat" },
  { id: "gariahat", from: 15, to: 19, hours: 2, place: "Gariahat", what: "Saris on the pavement, fish inside, and hawking that survived every clearance", icon: "🛍️", tags: ["shopping", "food"], href: "/neighbourhoods/gariahat" },
  { id: "new-market", from: 11, to: 19, hours: 1.5, place: "New Market", what: "1874, and Nahoum's bakery at F-20 since 1902", icon: "🛍️", tags: ["shopping", "food"], href: "/neighbourhoods/esplanade" },
  { id: "dakshinapan", from: 11, to: 19, hours: 1.5, place: "Dakshinapan", what: "Brutalist, state-run, and the best handloom in the city", icon: "🛍️", tags: ["shopping", "architecture"], href: "/neighbourhoods/gariahat" },
  { id: "tangra", from: 12, to: 21, hours: 1.5, place: "Tangra", what: "India's last working Chinatown, in converted tanneries", icon: "🍛", tags: ["food", "history"], href: "/neighbourhoods/chinatown-tangra" },

  { id: "victoria", from: 15.5, to: 18, hours: 2, place: "Victoria Memorial", what: "The Kolkata gallery inside, then the grounds as the light goes", icon: "🏛️", tags: ["history", "architecture", "photography"], href: "/heritage/victoria-memorial" },
  { id: "prinsep", from: 16.5, to: 18.5, hours: 1.5, place: "Prinsep Ghat", what: "Sunset, with the 1841 columns and the 1992 cable-stays in one frame", icon: "📷", tags: ["photography"], href: "/neighbourhoods/prinsep-ghat", anchor: "sunset" },
  { id: "maidan-evening", from: 16.5, to: 18.5, hours: 1.5, place: "The Maidan", what: "Cricket finishing, jhalmuri along the edge, floodlights coming on", icon: "📷", tags: ["photography", "culture"], href: "/neighbourhoods/esplanade", anchor: "sunset" },

  { id: "park-street", from: 19, to: 22, hours: 2, place: "Park Street", what: "Chelo kebab at Peter Cat, then a band at Trincas", icon: "🍽️", tags: ["food", "culture"], href: "/neighbourhoods/park-street", anchor: "dinner" },
  { id: "kusum", from: 19, to: 22.5, hours: 1, place: "Kusum Rolls", what: "Double egg mutton roll, after the queue", icon: "🍽️", tags: ["food"], href: "/food/kathi-roll", anchor: "dinner" },
  { id: "shiraz", from: 19, to: 22, hours: 1.5, place: "Shiraz, Park Circus", what: "Biryani and chicken chaap, since 1941", icon: "🍽️", tags: ["food"], href: "/food/kolkata-biryani", anchor: "dinner" },

  { id: "millennium-night", from: 20.5, to: 23, hours: 1, place: "Millennium Park", what: "Howrah Bridge lit, from the lawn", icon: "📷", tags: ["photography"], href: "/neighbourhoods/millennium-park" },
  { id: "sodium-lanes", from: 21.5, to: 24, hours: 1, place: "A north Kolkata lane", what: "Sodium light, before the LEDs get there", icon: "📷", tags: ["photography"], href: "/stories/sodium-light" },
  { id: "balwant", from: 22.5, to: 26, hours: 1, place: "Balwant Singh's", what: "Open all night, and the reason people are out at three", icon: "🍽️", tags: ["food"], href: "/neighbourhoods/kalighat" },
];

function fmt(h: number) {
  const hh = Math.floor(h) % 24;
  const mm = Math.round((h - Math.floor(h)) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export interface PlannedDay {
  day: number;
  stops: { time: string; block: PlanBlock }[];
}

/**
 * Greedy pack: score each block by how many chosen interests it matches,
 * then fill the day forward from 06:00, respecting each block's window.
 */
export function buildPlan(duration: Duration, chosen: Interest[]): PlannedDay[] {
  const target = durations.find((d) => d.id === duration)!;
  const days = duration === "3d" ? 3 : duration === "2d" ? 2 : 1;
  const perDay = Math.ceil(target.blocks / days);

  const scored = planBlocks
    .map((b) => ({
      b,
      score:
        (chosen.length === 0
          ? 1
          : b.tags.filter((t) => chosen.includes(t)).length) * 10 -
        b.from * 0.01,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const usedAnchors = new Set<string>();
  const usedIds = new Set<string>();
  const out: PlannedDay[] = [];

  for (let d = 0; d < days; d++) {
    // A short day starts late; a full one starts at dawn.
    let clock = duration === "3h" ? 10 : duration === "6h" ? 9 : 5.5;
    const stops: { time: string; block: PlanBlock }[] = [];

    for (const { b } of scored) {
      if (stops.length >= perDay) break;
      if (usedIds.has(b.id)) continue;
      if (b.anchor && usedAnchors.has(`${d}-${b.anchor}`)) continue;
      if (clock > b.to) continue;
      const start = Math.max(clock, b.from);
      if (start > b.to) continue;

      stops.push({ time: fmt(start), block: b });
      usedIds.add(b.id);
      if (b.anchor) usedAnchors.add(`${d}-${b.anchor}`);
      // Half an hour of getting there.
      clock = start + b.hours + 0.5;
    }

    stops.sort((a, b) => a.time.localeCompare(b.time));
    if (stops.length) out.push({ day: d + 1, stops });
  }

  return out;
}
