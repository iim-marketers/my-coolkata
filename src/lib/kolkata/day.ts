import type { PhotoId } from "./photos";
import type { SceneName } from "./types";

export interface DayMoment {
  time: string;
  hour: number;
  title: string;
  bengali?: string;
  body: string;
  where: string;
  scene: SceneName;
  photo?: PhotoId;
  href?: string;
  /** Roughly, how awake the city is. Drives the arc on the clock. */
  intensity: number;
}

export const dayMoments: DayMoment[] = [
  {
    time: "05:30",
    hour: 5.5,
    title: "The ghats wake up",
    body: "Swimmers, priests and laundry at Bagbazar and Babughat before the light. At Mullick Ghat two thousand flower traders have already been working for ninety minutes, sorting marigold by torchlight under the bridge.",
    where: "Bagbazar Ghat, Mullick Ghat, Babughat",
    scene: "river",
    photo: "ghat-bathing",
    href: "/neighbourhoods/hooghly-river",
    intensity: 0.35,
  },
  {
    time: "07:00",
    hour: 7,
    title: "Tea and the newspaper",
    bengali: "চা আর কাগজ",
    body: "Clay cups at the corner stall, the Anandabazar folded to the editorial page, and an argument about it before anyone has eaten. Kochuri and cholar dal at Tewari Brothers or Sharma Tea House, standing up.",
    where: "Every corner, everywhere",
    scene: "streetfood",
    photo: "tea-stall",
    href: "/food/cha-in-bhaar",
    intensity: 0.5,
  },
  {
    time: "09:00",
    hour: 9,
    title: "Office traffic",
    body: "The metro is standing room from Dum Dum southward. Buses at Esplanade load at a run. The Howrah ferries are full, and the crossing takes ten minutes against forty by road.",
    where: "Esplanade, BBD Bagh, Howrah Bridge",
    scene: "howrah",
    photo: "yellow-taxis-traffic",
    href: "/neighbourhoods/bbd-bagh",
    intensity: 0.9,
  },
  {
    time: "11:00",
    hour: 11,
    title: "College Street",
    body: "The stalls are properly open, the students are out of the first lecture, and the trade in secondhand books is at its best. Describe what you want; the stallholder disappears into a wall of paper and returns eleven minutes later with it.",
    where: "Boi Para, between Colootola and Bankim Chatterjee Street",
    scene: "collegestreet",
    photo: "college-street",
    href: "/college-street",
    intensity: 0.75,
  },
  {
    time: "13:00",
    hour: 13,
    title: "Bengali lunch",
    bengali: "ভাত-মাছ",
    body: "Rice, dal, a fried thing, then fish. Shukto first if the household is orthodox, chutney and papad at the end. Office canteens do it on a steel plate for very little; on Sunday it takes three hours and ends in sleep.",
    where: "Home, or a cabin, or 6 Ballygunge Place",
    scene: "streetfood",
    photo: "bengali-thali",
    href: "/food",
    intensity: 0.6,
  },
  {
    time: "16:00",
    hour: 16,
    title: "Adda",
    bengali: "আড্ডা",
    body: "The unproductive conversation, which is the point. A tea shop, a rowak, a park bench, the Coffee House. If a decision gets made it stops being an adda and becomes a meeting, which is worse.",
    where: "The Coffee House, or your own front step",
    scene: "collegestreet",
    photo: "coffee-house",
    href: "/adda",
    intensity: 0.55,
  },
  {
    time: "18:00",
    hour: 18,
    title: "The Maidan, Gariahat, Park Street",
    body: "Three different cities at the same hour. Cricket finishing on the Maidan with the Victoria floodlights coming on. Gariahat at its densest, saris on the pavement. Park Street starting to fill.",
    where: "Maidan, Gariahat crossing, Park Street",
    scene: "victoria",
    photo: "maidan",
    href: "/neighbourhoods/esplanade",
    intensity: 0.95,
  },
  {
    time: "20:00",
    hour: 20,
    title: "Dinner",
    body: "Rolls at Kusum with a queue on the pavement, or chelo kebab at Peter Cat with forty minutes' wait, or biryani at Shiraz, or the family sitting down at nine because nobody in this city eats early.",
    where: "Park Street, Park Circus, New Market",
    scene: "streetfood",
    photo: "park-street-night",
    href: "/food",
    intensity: 0.85,
  },
  {
    time: "23:00",
    hour: 23,
    title: "City lights",
    body: "Howrah Bridge lit from Millennium Park. The last shows coming out at the single screens. Sodium lamps on the lanes that have not been converted yet, flattening everything to one amber tone.",
    where: "Strand Road, and any lane in the north",
    scene: "tram",
    photo: "howrah-bridge-night",
    href: "/stories/sodium-light",
    intensity: 0.45,
  },
  {
    time: "02:00",
    hour: 26,
    title: "Late-night Kolkata",
    body: "Balwant Singh's is open and will be until dawn. Taxi drivers eating parathas at a shared table. The night bus. The city is never entirely shut, but between two and four it is as close as it gets.",
    where: "Bhowanipore, and the all-night stalls",
    scene: "tram",
    photo: "park-street-night",
    href: "/neighbourhoods/kalighat",
    intensity: 0.2,
  },
];
