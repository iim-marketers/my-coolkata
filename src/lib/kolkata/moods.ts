import type { PhotoId } from "./photos";
import type { SceneName } from "./types";

export interface Mood {
  id: string;
  icon: string;
  label: string;
  line: string;
  scene: SceneName;
  photo?: PhotoId;
  /** Applies the same grading machinery the era system uses. */
  grade?: string;
  when: string;
  /** A sequence you could actually follow. */
  plan: { time: string; what: string; where: string; href?: string }[];
  soundId?: string;
  read?: { label: string; href: string };
}

export const moods: Mood[] = [
  {
    id: "rainy",
    icon: "🌧️",
    label: "Rainy Kolkata",
    line: "Four hours of it, streets under water within twenty minutes, and the whole city eating fried things.",
    scene: "tram",
    photo: "kolkata-rain",
    grade: "saturate(0.72) brightness(0.92) contrast(1.06)",
    when: "June to September",
    plan: [
      { time: "13:00", what: "Telebhaja and muri at the nearest corner, with a raw green chilli", where: "Any lane", href: "/food/telebhaja" },
      { time: "14:00", what: "Two hours at the Coffee House, because the acoustics are better in the rain", where: "College Street", href: "/adda" },
      { time: "16:00", what: "The book stalls under blue tarpaulin, which is the best version of them", where: "Boi Para", href: "/college-street" },
      { time: "17:00", what: "Marble Palace, lit only by daylight through a courtyard", where: "Chorbagan", href: "/heritage/marble-palace" },
      { time: "19:00", what: "Khichuri and ilish bhaja. Non-negotiable", where: "Home, or anywhere", href: "/food" },
    ],
    soundId: "rain",
    read: { label: "Sodium light", href: "/stories/sodium-light" },
  },
  {
    id: "romantic",
    icon: "🌅",
    label: "Romantic Kolkata",
    line: "Sunset behind a cable-stayed bridge, a shared umbrella on the Maidan, and one song everyone already knows.",
    scene: "river",
    photo: "prinsep-ghat",
    grade: "saturate(1.1) brightness(1.04)",
    when: "November to February, late afternoon",
    plan: [
      { time: "16:00", what: "Southern Avenue on foot, for the tree cover", where: "Ballygunge", href: "/neighbourhoods/ballygunge" },
      { time: "17:15", what: "Sunset at Prinsep Ghat, with the 1841 columns and the 1992 cables in one frame", where: "The river", href: "/neighbourhoods/prinsep-ghat" },
      { time: "18:30", what: "The Victoria Memorial lawns, floodlit, and a horse carriage if you must", where: "Maidan", href: "/heritage/victoria-memorial" },
      { time: "20:00", what: "Trincas, and whoever is playing", where: "Park Street", href: "/neighbourhoods/park-street" },
    ],
    read: { label: "Rabindra Sangeet", href: "/culture#rabindrasangeet" },
  },
  {
    id: "bookish",
    icon: "📚",
    label: "Bookish Kolkata",
    line: "A mile and a half of secondhand stalls, four universities, and a room that sounds like one argument.",
    scene: "collegestreet",
    photo: "hero-collegestreet",
    when: "Weekday afternoons; late January for the fair",
    plan: [
      { time: "10:00", what: "Kochuri at Putiram, before it runs out", where: "Surya Sen Street", href: "/college-street" },
      { time: "11:00", what: "The stalls. Describe something obscure and watch what happens", where: "Boi Para", href: "/college-street" },
      { time: "14:00", what: "Infusion coffee and a mutton afghani cutlet, first floor", where: "Indian Coffee House", href: "/adda" },
      { time: "16:00", what: "Presidency's Baker Laboratory, where J. C. Bose and P. C. Ray worked", where: "College Street", href: "/people/jagadish-chandra-bose" },
      { time: "17:00", what: "Telebhaja at Kalika, which students have kept alive since 1962", where: "Surya Sen Street", href: "/food/telebhaja" },
    ],
    soundId: "coffee-house",
    read: { label: "The City of Words", href: "/literature" },
  },
  {
    id: "foodie",
    icon: "🍜",
    label: "Foodie Kolkata",
    line: "Mustard oil, freshwater fish, chhena, and a relationship with sugar other cuisines find excessive.",
    scene: "streetfood",
    photo: "hero-streetfood",
    grade: "saturate(1.18)",
    when: "Any day; December to February for nolen gur",
    plan: [
      { time: "07:30", what: "Kochuri and cholar dal, standing up", where: "Bowbazar", href: "/neighbourhoods/bowbazar" },
      { time: "13:00", what: "Mutton biryani with the potato at Royal India Hotel, since 1905", where: "Chitpur", href: "/food/kolkata-biryani" },
      { time: "17:00", what: "Phuchka at Vivekananda Park. Ask for the fauchka at the end", where: "Southern Avenue", href: "/food/phuchka" },
      { time: "20:00", what: "A double egg mutton roll at Kusum, after the queue", where: "Park Street", href: "/food/kathi-roll" },
      { time: "22:00", what: "Mishti doi in a clay pot, firm enough to hold a spoon upright", where: "Anywhere", href: "/food/mishti-doi" },
    ],
    read: { label: "Taste Kolkata", href: "/food" },
  },
  {
    id: "heritage",
    icon: "🏛️",
    label: "Heritage Kolkata",
    line: "Twenty-two buildings, five regime changes, and a square you can only read on a Sunday.",
    scene: "victoria",
    photo: "victoria-memorial",
    grade: "sepia(0.22) saturate(0.9)",
    when: "Sunday mornings, November to February",
    plan: [
      { time: "08:00", what: "BBD Bagh while the offices are shut, and the Writers' reflection in Lal Dighi", where: "Dalhousie", href: "/neighbourhoods/bbd-bagh" },
      { time: "09:30", what: "St. John's Church, and Job Charnock's mausoleum in the yard", where: "BBD Bagh", href: "/heritage/st-johns-church" },
      { time: "11:00", what: "The Indian Museum. Bharhut gallery, then the mummy, then leave", where: "Chowringhee", href: "/heritage/indian-museum" },
      { time: "14:00", what: "Marble Palace, permit in hand, closed Monday and Thursday", where: "Chorbagan", href: "/heritage/marble-palace" },
      { time: "16:30", what: "Victoria Memorial and the Kolkata gallery on the ground floor", where: "Maidan", href: "/heritage/victoria-memorial" },
    ],
    read: { label: "Kolkata architecture", href: "/architecture" },
  },
  {
    id: "artistic",
    icon: "🎨",
    label: "Artistic Kolkata",
    line: "A school of painting that started in an alley selling to pilgrims, and a festival that is the largest public art commission on earth.",
    scene: "kumartuli",
    photo: "hero-kumartuli",
    when: "September and October, or any gallery day",
    plan: [
      { time: "08:00", what: "Kumartuli, before the lanes fill", where: "North Kolkata", href: "/kumartuli" },
      { time: "11:00", what: "Kalighat pat in the Victoria Memorial's collection", where: "Maidan", href: "/heritage/victoria-memorial" },
      { time: "14:00", what: "The lanes east of Kalighat where the pat painters worked", where: "Kalighat", href: "/neighbourhoods/kalighat" },
      { time: "16:00", what: "Contemporary galleries: Experimenter, Emami Art, Akar Prakar", where: "Ballygunge and beyond", href: "/famous-for#art" },
      { time: "19:00", what: "Pandal art, if it is autumn. Several thousand commissions, up for ten days", where: "Everywhere", href: "/durga-puja#the-pandal" },
    ],
  },
  {
    id: "football",
    icon: "⚽",
    label: "Football Kolkata",
    line: "Three clubs on one field, a rivalry that carries Partition inside it, and a fish market that prices the result.",
    scene: "victoria",
    photo: "salt-lake-stadium",
    when: "Derby weekends, and any morning on the Maidan",
    plan: [
      { time: "07:00", what: "The Maidan club tents, and coaching camps on the grass", where: "Esplanade", href: "/neighbourhoods/esplanade" },
      { time: "09:00", what: "Gariahat fish market. Prawn against hilsa, and the prices moving", where: "Gariahat", href: "/neighbourhoods/gariahat" },
      { time: "16:00", what: "Salt Lake Stadium, two hours before kick-off, for the approach", where: "Salt Lake", href: "/football" },
      { time: "19:00", what: "The derby", where: "Salt Lake Stadium", href: "/football" },
    ],
    soundId: "stadium",
    read: { label: "The city that argues about football", href: "/football" },
  },
  {
    id: "night",
    icon: "🌙",
    label: "Night Kolkata",
    line: "Sodium light flattening everything to one amber tone, and a paratha at three in the morning.",
    scene: "tram",
    photo: "park-street-night",
    grade: "brightness(0.85) contrast(1.12) saturate(1.05)",
    when: "After ten, any night",
    plan: [
      { time: "20:00", what: "Park Street, and a queue on the pavement outside Peter Cat", where: "Park Street", href: "/neighbourhoods/park-street" },
      { time: "22:00", what: "Howrah Bridge lit, from the lawn at Millennium Park", where: "Strand Road", href: "/neighbourhoods/millennium-park" },
      { time: "23:30", what: "A lane in the north that has not been converted to LED yet", where: "Chitpur", href: "/stories/sodium-light" },
      { time: "01:00", what: "Balwant Singh's, which is open and will be until dawn", where: "Bhowanipore", href: "/food" },
    ],
    soundId: "taxi-horn",
    read: { label: "Sodium light", href: "/stories/sodium-light" },
  },
  {
    id: "puja",
    icon: "🪔",
    label: "Puja Kolkata",
    line: "Five days when the city stops being a city and becomes an all-night walking event.",
    scene: "pujo",
    photo: "pandal-night",
    grade: "saturate(1.25) contrast(1.04)",
    when: "Late September or October",
    plan: [
      { time: "04:00", what: "Mahalaya on the radio, then the eyes painted at Kumartuli", where: "North Kolkata", href: "/kumartuli" },
      { time: "18:00", what: "North Kolkata pandals on Panchami, before the crowds arrive", where: "Bagbazar, Ahiritola", href: "/durga-puja" },
      { time: "21:00", what: "Bhog: khichuri and labra on a leaf plate, free", where: "Any community Puja", href: "/durga-puja#the-food" },
      { time: "23:00", what: "Maddox Square. Not the pandal, the field around it", where: "Ballygunge", href: "/neighbourhoods/ballygunge" },
      { time: "Dashami", what: "Immersion at Babughat, from mid-afternoon into the night", where: "The river", href: "/durga-puja#the-immersion" },
    ],
    soundId: "dhaak",
    read: { label: "Kolkata during Puja", href: "/durga-puja" },
  },
  {
    id: "slow",
    icon: "☕",
    label: "Slow Kolkata",
    line: "One tea shop, one bench, four hours, and nothing decided.",
    scene: "collegestreet",
    photo: "hooghly-sunset",
    grade: "saturate(0.92)",
    when: "Any weekday you have nothing to do",
    plan: [
      { time: "06:30", what: "Rabindra Sarobar. Rowers, walkers, and birds you will not hear elsewhere", where: "Dhakuria", href: "/neighbourhoods/dhakuria" },
      { time: "09:00", what: "Cha in a clay cup on a pavement, and the newspaper", where: "Any corner", href: "/food/cha-in-bhaar" },
      { time: "11:00", what: "The Hooghly ferry, out and back, for ten minutes each way", where: "Babughat", href: "/neighbourhoods/hooghly-river" },
      { time: "16:00", what: "Adda. If a decision gets made you are doing it wrong", where: "Wherever you are sitting", href: "/adda" },
      { time: "18:00", what: "Ahiritola Ghat, which has the light and none of the crowd", where: "North Kolkata", href: "/hidden" },
    ],
    soundId: "hooghly",
    read: { label: "Adda", href: "/adda" },
  },
];

export function getMood(id: string) {
  return moods.find((m) => m.id === id);
}
