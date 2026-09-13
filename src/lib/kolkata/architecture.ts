import type { Coords } from "./types";

export type StyleId =
  | "indo-saracenic"
  | "gothic"
  | "neoclassical"
  | "art-deco"
  | "bengali"
  | "colonial"
  | "modern";

export interface ArchStyle {
  id: StyleId;
  label: string;
  years: string;
  line: string;
  body: string;
  /** What to look for. The identification game is built on these. */
  tells: string[];
  examples: { name: string; href?: string }[];
  tone: string;
}

export const archStyles: ArchStyle[] = [
  {
    id: "bengali",
    label: "Bengali traditional",
    years: "Pre-1700 onwards",
    line: "Curved cornices copied from thatch, in brick and terracotta.",
    body: "The do-chala and ath-chala roofs are masonry imitations of a bamboo-and-thatch hut, curved because thatch sags. The nabaratna stacks nine spires on a raised plinth. Temple walls carry terracotta panels because Bengal has alluvial clay and almost no building stone.",
    tells: [
      "A roofline that curves down at the corners",
      "Terracotta plaques set into brick",
      "A raised plinth with steps on all sides",
      "Spires counted in ones, fives or nines",
    ],
    examples: [
      { name: "Dakshineswar Kali Temple", href: "/heritage/dakshineswar-kali-temple" },
      { name: "Kalighat Kali Temple", href: "/heritage/kalighat-temple" },
      { name: "The thakur dalan at Sovabazar Rajbari", href: "/neighbourhoods/sovabazar" },
    ],
    tone: "var(--terracotta)",
  },
  {
    id: "neoclassical",
    label: "Neoclassical",
    years: "1780–1860",
    line: "The City of Palaces: white stucco, Doric porticos, and a great deal of confidence.",
    body: "The Company built as though it were in Bath. Portico, pediment, colonnade, and stucco over brick because there is no stone in the delta. Almost every grand Calcutta building of this period is a European pattern-book plan adapted for heat: deep verandahs, high ceilings, louvred shutters.",
    tells: [
      "A columned portico with a triangular pediment",
      "Stucco painted white or cream, not exposed brick",
      "Tall louvred shutters instead of glass",
      "Symmetry you could fold in half",
    ],
    examples: [
      { name: "Raj Bhavan", href: "/heritage/raj-bhavan" },
      { name: "Metcalfe Hall", href: "/heritage/metcalfe-hall" },
      { name: "Town Hall", href: "/heritage/town-hall" },
      { name: "Marble Palace", href: "/heritage/marble-palace" },
    ],
    tone: "var(--cream)",
  },
  {
    id: "gothic",
    label: "Gothic Revival",
    years: "1840–1900",
    line: "Pointed arches and red brick, imported wholesale and then ventilated.",
    body: "From the 1840s the Victorians brought Gothic, which suited institutions: churches, courts, universities. In Bengal it had to be modified. St. Paul's has an exceptionally wide nave and a thin iron-trussed roof because the building is a machine for surviving May.",
    tells: [
      "Pointed arches rather than round ones",
      "Exposed red brick with pale stone dressing",
      "A tower or spire off-centre",
      "Tracery in the windows",
    ],
    examples: [
      { name: "St. Paul's Cathedral", href: "/heritage/st-pauls-cathedral" },
      { name: "Calcutta High Court", href: "/heritage/calcutta-high-court" },
    ],
    tone: "var(--alta)",
  },
  {
    id: "indo-saracenic",
    label: "Indo-Saracenic",
    years: "1870–1930",
    line: "A British idea of what an Indian building should look like.",
    body: "Mughal domes and chhatris grafted onto European plans, invented by colonial architects as a visual argument that the Raj was the legitimate successor to the Mughals. It is a hybrid style with no indigenous lineage, and some of the results are magnificent anyway.",
    tells: [
      "A large central dome with smaller chhatris around it",
      "Scalloped or cusped arches",
      "Marble or sandstone facing over a Classical plan",
      "Corner turrets that serve no structural purpose",
    ],
    examples: [
      { name: "Victoria Memorial", href: "/heritage/victoria-memorial" },
      { name: "Nakhoda Masjid", href: "/heritage/nakhoda-masjid" },
    ],
    tone: "var(--marigold)",
  },
  {
    id: "colonial",
    label: "Colonial commercial",
    years: "1860–1930",
    line: "The workhorse: long ranges, iron balconies, and a shop under everything.",
    body: "Most of Kolkata is not a monument. It is three and four storey commercial blocks with iron-railed balconies, shuttered windows, a business at street level and families above. Cast iron came in as ballast on ships and ended up as columns and railings across Burrabazar and Bowbazar.",
    tells: [
      "Continuous balconies with cast-iron railings",
      "A shop or godown occupying the whole ground floor",
      "Repetitive bays rather than a designed facade",
      "Stucco mouldings, usually damaged",
    ],
    examples: [
      { name: "Writers' Building", href: "/heritage/writers-building" },
      { name: "The lanes of Burrabazar", href: "/neighbourhoods/burrabazar" },
      { name: "Bow Barracks" },
    ],
    tone: "var(--hooghly)",
  },
  {
    id: "art-deco",
    label: "Art Deco",
    years: "1930–1955",
    line: "Kolkata's inter-war modernity: curved corners, speed lines and neon.",
    body: "Deco arrived with reinforced concrete and cinema. Chowringhee, Park Street and the Esplanade filled with rounded corner blocks, horizontal banding, terrazzo lobbies and vertical neon signs. Metro Cinema of 1935 is the reference building.",
    tells: [
      "A rounded corner where two streets meet",
      "Horizontal speed lines banding the facade",
      "A vertical fin carrying the building's name",
      "Terrazzo floors and chrome in the lobby",
    ],
    examples: [
      { name: "Metro Cinema, Esplanade" },
      { name: "Park Mansions, Park Street", href: "/neighbourhoods/park-street" },
      { name: "Lighthouse Cinema, Humayun Place" },
    ],
    tone: "var(--verdigris)",
  },
  {
    id: "modern",
    label: "Modern",
    years: "1955 onwards",
    line: "Concrete, then glass, then a planned city on drained marsh.",
    body: "Post-independence Kolkata built in concrete: Nandan, Rabindra Sadan, the metro stations, and the brutalist Dakshinapan. Then Salt Lake and New Town, laid out in numbered sectors, with the glass towers of Sector V and a skyline that has nothing to do with the old city.",
    tells: [
      "Exposed board-marked concrete",
      "Deep horizontal sunshades over the windows",
      "A plan you could describe over the phone",
      "Glass curtain walling, east of the old city",
    ],
    examples: [
      { name: "Nandan, the state film centre" },
      { name: "Dakshinapan, Dhakuria", href: "/neighbourhoods/gariahat" },
      { name: "Sector V and New Town", href: "/neighbourhoods/new-town-salt-lake" },
    ],
    tone: "var(--indigo)",
  },
];

