import type { PhotoId } from "./photos";

/**
 * Frame Kolkata: My Coolkata's recurring photo and video contest for small
 * creators. The best photographers and videographers of each season are
 * invited to intern with My Coolkata.
 *
 * Everything a season needs lives in this file, so running the next one is
 * an edit here rather than to the page. Anything not yet decided stays
 * `undefined` and the page says "To be announced".
 */

export type ContestStatus = "soon" | "open" | "judging" | "announced";

export const statusLabel: Record<ContestStatus, string> = {
  soon: "Coming soon",
  open: "Entries open",
  judging: "Judging",
  announced: "Crew announced",
};

export interface Season {
  number: number;
  theme: string;
  bengali: string;
  brief: string;
  status: ContestStatus;
  opens?: string;
  closes?: string;
  /** The entry form. The enter button only appears once this is set and entries are open. */
  entryUrl?: string;
  internship: string;
}

export const currentSeason: Season = {
  number: 1,
  theme: "Paras of Kolkata",
  bengali: "পাড়ার ছবি",
  brief:
    "Any neighbourhood, one city. Pick the part of Kolkata you know best and show us what the rest of us walk straight past.",
  status: "soon",
  internship: "1 or 3 months",
};

export const pad = (n: number) => String(n).padStart(2, "0");

export const contestTracks = {
  photo: {
    bengali: "ছবি",
    title: "Photo series",
    brief:
      "A short series of photographs about one para. Tell us something about the place, not just what it looks like.",
    specs: [
      "Up to five photographs",
      "Shot in Kolkata, by you",
      "Phone or camera, both welcome",
      "Edit the light, not the truth: no composites",
    ],
  },
  video: {
    bengali: "ভিডিও",
    title: "Short film",
    brief:
      "One short video about one para. A reel, a walk, a portrait of a single stall: the form is up to you.",
    specs: [
      "One video, 30 to 90 seconds",
      "Vertical or horizontal",
      "Your own footage, and music you have the right to use",
      "Subtitles if anyone speaks",
    ],
  },
};

export const contestSteps = [
  {
    title: "Pick a para",
    line: "Choose any part of Kolkata, from the sheet or from your own streets.",
  },
  {
    title: "Shoot it",
    line: "Phone or camera. What matters is that it could only be this place.",
  },
  {
    title: "Send it in",
    line: "Enter through the form before the deadline, with a line on where and why.",
  },
  {
    title: "The shortlist",
    line: "The My Coolkata team picks a shortlist, shown on this site with your name on it.",
  },
  {
    title: "Join the crew",
    line: "The best photographers and videographers are invited to intern with My Coolkata.",
  },
];

export const crewPerks = [
  {
    title: "Real assignments",
    line: "Shoot parts of the city for My Coolkata's own pages.",
  },
  {
    title: "Your name on your work",
    line: "Everything you make for the site is credited to you.",
  },
  {
    title: "See how it gets made",
    line: "From the brief to the published page, alongside the team.",
  },
  {
    title: "Something to show for it",
    line: "Leave with published work for your portfolio.",
  },
];

/**
 * Starting points, not a closed list: any neighbourhood of Kolkata can be
 * entered. These are the ones laid out on the contact sheet, each with a brief.
 */
export interface ContestTheme {
  slug: string;
  name: string;
  bengali: string;
  photo: PhotoId;
  prompt: string;
  photoIdea: string;
  videoIdea: string;
  href: string;
}

