/** "How Kolkata Are You?" Six questions, six results, one shareable line. */
export type Trait = "adda" | "para" | "foodie" | "heritage" | "night" | "river";

export interface PQuestion {
  id: string;
  question: string;
  options: { label: string; note: string; scores: Partial<Record<Trait, number>> }[];
}

export const pQuestions: PQuestion[] = [
  {
    id: "evening",
    question: "What is your ideal evening?",
    options: [
      { label: "Four hours at one table", note: "Tea, an argument, and nothing decided.", scores: { adda: 3, para: 1 } },
      { label: "Walking your own few streets", note: "The sweet shop, the club, the people who notice if you're away.", scores: { para: 3, adda: 1 } },
      { label: "Park Street, late", note: "A queue on the pavement and a band at the back.", scores: { night: 3, foodie: 1 } },
      { label: "The ghat at dusk", note: "Water on stone, a ferry horn, and not much talking.", scores: { river: 3 } },
    ],
  },
  {
    id: "hundred",
    question: "Where would you spend ₹100?",
    options: [
      { label: "Six phuchka and a roll", note: "Standing up, in a leaf bowl, cash only.", scores: { foodie: 3, para: 1 } },
      { label: "A secondhand paperback", note: "Something you have been looking for since college.", scores: { adda: 3, heritage: 1 } },
      { label: "Three ferry crossings", note: "Out and back and out again, for the view.", scores: { river: 3 } },
      { label: "Entry and a permit", note: "Marble Palace, and the tourism office the day before.", scores: { heritage: 3 } },
    ],
  },
  {
    id: "fish-or-mutton",
    question: "Fish or mutton?",
    options: [
      { label: "Fish, and I can debone hilsa with my tongue", note: "June to September is a different calendar.", scores: { foodie: 3, river: 1 } },
      { label: "Mutton, and Sunday exists for it", note: "Kosha mangsho, cooked down until it is almost black.", scores: { foodie: 3, para: 1 } },
      { label: "Whatever is at the cabin", note: "Kobiraji cutlet and a brain chop, since 1920.", scores: { night: 2, para: 2 } },
      { label: "I came for the sweets", note: "Nolen gur, eight weeks a year, and worth planning around.", scores: { foodie: 2, heritage: 2 } },
    ],
  },
  {
    id: "derby",
    question: "Mohun Bagan or East Bengal?",
    options: [
      { label: "Mohun Bagan", note: "Barefoot, 2–1, 1911, and we will be mentioning it again.", scores: { para: 3, adda: 1 } },
      { label: "East Bengal", note: "The club of everyone who crossed. Ask about 1975.", scores: { para: 3, adda: 1 } },
      { label: "Mohammedan Sporting", note: "Five consecutive league titles in the 1930s. Look it up.", scores: { para: 2, heritage: 2 } },
      { label: "I am here for the fish market", note: "Prawn against hilsa, and the price moves with the result.", scores: { foodie: 3, adda: 1 } },
    ],
  },
  {
    id: "coffee-or-park",
    question: "Coffee House or Park Street?",
    options: [
      { label: "Coffee House", note: "Very high ceiling, appalling acoustics, and the whole room shouting.", scores: { adda: 3, heritage: 1 } },
      { label: "Park Street", note: "Red turbans, a menu unchanged since 1956, and a queue.", scores: { night: 3, foodie: 1 } },
      { label: "A tea shop with a bench", note: "Clay cup, seven rupees, and no expectation you buy anything else.", scores: { para: 3, adda: 1 } },
      { label: "The promenade at Prinsep Ghat", note: "Sunset, the columns, and a boat if the queue is short.", scores: { river: 3 } },
    ],
  },
  {
    id: "pandal-or-walk",
    question: "Puja pandal or heritage walk?",
    options: [
      { label: "Pandal, all five nights", note: "Ashtami until four in the morning, on foot, in a crowd.", scores: { night: 2, para: 3 } },
      { label: "A bonedi bari courtyard", note: "A household Puja, a family, a priest, and a lot of protocol.", scores: { heritage: 3, adda: 1 } },
      { label: "Heritage walk, Sunday morning", note: "BBD Bagh with the offices shut, and the buildings finally legible.", scores: { heritage: 3 } },
      { label: "Kumartuli at dawn on Mahalaya", note: "The eyes painted in three strokes, before it is light.", scores: { river: 1, heritage: 2, para: 2 } },
    ],
  },
];

