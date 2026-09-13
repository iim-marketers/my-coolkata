import type { Coords, SceneName } from "./types";

export interface RiverChapter {
  slug: string;
  numeral: string;
  title: string;
  bengali?: string;
  standfirst: string;
  body: string[];
  scene: SceneName;
  coords?: Coords;
  detail?: { label: string; value: string }[];
  href?: string;
}

export const riverChapters: RiverChapter[] = [
  {
    slug: "why-here",
    numeral: "I",
    title: "Why the city is here at all",
    standfirst:
      "A western distributary of the Ganga, deep enough for a ship and awkward enough to defend.",
    body: [
      "The Ganga splits in Bengal. The main flow goes east into Bangladesh as the Padma; a western channel comes down past Murshidabad and Nabadwip and becomes the Hooghly.",
      "In August 1690 an East India Company agent tied up on the east bank at a bend where the water was deep enough to float a ship and the marshes made the site hard to attack from three sides. That is the entire founding reasoning, and everything else follows from it.",
      "The city's High Court ruled in 2003 that Job Charnock should no longer be described as the founder. There is a gravestone in the Armenian churchyard dated 1630, sixty years earlier.",
    ],
    scene: "river",
    coords: { lat: 22.5673, lng: 88.3374 },
    detail: [
      { label: "Founded", value: "August 1690, on the east bank" },
      { label: "Why here", value: "Deep water, defensible marsh" },
      { label: "Older evidence", value: "A 1630 gravestone at the Armenian Church" },
    ],
  },
  {
    slug: "howrah-bridge",
    numeral: "II",
    title: "Howrah Bridge",
    standfirst:
      "705 metres of riveted cantilever that touches the water nowhere in between.",
    body: [
      "The pontoon bridge it replaced had been swinging open for river traffic since 1874 and by the 1920s the crossing was a daily humiliation. A commission specified a cantilever so that no pier would stand in the shipping channel.",
      "It is riveted, not bolted: roughly 26,500 tonnes of steel, most of it Tata's, fastened with hot rivets driven by hand. It opened in February 1943 with no ceremony, because a lit ribbon-cutting during a Japanese bombing campaign seemed unwise. The first thing across was a tram.",
      "What it carries is the point. Cars and buses matter less than the river of people who walk it, and the pavement has been worn into shallow troughs.",
    ],
    scene: "howrah",
    coords: { lat: 22.5851, lng: 88.3468 },
    detail: [
      { label: "Opened", value: "February 1943, without ceremony" },
      { label: "Length", value: "705 m; main span 457 m" },
      { label: "Renamed", value: "Rabindra Setu, 1965" },
    ],
    href: "/heritage/howrah-bridge",
  },
  {
    slug: "prinsep-ghat",
    numeral: "III",
    title: "Prinsep Ghat",
    standfirst:
      "A Palladian portico raised for the man who deciphered the Ashokan edicts.",
    body: [
      "James Prinsep was an assay master at the Calcutta Mint, an architect, and the scholar who cracked the Brahmi and Kharosthi scripts. That work unlocked the edicts of Ashoka and with them a large part of ancient Indian history. He died in 1840, at forty, and the portico went up the next year.",
      "It is Greek Revival, with a run of Doric columns facing the water, restored in the 2000s along with the promenade. Vidyasagar Setu rises immediately behind it, and the 1841 columns against the 1992 cable-stays in one frame is the shot everyone comes for.",
      "There are boats from the steps, a food market along the promenade, and the circular railway passing behind at intervals. Go on a weekday if you want the light without the crowd.",
    ],
    scene: "river",
    coords: { lat: 22.557, lng: 88.332 },
    detail: [
      { label: "Built", value: "1841" },
      { label: "For", value: "James Prinsep, who deciphered Brahmi" },
      { label: "Best hour", value: "The hour before sunset" },
    ],
    href: "/neighbourhoods/prinsep-ghat",
  },
  {
    slug: "the-ghats",
    numeral: "IV",
    title: "The ghats",
    bengali: "ঘাট",
    standfirst:
      "Steps into the water, used for washing, swimming, praying, wrestling and leaving.",
    body: [
      "Babughat was built in 1830 by Rani Rashmoni in memory of her husband, and its Doric portico is what survives of that. Bagbazar Ghat has swimmers, priests and laundry from before six. Ahiritola has the best light on the river and a fraction of the crowd.",
      "Kushti akharas, mud-pit wrestling gyms, have operated along the northern ghats for well over a century, mostly run by families originally from Bihar and Uttar Pradesh.",
      "Mullick Ghat Flower Market sits under the eastern approach to Howrah Bridge, and from four in the morning two thousand traders sort marigold, tuberose and lotus by torchlight. It is the best hour in the city.",
    ],
    scene: "river",
    coords: { lat: 22.5842, lng: 88.3436 },
    detail: [
      { label: "Babughat", value: "1830, built by Rani Rashmoni" },
      { label: "Mullick Ghat", value: "≈2,000 flower traders, from 4am" },
      { label: "Akharas", value: "Mud-pit wrestling, over a century" },
    ],
    href: "/neighbourhoods/babughat",
  },
  {
    slug: "ritual",
    numeral: "V",
    title: "What the river is for",
    standfirst:
      "Bathing, tarpan, immersion, and the last journey. The Hooghly is infrastructure and sacrament at once.",
    body: [
      "On Mahalaya, a week before Durga Puja, people stand waist-deep at the ghats at dawn to perform tarpan for their ancestors. It is the most photographed morning of the year and the photographs rarely convey how cold the water is.",
      "On Dashami the idols come back. Lorries queue along Strand Road through the afternoon and into the night, cranes lift the larger figures, and the clay goes back into the water it came from. Under the current rules the bamboo and straw frames are pulled out again afterwards.",
      "Keoratala on the Adi Ganga is the burning ghat. Tagore was cremated there, and so was Vivekananda at Belur across the water.",
    ],
    scene: "pujo",
    coords: { lat: 22.5673, lng: 88.3374 },
    detail: [
      { label: "Tarpan", value: "Mahalaya, at dawn" },
      { label: "Immersion", value: "Dashami afternoon into the night" },
      { label: "Main ghats", value: "Babughat, Bagbazar, Ahiritola" },
    ],
    href: "/durga-puja#the-immersion",
  },
  {
    slug: "trade",
    numeral: "VI",
    title: "Trade, silt and Farakka",
    standfirst:
      "The river has been trying to close itself since the eighteenth century, and is dredged and flushed to prevent it.",
    body: [
      "The Hooghly is a silting river. Its share of the Ganga's flow was declining, and as flow declines a river drops its load and the channel shallows. By the nineteenth century the approach from the sea, particularly the James and Mary shoal, had killed more ships than any comparable stretch of water in India.",
      "The engineering answer, argued over for a century and built in 1975, was a barrage at Farakka 280 kilometres upstream, diverting water into a feeder canal to flush the channel. Bangladesh has objected for fifty years on the grounds that the water taken is water that does not arrive in the dry season.",
      "Kolkata Port moved most of its heavy traffic downriver to Haldia. The Kidderpore docks still work; the large ships no longer come up.",
    ],
    scene: "river",
    coords: { lat: 22.538, lng: 88.32 },
    detail: [
      { label: "Farakka barrage", value: "1975, 280 km upstream" },
      { label: "Treaty", value: "1996, renegotiated under pressure" },
      { label: "Deep-water port", value: "Moved to Haldia" },
    ],
    href: "/neighbourhoods/kidderpore",
  },
  {
    slug: "what-is-in-it",
    numeral: "VII",
    title: "What is in it now",
    standfirst:
      "Sewage, idols, dolphins and hilsa, in roughly that order of quantity.",
    body: [
      "Untreated sewage from a metropolitan area of fifteen million is the largest single input. The East Kolkata Wetlands treat a substantial share of the city's wastewater using nothing but sunlight and algae, and are being eaten by development from both sides.",
      "Several thousand idols a year go in on Dashami. Until recently the paint was full of lead and chromium; the state now requires water-based colours and the recovery of frames, with uneven compliance.",
      "Gangetic dolphins still surface here in small and declining numbers. Hilsa run upriver to spawn from June to September, which is the fish the entire Bengali culinary year is organised around, and the catch has fallen sharply.",
    ],
    scene: "river",
    coords: { lat: 22.58, lng: 88.42 },
    detail: [
      { label: "Wetlands", value: "A Ramsar site treating the city's sewage" },
      { label: "Hilsa season", value: "June to September" },
      { label: "Dolphins", value: "Present, and declining" },
    ],
    href: "/stories/what-the-hooghly-carries",
  },
];