export const contestThemes: ContestTheme[] = [
  {
    slug: "college-street",
    name: "College Street",
    bengali: "বইপাড়া",
    photo: "college-street",
    prompt:
      "A mile of secondhand book stalls, the Coffee House stairs, and the hour the shutters come down.",
    photoIdea: "Hands on spines, and stacks taller than the sellers.",
    videoIdea: "One stall from opening to closing, in ninety seconds.",
    href: "/college-street",
  },
  {
    slug: "kumartuli",
    name: "Kumartuli",
    bengali: "কুমোরটুলি",
    photo: "kumartuli-lane",
    prompt:
      "The potters' quarter, where the goddess is straw and clay for months before she has a face.",
    photoIdea: "Unfinished figures, and the hands working on them.",
    videoIdea: "Straw to clay to paint, sped up.",
    href: "/kumartuli",
  },
  {
    slug: "prinsep-ghat",
    name: "Prinsep Ghat",
    bengali: "প্রিন্সেপ ঘাট",
    photo: "prinsep-ghat",
    prompt:
      "The river at golden hour, the bridge behind it, and everyone who comes to watch.",
    photoIdea: "Silhouettes against the Hooghly.",
    videoIdea: "The sunset, or the crowd that gathers for it.",
    href: "/neighbourhoods/prinsep-ghat",
  },
  {
    slug: "park-street",
    name: "Park Street",
    bengali: "পার্ক স্ট্রিট",
    photo: "park-street-night",
    prompt: "Old restaurants, neon signs, and the street after dark.",
    photoIdea: "The signs, and the people standing under them.",
    videoIdea: "A night walk from one end to the other.",
    href: "/neighbourhoods/park-street",
  },
  {
    slug: "esplanade",
    name: "Esplanade",
    bengali: "ধর্মতলা",
    photo: "tram-esplanade",
    prompt:
      "Trams, buses, hawkers and the edge of the Maidan, all in one frame.",
    photoIdea: "One corner, many layers.",
    videoIdea: "The crossing at rush hour.",
    href: "/neighbourhoods/esplanade",
  },
  {
    slug: "mullick-ghat",
    name: "Mullick Ghat",
    bengali: "মল্লিকঘাট",
    photo: "mullick-ghat-flower-market",
    prompt: "The flower market under Howrah Bridge, from before sunrise.",
    photoIdea: "Marigolds by the sackful.",
    videoIdea: "Dawn to the first rush, from the market floor.",
    href: "/neighbourhoods/howrah-bridge-strand",
  },
  {
    slug: "chitpur",
    name: "Chitpur",
    bengali: "চিতপুর",
    photo: "chitpur-road",
    prompt:
      "One of the city's oldest roads, and every trade still carried on along it.",
    photoIdea: "Shopfronts, hand-painted signs and the trades behind them.",
    videoIdea: "A single block, every shop in it.",
    href: "/neighbourhoods/chitpur",
  },
  {
    slug: "kalighat",
    name: "Kalighat",
    bengali: "কালীঘাট",
    photo: "kalighat-temple",
    prompt: "Temple lanes, flower sellers, and a crowd that never quite thins.",
    photoIdea: "The lanes around the temple, not just the temple.",
    videoIdea: "The walk in from the main road.",
    href: "/neighbourhoods/kalighat",
  },
  {
    slug: "gariahat",
    name: "Gariahat",
    bengali: "গড়িয়াহাট",
    photo: "gariahat",
    prompt: "Pavement shopping, hard bargaining and the four-way crossing.",
    photoIdea: "Stalls, and the people haggling at them.",
    videoIdea: "Buy one thing, and film the whole negotiation.",
    href: "/neighbourhoods/gariahat",
  },
  {
    slug: "tangra",
    name: "Tangra",
    bengali: "ট্যাংরা",
    photo: "tangra",
    prompt: "Chinese Kolkata: kitchens, old tanneries and red lanterns.",
    photoIdea: "Kitchens, and New Year colour.",
    videoIdea: "One kitchen, one dish, start to finish.",
    href: "/neighbourhoods/chinatown-tangra",
  },
  {
    slug: "new-town",
    name: "New Town",
    bengali: "নিউ টাউন",
    photo: "new-town",
    prompt: "Glass towers, wide roads, and a city still being built.",
    photoIdea: "Old Kolkata habits in new architecture.",
    videoIdea: "The same road, by day and by night.",
    href: "/neighbourhoods/new-town-salt-lake",
  },
  {
    slug: "shyambazar",
    name: "Shyambazar",
    bengali: "শ্যামবাজার",
    photo: "shyambazar",
    prompt: "The five-point crossing, and the north's old houses around it.",
    photoIdea: "Balconies, doorways and the people in them.",
    videoIdea: "The crossing, from each of its five roads.",
    href: "/neighbourhoods/shyambazar",
  },
];

export const contestFaqs = [
  {
    q: "Who can enter?",
    a: "Small creators, students, hobbyists and influencers. You do not need a big following, a portfolio or an expensive camera.",
  },
  {
    q: "Do I have to pick one of the paras on the sheet?",
    a: "No. They are starting points, each with a brief. Any neighbourhood of Kolkata counts, from Behala to Baranagar, so shoot the one you know best.",
  },
  {
    q: "Can I shoot on my phone?",
    a: "Yes, for both tracks. The judging is about the eye, not the equipment.",
  },
  {
    q: "Can I enter both photo and video?",
    a: "Yes. Each track is judged on its own.",
  },
  {
    q: "What about people in my frame?",
    a: "Ask before you photograph or film someone up close, especially at work or at worship. A good picture of this city is made with its people, not taken from them.",
  },
  {
    q: "How long is the internship?",
    a: "One month or three. The length, and how many places there are, is announced with each season before entries open.",
  },
  {
    q: "How is my work credited?",
    a: "Anything shortlisted and shown on My Coolkata carries your name. The full terms are published with each season's entry form.",
  },
  {
    q: "When does the next season start?",
    a: "Seasons run one after another, a few months apart, each with a new theme. The dates for this one will be announced on this page.",
  },
];
