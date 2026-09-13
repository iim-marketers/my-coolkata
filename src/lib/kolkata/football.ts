import type { Coords } from "./types";

export interface Club {
  id: "mohun-bagan" | "east-bengal" | "mohammedan";
  name: string;
  bengali?: string;
  founded: number;
  colours: string;
  tone: string;
  ink: string;
  nickname: string;
  base: string;
  coords: Coords;
  line: string;
  body: string[];
  honours: { what: string; note: string }[];
}

export const clubs: Club[] = [
  {
    id: "mohun-bagan",
    name: "Mohun Bagan",
    bengali: "মোহনবাগান",
    founded: 1889,
    colours: "Green and maroon",
    tone: "#0f5132",
    ink: "#7a1f3d",
    nickname: "The Mariners",
    base: "Mohun Bagan Ground, the Maidan",
    coords: { lat: 22.5657, lng: 88.3405 },
    line: "Beat a British regiment barefoot in 1911, and has not stopped mentioning it.",
    body: [
      "Founded in 1889 in a north Calcutta house, and named for the garden the founders met in. For its first two decades it was a club of the Bengali professional class playing a game the army had brought.",
      "On 29 July 1911 it beat East Yorkshire Regiment 2–1 in the IFA Shield final. The Indian team played barefoot against booted opposition. Shibdas Bhaduri captained, and the political reading of the result was immediate and enormous.",
      "It is historically the club of West Bengal families, the ghotis, as against East Bengal's bangals. That distinction hardened after 1947 and is still the first thing anyone tells you.",
      "The club was given National Club of India status in 1889's centenary year, and 29 July is observed as Mohun Bagan Day.",
    ],
    honours: [
      { what: "IFA Shield 1911", note: "Barefoot, 2–1, against East Yorkshire Regiment" },
      { what: "National Football League / I-League", note: "Multiple titles from 1997 onwards" },
      { what: "Durand Cup", note: "The oldest tournament in Asia, won repeatedly" },
      { what: "Indian Super League", note: "Won as Mohun Bagan Super Giant in 2023-24" },
    ],
  },
  {
    id: "east-bengal",
    name: "East Bengal",
    bengali: "ইস্টবেঙ্গল",
    founded: 1920,
    colours: "Red and gold",
    tone: "#b21f24",
    ink: "#e0a52a",
    nickname: "The Red and Gold Brigade",
    base: "East Bengal Ground, the Maidan",
    coords: { lat: 22.5673, lng: 88.3399 },
    line: "Founded after a player from the east was dropped, and it became the refugee club.",
    body: [
      "Founded on 1 August 1920 by Suresh Chandra Chaudhuri, after a player from the eastern districts was left out of a Jorabagan side and the selectors would not explain why.",
      "It became the club of people from East Bengal, and after 1947 the club of the refugee population that settled the southern and eastern edges of the city. That is not a marketing story; it is demographic history.",
      "In 1970 it beat Pas Club of Iran 1–0 in the IFA Shield final in front of a crowd that shut central Calcutta. Its run of five consecutive Calcutta League titles in the 1970s remains the benchmark.",
      "The hilsa fish is the club's food symbol against Mohun Bagan's prawn, and on derby day the market prices move with the expected result.",
    ],
    honours: [
      { what: "IFA Shield", note: "The most-won club in the tournament's history" },
      { what: "Calcutta Football League", note: "Record number of titles" },
      { what: "ASEAN Club Championship 2003", note: "Beat BEC Tero Sasana in Jakarta" },
      { what: "National Football League", note: "Three titles" },
    ],
  },
  {
    id: "mohammedan",
    name: "Mohammedan Sporting",
    founded: 1891,
    colours: "Black and white",
    tone: "#161616",
    ink: "#d8cfa8",
    nickname: "The Black Panthers",
    base: "Mohammedan Sporting Ground, the Maidan",
    coords: { lat: 22.5641, lng: 88.3396 },
    line: "Won five consecutive Calcutta League titles in the 1930s, the first Indian club to take it.",
    body: [
      "Founded in 1891, and by the 1930s the strongest side in the country. Between 1934 and 1938 it won five consecutive Calcutta Football League titles, and in 1934 became the first Indian club to win the league at all.",
      "That side played barefoot and beat the British regimental teams routinely. Its support was drawn from across the Muslim communities of Bengal and beyond, and its matches carried a political charge in the 1930s that the other two did not.",
      "It won the IFA Shield in 1936 and the Durand and Rovers Cups in 1940, the first Indian club to take either.",
      "It has spent long periods outside the top division and returned to the Indian Super League era through the I-League, which the older supporters regard as overdue rather than surprising.",
    ],
    honours: [
      { what: "Calcutta League 1934–38", note: "Five in a row; the first Indian club to win it" },
      { what: "IFA Shield 1936", note: "And repeatedly since" },
      { what: "Durand Cup 1940", note: "First Indian club to win it" },
      { what: "I-League 2023-24", note: "Promotion to the top tier" },
    ],
  },
];