export interface PResult {
  trait: Trait;
  title: string;
  line: string;
  body: string;
  share: string;
  goNext: { label: string; href: string }[];
}

export const pResults: Record<Trait, PResult> = {
  adda: {
    trait: "adda",
    title: "The Adda Intellectual",
    line: "You hold a table, not a schedule.",
    body: "You will start on the derby, arrive at Ritwik Ghatak, digress into your uncle's second marriage and return having forgotten who was arguing which side. This is not a failure of the form; it is the form. If a decision gets made you are doing it wrong.",
    share: "I'm The Adda Intellectual. Four hours, one table, nothing decided.",
    goNext: [
      { label: "Adda", href: "/adda" },
      { label: "College Street", href: "/college-street" },
      { label: "The City of Words", href: "/literature" },
    ],
  },
  para: {
    trait: "para",
    title: "The Para Explorer",
    line: "Your unit of the city is a few streets wide.",
    body: "Ask you where you are from and you name a para, not a city. You know your sweet shop, your tea stall, your Puja committee and which lane floods first. This is how Kolkata actually organises itself, and everyone else is a tourist in it.",
    share: "I'm The Para Explorer. My Kolkata is about four streets wide.",
    goNext: [
      { label: "Neighbourhoods", href: "/neighbourhoods" },
      { label: "Football Kolkata", href: "/football" },
      { label: "Hidden Kolkata", href: "/hidden" },
    ],
  },
  foodie: {
    trait: "foodie",
    title: "The Kolkata Foodie",
    line: "You have opinions about the potato, and you are right.",
    body: "You can tell a Kusum roll from a Nizam's one, you know that phuchka water is sour and never sweet, and you plan a December visit around eight weeks of date-palm jaggery. You will eat standing up, in cash, in a leaf bowl.",
    share: "I'm The Kolkata Foodie. Biryani without the potato is not biryani.",
    goNext: [
      { label: "Taste Kolkata", href: "/food" },
      { label: "Build my day", href: "/build-my-day" },
      { label: "Kolkata by mood", href: "/mood" },
    ],
  },
  heritage: {
    trait: "heritage",
    title: "The Heritage Walker",
    line: "You get up on a Sunday because the offices are shut.",
    body: "You know that BBD Bagh is only legible when nobody is working in it, that Marble Palace needs a permit from the tourism office, and that the brass lines outside the GPO mark the Black Hole. You read the dates on gravestones.",
    share: "I'm The Heritage Walker. I plan Sundays around empty offices.",
    goNext: [
      { label: "Heritage", href: "/heritage" },
      { label: "Architecture", href: "/architecture" },
      { label: "Then and now", href: "/then-and-now" },
    ],
  },
  night: {
    trait: "night",
    title: "The Night Owl",
    line: "The city you like starts at ten.",
    body: "Sodium light flattens everything to one amber tone and you will defend that against LEDs to anybody who asks. You know which lanes have not been converted, that Balwant Singh's is open until dawn, and that the bridge is best lit from Millennium Park.",
    share: "I'm The Night Owl. My Kolkata is amber and starts at ten.",
    goNext: [
      { label: "Kolkata Sounds", href: "/sounds" },
      { label: "A day in Kolkata", href: "/a-day-in-kolkata" },
      { label: "Sodium light", href: "/stories/sodium-light" },
    ],
  },
  river: {
    trait: "river",
    title: "The River Watcher",
    line: "You would rather be on the water than beside it.",
    body: "Five rupees, ten minutes, and the best commute in India. You get up for the flower market, you know the ferries run to Belur, and you can tell hilsa season by the price and the argument at Gariahat rather than the calendar.",
    share: "I'm The River Watcher. Five rupees, ten minutes, best view in the city.",
    goNext: [
      { label: "The Hooghly", href: "/river" },
      { label: "Prinsep Ghat", href: "/neighbourhoods/prinsep-ghat" },
      { label: "What the Hooghly carries", href: "/stories/what-the-hooghly-carries" },
    ],
  },
};

export function scoreToResult(scores: Record<Trait, number>): PResult {
  let best: Trait = "adda";
  let bestV = -1;
  (Object.keys(pResults) as Trait[]).forEach((t) => {
    if (scores[t] > bestV) {
      bestV = scores[t];
      best = t;
    }
  });
  return pResults[best];
}

export const emptyScores = (): Record<Trait, number> => ({
  adda: 0,
  para: 0,
  foodie: 0,
  heritage: 0,
  night: 0,
  river: 0,
});
