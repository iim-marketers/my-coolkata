import type { Coords } from "./types";

export type SoundId =
  | "tram-bell"
  | "taxi-horn"
  | "dhaak"
  | "train-announcement"
  | "hooghly"
  | "street-vendor"
  | "college-street"
  | "coffee-house"
  | "rain"
  | "stadium"
  | "puja-bells";

export interface CitySound {
  id: SoundId;
  name: string;
  bengali?: string;
  where: string;
  coords: Coords;
  note: string;
  /** When you would actually hear it. */
  when: string;
  href?: string;
}

export const citySounds: CitySound[] = [
  {
    id: "tram-bell",
    name: "Tram bell",
    where: "Esplanade depot",
    coords: { lat: 22.5645, lng: 88.3512 },
    when: "Fewer and fewer mornings",
    note: "Two strikes, which is how a driver clears the track. Asia's first electric tramway ran here from 1902; one route survives.",
    href: "/stories/the-last-tram",
  },
  {
    id: "taxi-horn",
    name: "Yellow taxi horn",
    where: "Any crossing, continuously",
    coords: { lat: 22.5527, lng: 88.352 },
    when: "All day, and most of the night",
    note: "The Hindustan Ambassador ran from 1958 to 2014 and the fleet is finally thinning. The horn is a two-tone buzz nothing else makes.",
    href: "/neighbourhoods/park-street",
  },
  {
    id: "dhaak",
    name: "Dhaak",
    bengali: "ঢাক",
    where: "Every pandal, Shashthi to Dashami",
    coords: { lat: 22.5259, lng: 88.3585 },
    when: "Five days in autumn",
    note: "A barrel drum slung from the shoulder and struck with two thin canes. No notation; the patterns are learned by ear.",
    href: "/durga-puja#the-dhaak",
  },
  {
    id: "train-announcement",
    name: "Station announcement",
    where: "Howrah and Sealdah",
    coords: { lat: 22.5839, lng: 88.3425 },
    when: "Every ninety seconds",
    note: "Howrah has twenty-three platforms and is among the busiest stations in the world. The chime is the same four notes everywhere in India.",
    href: "/neighbourhoods/howrah-bridge-strand",
  },
  {
    id: "hooghly",
    name: "The Hooghly",
    bengali: "হুগলি",
    where: "Babughat and the ferries",
    coords: { lat: 22.5673, lng: 88.3374 },
    when: "Best at six in the morning",
    note: "Water on stone steps, a diesel launch, and a horn carrying much further than it should.",
    href: "/neighbourhoods/hooghly-river",
  },
  {
    id: "street-vendor",
    name: "A hawker's call",
    where: "Any lane, mid-morning",
    coords: { lat: 22.5951, lng: 88.3699 },
    when: "Between about nine and noon",
    note: "The cry is pitched to carry up to a third-floor verandah. Knife-sharpeners, bottle-buyers, and the man who repairs umbrellas.",
    href: "/neighbourhoods/hatibagan",
  },
  {
    id: "college-street",
    name: "College Street",
    where: "Between Colootola and Bankim Chatterjee Street",
    coords: { lat: 22.5747, lng: 88.365 },
    when: "Weekday afternoons",
    note: "Pages being fanned for damp, cycle-vans of paper, and a mile and a half of people negotiating over books.",
    href: "/college-street",
  },
  {
    id: "coffee-house",
    name: "Coffee House",
    where: "Bankim Chatterjee Street, first floor",
    coords: { lat: 22.5757, lng: 88.3639 },
    when: "Four in the afternoon onwards",
    note: "A very high ceiling and appalling acoustics, so nobody can hear the next table and everyone talks louder. The room sounds like one argument.",
    href: "/adda",
  },
  {
    id: "rain",
    name: "Rain on tin",
    where: "June to September",
    coords: { lat: 22.5726, lng: 88.3639 },
    when: "Four hours at a time",
    note: "The streets flood within twenty minutes and drain within an hour, and the whole city eats fried things.",
    href: "/food/telebhaja",
  },
  {
    id: "stadium",
    name: "Salt Lake Stadium",
    where: "Vivekananda Yuba Bharati Krirangan",
    coords: { lat: 22.5697, lng: 88.4076 },
    when: "Derby weekends",
    note: "Once above a hundred thousand. Mohun Bagan against East Bengal, and a noise you feel in the chest before you hear it.",
    href: "/famous-for#football",
  },
  {
    id: "puja-bells",
    name: "Kanshor ghanta and conch",
    bengali: "কাঁসর ঘণ্টা",
    where: "Every courtyard at arati",
    coords: { lat: 22.5989, lng: 88.3667 },
    when: "Dusk, and all five days of Puja",
    note: "A bell-metal gong struck fast, and a conch under it. In north Kolkata you hear several houses at once.",
    href: "/neighbourhoods/sovabazar",
  },
];