export interface DerbyMoment {
  year: number;
  score?: string;
  title: string;
  body: string;
  pivotal?: boolean;
}

/** The derby, as the arguments people actually have about it. */
export const derbyTimeline: DerbyMoment[] = [
  {
    year: 1921,
    score: "0–0",
    title: "The first derby",
    body: "Mohun Bagan and East Bengal meet for the first time, in the Coochbehar Cup. Goalless, and the beginning of the longest-running club rivalry in Asia.",
    pivotal: true,
  },
  {
    year: 1925,
    score: "1–0",
    title: "East Bengal's first win",
    body: "Nepal Chakraborty scores, and the newer club beats the older one for the first time. The result is still cited a century later.",
  },
  {
    year: 1947,
    title: "Partition",
    body: "The Radcliffe Line divides Bengal. Millions cross, refugee colonies form on the city's edges, and the derby stops being about football clubs alone.",
    pivotal: true,
  },
  {
    year: 1975,
    score: "5–0",
    title: "The five-goal derby",
    body: "East Bengal beat Mohun Bagan 5–0 in the IFA Shield, with Surajit Sengupta and a hat-trick from Shyam Thapa's side of the argument. A Mohun Bagan supporter is reported to have taken his own life afterwards. It is the most cited scoreline in Indian football.",
    pivotal: true,
  },
  {
    year: 1977,
    title: "Pelé at Eden Gardens",
    body: "Cosmos New York, with Pelé, draw 2–2 with Mohun Bagan in front of a full house. It is the closest Indian club football has come to a global event.",
  },
  {
    year: 1997,
    score: "4–1",
    title: "The largest crowd",
    body: "East Bengal beat Mohun Bagan 4–1 in the Federation Cup semi-final at Salt Lake Stadium in front of a crowd recorded at around 131,000, one of the largest ever at a club match anywhere.",
    pivotal: true,
  },
  {
    year: 2003,
    title: "East Bengal in Jakarta",
    body: "East Bengal win the ASEAN Club Championship, beating BEC Tero Sasana of Thailand in the final. Still the most significant continental result by a Kolkata club.",
  },
  {
    year: 2020,
    title: "The derby moves to the ISL",
    body: "Both clubs enter the Indian Super League, Mohun Bagan merged with ATK and East Bengal with a new investor. The rivalry survives the corporate renaming, largely by ignoring it.",
  },
  {
    year: 2024,
    title: "Mohammedan come up",
    body: "Mohammedan Sporting win promotion to the top tier, and for the first time in decades all three Maidan clubs are in the same division.",
  },
];

export const footballFacts = [
  {
    v: "1911",
    t: "Barefoot, 2–1",
    d: "Mohun Bagan beat East Yorkshire Regiment in the IFA Shield final. The political weight of that result is still being discussed.",
  },
  {
    v: "≈131,000",
    t: "The largest club crowd",
    d: "Salt Lake Stadium, 1997 Federation Cup semi-final. Among the biggest attendances at any club football match anywhere.",
  },
  {
    v: "3",
    t: "Clubs, one field",
    d: "Mohun Bagan, East Bengal and Mohammedan Sporting all have their grounds on the Maidan, within a few hundred metres of each other.",
  },
  {
    v: "Prawn vs hilsa",
    t: "The fish market index",
    d: "Ghotis take prawn, bangals take hilsa, and on derby day the price of each moves with the expected result.",
  },
];

export const fanCulture = [
  {
    t: "Ghoti and bangal",
    d: "Ghotis are families from West Bengal, bangals from the east. Mohun Bagan is historically the ghoti club and East Bengal the bangal one. It is a distinction about Partition wearing a football shirt.",
  },
  {
    t: "The tents",
    d: "All three clubs keep tents on the Maidan: part clubhouse, part committee room, part tea shop. On a match morning they are the best place in the city to be.",
  },
  {
    t: "Torches and tifos",
    d: "Ultras groups on both sides produce full-stand tifos for the derby, and the choreography is planned for weeks.",
  },
  {
    t: "The result at work",
    d: "Losing the derby is a professional inconvenience. Offices in this city are noticeably quieter on the Monday after.",
  },
];
