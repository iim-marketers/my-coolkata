import type { PhotoId } from "./photos";
import type { Coords, SceneName } from "./types";

export interface TramStop {
  n: number;
  name: string;
  bengali?: string;
  coords: Coords;
  minutes: number;
  line: string;
  body: string;
  getOff: string;
  href: string;
  scene: SceneName;
  photo?: PhotoId;
}

/**
 * A journey the network could once make. Route 5 ran Esplanade to
 * Shyambazar; this stitches together stops from several routes into the
 * ride the city no longer offers.
 */
export const tramStops: TramStop[] = [
  {
    n: 1,
    name: "Esplanade",
    bengali: "এসপ্ল্যানেড",
    coords: { lat: 22.5645, lng: 88.3512 },
    minutes: 0,
    line: "Depot, terminus, and the top of the Maidan.",
    body: "The tram starts here because everything starts here: the depot, the bus terminus, the metro interchange and New Market five minutes east. The Tram World museum car sits in the depot with two coaches and a small display.",
    getOff: "For the Maidan, Eden Gardens, New Market and the Shaheed Minar.",
    href: "/neighbourhoods/esplanade",
    scene: "victoria",
    photo: "tram-esplanade",
  },
  {
    n: 2,
    name: "Bowbazar",
    bengali: "বউবাজার",
    coords: { lat: 22.5686, lng: 88.3617 },
    minutes: 8,
    line: "Goldsmiths on the first floor, dentists on the ground.",
    body: "The car runs east along a road of jewellers' workshops and, for reasons nobody has satisfactorily explained, dozens of dentists. Territi Bazar is at the western end and holds what is left of the old Chinatown.",
    getOff:
      "For the Chinese breakfast market at six, and the goldsmiths' lanes.",
    href: "/neighbourhoods/bowbazar",
    scene: "streetfood",
    photo: "bowbazar",
  },
  {
    n: 3,
    name: "College Street",
    bengali: "বইপাড়া",
    coords: { lat: 22.5747, lng: 88.365 },
    minutes: 16,
    line: "The stalls close in on both sides.",
    body: "The line used to run down the middle of Boi Para, between two walls of secondhand books stacked three metres high. Presidency is on the left, the Coffee House up a staircase on the right, and Putiram sells out of kochuri by ten.",
    getOff:
      "For the books, the Coffee House, and an argument you did not plan on.",
    href: "/college-street",
    scene: "collegestreet",
    photo: "tram-college-street",
  },
  {
    n: 4,
    name: "Girish Park",
    coords: { lat: 22.5836, lng: 88.3617 },
    minutes: 24,
    line: "North, into the old city.",
    body: "The buildings get older and lower and the lanes get narrower. Jorasanko Thakurbari is a short walk west, and Marble Palace with its 126 kinds of marble and its peacocks is closer still.",
    getOff: "For Jorasanko, Marble Palace, and the north Kolkata doors.",
    href: "/neighbourhoods/jorasanko",
    scene: "rooftops",
    photo: "girish-park",
  },
  {
    n: 5,
    name: "Sovabazar",
    bengali: "শোভাবাজার",
    coords: { lat: 22.5989, lng: 88.3667 },
    minutes: 33,
    line: "Courtyards that have held a Puja since 1757.",
    body: "Sovabazar Rajbari's thakur dalan has not been rebuilt since the eighteenth century and has held a Durga Puja every autumn since the year of Plassey. Kumartuli is ten minutes west, towards the river.",
    getOff: "For the Rajbari courtyard and the idol-makers' lanes.",
    href: "/neighbourhoods/sovabazar",
    scene: "pujo",
    photo: "sovabazar-crossing",
  },
  {
    n: 6,
    name: "Kumartuli",
    bengali: "কুমোরটুলি",
    coords: { lat: 22.6006, lng: 88.3616 },
    minutes: 39,
    line: "Bamboo, straw, clay, and several thousand goddesses.",
    body: "Lanes two metres wide, hung with bare bulbs, full of half-finished ten-armed figures from July onwards. The clay comes ashore at the ghat at the end of the lane and goes back into the river in October.",
    getOff: "For the workshops, and the ghat they leave from.",
    href: "/kumartuli",
    scene: "kumartuli",
    photo: "kumartuli-tram",
  },
  {
    n: 7,
    name: "Shyambazar",
    bengali: "শ্যামবাজার",
    coords: { lat: 22.5993, lng: 88.3742 },
    minutes: 46,
    line: "Five roads, one statue, no traffic signal.",
    body: "The end of the line. Five roads meet under an equestrian Subhas Chandra Bose and negotiate it by consensus. Golbari is on the corner and has been doing the same near-black kosha mangsho since the 1920s.",
    getOff: "For the crossing, the mutton, and Star Theatre on Bidhan Sarani.",
    href: "/neighbourhoods/shyambazar",
    scene: "tram",
    photo: "tram-shyambazar",
  },
];

export const tramFacts = [
  {
    v: "1873",
    t: "The first line",
    d: "Horse-drawn, Sealdah to Armenian Ghat, and it failed within nine months.",
  },
  { v: "1902", t: "Electrified", d: "The first electric tramway in Asia." },
  {
    v: "37",
    t: "Routes at its height",
    d: "More than sixty kilometres of track.",
  },
  {
    v: "1",
    t: "Routes now",
    d: "The state announced in 2024 it would keep a single heritage route. The case is in the High Court.",
  },
];
