/**
 * Four questions, four axes, and a trail picked by nearest match.
 * Every stop points at something that already exists on the site.
 */
export type Axis = "sweetness" | "protein" | "formality" | "hour";

export interface FoodQuestion {
  id: string;
  question: string;
  options: { label: string; note: string; scores: Partial<Record<Axis, number>> }[];
}

export const foodQuestions: FoodQuestion[] = [
  {
    id: "sweet-or-spicy",
    question: "Sweet or spicy?",
    options: [
      {
        label: "Sweet",
        note: "You would finish with two rosogollas and consider a third.",
        scores: { sweetness: 2 },
      },
      {
        label: "Spicy",
        note: "You ask for the extra green chilli without being offered it.",
        scores: { sweetness: -2 },
      },
      {
        label: "Both, in that order",
        note: "The correct Bengali answer.",
        scores: { sweetness: 0 },
      },
    ],
  },
  {
    id: "veg-or-fish",
    question: "Vegetarian or fish?",
    options: [
      {
        label: "Vegetarian",
        note: "Luchi, alur dom, begun bhaja, and no arguments.",
        scores: { protein: 2 },
      },
      {
        label: "Fish",
        note: "You can debone a hilsa with your tongue, or you want to learn.",
        scores: { protein: 0 },
      },
      {
        label: "Mutton, actually",
        note: "Sunday exists for kosha mangsho.",
        scores: { protein: -2 },
      },
    ],
  },
  {
    id: "street-or-restaurant",
    question: "Street food or restaurant?",
    options: [
      {
        label: "Street",
        note: "Standing up, cash only, in a leaf bowl.",
        scores: { formality: -2 },
      },
      {
        label: "Restaurant",
        note: "A table, a waiter in a cummerbund, and a menu that has not changed since 1956.",
        scores: { formality: 2 },
      },
      {
        label: "A cabin",
        note: "The Kolkata compromise: a marble counter, a fan, and a cutlet.",
        scores: { formality: 0 },
      },
    ],
  },
  {
    id: "dawn-or-midnight",
    question: "What time do you eat best?",
    options: [
      {
        label: "Before seven in the morning",
        note: "Kochuri, and the flower market afterwards.",
        scores: { hour: 2 },
      },
      {
        label: "Four in the afternoon, in the rain",
        note: "Telebhaja, muri, and a raw green chilli.",
        scores: { hour: 0 },
      },
      {
        label: "After midnight",
        note: "Rolls, and whatever is still open on the way home.",
        scores: { hour: -2 },
      },
    ],
  },
];

export interface FoodTrail {
  slug: string;
  title: string;
  line: string;
  vector: Record<Axis, number>;
  stops: { time: string; place: string; order: string; note: string; href?: string }[];
}

