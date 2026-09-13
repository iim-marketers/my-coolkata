import type { Person, PersonGroup } from "./types";

type Profile = Pick<
  Person,
  "group" | "bornAt" | "kolkataConnection" | "contribution" | "locations" | "life"
>;

/**
 * The portrait-wall fields for the people written before the wall existed.
 * Merged into `people` at export so each record stays in one shape.
 */
export const peopleProfiles: Record<string, Profile> = {
  "rabindranath-tagore": {
    group: "literature" as PersonGroup,
    bornAt: "Jorasanko Thakurbari, north Calcutta",
    kolkataConnection:
      "Born in the house, educated in it, wrote in it, and died in the same room he was born in, eighty years later.",
    contribution:
      "Wrote the national anthems of two countries, won the first Nobel in literature awarded outside Europe, and built a university on the argument that education should happen outdoors.",
    locations: [
      { name: "Jorasanko Thakurbari", note: "Born and died here. Now a museum and a university.", coords: { lat: 22.5852, lng: 88.3617 }, href: "/heritage/jorasanko-thakurbari" },
      { name: "Rabindra Sadan", note: "The concert hall named for him, at the south of the Maidan.", coords: { lat: 22.5399, lng: 88.3444 } },
      { name: "Keoratala burning ghat", note: "Where he was cremated in August 1941.", coords: { lat: 22.5148, lng: 88.3399 }, href: "/neighbourhoods/kalighat" },
    ],
    life: [
      { year: "1861", what: "Born at Jorasanko, the fourteenth child." },
      { year: "1878", what: "Sent to London to study law. Leaves without a degree." },
      { year: "1901", what: "Founds the school at Santiniketan." },
      { year: "1913", what: "Nobel Prize in Literature." },
      { year: "1919", what: "Renounces the knighthood after Jallianwala Bagh." },
      { year: "1924", what: "Begins painting, at sixty-three." },
      { year: "1941", what: "Dies at Jorasanko, in the room he was born in." },
    ],
  },
  "satyajit-ray": {
    group: "cinema" as PersonGroup,
    bornAt: "Calcutta, into a family of printers and writers",
    kolkataConnection:
      "Designed book jackets at an advertising agency on Chowringhee, shot Pather Panchali on weekends outside the city, and lived on Bishop Lefroy Road for the rest of his life.",
    contribution:
      "Made Indian cinema internationally serious, and wrote the detective stories most Bengalis actually read him for first.",
    locations: [
      { name: "1/1 Bishop Lefroy Road", note: "His flat, where he wrote, drew and composed.", coords: { lat: 22.5346, lng: 88.3596 } },
      { name: "Indian Coffee House", note: "Before Pather Panchali, when he was still designing jackets.", coords: { lat: 22.5757, lng: 88.3639 }, href: "/neighbourhoods/college-street" },
      { name: "Nandan", note: "The state film centre, which he named and helped design.", coords: { lat: 22.5399, lng: 88.3444 } },
    ],
    life: [
      { year: "1921", what: "Born in Calcutta." },
      { year: "1943", what: "Joins D. J. Keymer as a commercial artist." },
      { year: "1949", what: "Meets Jean Renoir, shooting The River in Bengal." },
      { year: "1955", what: "Pather Panchali opens." },
      { year: "1965", what: "The first Feluda story." },
      { year: "1992", what: "Honorary Academy Award, accepted from a hospital bed." },
    ],
  },
  "swami-vivekananda": {
    group: "spirituality" as PersonGroup,
    bornAt: "3 Gourmohan Mukherjee Street, Simla, north Calcutta",
    kolkataConnection:
      "A Scottish Church College student from Simla Street who walked to Dakshineswar to test a priest, and came back with a life's work.",
    contribution:
      "Took Indian philosophy to a Western audience on its own terms, and built an order that put famine relief on the same footing as contemplation.",
    locations: [
      { name: "Swami Vivekananda's Ancestral House", note: "3 Gourmohan Mukherjee Street. Restored and open.", coords: { lat: 22.5876, lng: 88.3648 } },
      { name: "Dakshineswar Kali Temple", note: "Where he first met Ramakrishna in 1881.", coords: { lat: 22.655, lng: 88.3576 }, href: "/heritage/dakshineswar-kali-temple" },
      { name: "Belur Math", note: "The Mission headquarters, and where he died.", coords: { lat: 22.632, lng: 88.355 }, href: "/heritage/belur-math" },
    ],
    life: [
      { year: "1863", what: "Born Narendranath Datta at Simla, Calcutta." },
      { year: "1881", what: "First visits Ramakrishna at Dakshineswar." },
      { year: "1893", what: "Addresses the World's Parliament of Religions at Chicago." },
      { year: "1897", what: "Founds the Ramakrishna Mission." },
      { year: "1902", what: "Dies at Belur Math, aged thirty-nine." },
    ],
  },
  "ritwik-ghatak": {
    group: "cinema" as PersonGroup,
    bornAt: "Dhaka, and crossed after Partition",
    kolkataConnection:
      "Arrived as a refugee in 1947 and spent the rest of his life making films about that crossing, mostly in and around the colonies on the city's edge.",
    contribution:
      "Made Partition the subject of Indian cinema, and taught the generation that carried Indian art film after him.",
    locations: [
      { name: "The refugee colonies, south and east", note: "The setting of Meghe Dhaka Tara and Subarnarekha.", coords: { lat: 22.4991, lng: 88.3712 }, href: "/neighbourhoods/jadavpur" },
      { name: "Indian Coffee House", note: "Where he argued with everybody, at length.", coords: { lat: 22.5757, lng: 88.3639 }, href: "/neighbourhoods/college-street" },
    ],
    life: [
      { year: "1925", what: "Born at Dhaka." },
      { year: "1947", what: "Crosses to Calcutta at Partition." },
      { year: "1960", what: "Meghe Dhaka Tara." },
      { year: "1965", what: "Subarnarekha released, three years after it was shot." },
      { year: "1966", what: "Teaches at the Film Institute at Pune." },
      { year: "1976", what: "Dies at fifty." },
    ],
  },
  "begum-rokeya": {
    group: "reform" as PersonGroup,
    bornAt: "Pairaband, Rangpur, now in Bangladesh",
    kolkataConnection:
      "Moved her girls' school to Calcutta in 1911 and ran it here for twenty years, going door to door to persuade fathers to let their daughters attend.",
    contribution:
      "Wrote a feminist science-fiction utopia in English in 1905 and then spent thirty years building the schooling it argued for.",
    locations: [
      { name: "Sakhawat Memorial Girls' School", note: "Lower Circular Road. Opened here in 1911 and still running.", coords: { lat: 22.5405, lng: 88.3663 } },
      { name: "Rokeya Sarani", note: "The road in the north of the city named for her.", coords: { lat: 22.6119, lng: 88.4048 } },
    ],
    life: [
      { year: "1880", what: "Born at Pairaband, Rangpur." },
      { year: "1905", what: "Sultana's Dream published, in English." },
      { year: "1909", what: "Her husband dies; she opens a girls' school five months later." },
      { year: "1911", what: "Moves the school to Calcutta." },
      { year: "1916", what: "Founds the Anjuman-e-Khawateen-e-Islam." },
      { year: "1932", what: "Dies on 9 December, her own birthday." },
    ],
  },
  "jagadish-chandra-bose": {
    group: "science" as PersonGroup,
    bornAt: "Mymensingh, now in Bangladesh",
    kolkataConnection:
      "Taught at Presidency College for thirty years, demonstrated radio at the Town Hall in 1895, and founded Asia's first interdisciplinary research institute here with his own money.",
    contribution:
      "Demonstrated millimetre-wave radio a year before Marconi's public trial, refused to patent it, and then spent thirty years proving that plants respond.",
    locations: [
      { name: "Bose Institute", note: "Founded 1917 on Upper Circular Road, with his own money.", coords: { lat: 22.5776, lng: 88.3717 } },
      { name: "Town Hall", note: "The 1895 radio demonstration, through two walls.", coords: { lat: 22.5709, lng: 88.3446 }, href: "/heritage/town-hall" },
      { name: "Presidency University", note: "The Baker Laboratory, where he taught for thirty years.", coords: { lat: 22.5747, lng: 88.3634 }, href: "/neighbourhoods/college-street" },
    ],
    life: [
      { year: "1858", what: "Born at Mymensingh." },
      { year: "1885", what: "Joins Presidency College as professor of physics." },
      { year: "1895", what: "Radio demonstration at the Calcutta Town Hall." },
      { year: "1896", what: "Publishes Niruddesher Kahini, early Bengali science fiction." },
      { year: "1902", what: "Response in the Living and Non-Living." },
      { year: "1917", what: "Founds the Bose Institute." },
    ],
  },
  "jibanananda-das": {
    group: "literature" as PersonGroup,
    bornAt: "Barisal, now in Bangladesh",
    kolkataConnection:
      "Came to Calcutta after Partition, taught without security, was hit by a tram at Deshapriya Park in 1954, and died eight days later.",
    contribution:
      "Wrote the most quoted poem in modern Bengali, and left thousands more in notebooks nobody found until he was dead.",
    locations: [
      { name: "Deshapriya Park", note: "Where the tram hit him, on 14 October 1954.", coords: { lat: 22.5185, lng: 88.3524 }, href: "/neighbourhoods/ballygunge" },
      { name: "College Street", note: "Where Buddhadeb Bose championed him and almost nobody bought him.", coords: { lat: 22.5747, lng: 88.365 }, href: "/neighbourhoods/college-street" },
    ],
    life: [
      { year: "1899", what: "Born at Barisal." },
      { year: "1927", what: "First collection, Jhara Palak." },
      { year: "1942", what: "Banalata Sen." },
      { year: "1947", what: "Moves to Calcutta after Partition." },
      { year: "1954", what: "Hit by a tram at Deshapriya Park; dies eight days later." },
      { year: "1957", what: "Rupasi Bangla published, three years after his death." },
    ],
  },
  "mother-teresa": {
    group: "spirituality" as PersonGroup,
    bornAt: "Skopje, then in the Ottoman Empire",
    kolkataConnection:
      "Taught geography at the Loreto convent at Entally for nearly twenty years, left it in 1948 for the slums, and never lived anywhere else again.",
    contribution:
      "Built an order that now runs in more than a hundred countries, from a home for the dying beside the Kalighat temple.",
    locations: [
      { name: "Mother House, 54A A.J.C. Bose Road", note: "Her tomb is a plain slab; the room is preserved.", coords: { lat: 22.5457, lng: 88.3617 } },
      { name: "Nirmal Hriday, Kalighat", note: "The home for the dying, opened 1952.", coords: { lat: 22.5203, lng: 88.3426 }, href: "/neighbourhoods/kalighat" },
      { name: "Loreto Convent, Entally", note: "Where she taught geography for nearly twenty years.", coords: { lat: 22.5613, lng: 88.3766 } },
    ],
    life: [
      { year: "1910", what: "Born at Skopje." },
      { year: "1929", what: "Arrives in India; teaches at Loreto, Entally." },
      { year: "1946", what: "The call within a call, on a train to Darjeeling." },
      { year: "1950", what: "Missionaries of Charity recognised." },
      { year: "1952", what: "Nirmal Hriday opens at Kalighat." },
      { year: "1979", what: "Nobel Peace Prize; declines the banquet." },
      { year: "1997", what: "Dies in Calcutta." },
    ],
  },
  "suchitra-sen": {
    group: "culture" as PersonGroup,
    bornAt: "Pabna, now in Bangladesh",
    kolkataConnection:
      "Married into a Ballygunge family, made her entire career in the Tollygunge studios, and after 1978 was never photographed in public in this city again.",
    contribution:
      "The first Indian actor to win a prize at an international film festival, and half of the pairing Bengali cinema is still measured against.",
    locations: [
      { name: "Ballygunge", note: "Where she lived, and withdrew.", coords: { lat: 22.5286, lng: 88.3646 }, href: "/neighbourhoods/ballygunge" },
      { name: "Tollygunge studios", note: "Where more than fifty of her films were shot.", coords: { lat: 22.4972, lng: 88.3436 }, href: "/neighbourhoods/tollygunge" },
    ],
    life: [
      { year: "1931", what: "Born Rama Dasgupta at Pabna." },
      { year: "1954", what: "Agnipariksha, with Uttam Kumar." },
      { year: "1963", what: "Best Actress at Moscow, for Saat Paake Bandha." },
      { year: "1975", what: "Aandhi, withdrawn during the Emergency." },
      { year: "1978", what: "Pranay Pasha. Her last public appearance of any kind." },
      { year: "2014", what: "Dies. The funeral is closed." },
    ],
  },
  "amartya-sen": {
    group: "science" as PersonGroup,
    bornAt: "Santiniketan, on the Visva-Bharati campus",
    kolkataConnection:
      "A Presidency College undergraduate who argued in the Coffee House, and a nine-year-old in Bengal during the 1943 famine, which he spent a career explaining.",
    contribution:
      "Showed that famines are failures of entitlement rather than of harvest, and reframed development as what people are able to do and be.",
    locations: [
      { name: "Presidency University", note: "Where he read economics, and argued in the Coffee House.", coords: { lat: 22.5747, lng: 88.3634 }, href: "/neighbourhoods/college-street" },
      { name: "Indian Coffee House", note: "The table, and several years of it.", coords: { lat: 22.5757, lng: 88.3639 } },
    ],
    life: [
      { year: "1933", what: "Born at Santiniketan. Tagore gives him his name." },
      { year: "1943", what: "Aged nine during the Bengal famine." },
      { year: "1953", what: "Graduates from Presidency College." },
      { year: "1981", what: "Poverty and Famines." },
      { year: "1990", what: "Helps design the Human Development Index." },
      { year: "1998", what: "Nobel Memorial Prize in Economic Sciences." },
    ],
  },
  "nobin-chandra-das": {
    group: "culture" as PersonGroup,
    bornAt: "Calcutta",
    kolkataConnection:
      "Ran a sweet shop in Bagbazar and solved, in 1868, a problem every confectioner in Bengal had failed at.",
    contribution:
      "Worked out how to boil chhena in syrup without it disintegrating, and invented the rosogolla.",
    locations: [
      { name: "Nobin Chandra Das, Bagbazar", note: "The original address, still trading.", coords: { lat: 22.6003, lng: 88.3681 }, href: "/neighbourhoods/bagbazar" },
      { name: "K.C. Das, Esplanade", note: "His son's firm, which worked out how to can it.", coords: { lat: 22.5648, lng: 88.3524 } },
    ],
    life: [
      { year: "1845", what: "Born in Calcutta." },
      { year: "1866", what: "Opens the shop at Bagbazar." },
      { year: "1868", what: "The rosogolla." },
      { year: "1925", what: "Dies." },
      { year: "2017", what: "Bengal gets the GI tag for Banglar Rosogolla, ninety-two years later." },
    ],
  },
};
