import type { Coords } from "./types";

export interface Film {
  slug: string;
  title: string;
  bengali?: string;
  year: number;
  director: string;
  line: string;
  note: string;
  /** Where in the city it was shot, or is set. */
  locations: { name: string; coords: Coords; what: string; href?: string }[];
}

export const films: Film[] = [
  {
    slug: "pather-panchali",
    title: "Pather Panchali",
    bengali: "পথের পাঁচালী",
    year: 1955,
    director: "Satyajit Ray",
    line: "Shot on weekends over two and a half years, with a borrowed camera and an amateur crew.",
    note: "Ray pawned his wife's jewellery to keep going and finished it with a West Bengal government grant booked, confusingly, under roads. It won at Cannes the following year.",
    locations: [
      { name: "Boral", coords: { lat: 22.4433, lng: 88.3866 }, what: "The village south of the city that stood in for Nischindipur." },
      { name: "1/1 Bishop Lefroy Road", coords: { lat: 22.5346, lng: 88.3596 }, what: "Where the storyboards were drawn." },
    ],
  },
  {
    slug: "mahanagar",
    title: "Mahanagar",
    bengali: "মহানগর",
    year: 1963,
    director: "Satyajit Ray",
    line: "A Calcutta housewife takes a job selling knitting machines, and the family's idea of itself collapses.",
    note: "Madhabi Mukherjee's first lead for Ray. It is a film about the city as an economic fact: rent, wages, a shared flat, and a job you cannot admit to.",
    locations: [
      { name: "Central Kolkata offices", coords: { lat: 22.5679, lng: 88.3559 }, what: "The clerical Calcutta the film is about." },
      { name: "Bhowanipore", coords: { lat: 22.5273, lng: 88.3436 }, what: "The flat, and the streets she walks selling." },
    ],
  },
  {
    slug: "charulata",
    title: "Charulata",
    bengali: "চারুলতা",
    year: 1964,
    director: "Satyajit Ray",
    line: "The one Ray said he would change least. A bored wife, a printing press, and a pair of opera glasses.",
    note: "Adapted from Tagore's Nastanirh and set in an 1880s Jorasanko-style household. The opening seven minutes, almost wordless, are among the most studied in Indian cinema.",
    locations: [
      { name: "Jorasanko", coords: { lat: 22.5852, lng: 88.3617 }, what: "The world it recreates: a reformist Bengali mansion with its own press.", href: "/neighbourhoods/jorasanko" },
    ],
  },
  {
    slug: "meghe-dhaka-tara",
    title: "Meghe Dhaka Tara",
    bengali: "মেঘে ঢাকা তারা",
    year: 1960,
    director: "Ritwik Ghatak",
    line: "A refugee family consumes its eldest daughter, who supports all of them and dies of it.",
    note: "The final cry on the hillside is one of the most cited moments in Indian cinema. Ghatak crossed from Dhaka in 1947 and made almost everything about that crossing.",
    locations: [
      { name: "The refugee colonies", coords: { lat: 22.4991, lng: 88.3712 }, what: "The southern and eastern edges, settled after Partition.", href: "/neighbourhoods/jadavpur" },
    ],
  },
  {
    slug: "nayak",
    title: "Nayak",
    bengali: "নায়ক",
    year: 1966,
    director: "Satyajit Ray",
    line: "A film star on an overnight train to Delhi, interrogated by a journalist and by himself.",
    note: "Ray wrote it for Uttam Kumar, who was at the height of his fame and agreed to a part that takes him apart. Most of it happens in a moving carriage.",
    locations: [
      { name: "Howrah Station", coords: { lat: 22.5839, lng: 88.3425 }, what: "Where the train leaves from.", href: "/neighbourhoods/howrah-bridge-strand" },
      { name: "Tollygunge studios", coords: { lat: 22.4972, lng: 88.3436 }, what: "The industry the film is about.", href: "/neighbourhoods/tollygunge" },
    ],
  },
  {
    slug: "sonar-kella",
    title: "Sonar Kella",
    bengali: "সোনার কেল্লা",
    year: 1974,
    director: "Satyajit Ray",
    line: "Feluda on screen: a boy who remembers a past life, and a chase across Rajasthan.",
    note: "Ray wrote the Feluda stories, then filmed two of them. For most Bengalis the detective, his cousin Topshe and the writer Jatayu are as familiar as anyone in the family.",
    locations: [
      { name: "21 Rajani Sen Road", coords: { lat: 22.5158, lng: 88.3489 }, what: "Feluda's address in Ballygunge, and a real street.", href: "/neighbourhoods/ballygunge" },
    ],
  },
  {
    slug: "joi-baba-felunath",
    title: "Joi Baba Felunath",
    bengali: "জয় বাবা ফেলুনাথ",
    year: 1979,
    director: "Satyajit Ray",
    line: "The second Feluda film, and Utpal Dutt as the villain Maganlal Meghraj.",
    note: "Set in Benares but produced entirely out of Kolkata, and the knife-throwing sequence is the single most quoted scene in Bengali popular cinema.",
    locations: [
      { name: "Tollygunge studios", coords: { lat: 22.4972, lng: 88.3436 }, what: "Where the interiors were built.", href: "/neighbourhoods/tollygunge" },
    ],
  },
  {
    slug: "interview",
    title: "Interview",
    year: 1971,
    director: "Mrinal Sen",
    line: "A young man needs a Western suit for a job interview and cannot get one. Then he turns to the camera.",
    note: "The first of the Calcutta trilogy, made while the city was under curfew during the Naxalite years. Sen breaks the fourth wall and asks the audience what it thinks it is doing there.",
    locations: [
      { name: "Central Kolkata", coords: { lat: 22.5645, lng: 88.3512 }, what: "The streets, shot largely without permission.", href: "/neighbourhoods/esplanade" },
    ],
  },
  {
    slug: "ek-din-pratidin",
    title: "Ek Din Pratidin",
    bengali: "একদিন প্রতিদিন",
    year: 1979,
    director: "Mrinal Sen",
    line: "A working daughter does not come home one night, and the family's respectability disintegrates over the hours of waiting.",
    note: "The quiet masterpiece. Almost the entire film takes place in one flat, over one night, and the daughter is barely on screen.",
    locations: [
      { name: "A north Kolkata flat", coords: { lat: 22.5892, lng: 88.3641 }, what: "The shared building, the neighbours, the stairwell.", href: "/neighbourhoods/chitpur" },
    ],
  },
  {
    slug: "saptapadi",
    title: "Saptapadi",
    bengali: "সপ্তপদী",
    year: 1961,
    director: "Ajoy Kar",
    line: "Uttam Kumar and Suchitra Sen on a motorcycle, and the most quoted Bengali romance there is.",
    note: "The Othello rehearsal sequence, with the two of them dubbed by Utpal Dutt and Jennifer Kendal, is a set piece every Bengali household can recite.",
    locations: [
      { name: "Tollygunge", coords: { lat: 22.4956, lng: 88.3465 }, what: "Studio-era Bengali cinema at its commercial height.", href: "/neighbourhoods/tollygunge" },
    ],
  },
];

