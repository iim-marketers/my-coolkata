import type { EraId, EraStop } from "./types";

/**
 * The stops on the year slider. Setting one puts `data-era` on the
 * document, which shifts the palette site-wide, and filters what the
 * era view surfaces.
 */
export const eraStops: EraStop[] = [
  {
    id: "1690",
    year: 1690,
    label: "1690",
    headline: "Three villages and a bend in the river",
    standfirst:
      "There is no city. There is a cotton-yarn market, a fishing settlement, and a shrine to Kali on an old channel of the Ganga.",
    sees: [
      {
        title: "Sutanuti, Gobindapur, Kalikata",
        body: "Three villages held by the Sabarna Roy Choudhury family. Sutanuti trades cotton yarn; Gobindapur fishes; Kalikata has the temple the city will eventually be named after.",
      },
      {
        title: "A factory on the east bank",
        body: "Job Charnock ties up in August with a handful of Company men. The water is deep enough for ships and the marshes make the site hard to attack from three sides. That is the entire reasoning.",
      },
      {
        title: "Jungle and marsh",
        body: "Tiger country, genuinely. The Sundarbans reach much further north than they do now, and the salt lakes to the east are open water.",
      },
      {
        title: "No bridge, no road, no wheel",
        body: "Everything moves by boat. The only overland route is the pilgrim track from the north down to Kalighat, which will become Chitpur Road.",
      },
    ],
    scene: "river",
    photo: "calcutta-18th-century",
    soundtrack: "Oars, and the tide turning twice a day",
    population: "Perhaps 15,000, across the three villages",
    getAround: "By boat, or the Kalighat pilgrim track",
    mood: "founding",
  },
  {
    id: "1772",
    year: 1772,
    label: "1772",
    headline: "The capital of British India",
    standfirst:
      "Fifteen years after Plassey, Warren Hastings moves the administration here from Murshidabad. The settlement becomes a seat of government, and starts building like one.",
    sees: [
      {
        title: "The new Fort William",
        body: "Finished in 1781 after two decades of work, star-shaped, and so expensive it was never attacked. The village of Gobindapur was cleared to make room, and the clearing became the Maidan.",
      },
      {
        title: "Writers' Building",
        body: "Thomas Lyon puts up a plain three-storey block in 1777 to house the Company's teenage clerks. It will be refaced in 1889 into the long red range that still defines BBD Bagh.",
      },
      {
        title: "The Supreme Court, 1774",
        body: "English law arrives formally, along with the first newspaper, Hicky's Bengal Gazette, in 1780, which is shut down for libelling the Governor-General's wife.",
      },
      {
        title: "Palladian Calcutta",
        body: "The City of Palaces begins: white stucco, Doric porticos, garden houses at Alipore and Chowringhee, all of it built on Bengal's revenue.",
      },
    ],
    scene: "rooftops",
    photo: "writers-building-old",
    soundtrack: "Palanquin bearers, and the fort's evening gun",
    population: "Around 120,000",
    getAround: "Palanquin, budgerow, or on foot",
    mood: "company",
  },
  {
    id: "1900",
    year: 1900,
    label: "1900",
    headline: "Colonial Calcutta at its height",
    standfirst:
      "The second city of the empire. Horse trams on the Maidan, gas lamps on Chowringhee, and a Bengali intellectual class that is about to become a political problem.",
    sees: [
      {
        title: "Horse carriages and the first electric trams",
        body: "The horse tramway of 1880 is electrified in 1902, the first in Asia. Until then it is horses: broughams, victorias and the hackney carriages that queue along Chowringhee.",
      },
      {
        title: "The City of Palaces",
        body: "Chowringhee is a wall of stucco. The Indian Museum is twenty-five years old. Curzon is about to propose a memorial to Victoria that will take fifteen years to build.",
      },
      {
        title: "Bengal Renaissance in full flow",
        body: "Tagore is thirty-nine and has not yet written Gitanjali. J. C. Bose has already demonstrated millimetre-wave radio and refused to patent it. Vivekananda has two years to live.",
      },
      {
        title: "The photograph as evidence",
        body: "Bourne & Shepherd on Esplanade have been photographing the city since 1863. Almost every image of Calcutta before 1900 that survives came out of their studio.",
      },
    ],
    scene: "victoria",
    photo: "calcutta-1900",
    soundtrack: "Hooves on macadam, and a tram bell",
    population: "About 950,000",
    getAround: "Horse tram, hackney carriage, or the river",
    mood: "sepia",
  },
  {
    id: "1940",
    year: 1940,
    label: "1940s",
    headline: "War, famine, and the end of the Raj",
    standfirst:
      "The worst decade in the city's history, and the one that ends it as a colonial capital. Japanese bombs, a famine that kills millions, Direct Action Day, and Partition.",
    sees: [
      {
        title: "Subhas Chandra Bose",
        body: "Escapes house arrest at his Elgin Road house in January 1941, in disguise, in a German car, and reaches Berlin by way of Kabul. He will raise the Indian National Army and disappear in 1945.",
      },
      {
        title: "Wartime Calcutta",
        body: "Japanese air raids on the docks from December 1942. American GIs on Chowringhee. Blackout, and Howrah Bridge opening in February 1943 with no ceremony at all.",
      },
      {
        title: "The Bengal famine, 1943",
        body: "Between two and three million dead, in a year when the province's food supply was adequate. What failed was entitlement, not harvest. Amartya Sen was nine, and would spend a career proving it.",
      },
      {
        title: "Partition, 1947",
        body: "The Radcliffe Line divides Bengal. Millions cross. Refugee colonies form on the southern and eastern edges and permanently reshape the city's geography, politics and cinema.",
      },
    ],
    scene: "howrah",
    photo: "calcutta-1940s",
    soundtrack: "Air-raid sirens, and a shortwave radio",
    population: "About 2.1 million, before Partition",
    getAround: "Tram, bus, and a great deal of walking",
    mood: "wartime",
  },
  {
    id: "1960",
    year: 1960,
    label: "1960s",
    headline: "Coffee House, cinema, and the argument",
    standfirst:
      "The decade Bengali culture exported itself. Ray at Cannes, Ghatak on Partition, Mrinal Sen breaking the fourth wall, and every one of them arguing about it on the first floor of College Street.",
    sees: [
      {
        title: "Satyajit Ray",
        body: "The Apu Trilogy is finished. Charulata comes in 1964, the film he said he would change least. He is writing his own screenplays, drawing his own posters and, from 1961, composing his own scores.",
      },
      {
        title: "Ritwik Ghatak",
        body: "Meghe Dhaka Tara in 1960, Komal Gandhar in 1961, Subarnarekha shot in 1962. All about Partition, all commercial failures, all now considered essential.",
      },
      {
        title: "Indian Coffee House",
        body: "High ceilings, slow fans, and a room that sounds like a single argument. Ray, Ghatak, Mrinal Sen, Amartya Sen, and the Krittibas poets, at tables held for decades.",
      },
      {
        title: "Naxalbari, 1967",
        body: "A peasant uprising in north Bengal gives its name to a movement that within three years has the city's universities, its student politics and its police in open conflict.",
      },
    ],
    scene: "collegestreet",
    photo: "coffee-house",
    soundtrack: "A Ravi Shankar score, and an argument two tables away",
    population: "About 3 million in the city, 7 million in the region",
    getAround: "Tram, and thirty-seven routes of it",
    mood: "newwave",
  },
  {
    id: "1980",
    year: 1980,
    label: "1980s",
    headline: "Para culture, football, and the first metro",
    standfirst:
      "The Left Front is three years in and will govern for another three decades. The city gets India's first underground railway, and its football rivalry becomes the loudest in Asia.",
    sees: [
      {
        title: "The derby",
        body: "Mohun Bagan against East Bengal, at a Salt Lake Stadium that holds over a hundred thousand. The fish market sells prawn and hilsa as proxies, and the prices move with the result.",
      },
      {
        title: "Para culture",
        body: "The para, your few streets, is the unit of social life: the club, the Puja committee, the carrom board, the rowak outside the house where the evening happens whether or not anyone planned it.",
      },
      {
        title: "India's first metro, 1984",
        body: "Esplanade to Bhowanipore, 3.4 kilometres, opened on 24 October after seventeen years of construction. The first underground railway in the country.",
      },
      {
        title: "The single screens",
        body: "Metro, Globe, Elite, Lighthouse, New Empire, Priya. Bengali cinema and Hollywood on the same street, at the same price, with an interval bell.",
      },
    ],
    scene: "tram",
    photo: "kolkata-metro",
    soundtrack: "A transistor commentary, and the para club's loudspeaker",
    population: "About 9 million in the metropolitan area",
    getAround: "Tram, bus, and from October 1984 the metro",
    mood: "para",
  },
  {
    id: "1990",
    year: 1990,
    label: "1990s",
    headline: "Liberalisation, and the second bridge",
    standfirst:
      "The economy opens. Vidyasagar Setu finally spans the Hooghly, Salt Lake fills up, and the city renames itself at the end of the decade.",
    sees: [
      {
        title: "Vidyasagar Setu, 1992",
        body: "The second Hooghly bridge, cable-stayed, 823 metres, and twenty-two years in the building. Howrah Bridge stops being the only way across by road.",
      },
      {
        title: "Cable television",
        body: "Arrives in 1992 and changes everything about how the city spends its evening. The single screens start closing within a decade.",
      },
      {
        title: "The tanneries move",
        body: "The courts order Tangra's tanneries out on pollution grounds. What is left of the Chinatown becomes restaurants, and the community keeps emigrating.",
      },
      {
        title: "Theme pandals",
        body: "Durga Puja shifts from decorated marquee to commissioned installation. Named artists, sponsorship, awards, and an annual public art programme nobody planned.",
      },
    ],
    scene: "streetfood",
    photo: "vidyasagar-setu",
    soundtrack: "A cable channel through an open window",
    population: "About 11 million in the metropolitan area",
    getAround: "Metro north to south, and the last of the trams",
    mood: "liberal",
  },
  {
    id: "today",
    year: 2026,
    label: "Today",
    headline: "New Town, the metro, and what is left of the trams",
    standfirst:
      "A city of fifteen million with an expanding underground, a planned eastern extension, a UNESCO-listed festival, and a tram network that has effectively stopped.",
    sees: [
      {
        title: "The metro, expanding",
        body: "Six lines open or under construction, including the East–West line that runs under the Hooghly, the first underwater rail tunnel in India.",
      },
      {
        title: "New Town",
        body: "Wide roads, an IT sector, planned housing and an eco-park east of Salt Lake. Orderly, green, and to anyone from the old city it feels like a different country.",
      },
      {
        title: "Durga Puja, UNESCO listed",
        body: "Inscribed in December 2021 on the Representative List of the Intangible Cultural Heritage of Humanity, the first festival in India to be listed.",
      },
      {
        title: "The trams stop",
        body: "In 2024 the state announces it will keep a single heritage route of what was once thirty-seven. The case is in the High Court and the tracks have not moved.",
      },
      {
        title: "Contemporary art",
        body: "Experimenter, Emami Art, the Kolkata Centre for Creativity, and a pandal season that is arguably the largest public art commission programme on earth.",
      },
    ],
    scene: "pujo",
    photo: "new-town",
    soundtrack: "A metro announcement in three languages",
    population: "About 15 million in the metropolitan area",
    getAround: "Metro, app cab, and the yellow taxis that are nearly gone",
    mood: "now",
  },
];

export function getEra(id: EraId | string | null | undefined) {
  return eraStops.find((e) => e.id === id);
}

export const DEFAULT_ERA: EraId = "today";