/**
 * The identification game. Each round names a real building, its style,
 * and the detail that gives it away. The crop is drawn, not photographed.
 */
export interface ArchPuzzle {
  id: string;
  answer: string;
  styleId: StyleId;
  built: string;
  where: string;
  coords: Coords;
  /** What the crop shows. */
  crop: "dome" | "arch" | "column" | "truss" | "spire" | "balcony" | "corner";
  clue: string;
  reveal: string;
  href?: string;
}

export const archPuzzles: ArchPuzzle[] = [
  {
    id: "victoria",
    answer: "Victoria Memorial",
    styleId: "indo-saracenic",
    built: "1906–1921",
    where: "Maidan",
    coords: { lat: 22.5448, lng: 88.3426 },
    crop: "dome",
    clue: "Makrana marble, a central dome, and a bronze figure on top that turns on ball bearings.",
    reveal:
      "Emerson worked in the same marble as the Taj Mahal, borrowed the same central dome logic, then attached Venetian, Egyptian and Mughal detail until it belonged to no tradition at all.",
    href: "/heritage/victoria-memorial",
  },
  {
    id: "howrah",
    answer: "Howrah Bridge",
    styleId: "modern",
    built: "1943",
    where: "Strand Road",
    coords: { lat: 22.5851, lng: 88.3468 },
    crop: "truss",
    clue: "Hot rivets driven by hand, no bolts, and nothing touching the water for 457 metres.",
    reveal:
      "A cantilever specified so that no pier would stand in the shipping channel. It opened in February 1943 with no ceremony, and the first thing across was a tram.",
    href: "/heritage/howrah-bridge",
  },
  {
    id: "high-court",
    answer: "Calcutta High Court",
    styleId: "gothic",
    built: "1872",
    where: "Esplanade Row",
    coords: { lat: 22.5687, lng: 88.3435 },
    crop: "arch",
    clue: "Red brick, pointed arcading, and a plan lifted from a medieval cloth hall in Flanders.",
    reveal:
      "Walter Granville modelled it on the Lakenhal at Ypres. The original was destroyed by shellfire in the First World War, so for a period the Calcutta copy was the better surviving example.",
    href: "/heritage/calcutta-high-court",
  },
  {
    id: "metcalfe",
    answer: "Metcalfe Hall",
    styleId: "neoclassical",
    built: "1844",
    where: "Strand Road",
    coords: { lat: 22.5766, lng: 88.3448 },
    crop: "column",
    clue: "Thirty Corinthian columns, twelve metres high, and the grand front aimed at the water.",
    reveal:
      "Copied from the Temple of the Winds in Athens, and designed to be arrived at by boat, which is why the road gets the side elevation.",
    href: "/heritage/metcalfe-hall",
  },
  {
    id: "dakshineswar",
    answer: "Dakshineswar Kali Temple",
    styleId: "bengali",
    built: "1855",
    where: "On the Hooghly, north",
    coords: { lat: 22.655, lng: 88.3576 },
    crop: "spire",
    clue: "Nine spires on a raised plinth, with twelve identical smaller shrines along the river.",
    reveal:
      "A nabaratna, built by Rani Rashmoni after the orthodoxy told her a non-brahmin could not consecrate a temple. Ramakrishna lived in a room in the courtyard for thirty years.",
    href: "/heritage/dakshineswar-kali-temple",
  },
  {
    id: "writers",
    answer: "Writers' Building",
    styleId: "colonial",
    built: "1777, refaced 1889",
    where: "BBD Bagh",
    coords: { lat: 22.5726, lng: 88.3487 },
    crop: "balcony",
    clue: "A long red range with statues on the roofline, built to house teenage clerks.",
    reveal:
      "The writers were the Company's lowest grade of employee. In 1930 three revolutionaries walked into the corridors in European dress and shot the inspector-general of prisons; the square is named for them.",
    href: "/heritage/writers-building",
  },
  {
    id: "metro-cinema",
    answer: "Metro Cinema",
    styleId: "art-deco",
    built: "1935",
    where: "Esplanade, Chowringhee",
    coords: { lat: 22.5619, lng: 88.3517 },
    crop: "corner",
    clue: "A rounded corner, horizontal banding, and a vertical neon fin carrying one word.",
    reveal:
      "Built for MGM in 1935 and the reference Deco building in the city. Chowringhee and Park Street filled with this language: concrete, speed lines, terrazzo and neon.",
  },
  {
    id: "nakhoda",
    answer: "Nakhoda Masjid",
    styleId: "indo-saracenic",
    built: "1926",
    where: "Zakaria Street, Chitpur",
    coords: { lat: 22.5806, lng: 88.3563 },
    crop: "dome",
    clue: "Red sandstone, two minarets at 46 metres, and a gateway copied from a Mughal tomb.",
    reveal:
      "The gateway follows Akbar's tomb at Sikandra. Nakhoda means mariner; it was funded largely by a Kutchi Memon shipping merchant.",
    href: "/heritage/nakhoda-masjid",
  },
  {
    id: "st-pauls",
    answer: "St. Paul's Cathedral",
    styleId: "gothic",
    built: "1847",
    where: "Cathedral Road",
    coords: { lat: 22.5448, lng: 88.3475 },
    crop: "spire",
    clue: "A very wide nave, a thin iron-trussed roof, and a tower rebuilt after an earthquake.",
    reveal:
      "The first Anglican cathedral built outside Britain. Forbes designed it as a machine for surviving May: exceptional nave width, and ventilation treated as structure.",
    href: "/heritage/st-pauls-cathedral",
  },
  {
    id: "marble-palace",
    answer: "Marble Palace",
    styleId: "neoclassical",
    built: "1835",
    where: "Chorbagan, north Kolkata",
    coords: { lat: 22.5836, lng: 88.3617 },
    crop: "column",
    clue: "A colonnaded neoclassical front wrapped around a traditional Bengali courtyard.",
    reveal:
      "Raja Rajendra Mullick was sixteen when he started building it. 126 kinds of marble, two canvases attributed to Rubens, peacocks in the garden, and no electric light in the galleries.",
    href: "/heritage/marble-palace",
  },
];

export function getArchStyle(id: StyleId) {
  return archStyles.find((s) => s.id === id);
}