export interface FilmPerson {
  name: string;
  role: "director" | "actor";
  years: string;
  line: string;
  href?: string;
}

export const filmPeople: FilmPerson[] = [
  { name: "Satyajit Ray", role: "director", years: "1921–1992", line: "Wrote, drew, scored and directed. Honorary Academy Award in 1992.", href: "/people/satyajit-ray" },
  { name: "Ritwik Ghatak", role: "director", years: "1925–1976", line: "Eight features, mostly about Partition, mostly commercial failures.", href: "/people/ritwik-ghatak" },
  { name: "Mrinal Sen", role: "director", years: "1923–2018", line: "Broke the fourth wall and never apologised for it.", href: "/people/mrinal-sen" },
  { name: "Aparna Sen", role: "director", years: "b. 1945", line: "36 Chowringhee Lane in 1981, and a second career better than the first." },
  { name: "Rituparno Ghosh", role: "director", years: "1963–2013", line: "Nineteen films in nineteen years, and the most significant queer figure in Bengali public life." },
  { name: "Uttam Kumar", role: "actor", years: "1926–1980", line: "The Mahanayak. Seven flops, then thirty years.", href: "/people/uttam-kumar" },
  { name: "Suchitra Sen", role: "actor", years: "1931–2014", line: "Stopped in 1978 and was never photographed in public again.", href: "/people/suchitra-sen" },
  { name: "Soumitra Chatterjee", role: "actor", years: "1935–2020", line: "Fourteen films with Ray, and Feluda on screen." },
  { name: "Madhabi Mukherjee", role: "actor", years: "b. 1942", line: "Mahanagar and Charulata, and the face of Ray's best decade." },
  { name: "Utpal Dutt", role: "actor", years: "1929–1993", line: "Marxist playwright, jatra writer, and the finest villain Bengali cinema had." },
];
