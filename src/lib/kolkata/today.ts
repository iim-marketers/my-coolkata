/**
 * Kolkata Today. This is a recurring calendar rather than a live feed:
 * the site is static and makes no third-party requests, so nothing here
 * is fetched. Each entry says when it happens and where to check the
 * actual dates, and the page is clearly separated from the evergreen
 * material.
 */
export type TodayKind =
  | "festival"
  | "exhibition"
  | "theatre"
  | "music"
  | "sport"
  | "food"
  | "notice";

export interface TodayEntry {
  id: string;
  kind: TodayKind;
  title: string;
  when: string;
  /** Months it is normally on, 0-indexed. */
  months: number[];
  where: string;
  body: string;
  /** Where a visitor should confirm the real dates. */
  checkWith: string;
  href?: string;
}

export const todayKinds: { id: TodayKind; label: string; dot: string }[] = [
  { id: "festival", label: "Festivals", dot: "var(--terracotta)" },
  { id: "exhibition", label: "Exhibitions", dot: "var(--marigold)" },
  { id: "theatre", label: "Theatre", dot: "var(--alta)" },
  { id: "music", label: "Music", dot: "var(--verdigris)" },
  { id: "sport", label: "Sport", dot: "var(--indigo)" },
  { id: "food", label: "Food & seasons", dot: "var(--hooghly)" },
  { id: "notice", label: "Notices", dot: "var(--muted-foreground)" },
];

