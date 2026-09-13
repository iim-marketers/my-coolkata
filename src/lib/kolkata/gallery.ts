import type { SceneName } from "./types";

export type PlateCategory =
  | "people"
  | "streets"
  | "architecture"
  | "food"
  | "rain"
  | "puja"
  | "night"
  | "river"
  | "trams"
  | "para";

export interface Plate {
  id: string;
  category: PlateCategory;
  scene: SceneName;
  title: string;
  caption: string;
  /** The story behind the frame. */
  story: string;
  where: string;
  grade?: string;
  href?: string;
}

export const plateCategories: { id: PlateCategory; label: string }[] = [
  { id: "people", label: "People" },
  { id: "streets", label: "Streets" },
  { id: "architecture", label: "Architecture" },
  { id: "food", label: "Food" },
  { id: "rain", label: "Rain" },
  { id: "puja", label: "Puja" },
  { id: "night", label: "Night" },
  { id: "river", label: "River" },
  { id: "trams", label: "Trams" },
  { id: "para", label: "Para" },
];

export const plates: Plate[] = [
  {
    id: "artisan-hands",
    category: "people",
    scene: "kumartuli",
    title: "The hands that finish her",
    caption: "An artisan modelling fingers in bele mati, September.",
    story:
      "The senior artisan does the face and the fingers. Everything before that, the bamboo and the straw that decide whether the figure will stand at all, is done by people whose names do not appear on the studio board.",
    where: "Kumartuli",
    href: "/kumartuli",
  },
  {
    id: "tea-forty-years",
    category: "people",
    scene: "streetfood",
    title: "Forty years at the same stove",
    caption: "A cha-er dokan that opens at five and closes when the last customer leaves.",
    story:
      "The clay cups are thrown on a wheel in Kumartuli, fired once, never glazed, used once. The stove is the same one. The customers are largely the same people, forty years older.",
    where: "A lane in north Kolkata",
    href: "/food/cha-in-bhaar",
  },
  {
    id: "stallholder",
    category: "people",
    scene: "collegestreet",
    title: "He will find it in eleven minutes",
    caption: "A bookseller going into the stack, College Street.",
    story:
      "You describe what you want. He disappears into a wall of paper three metres high with no visible order to it, and comes back with the book. Nobody knows how the index works and there is not one.",
    where: "Boi Para",
    href: "/college-street",
  },
  {
    id: "flower-porter",
    category: "people",
    scene: "howrah",
    title: "Marigold by the sack",
    caption: "Mullick Ghat, quarter to five in the morning.",
    story:
      "Two thousand traders work the steps under the bridge from four. Most come in from Howrah and Hooghly districts on the first trains, sell out by nine, and go home.",
    where: "Mullick Ghat",
    href: "/neighbourhoods/howrah-bridge-strand",
  },
  {
    id: "chitpur-lane",
    category: "streets",
    scene: "rooftops",
    title: "The oldest road",
    caption: "Rabindra Sarani, formerly Chitpur Road.",
    story:
      "Before the Company there was a track through the jungle from the north down to the Kali temple at Kalighat. That track is this street, and it is the oldest continuously used route in the city.",
    where: "Chitpur",
    href: "/neighbourhoods/chitpur",
  },
  {
    id: "five-point",
    category: "streets",
    scene: "tram",
    title: "Five roads, no signal",
    caption: "Shyambazar Panchmathar Mor at seven in the evening.",
    story:
      "Five roads meet under an equestrian Subhas Chandra Bose and negotiate it by consensus. It works. Every attempt to signalise it has made it worse.",
    where: "Shyambazar",
    href: "/neighbourhoods/shyambazar",
  },
  {
    id: "burrabazar-porter",
    category: "streets",
    scene: "streetfood",
    title: "Two hundred kilos, on the head",
    caption: "Cotton Street, a weekday morning.",
    story:
      "Handcarts and porters move most of the goods in Burrabazar because vehicles cannot get through. The trade runs on credit and reputation rather than paperwork, and always has.",
    where: "Burrabazar",
    href: "/neighbourhoods/burrabazar",
  },
  {
    id: "victoria-dome",
    category: "architecture",
    scene: "victoria",
    title: "Makrana marble, fifteen years late",
    caption: "The central dome and the Angel of Victory.",
    story:
      "Curzon proposed it within days of Victoria's death in 1901. By the time it opened in 1921 the capital had moved to Delhi and the certainty the building was designed to express had gone.",
    where: "Maidan",
    grade: "sepia(0.25)",
    href: "/heritage/victoria-memorial",
  },
  {
    id: "cantilever",
    category: "architecture",
    scene: "howrah",
    title: "Riveted, not bolted",
    caption: "The cantilever from Mullick Ghat.",
    story:
      "Roughly 26,500 tonnes of steel fastened with hot rivets driven by hand, which is why the structure appears to have been knitted rather than assembled.",
    where: "Strand Road",
    href: "/heritage/howrah-bridge",
  },
  {
    id: "north-door",
    category: "architecture",
    scene: "rooftops",
    title: "A door nobody replaced",
    caption: "Teak, brass and coloured fanlight glass, Jorasanko.",
    story:
      "Louvred shutters, brass knockers shaped as hands and lions, and doorframes carved to a pattern the lane's carpenter used on every house. A hundred and fifty years of nobody having the money to change them.",
    where: "North Kolkata",
    href: "/hidden",
  },
  {
    id: "karai",
    category: "food",
    scene: "streetfood",
    title: "The oil has been working all day",
    caption: "A telebhaja karai at five in the afternoon.",
    story:
      "The oil is dark and this is the point rather than a problem. A fresh karai makes worse telebhaja, and every shop in the city knows it.",
    where: "Any lane, after 4:30",
    href: "/food/telebhaja",
  },
  {
    id: "phuchka-hand",
    category: "food",
    scene: "streetfood",
    title: "He cracks it with his thumb",
    caption: "Phuchka, six at a time, into a leaf bowl.",
    story:
      "Crack, fill, dip, and into your hand while he makes the next one. Stopping to talk ruins it. The last one is the fauchka, water only, given free, and asking for it marks you as local.",
    where: "Vivekananda Park",
    href: "/food/phuchka",
  },
  {
    id: "bhaar-stack",
    category: "food",
    scene: "streetfood",
    title: "Fired once, used once",
    caption: "A stack of clay cups waiting behind a tea stall.",
    story:
      "Unglazed, porous, and they add a wet-earth note no ceramic reproduces. You drop it when you are done. It goes back into the ground.",
    where: "Everywhere",
    href: "/food/cha-in-bhaar",
  },
  {
    id: "flooded-lane",
    category: "rain",
    scene: "tram",
    title: "Twenty minutes to flood, an hour to drain",
    caption: "A north Kolkata lane in July.",
    story:
      "It is not dangerous, it is inconvenient, and the city carries on entirely as normal. Then everybody eats fried things, and every telebhaja shop in Kolkata has planned for it.",
    where: "North Kolkata",
    grade: "saturate(0.7) brightness(0.9)",
    href: "/mood",
  },
  {
    id: "tarpaulin",
    category: "rain",
    scene: "collegestreet",
    title: "Blue plastic over everything",
    caption: "The College Street stalls, sheeted, still trading.",
    story:
      "The stallholders sheet the stacks in blue tarpaulin and keep selling. Browsing under a tarp with the rain drumming on it is the best version of this street.",
    where: "Boi Para",
    grade: "saturate(0.75)",
    href: "/college-street",
  },
  {
    id: "chokkhu-daan",
    category: "puja",
    scene: "kumartuli",
    title: "Three strokes, and she is the goddess",
    caption: "Chokkhu daan at dawn on Mahalaya.",
    story:
      "Before this the figure is a figure. Afterwards everyone in the workshop moves around it differently. It is not a metaphor about art; it is a procedural fact you can watch happen.",
    where: "Kumartuli",
    href: "/kumartuli#eyes",
  },
  {
    id: "pandal-queue",
    category: "puja",
    scene: "pujo",
    title: "Two hours, moving at walking pace",
    caption: "A barricaded queue for a south Kolkata pandal, Ashtami.",
    story:
      "The queue is the experience. It is sociable, it is slow, and by the time you are inside you have talked to four strangers about which pandal is better this year.",
    where: "South Kolkata",
    grade: "saturate(1.2)",
    href: "/durga-puja#the-crowd",
  },
  {
    id: "immersion",
    category: "puja",
    scene: "river",
    title: "The clay goes back",
    caption: "Bisarjan at Babughat, Dashami night.",
    story:
      "Lorries queue along Strand Road, cranes lift the larger figures, and the dhaak comes with them. Under the current rules the bamboo and straw frames are pulled out again afterwards.",
    where: "Babughat",
    href: "/durga-puja#the-immersion",
  },
  {
    id: "sodium",
    category: "night",
    scene: "tram",
    title: "589 nanometres",
    caption: "A lane still lit by low-pressure sodium.",
    story:
      "Under it colour does not exist. A red car and a green car are the same car. An entire visual idea of this city was formed by a lighting decision taken on cost grounds.",
    where: "North Kolkata",
    href: "/stories/sodium-light",
  },
  {
    id: "bridge-lit",
    category: "night",
    scene: "howrah",
    title: "The bridge from the lawn",
    caption: "Millennium Park, after dark.",
    story:
      "For two centuries the city treated the river as working infrastructure and kept its back to it. This strip, opened in 1999, was the first serious attempt to turn it round.",
    where: "Strand Road",
    href: "/neighbourhoods/millennium-park",
  },
  {
    id: "ferry-dawn",
    category: "river",
    scene: "river",
    title: "Five rupees, ten minutes",
    caption: "The Howrah crossing at six in the morning, December.",
    story:
      "Grey water, the far bank invisible, and jhalmuri sold on board in a paper cone. It is the best commute in India and it costs less than a cup of tea.",
    where: "Babughat to Howrah",
    href: "/river",
  },
  {
    id: "ghat-steps",
    category: "river",
    scene: "river",
    title: "Before six",
    caption: "Bagbazar Ghat, with swimmers and laundry.",
    story:
      "A working ghat, in this order: swimmers, priests, laundry, then the ferry. Kushti akharas have operated along these steps for well over a century.",
    where: "Bagbazar",
    href: "/neighbourhoods/bagbazar",
  },
  {
    id: "tram-24",
    category: "trams",
    scene: "tram",
    title: "Route 24",
    caption: "Ballygunge to Tollygunge, on a grass median.",
    story:
      "In the afternoon it carried schoolchildren, and the conductor knew which stop each of them wanted and would call it without being asked. There was a particular quality to the light through the wooden slats at four o'clock.",
    where: "Rashbehari Avenue",
    href: "/stories/the-last-tram",
  },
  {
    id: "depot",
    category: "trams",
    scene: "tram",
    title: "What is left of thirty-seven routes",
    caption: "Esplanade depot, and the Tram World museum car.",
    story:
      "Asia's first electric tramway, from 1902. In 2024 the state announced it would keep a single heritage route. The case is in the High Court and the tracks have not moved.",
    where: "Esplanade",
    href: "/tram",
  },
  {
    id: "rowak",
    category: "para",
    scene: "rooftops",
    title: "The rowak",
    caption: "A raised front stoop, north Kolkata, early evening.",
    story:
      "The neighbourhood's parliament. Generations of adda happened on these platforms, and municipal rules and street widening have removed most of them.",
    where: "Bagbazar",
    href: "/adda",
  },
  {
    id: "para-club",
    category: "para",
    scene: "pujo",
    title: "The committee has been fundraising all year",
    caption: "A para club's pandal going up, three weeks out.",
    story:
      "Bamboo first, then cloth, then whatever the commissioned artist has specified. Up in a fortnight, down in ten days, and nothing is kept.",
    where: "Any para",
    href: "/durga-puja#the-pandal",
  },
  {
    id: "terrace-kites",
    category: "para",
    scene: "rooftops",
    title: "Autumn on the terrace",
    caption: "Kites over the north, September.",
    story:
      "Kite-flying arrived with the exiled Awadh court at Metiabruz in 1856, along with the biryani. The string is coated with glue and powdered glass, on the roof, by hand.",
    where: "North Kolkata",
    href: "/neighbourhoods/kidderpore",
  },
];

export function platesIn(category: PlateCategory) {
  return plates.filter((p) => p.category === category);
}