export const foodTrails: FoodTrail[] = [
  {
    slug: "sweet-north",
    title: "The Sweet North",
    line: "Chhena, gur and a great deal of standing at counters in Hatibagan and Bagbazar.",
    vector: { sweetness: 2, protein: 2, formality: -1, hour: 2 },
    stops: [
      { time: "07:00", place: "Putiram, College Street", order: "Kochuri, cholar dal, a radhaballavi", note: "Since 1868. Gone by ten.", href: "/neighbourhoods/college-street" },
      { time: "09:00", place: "Nakur Nandy, Hatibagan", order: "Jolbhora sandesh", note: "Standing room only. Since 1844.", href: "/neighbourhoods/hatibagan" },
      { time: "11:00", place: "Nobin Chandra Das, Bagbazar", order: "Rosogolla, at the original address", note: "Invented here in 1868.", href: "/food/rosogolla" },
      { time: "16:00", place: "Kalika, College Street", order: "Beguni and mochar chop", note: "Telebhaja, in newspaper.", href: "/food/telebhaja" },
      { time: "18:00", place: "Balaram Mullick, Bhowanipore", order: "Baked mishti doi", note: "In winter, take the nolen gur version instead.", href: "/food/mishti-doi" },
    ],
  },
  {
    slug: "mutton-line",
    title: "The Mutton Line",
    line: "Kosha mangsho, biryani, chaap, and nothing green until Thursday.",
    vector: { sweetness: -2, protein: -2, formality: 0, hour: 0 },
    stops: [
      { time: "12:30", place: "Royal India Hotel, Chitpur", order: "Mutton biryani with the potato", note: "Since 1905, and it is not a hotel.", href: "/food/kolkata-biryani" },
      { time: "15:00", place: "Nakhoda Masjid and Zakaria Street", order: "Walk it off; buy sheermal", note: "The mosque is around the corner.", href: "/heritage/nakhoda-masjid" },
      { time: "18:00", place: "Golbari, Shyambazar", order: "Kosha mangsho, to take away", note: "Nearly black. No tables worth the name.", href: "/food/kosha-mangsho" },
      { time: "20:00", place: "Shiraz, Park Circus", order: "Chicken chaap and a rumali", note: "Since 1941.", href: "/food/kolkata-biryani" },
      { time: "23:00", place: "Balwant Singh's, Bhowanipore", order: "Doodh cola, if you are brave", note: "Open all night." },
    ],
  },
  {
    slug: "bhaat-maach",
    title: "Bhaat-Maach Sunday",
    line: "Rice and fish, at a table, slowly, followed by sleeping.",
    vector: { sweetness: 1, protein: 0, formality: 2, hour: 1 },
    stops: [
      { time: "08:00", place: "Gariahat fish market", order: "Watch the hilsa pricing argument", note: "June to September for ilish.", href: "/neighbourhoods/gariahat" },
      { time: "13:00", place: "6 Ballygunge Place", order: "Daab chingri, bhetki paturi, shukto", note: "A converted house and a tablecloth.", href: "/neighbourhoods/ballygunge" },
      { time: "16:00", place: "Anywhere with a fan", order: "Sleep", note: "This is a formal part of the meal." },
      { time: "18:30", place: "Balaram Mullick", order: "Mishti doi in a clay pot", note: "Firm enough to hold a spoon upright.", href: "/food/mishti-doi" },
      { time: "20:00", place: "Kasturi, Mirza Ghalib Street", order: "Kochu pata chingri", note: "If you can still eat. Bangladeshi Bengali, and hotter." },
    ],
  },
  {
    slug: "midnight-roll",
    title: "The Midnight Roll",
    line: "Standing up, cash only, and everything after dark.",
    vector: { sweetness: -1, protein: -1, formality: -2, hour: -2 },
    stops: [
      { time: "18:00", place: "Vivekananda Park", order: "Six phuchka, then the fauchka", note: "Sour, not sweet. Never call it pani puri.", href: "/food/phuchka" },
      { time: "20:00", place: "Kusum Rolls, Park Street", order: "Double egg mutton roll", note: "The consensus best in the city. Queue.", href: "/food/kathi-roll" },
      { time: "21:30", place: "Nizam's, New Market", order: "One more, for comparison", note: "The claimed original, from 1932." },
      { time: "23:00", place: "Anadi Cabin, Esplanade", order: "Mughlai paratha", note: "Standing, at a marble counter. Since 1925." },
      { time: "01:00", place: "Balwant Singh's, Bhowanipore", order: "Tea, and a paratha you do not need", note: "Open all night, and the point of the trail." },
    ],
  },
  {
    slug: "park-street-night",
    title: "Park Street After Dark",
    line: "A cummerbund, a menu unchanged since 1956, and a band at the back.",
    vector: { sweetness: 0, protein: -1, formality: 2, hour: -1 },
    stops: [
      { time: "17:00", place: "Flurys", order: "Tea, and a rum ball if it is December", note: "Swiss, since 1927.", href: "/neighbourhoods/park-street" },
      { time: "19:00", place: "Peter Cat", order: "Chelo kebab", note: "No reservations. Queue on the pavement.", href: "/food/chelo-kebab" },
      { time: "21:00", place: "Mocambo", order: "Devilled crab", note: "Next door, older, and the rivalry is real." },
      { time: "22:30", place: "Trincas", order: "A drink, and whoever is playing", note: "The last of the live circuit." },
      { time: "00:00", place: "Oly Pub, upstairs", order: "Beef steak", note: "Since 1947. Nothing has changed." },
    ],
  },
  {
    slug: "riverside-dawn",
    title: "The Riverside Dawn",
    line: "Up at four, tea under the bridge, and breakfast before the city wakes.",
    vector: { sweetness: 1, protein: 1, formality: -2, hour: 2 },
    stops: [
      { time: "04:30", place: "Mullick Ghat Flower Market", order: "Cha in a bhaar", note: "Two thousand traders by torchlight.", href: "/neighbourhoods/howrah-bridge-strand" },
      { time: "06:00", place: "Territi Bazar", order: "Pork bun, fish ball soup", note: "Over by half past seven.", href: "/neighbourhoods/bowbazar" },
      { time: "07:30", place: "Sharma Tea House, Bowbazar", order: "Kochuri and cholar dal", note: "The trade's breakfast." },
      { time: "09:00", place: "The Howrah ferry", order: "Jhalmuri, on board", note: "Five rupees, ten minutes.", href: "/food/jhalmuri" },
      { time: "10:30", place: "Paramount, College Street", order: "Daab sherbet", note: "A marble counter unchanged since 1918." },
    ],
  },
];

/** Nearest trail by squared distance across the four axes. */
export function trailFor(scores: Record<Axis, number>): FoodTrail {
  let best = foodTrails[0];
  let bestD = Infinity;
  for (const t of foodTrails) {
    const d =
      (t.vector.sweetness - scores.sweetness) ** 2 +
      (t.vector.protein - scores.protein) ** 2 +
      (t.vector.formality - scores.formality) ** 2 +
      (t.vector.hour - scores.hour) ** 2;
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }
  return best;
}