export const todayEntries: TodayEntry[] = [
  {
    id: "durga-puja",
    kind: "festival",
    title: "Durga Puja",
    when: "Five days, late September or October",
    months: [8, 9],
    where: "The whole city",
    body: "Several thousand pandals go up and come down inside a fortnight. Roads close, the metro runs extended hours, and nothing much happens before four in the afternoon.",
    checkWith: "The date moves with the lunisolar calendar. Check the Bengali panjika or the state tourism calendar.",
    href: "/durga-puja",
  },
  {
    id: "kali-puja",
    kind: "festival",
    title: "Kali Puja and Diwali",
    when: "One night, October or November",
    months: [9, 10],
    where: "Kalighat, Dakshineswar, and street pandals",
    body: "Night-long worship on the new moon, and a lighting culture distinct from the rest of India. Chandannagar, ninety minutes north, does the installations better than anywhere.",
    checkWith: "Falls on the Kartik amavasya. Fixed relative to Durga Puja, roughly three weeks later.",
    href: "/neighbourhoods/kalighat",
  },
  {
    id: "book-fair",
    kind: "exhibition",
    title: "Kolkata Book Fair",
    when: "Twelve days, late January into February",
    months: [0, 1],
    where: "Central Park ground, Salt Lake",
    body: "Over two million visitors, about a thousand stalls, a guest country each year, and a Little Magazine Pavilion at the back where the actual literary culture is.",
    checkWith: "The Publishers and Booksellers Guild announces dates in November.",
    href: "/college-street",
  },
  {
    id: "kiff",
    kind: "exhibition",
    title: "Kolkata International Film Festival",
    when: "Eight days, early December",
    months: [11],
    where: "Nandan, Rabindra Sadan and screens across the city",
    body: "Running since 1995. Strong retrospective programming, and delegate-pass queues that form at seven in the morning.",
    checkWith: "Register for a delegate pass online, usually from October.",
    href: "/cinema",
  },
  {
    id: "dover-lane",
    kind: "music",
    title: "Dover Lane Music Conference",
    when: "Four nights, late January",
    months: [0],
    where: "Nazrul Mancha, south Kolkata",
    body: "Hindustani classical, running from evening until dawn for four consecutive nights, since 1952. People bring blankets.",
    checkWith: "Dover Lane Music Conference announces the line-up in December.",
  },
  {
    id: "nandikar-festival",
    kind: "theatre",
    title: "Nandikar National Theatre Festival",
    when: "About ten days, December",
    months: [11],
    where: "Academy of Fine Arts and Rabindra Sadan",
    body: "Group theatre from across India, in several languages, at prices that have stayed deliberately low. The Bengali group theatre movement's annual shop window.",
    checkWith: "Nandikar publishes the programme in November.",
    href: "/famous-for#theatre",
  },
  {
    id: "jatra-season",
    kind: "theatre",
    title: "Jatra season",
    when: "September to April",
    months: [8, 9, 10, 11, 0, 1, 2, 3],
    where: "Chitpur, then rural Bengal",
    body: "Companies are cast and contracted around Beadon Street in early autumn, then dispatched to village performances for the winter. The poster walls go up on Chitpur first.",
    checkWith: "Ask at the jatra para on Beadon Street; the companies keep their own schedules.",
    href: "/neighbourhoods/chitpur",
  },
  {
    id: "derby",
    kind: "sport",
    title: "The Kolkata Derby",
    when: "Usually twice a season",
    months: [8, 9, 10, 11, 0, 1, 2],
    where: "Salt Lake Stadium",
    body: "Mohun Bagan against East Bengal. Buy through the club rather than at the gate, and arrive two hours early for the approach.",
    checkWith: "The Indian Super League fixture list, published before the season.",
    href: "/football",
  },
  {
    id: "eden-tests",
    kind: "sport",
    title: "Cricket at Eden Gardens",
    when: "Through the domestic and international season",
    months: [9, 10, 11, 0, 1, 2, 3],
    where: "Eden Gardens, Maidan",
    body: "Internationals, IPL, and Ranji Trophy matches you can walk into for almost nothing. A day of Ranji cricket at Eden is one of the better free things in the city.",
    checkWith: "The Cricket Association of Bengal publishes fixtures.",
  },
  {
    id: "nolen-gur",
    kind: "food",
    title: "Nolen gur season",
    when: "Mid-December to mid-February",
    months: [11, 0, 1],
    where: "Every sweet shop",
    body: "Date-palm jaggery, tapped on cold nights and boiled the same morning. Every sweet in the city gets a winter version, and the rosogolla goes from good to remarkable.",
    checkWith: "It depends on the cold. A warm December shortens it.",
    href: "/food/nolen-gur",
  },
  {
    id: "hilsa",
    kind: "food",
    title: "Hilsa season",
    when: "June to September",
    months: [5, 6, 7, 8],
    where: "Gariahat and every fish market",
    body: "Hilsa run upriver to spawn, and the whole Bengali culinary year is organised around it. Prices are argued over daily and the catch has fallen sharply.",
    checkWith: "Gariahat market, at seven in the morning.",
    href: "/neighbourhoods/gariahat",
  },
  {
    id: "ramadan",
    kind: "food",
    title: "Ramadan on Zakaria Street",
    when: "One month, shifting eleven days earlier each year",
    months: [1, 2, 3],
    where: "Below Nakhoda Masjid",
    body: "The lane runs on charcoal from late afternoon into the night: haleem, suta kebab, phirni in clay bowls, sheermal and bakarkhani.",
    checkWith: "The Islamic lunar calendar. Dates move roughly eleven days earlier each year.",
    href: "/heritage/nakhoda-masjid",
  },
  {
    id: "monsoon-notice",
    kind: "notice",
    title: "Monsoon flooding",
    when: "June to September",
    months: [5, 6, 7, 8],
    where: "Low-lying areas across the city",
    body: "Streets flood within about twenty minutes of heavy rain and drain within an hour. It is inconvenient rather than dangerous, and the city carries on. Trams and some bus routes suspend during the worst of it.",
    checkWith: "The India Meteorological Department's Kolkata bulletin.",
  },
  {
    id: "puja-closures",
    kind: "notice",
    title: "Puja closures and road restrictions",
    when: "Five days, and the week around them",
    months: [8, 9],
    where: "Most of the city",
    body: "Museums and government offices close. Major roads close to traffic in the evenings. The metro runs extended and sometimes all-night services. Do not plan on a car.",
    checkWith: "Kolkata Police publish the traffic arrangements a week in advance.",
    href: "/durga-puja",
  },
  {
    id: "summer-notice",
    kind: "notice",
    title: "Peak summer",
    when: "April to June",
    months: [3, 4, 5],
    where: "Everywhere",
    body: "Thirty-five to forty degrees with high humidity. Nothing outdoors between eleven and four is a good idea, and every itinerary that ignores this collapses on the second day.",
    checkWith: "Plan indoor hours. The Indian Museum and Marble Palace are both cooler than the street.",
  },
  {
    id: "gallery-season",
    kind: "exhibition",
    title: "Gallery season",
    when: "October to March",
    months: [9, 10, 11, 0, 1, 2],
    where: "Experimenter, Emami Art, KCC, Akar Prakar, CIMA",
    body: "The contemporary art calendar runs through the cool months, with most significant openings between November and February.",
    checkWith: "Individual gallery programmes; most publish a season in September.",
    href: "/famous-for#art",
  },
];

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
