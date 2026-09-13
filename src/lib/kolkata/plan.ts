import type { Itinerary } from "./types";

export const itineraries: Itinerary[] = [
  {
    slug: "one-day",
    title: "One day, done properly",
    length: "14 hours",
    pace: "Relentless",
    bestSeason: "November to February",
    summary:
      "If you have exactly one day, do not try to see everything. Do the river at dawn, the north in the morning, the centre at lunch and Park Street at night.",
    stops: [
      {
        time: "05:45",
        place: "Mullick Ghat Flower Market",
        what: "Two thousand traders under Howrah Bridge, working by torchlight. Marigold by the sack. This is the single best hour in Kolkata and almost nobody gets up for it.",
        travel: "Taxi. Nothing else runs this early.",
      },
      {
        time: "07:00",
        place: "Howrah Bridge, on foot",
        what: "Cross it and come back. Photography from the deck is restricted, so shoot from the ghat.",
        travel: "Walk up from the flower market.",
      },
      {
        time: "08:00",
        place: "Kochuri at Sharma Tea House or Tewari Brothers",
        what: "Breakfast. Kochuri, cholar dal, a sweet, and tea in a clay cup.",
        travel: "Taxi to Bowbazar, ten minutes at this hour.",
      },
      {
        time: "09:15",
        place: "Kumartuli",
        what: "The idol-makers' lanes. In September you will see hundreds of half-finished goddesses. In April you will see the frames and the workshops, which is quieter and still worth it.",
        travel: "Metro to Sovabazar Sutanuti, then walk west.",
      },
      {
        time: "11:00",
        place: "College Street and the Indian Coffee House",
        what: "A mile of secondhand bookstalls, then infusion coffee upstairs at the Coffee House.",
        travel: "Metro one stop to Mahatma Gandhi Road.",
      },
      {
        time: "13:00",
        place: "Biryani at Royal India Hotel or Aminia",
        what: "Mutton biryani with the potato. Do not order a starter.",
        travel: "Walk or a short cab.",
      },
      {
        time: "14:30",
        place: "Indian Museum",
        what: "Two hours, not six. Go straight to the Bharhut gallery, then the Egyptian room, then leave.",
        travel: "Cab to Chowringhee.",
      },
      {
        time: "16:30",
        place: "Victoria Memorial and the Maidan",
        what: "The Kolkata gallery inside, then walk the grounds as the light goes. The floodlights come on around dusk.",
        travel: "Walk south down Chowringhee.",
      },
      {
        time: "18:30",
        place: "Prinsep Ghat",
        what: "Sunset on the river under the 1841 portico, with the Vidyasagar Setu lit behind it.",
        travel: "Cab, fifteen minutes.",
      },
      {
        time: "20:00",
        place: "Park Street",
        what: "Peter Cat for chelo kebab, or Mocambo next door. Expect to queue. Finish at Oly Pub.",
        travel: "Cab back east.",
      },
    ],
  },
  {
    slug: "a-weekend",
    title: "A weekend",
    length: "Two and a half days",
    pace: "Comfortable",
    bestSeason: "October to March",
    summary:
      "Enough time to split the city into its three parts: the colonial centre, the old north, and the river. One meal per neighbourhood, and an afternoon off.",
    stops: [
      {
        time: "Fri evening",
        place: "Park Street",
        what: "Arrive, eat, walk it end to end. Trincas has live music most nights.",
      },
      {
        time: "Sat 06:00",
        place: "Mullick Ghat and Howrah Bridge",
        what: "The flower market at dawn, then the bridge on foot.",
        travel: "Taxi from anywhere central, twenty minutes.",
      },
      {
        time: "Sat 09:00",
        place: "North Kolkata: Kumartuli, Shobhabazar, Bagbazar",
        what: "The potters' lanes, the 1757 Rajbari courtyard, then the ghat. Breakfast at Putiram on the way.",
        travel: "Metro Line 1 north.",
      },
      {
        time: "Sat 13:00",
        place: "Zakaria Street and Nakhoda Masjid",
        what: "The mosque, then lunch below it. Royal India Hotel is around the corner and has been there since 1905.",
        travel: "Cab or a long walk south along Rabindra Sarani.",
      },
      {
        time: "Sat 16:00",
        place: "College Street",
        what: "The book stalls, then the Coffee House, then telebhaja at Kalika.",
      },
      {
        time: "Sat 20:00",
        place: "Dinner in Ballygunge",
        what: "6 Ballygunge Place or Bhojohori Manna for a proper Bengali meal. Order the kosha mangsho and the daab chingri.",
      },
      {
        time: "Sun 08:00",
        place: "Dakshineswar, then the ferry to Belur Math",
        what: "The nine-spired temple at dawn, Ramakrishna's room, then twenty minutes across the water.",
        travel: "Metro to Dakshineswar, ferry across.",
      },
      {
        time: "Sun 13:00",
        place: "Lunch and an afternoon off",
        what: "Do nothing for three hours. This is a hot city and the itineraries that ignore that fail on the second day.",
      },
      {
        time: "Sun 16:30",
        place: "Victoria Memorial, the Maidan and Prinsep Ghat",
        what: "The gallery, the grass, the river. End on the water.",
      },
      {
        time: "Sun 20:00",
        place: "New Market and dinner at Nizam's",
        what: "The market before it shuts, then the original kathi roll.",
      },
    ],
  },
  {
    slug: "puja-week",
    title: "Puja week",
    length: "Five nights",
    pace: "Nocturnal",
    bestSeason: "Late September or October only",
    summary:
      "During Durga Puja the city inverts: nothing happens before four in the afternoon and everything happens between nine at night and four in the morning. Plan accordingly.",
    stops: [
      {
        time: "Mahalaya, 04:00",
        place: "Anywhere with a radio",
        what: "Birendra Krishna Bhadra's Mahishasuramardini has been broadcast at four in the morning on this day since 1931. The whole state is awake for it. Then go to Kumartuli for the painting of the eyes.",
      },
      {
        time: "Panchami evening",
        place: "North Kolkata pandals",
        what: "Start before the crowds. Bagbazar Sarbojanin, Ahiritola, Kumartuli Park, Jagat Mukherjee Park. The north does the classical style.",
        travel: "Metro north, then walk. Do not attempt a car.",
      },
      {
        time: "Shashthi",
        place: "Bonedi bari household pujas",
        what: "Several old family houses open their courtyards. Shobhabazar Rajbari, Chhatu Babu Latu Babur Bari, Rani Rashmoni's house. Completely different in feel from the street pandals.",
      },
      {
        time: "Saptami, 06:00",
        place: "Kola Bou snan at the ghats",
        what: "A banana plant is bathed in the river at dawn and dressed as a bride. It happens at every ghat and almost no visitor sees it.",
      },
      {
        time: "Ashtami evening",
        place: "South Kolkata",
        what: "Suruchi Sangha, Chetla Agrani, Badamtala Ashar Sangha, Ekdalia Evergreen. The south does theme and scale. Expect two hours between pandals.",
        travel: "Walk. The roads are closed and the metro runs all night.",
      },
      {
        time: "Ashtami, late",
        place: "Maddox Square",
        what: "Not for the pandal. For the field around it, where most of south Kolkata under thirty is standing.",
      },
      {
        time: "Navami",
        place: "Eat",
        what: "Navami is traditionally the day of the biggest meal. Every restaurant is full and every household is cooking mutton.",
      },
      {
        time: "Dashami afternoon",
        place: "Sindoor khela, then the immersion",
        what: "Women mark each other with vermilion at the pandals, then the idols are carried to the ghats. Babughat and Bagbazar Ghat are the main immersion points.",
      },
      {
        time: "Carnival, two days later",
        place: "Red Road",
        what: "The prize-winning pujas parade their idols down Red Road before immersion. Ticketed, and the only orderly event of the week.",
      },
    ],
  },
  {
    slug: "rainy-afternoon",
    title: "A rainy afternoon",
    length: "Five hours",
    pace: "Slow",
    bestSeason: "June to September",
    summary:
      "It is going to rain for four hours and the streets will flood. This is not a lost afternoon. It is the correct one.",
    stops: [
      {
        time: "13:00",
        place: "Telebhaja and muri, at the nearest corner",
        what: "Beguni, piyaji, aloor chop, a raw green chilli. The whole city eats fried things when it rains and every shop has planned for it.",
      },
      {
        time: "14:00",
        place: "Indian Coffee House",
        what: "High ceilings, slow fans, and a room that sounds like a single argument. Order infusion and stay two hours.",
      },
      {
        time: "16:00",
        place: "The College Street stalls, under tarpaulin",
        what: "The stallholders sheet everything in blue plastic and keep trading. Browsing under a tarp with the rain on it is the best version of this street.",
      },
      {
        time: "17:00",
        place: "Marble Palace or the Indian Museum",
        what: "Somewhere with a roof and no electric lighting, so the weather is part of the visit. Marble Palace is closed Mondays and Thursdays.",
      },
      {
        time: "19:00",
        place: "Khichuri and ilish bhaja, anywhere",
        what: "Rain food, non-negotiable: yellow khichuri, fried hilsa, begun bhaja, a wedge of lime.",
      },
    ],
  },
  {
    slug: "with-children",
    title: "With children",
    length: "One day",
    pace: "Forgiving",
    bestSeason: "November to February",
    summary:
      "Short distances, food every ninety minutes, and at least one thing that moves.",
    stops: [
      {
        time: "09:00",
        place: "The Hooghly ferry, Babughat to Howrah",
        what: "Ten minutes, five rupees, and the best view of the bridge. Do it twice.",
      },
      {
        time: "10:30",
        place: "Indian Museum",
        what: "Go for the mummy, the whale skeleton and the meteorites. Ignore everything else. Ninety minutes maximum.",
      },
      {
        time: "12:30",
        place: "Lunch at Flurys or a Kathi roll on Park Street",
        what: "Whichever will be eaten without an argument.",
      },
      {
        time: "14:00",
        place: "Victoria Memorial grounds",
        what: "Sixty-four acres of grass. There are horse carriages on Queens Way, and the museum is optional.",
      },
      {
        time: "16:00",
        place: "The heritage tram from Esplanade",
        what: "The surviving route is short and slow and is the point. Check it is running before you go.",
      },
      {
        time: "17:30",
        place: "Nicco Park or Eco Park, Salt Lake",
        what: "If there is energy left. Otherwise ice cream at Balaram Mullick and stop.",
      },
    ],
  },
];

export function getItinerary(slug: string) {
  return itineraries.find((i) => i.slug === slug);
}

export const practicalNotes = [
  {
    label: "When to come",
    value:
      "November to February. Dry, 12–27°C, and every festival worth seeing is in that window or just before it. April to June is 35–40°C with high humidity and is genuinely difficult.",
  },
  {
    label: "Getting around",
    value:
      "The Metro is fast, cheap and expanding, and Line 1 runs north to south under the spine of the city. Yellow Ambassador taxis still exist and still refuse fares; app cabs work. Buses are cheap and unreadable without Bengali.",
  },
  {
    label: "The monsoon",
    value:
      "June to September. Streets flood within twenty minutes of heavy rain and drain within an hour. It is not dangerous, it is inconvenient, and the city carries on entirely as normal.",
  },
  {
    label: "Money and hours",
    value:
      "Small shops, sweet shops, phuchka stalls and book stalls are cash-first. Most food places shut between three and six in the afternoon and reopen for dinner.",
  },
  {
    label: "Language",
    value:
      "Bengali, with Hindi and English widely understood in the centre. Ki khobor is 'how's it going'. Dhonnobad is thank you and is used less often than you would expect, because among friends it is considered slightly cold.",
  },
];
