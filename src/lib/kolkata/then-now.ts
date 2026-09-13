import type { PhotoId } from "./photos";
import type { Coords, SceneName } from "./types";

export interface ThenNow {
  slug: string;
  place: string;
  coords: Coords;
  thenYear: string;
  nowYear: string;
  thenScene: SceneName;
  thenPhoto?: PhotoId;
  nowScene: SceneName;
  nowPhoto?: PhotoId;
  /** Grades the "then" side so it reads as an archival plate. */
  thenGrade: string;
  then: string;
  now: string;
  /** The thing that has not changed. */
  constant: string;
  href?: string;
}

export const thenNow: ThenNow[] = [
  {
    slug: "dalhousie-square",
    place: "Dalhousie Square",
    coords: { lat: 22.5726, lng: 88.3487 },
    thenYear: "1865",
    nowYear: "Today",
    thenScene: "rooftops",
    thenPhoto: "dalhousie-square-old",
    nowScene: "rooftops",
    nowPhoto: "bbd-bagh",
    thenGrade: "sepia(0.7) saturate(0.5) contrast(1.08)",
    then: "The administrative centre of British India. Carriages on the tank road, the Writers' Building still in its plain 1777 form, and the Governor-General's secretariat working to the fort's evening gun. The square is called Dalhousie, after the governor-general who annexed Awadh.",
    now: "BBD Bagh, renamed for the three men who walked into the Writers' Building in 1930 and shot the inspector-general of prisons. On a weekday it is one of the densest office districts in India; on a Sunday it is nearly silent and you can finally see the buildings.",
    constant: "Lal Dighi. The tank predates the city, supplied its drinking water, and is still there in the middle of it.",
    href: "/neighbourhoods/bbd-bagh",
  },
  {
    slug: "esplanade",
    place: "Esplanade",
    coords: { lat: 22.5645, lng: 88.3512 },
    thenYear: "1900",
    nowYear: "Today",
    thenScene: "victoria",
    thenPhoto: "esplanade-old",
    nowScene: "tram",
    nowPhoto: "esplanade",
    thenGrade: "sepia(0.62) saturate(0.55) contrast(1.06)",
    then: "Horse trams on a metalled road, gas lamps, hackney carriages queuing along the edge of the Maidan, and the Ochterlony Monument standing over open ground. Electrification is two years away.",
    now: "The transport knot: a metro interchange, a bus terminus, and the tram depot that holds what is left of a network that once ran thirty-seven routes. The monument is the Shaheed Minar now, renamed in 1969.",
    constant: "The Maidan itself. Cleared in 1758 to give Fort William's guns a field of fire, and never built on since.",
    href: "/neighbourhoods/esplanade",
  },
  {
    slug: "chowringhee",
    place: "Chowringhee",
    coords: { lat: 22.5558, lng: 88.3512 },
    thenYear: "1880",
    nowYear: "Today",
    thenScene: "victoria",
    thenPhoto: "chowringhee-old",
    nowScene: "streetfood",
    nowPhoto: "chowringhee-now",
    thenGrade: "sepia(0.66) saturate(0.5) contrast(1.1)",
    then: "A continuous wall of white stucco facing the Maidan, garden houses behind iron gates, and the Indian Museum five years old. This is the frontage that earned the phrase City of Palaces, and it was built to be seen from a carriage.",
    now: "Jawaharlal Nehru Road, six lanes of it, with Deco blocks from the 1930s wedged between the survivors and hawkers along the pavement. The museum is still there and still called Jadughar.",
    constant: "The view west. Whatever is built on the east side, the Maidan keeps the other half of the street empty.",
    href: "/heritage/indian-museum",
  },
  {
    slug: "howrah-bridge",
    place: "Howrah Bridge",
    coords: { lat: 22.5851, lng: 88.3468 },
    thenYear: "1900",
    nowYear: "Today",
    thenScene: "river",
    thenPhoto: "pontoon-bridge-old",
    nowScene: "howrah",
    nowPhoto: "howrah-bridge",
    thenGrade: "sepia(0.68) saturate(0.45) contrast(1.12)",
    then: "A pontoon bridge, floating on boats, swinging open for river traffic and stalling everything on it. Opened in 1874 and by the 1900s a daily humiliation of jammed carts and shouting.",
    now: "705 metres of riveted cantilever, opened in 1943 without a ceremony because of the bombing. It carries around a hundred thousand vehicles and far more people on foot, and the pavement has worn into shallow troughs.",
    constant: "Mullick Ghat flower market underneath, working from four in the morning, before and after the bridge.",
    href: "/neighbourhoods/howrah-bridge-strand",
  },
  {
    slug: "park-street",
    place: "Park Street",
    coords: { lat: 22.5527, lng: 88.352 },
    thenYear: "1965",
    nowYear: "Today",
    thenScene: "tram",
    thenPhoto: "park-street-old",
    nowScene: "streetfood",
    nowPhoto: "park-street",
    thenGrade: "saturate(0.62) contrast(1.14) sepia(0.2)",
    then: "The centre of the city's nightlife, and the live music was serious. Trincas, Blue Fox, Moulin Rouge, a working circuit of resident bands, and Usha Uthup starting out in a Kanjeevaram sari.",
    now: "Most of the bands went in the 1980s. The restaurants stayed and were deliberately not changed: Peter Cat since 1975, Mocambo since 1956, Flurys since 1927, Oly Pub since 1947. At Christmas the whole street is arched with lights.",
    constant: "The cemetery at the far end, closed to burials around 1830, and silent ten metres inside the gate.",
    href: "/neighbourhoods/park-street",
  },
  {
    slug: "college-street",
    place: "College Street",
    coords: { lat: 22.5747, lng: 88.365 },
    thenYear: "1955",
    nowYear: "Today",
    thenScene: "collegestreet",
    thenPhoto: "college-street-old",
    nowScene: "collegestreet",
    nowPhoto: "college-street",
    thenGrade: "grayscale(0.85) contrast(1.2)",
    then: "Trams down the middle, the Coffee House thirteen years old and already the room where everything got argued, and a generation at Presidency that included Amartya Sen. Ray was upstairs somewhere, designing book jackets.",
    now: "The trams have gone from the street. The stalls have not, and neither have the binderies behind them or the argument on the first floor. The Coffee House has been worker-owned since 1958.",
    constant: "The trade. You describe a book, the stallholder disappears into a wall of paper, and eleven minutes later it is in your hand.",
    href: "/college-street",
  },
  {
    slug: "burrabazar",
    place: "Burrabazar",
    coords: { lat: 22.5786, lng: 88.3543 },
    thenYear: "1890",
    nowYear: "Today",
    thenScene: "streetfood",
    thenPhoto: "burrabazar-old",
    nowScene: "rooftops",
    nowPhoto: "burrabazar",
    thenGrade: "sepia(0.72) saturate(0.42) contrast(1.06)",
    then: "A yarn market that predates the Company's factory, grown into the wholesale district for eastern India. Bullock carts, handcarts, and porters carrying on the head because nothing wider could get through.",
    now: "Several square kilometres of wholesale trade, still largely on credit and reputation rather than paperwork, still moved by handcart and porter for exactly the same reason.",
    constant: "The method. Streets specialise, deals are verbal, and a man carrying two hundred kilos on his head is an ordinary sight.",
    href: "/neighbourhoods/burrabazar",
  },
];

export function getThenNow(slug: string) {
  return thenNow.find((t) => t.slug === slug);
}
