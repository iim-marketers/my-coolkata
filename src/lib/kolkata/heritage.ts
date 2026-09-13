import type { HeritageSite } from "./types";
import { heritageExtra } from "./heritage-extra";

const core: HeritageSite[] = [
  {
    slug: "howrah-bridge",
    name: "Howrah Bridge",
    alsoKnownAs: "Rabindra Setu",
    built: "Opened February 1943",
    builtYear: 1943,
    architect: "Rendel, Palmer & Tritton",
    style: "Cantilever steel truss",
    neighbourhood: "Strand Road",
    coords: { lat: 22.5851, lng: 88.3468 },
    era: "raj",
    summary:
      "A 705-metre cantilever with no bolts holding it together, carrying more foot traffic than almost any bridge on earth.",
    body: [
      "It was meant to be temporary. The pontoon bridge it replaced had been swinging open for river traffic since 1874, and by the 1920s the crossing was a daily humiliation of stalled carts and shouting. A commission sat, argued, and eventually specified a cantilever so that no pier would stand in the shipping channel.",
      "The bridge is riveted, not bolted. Roughly 26,500 tonnes of steel, most of it Tata's, was fastened together with hot rivets driven by hand, which is why the structure appears to have been knitted rather than assembled. It hangs from two 82-metre towers and touches the water nowhere in between.",
      "War delayed it. It opened quietly in February 1943 with no ceremony at all, because a lit ribbon-cutting on the Hooghly during a Japanese bombing campaign seemed unwise. The first thing across was a single tram.",
      "What it carries now is the point. Cars and buses matter less than the river of people who walk it, and the pavement has been worn into shallow troughs by a century of feet. The bird droppings are a genuine engineering problem: the guano is acidic enough that the hangers have needed replacing.",
    ],
    detail: [
      { label: "Length", value: "705 m" },
      { label: "Main span", value: "457 m" },
      { label: "Steel", value: "≈26,500 tonnes, largely Tata" },
      { label: "Renamed", value: "1965, for Rabindranath Tagore" },
      { label: "Daily crossings", value: "≈100,000 vehicles, far more on foot" },
    ],
    overlooked:
      "Photographing it from the bridge deck is restricted. Everyone shoots it from Mullick Ghat flower market instead, at first light, which is the better frame anyway.",
    scene: "howrah",
    photo: "howrah-bridge",
  },
  {
    slug: "victoria-memorial",
    name: "Victoria Memorial",
    built: "1906–1921",
    builtYear: 1921,
    architect: "William Emerson",
    style: "Indo-Saracenic, Makrana marble",
    neighbourhood: "Maidan",
    coords: { lat: 22.5448, lng: 88.3426 },
    era: "raj",
    summary:
      "An imperial mausoleum for a queen who never came, now the city's most-photographed lawn and a museum of the empire that built it.",
    body: [
      "Lord Curzon proposed it within days of Victoria's death in 1901: a building to hold the memory of the Raj at the moment the Raj was most certain of itself. Public subscription paid for much of it. Fifteen years later, when it finally opened, the capital had already moved to Delhi and the certainty had gone.",
      "Emerson worked in the same Makrana marble as the Taj Mahal and borrowed the same central dome logic, then attached Venetian, Egyptian and Mughal detail until the result belonged to no tradition in particular. The bronze Angel of Victory on top is nearly five metres tall and turns on ball bearings in a strong wind.",
      "Inside are twenty-five galleries, including a Kolkata gallery that is far better than visitors expect, holding city plans, Kalighat paintings and the sort of Company School watercolours that show what the Strand looked like before the concrete.",
      "The grounds are the real institution. Sixty-four acres of the Maidan, and on any winter evening they hold couples under umbrellas, joggers, cricket, and the horse carriages that wait along Queens Way with their manes dyed pink.",
    ],
    detail: [
      { label: "Foundation stone", value: "1906, by the Prince of Wales" },
      { label: "Opened", value: "1921" },
      { label: "Height", value: "56 m" },
      { label: "Galleries", value: "25" },
      { label: "Grounds", value: "64 acres" },
    ],
    overlooked:
      "The sound-and-light show is skippable. The Kolkata gallery on the ground floor is not, and it is where you should spend the hour instead.",
    scene: "victoria",
    photo: "victoria-memorial",
  },
  {
    slug: "marble-palace",
    name: "Marble Palace",
    built: "1835",
    builtYear: 1835,
    architect: "Built for Raja Rajendra Mullick",
    style: "Neoclassical with a Bengali courtyard plan",
    neighbourhood: "Chorbagan, North Kolkata",
    coords: { lat: 22.5836, lng: 88.3617 },
    era: "company",
    summary:
      "A private mansion of 126 kinds of marble, still lived in by the family, still lit mostly by daylight.",
    body: [
      "Rajendra Mullick was sixteen when he began building it and wealthy enough that no one stopped him. The result is a neoclassical house wrapped around a traditional Bengali thakur dalan courtyard, floored in 126 varieties of marble, and filled to the ceiling with whatever the nineteenth-century art market would sell to Calcutta.",
      "Some of it is extraordinary. There are two canvases attributed to Rubens, a Reynolds, Murillos, and the largest collection of Victorian statuary in a private Indian house. Some of it is magnificently not extraordinary, and the two hang side by side with no hierarchy at all.",
      "There is no electric lighting in the galleries. Rooms are lit through the courtyard, so the paintings appear and disappear depending on the hour and the cloud. Peacocks walk the garden. A small menagerie has been kept on the grounds since the 1850s.",
      "The family still occupies part of the house. This is why the visit feels less like a museum and more like being shown around by someone who has other things to do.",
    ],
    detail: [
      { label: "Marble varieties", value: "126" },
      { label: "Entry", value: "Free, but a permit from the West Bengal tourism office is required" },
      { label: "Closed", value: "Mondays and Thursdays" },
      { label: "Photography", value: "Not permitted inside" },
    ],
    overlooked:
      "Get the permit a day ahead. Guides at the gate will offer to sort it for a fee; the office does it for nothing.",
    scene: "rooftops",
    photo: "marble-palace",
  },
  {
    slug: "indian-museum",
    name: "Indian Museum",
    alsoKnownAs: "Jadughar",
    built: "Founded 1814",
    builtYear: 1814,
    architect: "Walter Granville (1875 building)",
    style: "Italianate",
    neighbourhood: "Chowringhee",
    coords: { lat: 22.558, lng: 88.351 },
    era: "company",
    summary:
      "The ninth-oldest museum in the world and the oldest in Asia, holding the Bharhut stupa railing and an Egyptian mummy that generations of Kolkata schoolchildren have been frightened by.",
    body: [
      "It began as the Asiatic Society's cabinet in 1814, under the Danish botanist Nathaniel Wallich, and grew into something enormous. The current building on Chowringhee dates from 1875 and is arranged around a colonnaded quadrangle that is cooler than the street by several degrees.",
      "The single most important object is the Bharhut gallery: the railing and gateway of a second-century BCE Buddhist stupa from Madhya Pradesh, reassembled here. It is one of the earliest surviving bodies of Indian narrative sculpture, and it is displayed with an understatement bordering on neglect.",
      "The mummy is the other pole of the museum. Locals call the whole building Jadughar, the house of magic, and for most people who grew up in the city the phrase means specifically the room with the mummy in it.",
      "Sixty galleries across six sections. You cannot do it in an afternoon and should not try.",
    ],
    detail: [
      { label: "Founded", value: "1814" },
      { label: "Sections", value: "Art, archaeology, anthropology, geology, zoology, botany" },
      { label: "Galleries", value: "≈60" },
      { label: "Closed", value: "Mondays" },
    ],
    overlooked:
      "The geology section holds one of the largest meteorite collections in the country. Almost nobody walks up there.",
    scene: "collegestreet",
    photo: "indian-museum",
  },
  {
    slug: "dakshineswar-kali-temple",
    name: "Dakshineswar Kali Temple",
    built: "Consecrated 1855",
    builtYear: 1855,
    architect: "Commissioned by Rani Rashmoni",
    style: "Nabaratna, nine-spired Bengali temple",
    neighbourhood: "Dakshineswar, on the Hooghly",
    coords: { lat: 22.655, lng: 88.3576 },
    era: "renaissance",
    summary:
      "A nine-spired temple on the river, built by a widow the priesthood tried to refuse, and the place where Ramakrishna spent thirty years.",
    body: [
      "Rani Rashmoni was a wealthy widow from a fishing-caste family, and when she set out to build a Kali temple in 1847 the orthodoxy told her that a non-brahmin could not consecrate one. She found a young priest, Ramkumar Chattopadhyay, willing to take a workaround, and the temple opened in 1855.",
      "Ramkumar's younger brother came with him. That brother, Gadadhar, became Ramakrishna Paramahamsa, and for the next three decades he lived in a small room in the northwest corner of the courtyard, conducting the experiments in devotional practice that would reshape modern Hinduism and, through Vivekananda, carry it abroad.",
      "The temple is a nabaratna, nine spires over a raised plinth, flanked by twelve identical Shiva shrines along the river ghat. The image of Bhavatarini stands on a silver lotus.",
      "It is busiest at dawn and on Tuesdays and Saturdays. The ferry across to Belur Math takes about twenty minutes and is the correct way to make the trip.",
    ],
    detail: [
      { label: "Consecrated", value: "31 May 1855" },
      { label: "Founder", value: "Rani Rashmoni" },
      { label: "Shiva shrines", value: "12, along the ghat" },
      { label: "Get there", value: "Dakshineswar metro, or ferry from Belur Math" },
    ],
    overlooked:
      "Ramakrishna's room is open and almost always overlooked in the rush to the main shrine. It is about three metres square.",
    scene: "river",
    photo: "dakshineswar",
  },
  {
    slug: "st-pauls-cathedral",
    name: "St. Paul's Cathedral",
    built: "1839–1847",
    builtYear: 1847,
    architect: "William Nairn Forbes and C. K. Robinson",
    style: "Indo-Gothic",
    neighbourhood: "Cathedral Road, Maidan",
    coords: { lat: 22.5448, lng: 88.3475 },
    era: "raj",
    summary:
      "The first Anglican cathedral built outside Britain, with a tower rebuilt twice after earthquakes and a nave designed to move air.",
    body: [
      "Bishop Daniel Wilson pushed it through, largely with his own money, because the older St. John's had become too small. Forbes, a Royal Engineer, designed a Gothic cathedral adapted for the Bengal climate: an exceptionally wide nave, thin iron-trussed roof, and ventilation that treats the building as a machine for surviving May.",
      "The original tower was modelled on Canterbury. The 1897 earthquake took it down, the 1934 Bihar earthquake damaged its replacement, and the present tower follows Bell Harry at Canterbury more cautiously than the first attempt did.",
      "The west window is by Burne-Jones, installed in 1880 and depicting the life of St. Paul. Two Florentine frescoes flank the entrance. There are memorial tablets on almost every surface, and reading them is a compressed social history of who died young in Calcutta and of what.",
      "At Christmas the cathedral and Park Street a few hundred metres away become the same event, and the queue on the lawn runs past midnight.",
    ],
    detail: [
      { label: "Consecrated", value: "1847" },
      { label: "Nave length", value: "75 m" },
      { label: "West window", value: "Edward Burne-Jones, 1880" },
      { label: "Tower", value: "Rebuilt after the 1934 earthquake" },
    ],
    overlooked:
      "The grounds hold a small, quiet cemetery. It is the coolest place within a kilometre in high summer.",
    scene: "victoria",
    photo: "st-pauls-cathedral",
  },
  {
    slug: "writers-building",
    name: "Writers' Building",
    built: "1777, refaced 1889",
    builtYear: 1777,
    architect: "Thomas Lyon; Victorian facade by others",
    style: "Greco-Roman with a Corinthian range",
    neighbourhood: "BBD Bagh",
    coords: { lat: 22.5726, lng: 88.3487 },
    era: "company",
    summary:
      "Built as a dormitory for junior clerks of the East India Company and used as the seat of Bengal's government for the next two centuries.",
    body: [
      "The writers were the Company's lowest grade of employee, teenagers sent out from Britain to copy ledgers. Thomas Lyon put up a plain three-storey block to house them in 1777, facing what was then Tank Square.",
      "It grew. By 1889 the front had been refaced into the long red Corinthian range that still defines the north side of BBD Bagh, topped with statues representing commerce, justice, science and agriculture, and the building had become the secretariat of the Bengal government.",
      "On 8 December 1930, Benoy Basu, Badal Gupta and Dinesh Gupta walked into the corridors in European dress and shot Colonel N. S. Simpson, the inspector-general of prisons. The square outside is named for them: Benoy–Badal–Dinesh Bagh.",
      "The state government moved most operations out to Nabanna in Howrah in 2013 for a restoration that has run long. The building is not open to visitors, and the exterior is the visit.",
    ],
    detail: [
      { label: "First built", value: "1777" },
      { label: "Facade", value: "1889" },
      { label: "Named for", value: "Company clerks, called 'writers'" },
      { label: "Access", value: "Exterior only" },
    ],
    overlooked:
      "Stand at the Lal Dighi tank on the south side. The reflection of the whole range in the water is the shot every photographer misses by standing too close.",
    scene: "rooftops",
    photo: "writers-building",
  },
  {
    slug: "nakhoda-masjid",
    name: "Nakhoda Masjid",
    built: "1926",
    builtYear: 1926,
    architect: "Modelled on Akbar's tomb at Sikandra",
    style: "Mughal revival, red Tantpur sandstone",
    neighbourhood: "Zakaria Street, Chitpur",
    coords: { lat: 22.5806, lng: 88.3563 },
    era: "raj",
    summary:
      "The city's principal mosque, red sandstone above a street that during Ramadan becomes the best place to eat in Kolkata.",
    body: [
      "Funded largely by Abdur Rahim Osman, a Kutchi Memon shipping merchant, and completed in 1926. Nakhoda means mariner. The gateway copies Akbar's tomb at Sikandra, and the two minarets rise 46 metres over a neighbourhood of two-storey shopfronts.",
      "It holds around ten thousand people. The prayer hall is plain, which is the intention; the sandstone and the domes do the work outside.",
      "Zakaria Street below it is the reason many people come. Through Ramadan the lane runs on charcoal from late afternoon: haleem, suta kebab, shami, phirni in clay bowls, and the sheermal and bakarkhani that only appear properly in this quarter.",
      "Non-Muslim visitors are generally welcome outside prayer times. Dress modestly, and ask before going up.",
    ],
    detail: [
      { label: "Completed", value: "1926" },
      { label: "Capacity", value: "≈10,000" },
      { label: "Minarets", value: "46 m" },
      { label: "Best time", value: "Ramadan evenings, on Zakaria Street" },
    ],
    overlooked:
      "Royal India Hotel is around the corner and has been doing the same mutton biryani since 1905. It is not a hotel.",
    scene: "streetfood",
    photo: "nakhoda-masjid",
  },
  {
    slug: "belur-math",
    name: "Belur Math",
    built: "1938",
    builtYear: 1938,
    architect: "Designed by Swami Vijnanananda",
    style: "Deliberately syncretic: temple, mosque, church",
    neighbourhood: "Belur, west bank of the Hooghly",
    coords: { lat: 22.632, lng: 88.355 },
    era: "renaissance",
    summary:
      "The headquarters of the Ramakrishna Mission, built so that its silhouette reads as a temple, a mosque and a church depending on where you stand.",
    body: [
      "Vivekananda wanted a building that argued his position architecturally. The entrance suggests a Buddhist chaitya. The windows and balconies are Mughal and Rajput. The ground plan is a Christian cross. The central dome refers to a Bengali temple. None of this is accidental.",
      "Construction ran from 1935 to 1938, after Vivekananda's death, following his sketches and Swami Vijnanananda's drawings. The main temple holds a marble image of Ramakrishna, set over the spot where his relics were interred.",
      "Forty acres on the west bank, with the shrines of Sarada Devi and Vivekananda along the river. It is quiet in a way almost nowhere else in the metropolitan area manages.",
      "Take the ferry from Dakshineswar. Arriving from the water is the way the place was meant to be entered.",
    ],
    detail: [
      { label: "Built", value: "1935–1938" },
      { label: "Grounds", value: "40 acres" },
      { label: "Founded by", value: "Swami Vivekananda, 1897" },
      { label: "Ferry", value: "≈20 minutes from Dakshineswar" },
    ],
    overlooked:
      "The museum near the gate holds Vivekananda's Chicago robe and his letters. Most visitors walk straight past it to the temple.",
    scene: "river",
    photo: "belur-math",
  },
  {
    slug: "south-park-street-cemetery",
    name: "South Park Street Cemetery",
    built: "Opened 1767",
    builtYear: 1767,
    style: "Neoclassical funerary: obelisks, pyramids, cenotaphs",
    neighbourhood: "Park Street",
    coords: { lat: 22.5459, lng: 88.354 },
    era: "company",
    summary:
      "Eight acres of enormous eighteenth-century tombs, most of them holding people who died in their twenties.",
    body: [
      "It opened in 1767 and closed to new burials around 1830. In between, it filled with roughly 1,600 monuments built at a scale the dead would have found embarrassing: pyramids, obelisks, domed cenotaphs, an entire vocabulary of Roman mourning transplanted into Bengal.",
      "Read the dates. The average age at death here is somewhere in the low thirties, and a great many stones record people of twenty-two, twenty-five, twenty-eight. Cholera, malaria, typhoid, and the simple fact that nobody understood what the monsoon did to drinking water.",
      "Sir William Jones is here, the judge and philologist who first argued in public that Sanskrit, Greek and Latin descend from a common source. So is Henry Louis Vivian Derozio, the poet and Hindu College teacher who died at twenty-two and shaped a generation of Bengali radicals.",
      "It is thick with banyan and green light. The noise of Park Street stops about ten metres inside the gate.",
    ],
    detail: [
      { label: "Open", value: "1767–c.1830" },
      { label: "Monuments", value: "≈1,600" },
      { label: "Notable", value: "Sir William Jones, H. L. V. Derozio, Rose Aylmer" },
      { label: "Entry", value: "Small fee; open daily" },
    ],
    overlooked:
      "Rose Aylmer died at twenty from cholera after eating too much pineapple. Walter Savage Landor wrote her one of the better short elegies in English, and it is on the stone.",
    scene: "rooftops",
    photo: "south-park-street-cemetery",
  },
  {
    slug: "kalighat-temple",
    name: "Kalighat Kali Temple",
    built: "Current structure 1809",
    builtYear: 1809,
    style: "Bengali ath-chala",
    neighbourhood: "Kalighat, South Kolkata",
    coords: { lat: 22.5203, lng: 88.3426 },
    era: "pre-colonial",
    summary:
      "The shrine the city is probably named after, older than the city, on a channel of the Adi Ganga.",
    body: [
      "There was a Kali shrine on this creek long before there was a Calcutta, and one durable reading of the city's name traces it to Kalikshetra or Kalikata, the ground of Kali. The present temple building dates from 1809, funded by the Sabarna Roy Choudhury family.",
      "It is one of the fifty-one Shakti Peethas. The tradition holds that the toes of Sati's right foot fell here. The image is unusual and unmistakable: a black stone face with three enormous gold eyes and a protruding gold tongue, quite unlike the Kali of the Puja pandals.",
      "The Adi Ganga beside it was the main channel of the Hooghly until the eighteenth century. It is now a narrow, poor thing, and its condition is a standing civic argument.",
      "This is a working shrine, dense and fast-moving. Touts at the approach will offer priority access; the ordinary queue works.",
    ],
    detail: [
      { label: "Present temple", value: "1809" },
      { label: "Status", value: "One of 51 Shakti Peethas" },
      { label: "Nearest metro", value: "Kalighat, Line 1" },
      { label: "Busiest", value: "Tuesdays, Saturdays, Kali Puja" },
    ],
    overlooked:
      "The Kalighat pat painters worked in the lanes around this temple through the nineteenth century, inventing a fast, flat, satirical style that later fed straight into modern Indian art. Jamini Roy built a career on it.",
    scene: "kumartuli",
    photo: "kalighat-temple",
  },
];

export const heritageSites: HeritageSite[] = [...core, ...heritageExtra];

export function getHeritageSite(slug: string) {
  return heritageSites.find((s) => s.slug === slug);
}
