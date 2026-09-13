import {
  addaTopics,
  archStyles,
  clubs,
  films,
  literature,
  moods,
  plates,
  riverChapters,
  todayEntries,
  tramStops,
  craftStages,
  dayMoments,
  hiddenPlaces,
  cityEvents,
  cultureStrands,
  dishes,
  famousFor,
  foodPlaces,
  heritageSites,
  itineraries,
  neighbourhoods,
  pujoChapters,
  stories,
} from "@/lib/kolkata";

export interface SearchRecord {
  id: string;
  title: string;
  kind: string;
  href: string;
  blurb: string;
  /** Lower-cased haystack, built once at module load. */
  terms: string;
}

function record(
  id: string,
  title: string,
  kind: string,
  href: string,
  blurb: string,
  extra: (string | undefined)[] = [],
): SearchRecord {
  return {
    id,
    title,
    kind,
    href,
    blurb,
    terms: [title, kind, blurb, ...extra].filter(Boolean).join(" ").toLowerCase(),
  };
}

export const searchIndex: SearchRecord[] = [
  ...heritageSites.map((s) =>
    record(`h-${s.slug}`, s.name, "Heritage", `/heritage/${s.slug}`, s.summary, [
      s.alsoKnownAs,
      s.neighbourhood,
      s.style,
      String(s.builtYear),
    ]),
  ),
  ...dishes.map((d) =>
    record(`f-${d.slug}`, d.name, "Food", `/food/${d.slug}`, d.summary, [
      d.bengali,
      d.category,
      d.origin,
      ...d.eatItAt.map((e) => e.place),
    ]),
  ),
  ...neighbourhoods.map((n) =>
    record(
      `n-${n.slug}`,
      n.name,
      "Neighbourhood",
      `/neighbourhoods/${n.slug}`,
      n.summary,
      [n.bengali, n.alsoKnownAs, n.knownFor, n.zone, n.tagline, ...n.walk.map((w) => w.stop)],
    ),
  ),
  ...stories.map((s) =>
    record(`s-${s.slug}`, s.title, "Story", `/stories/${s.slug}`, s.standfirst, s.tags),
  ),
  ...cultureStrands.map((c) =>
    record(`c-${c.slug}`, c.name, "Culture", `/culture#${c.slug}`, c.summary, [c.bengali]),
  ),
  ...cityEvents.map((e) =>
    record(`e-${e.slug}`, e.name, "Event", `/events#${e.slug}`, e.summary, [
      e.bengali,
      e.when,
      e.where,
    ]),
  ),
  ...itineraries.map((i) =>
    record(`i-${i.slug}`, i.title, "Plan", `/plan#${i.slug}`, i.summary, [
      i.length,
      ...i.stops.map((s) => s.place),
    ]),
  ),
  ...foodPlaces.map((p) =>
    record(`fp-${p.id}`, p.name, "Where to eat", "/food", p.note, [
      p.where,
      p.order,
      p.kind,
      p.since ? String(p.since) : undefined,
    ]),
  ),
  ...famousFor.flatMap((f) =>
    f.items.map((item) =>
      record(
        `ff-${f.slug}-${item.name}`,
        item.name,
        `Famous for · ${f.title}`,
        item.href ?? `/famous-for#${f.slug}`,
        item.note,
      ),
    ),
  ),
  ...pujoChapters.map((c) =>
    record(
      `pj-${c.slug}`,
      c.title,
      "Durga Puja",
      `/durga-puja#${c.slug}`,
      c.standfirst,
      [c.bengali],
    ),
  ),
  ...hiddenPlaces.map((h) =>
    record(
      `hd-${h.slug}`,
      `Hidden #${String(h.n).padStart(3, "0")}: ${h.name}`,
      "Hidden Kolkata",
      "/hidden",
      h.line,
      [h.where, h.note, h.kind],
    ),
  ),
  ...dayMoments.map((m) =>
    record(`dy-${m.time}`, `${m.time}: ${m.title}`, "A day in Kolkata", "/a-day-in-kolkata", m.body, [
      m.where,
      m.bengali,
    ]),
  ),
  ...addaTopics.map((t) =>
    record(`ad-${t.id}`, `Adda: ${t.label}`, "Adda", "/adda", t.opener, [
      t.bengali,
      ...t.positions.map((x) => x.claim),
    ]),
  ),
  ...craftStages.map((c) =>
    record(`ku-${c.key}`, `Kumartuli: ${c.title}`, "Kumartuli", `/kumartuli#${c.key}`, c.standfirst, [
      c.label,
      c.bengali,
      c.material,
    ]),
  ),
  ...archStyles.map((a) =>
    record(`ar-${a.id}`, a.label, "Architecture", `/architecture#${a.id}`, a.line, [
      a.years,
      a.body,
      ...a.tells,
      ...a.examples.map((e) => e.name),
    ]),
  ),
  ...films.map((f) =>
    record(`fm-${f.slug}`, f.title, "Cinema", `/cinema#${f.slug}`, f.line, [
      String(f.year),
      f.director,
      f.bengali,
      ...f.locations.map((l) => l.name),
    ]),
  ),
  ...literature.map((l) =>
    record(`lt-${l.slug}`, l.work, "Literature", "/literature", l.context, [
      l.author,
      l.bengali,
      l.era,
      l.place.name,
      l.excerpt?.en,
    ]),
  ),
  ...clubs.map((c) =>
    record(`cl-${c.id}`, c.name, "Football", `/football#${c.id}`, c.line, [
      c.bengali,
      c.nickname,
      String(c.founded),
      ...c.honours.map((h) => h.what),
    ]),
  ),
  ...tramStops.map((t) =>
    record(`tr-${t.name}`, `Tram stop: ${t.name}`, "The tram", "/tram", t.line, [
      t.bengali,
      t.getOff,
    ]),
  ),
  ...riverChapters.map((c) =>
    record(`rv-${c.slug}`, c.title, "The Hooghly", `/river#${c.slug}`, c.standfirst, [
      c.bengali,
    ]),
  ),
  ...moods.map((m) =>
    record(`md-${m.id}`, `${m.label}`, "By mood", "/mood", m.line, [m.when]),
  ),
  ...plates.map((p) =>
    record(`gl-${p.id}`, p.title, "Gallery", "/gallery", p.story, [
      p.where,
      p.caption,
      p.category,
    ]),
  ),
  ...todayEntries.map((t) =>
    record(`td-${t.id}`, t.title, "Kolkata Today", "/today", t.body, [
      t.when,
      t.where,
      t.kind,
    ]),
  ),
];

/** Ranked substring match. Title hits beat body hits; prefixes beat both. */
export function searchCity(query: string, limit = 12): SearchRecord[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const words = q.split(/\s+/);

  return searchIndex
    .map((r) => {
      let score = 0;
      const title = r.title.toLowerCase();
      for (const w of words) {
        if (!r.terms.includes(w)) return { r, score: -1 };
        if (title.startsWith(w)) score += 10;
        else if (title.includes(w)) score += 6;
        else score += 1;
      }
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.r.title.localeCompare(b.r.title))
    .slice(0, limit)
    .map((x) => x.r);
}
