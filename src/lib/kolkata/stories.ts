import type { Story } from "./types";
import { peopleStories } from "./stories-people";

const essays: Story[] = [
  {
    slug: "the-last-tram",
    title: "The last tram to Tollygunge",
    standfirst:
      "Asia's oldest electric tram network ran for 150 years. In 2024 the state announced it would keep one route. This is what the other thirty-six carried.",
    author: "Editorial",
    published: "2026-02-11",
    readingMinutes: 8,
    tags: ["transport", "loss", "north kolkata"],
    scene: "tram",
    photo: "tram-grass-track",
    body: [
      {
        kind: "para",
        text: "The first one was pulled by horses. On 24 February 1873 a metre-gauge track opened between Sealdah and Armenian Ghat, three and a half kilometres, and it failed within nine months. A second attempt in 1880 stuck. By 1902 the wires were up and Calcutta had the first electric tramway in Asia.",
      },
      {
        kind: "para",
        text: "At its largest the network ran to more than sixty kilometres of track and thirty-seven routes, and it was not nostalgia, it was infrastructure. It moved mill workers to Kidderpore and clerks to Dalhousie and students to College Street, at a fare that stayed under a rupee well into a period when nothing else did.",
      },
      {
        kind: "quote",
        text: "It is the only vehicle in this city that has never been in a hurry.",
      },
      {
        kind: "heading",
        text: "What a tram is actually for",
      },
      {
        kind: "para",
        text: "A tram is slow. This is the complaint and it is also the case for it. A tram at fifteen kilometres an hour on a dedicated median does not stop for the traffic beside it, does not emit at the point of use, and carries two hundred people using less road space per passenger than any bus. In a city with among the lowest road-area ratios of any Indian metropolis, roughly six per cent against Delhi's twenty-plus, that arithmetic should have been decisive.",
      },
      {
        kind: "para",
        text: "It was not decisive. Routes were suspended for road works and never restored. Tracks were tarred over during flyover construction. The rolling stock aged, the depots emptied, and by 2023 two routes were running out of what had been thirty-seven.",
      },
      {
        kind: "para",
        text: "In 2024 the state government said the plan was to retain a single heritage route, Esplanade to Maidan, as a joyride. Campaigners went to the High Court. The case has moved slowly and the tracks have not moved at all.",
      },
      {
        kind: "heading",
        text: "The Tollygunge line",
      },
      {
        kind: "para",
        text: "Route 24 ran from Ballygunge to Tollygunge through Rashbehari, down a median of grass and rail that had been there since before Partition. In the afternoon it carried schoolchildren, and the conductor knew which stop each of them wanted and would call it without being asked.",
      },
      {
        kind: "para",
        text: "There was a particular quality to the light in a tram in October, coming through the wooden slats of the window on the western side at about four o'clock, with a fan turning too slowly overhead. Nobody built that. It was a side effect of a vehicle designed in 1926 that nobody had got around to replacing.",
      },
      {
        kind: "para",
        text: "The Calcutta Tram Users' Association still meets. The Tram World museum car sits at Esplanade depot with two coaches and a small display. On a good day, if you ask, someone will start one up so you can hear the compressor.",
      },
      {
        kind: "para",
        text: "Melbourne kept its trams. So did Lisbon, Prague, Amsterdam, San Francisco. All of them were told at some point in the twentieth century that trams were obsolete, and all of them worked out that a tram is not a nineteenth-century object but a twenty-first-century one that happens to have arrived early.",
      },
    ],
  },
  {
    slug: "nine-days-in-kumartuli",
    title: "Nine days in Kumartuli",
    standfirst:
      "Every autumn a few narrow lanes in north Kolkata build several thousand goddesses out of river mud and straw. Then they put them in the river.",
    author: "Editorial",
    published: "2025-09-28",
    readingMinutes: 10,
    tags: ["durga puja", "craft", "kumartuli"],
    scene: "kumartuli",
    photo: "kumartuli-lane",
    body: [
      {
        kind: "para",
        text: "The armature goes up first. Bamboo for the frame, then rice straw bound with jute rope into the rough mass of a body, and this is done fast and roughly by people who are not the ones you will read about. It looks like nothing. It looks like a scarecrow with too many arms.",
      },
      {
        kind: "para",
        text: "Then the clay. Two grades: entel mati, a heavy clay from the riverbed, packed on first, and then bele mati, a finer sandy clay mixed with rice husk, laid over it for the surface. Between the two coats the figure is left to dry, and in a wet September that is the thing that goes wrong.",
      },
      {
        kind: "heading",
        text: "The earth from Sonagachi",
      },
      {
        kind: "para",
        text: "Tradition holds that the clay must include punya mati, a handful of earth taken from outside a brothel in Sonagachi. The usual explanation is that a man leaves his virtue at that threshold, so the soil there holds it and the goddess should be made partly of it.",
      },
      {
        kind: "para",
        text: "Sex workers' collectives in the neighbourhood have pointed out, at some length, that a city willing to build its goddess from their doorstep is less willing to let their children into its schools. The custom continues. So does the argument, which is the more interesting of the two.",
      },
      {
        kind: "heading",
        text: "Chokkhu daan",
      },
      {
        kind: "para",
        text: "The eyes are painted last, on Mahalaya, the day the fortnight of the ancestors ends and the goddess is invoked. The artisan fasts. Three strokes for each eye and a third eye on the forehead, done in one sitting, and the sequence matters: the pupils go in last.",
      },
      {
        kind: "para",
        text: "Before this the figure is a figure. After it, it is the goddess, and it is treated differently by everyone in the room. This is not a metaphor about art. It is a procedural fact of the workshop, and you can see the change in how people move around it.",
      },
      {
        kind: "heading",
        text: "The economics nobody puts on the poster",
      },
      {
        kind: "para",
        text: "A mid-sized idol takes four to six weeks and sells for somewhere between forty thousand and two lakh rupees. Large commissions for major pandals go far higher. Almost all of that arrives in a two-month window, and the workshops carry the other ten months on credit.",
      },
      {
        kind: "para",
        text: "The lanes flood. Clay prices rise every year as riverbank extraction is restricted. Younger family members leave for salaried work, and the number of workshops has been broadly flat for two decades while the number of pujas has grown, which means the surviving studios take on more than they can comfortably finish.",
      },
      {
        kind: "para",
        text: "Then, in December, boats take them out into the Hooghly and the clay goes back into the river it came from, and in January someone starts binding straw again.",
      },
      {
        kind: "quote",
        text: "We do not make her. We finish her, and she leaves.",
      },
    ],
  },
  {
    slug: "the-coffee-house-table",
    title: "The table at the Coffee House that argued for fifty years",
    standfirst:
      "Adda is not conversation. It is a Bengali institution with rules, and College Street is where it was formalised.",
    author: "Editorial",
    published: "2025-11-04",
    readingMinutes: 7,
    tags: ["adda", "college street", "culture"],
    scene: "collegestreet",
    photo: "coffee-house",
    body: [
      {
        kind: "para",
        text: "The building opened as the Albert Hall in 1876 and became a coffee house in 1942. The ceiling is very high, the fans are slow and inadequate, the acoustics are appalling, and this is a large part of why it works: nobody can hear the next table, so everyone talks louder, so the room sounds like a single argument.",
      },
      {
        kind: "para",
        text: "Adda has rules, and the first is that it must be unproductive. A meeting is not an adda. A discussion with an agenda is not an adda. It must go on longer than it needs to, it must digress, and nobody should leave having decided anything.",
      },
      {
        kind: "para",
        text: "The second rule is that the table is more permanent than the people. Groups held the same table for decades. Membership changed by attrition. You did not join, you were absorbed, usually by being brought once by someone else and then simply continuing to turn up.",
      },
      {
        kind: "heading",
        text: "Who sat here",
      },
      {
        kind: "para",
        text: "Satyajit Ray, before Pather Panchali, when he was still designing book jackets. Mrinal Sen, at greater length and more argumentatively. Ritwik Ghatak. Amartya Sen as a Presidency undergraduate. The Krittibas poets in the fifties. The entire Naxalbari student leadership in the late sixties, until it became unwise to be seen doing so.",
      },
      {
        kind: "para",
        text: "Manna Dey's song about the Coffee House, recorded in 1983, is about the fact that the table is still there and the people are not. It is played at the volume of a national anthem at Bengali gatherings anywhere in the world, and it is a song about seven friends of whom one is dead, one is in Delhi, one has married badly, and one has become successful, which is worse.",
      },
      {
        kind: "heading",
        text: "The order",
      },
      {
        kind: "para",
        text: "Infusion, which is black coffee, or cold coffee, which arrives with a scoop of something. A mutton afghani cutlet. Perhaps a plate of chicken pakora. The food is not the point and everyone involved knows it is not the point.",
      },
      {
        kind: "para",
        text: "The waiters wear white with a fan-shaped turban and a broad cummerbund. The uniform is a leftover of the Indian Coffee Board's original service and was retained when the workers took the chain over as a cooperative in 1958. The staff have owned the place since.",
      },
      {
        kind: "para",
        text: "It is louder now, and younger, and a substantial fraction of the room is on a phone. The complaint that the adda is not what it was has been made continuously since approximately 1961, which suggests it is a feature of the institution rather than evidence about it.",
      },
    ],
  },
  {
    slug: "what-the-hooghly-carries",
    title: "What the Hooghly carries",
    standfirst:
      "The river made the city, has been trying to leave it for two hundred years, and is dredged daily to prevent it.",
    author: "Editorial",
    published: "2026-01-19",
    readingMinutes: 9,
    tags: ["river", "geography", "port"],
    scene: "river",
    photo: "hooghly-ferry",
    body: [
      {
        kind: "para",
        text: "The Ganga splits in Bengal. The main flow goes east into Bangladesh as the Padma; a western distributary comes down past Murshidabad and Nabadwip and becomes the Hooghly, and it is on that western channel, at a bend deep enough to float a ship and far enough upriver to be defensible, that Job Charnock's factory was established in 1690.",
      },
      {
        kind: "para",
        text: "The problem started almost immediately. The Hooghly is a silting river. Its share of the Ganga's flow was declining, and as flow declines a river drops its load, and the channel shallows. By the nineteenth century the approach from the sea, particularly the James and Mary shoal, had killed more ships than any comparable stretch of water in India.",
      },
      {
        kind: "heading",
        text: "The barrage at Farakka",
      },
      {
        kind: "para",
        text: "The engineering answer, argued over for a century and finally built in 1975, was a barrage at Farakka, 280 kilometres upstream, which diverts water from the main Ganga into a feeder canal and down the Hooghly to flush the channel.",
      },
      {
        kind: "para",
        text: "It has partly worked and has cost a great deal. Bangladesh has objected for fifty years on the grounds that the water taken is water that does not reach it in the dry season, and the 1996 treaty that governs the sharing expires and is renegotiated under pressure. Silt accumulates behind the barrage. Erosion downstream of it has taken villages.",
      },
      {
        kind: "para",
        text: "Kolkata Port meanwhile moved most of its heavy traffic downriver to Haldia. The docks at Kidderpore still work, but the large ships do not come up.",
      },
      {
        kind: "heading",
        text: "What is in it",
      },
      {
        kind: "para",
        text: "Sewage from a metropolitan area of fifteen million, of which a substantial share is untreated. Effluent from tanneries, though the Tangra ones were moved. Immersed idols, several thousand a year, and the paint on them was until recently full of lead and chromium; the state now requires water-based colours and the collection of frames after immersion, with uneven compliance.",
      },
      {
        kind: "para",
        text: "Also: Gangetic dolphins, in small and declining numbers. Hilsa, running upriver to spawn between June and September, which is the fish the entire Bengali culinary year is organised around, and the catch has fallen sharply.",
      },
      {
        kind: "para",
        text: "And the ferries. Twenty-odd crossings a day between Howrah and the Kolkata bank, five rupees, ten minutes, and the only way to see the bridge properly. On the water at six in the morning in December the whole thing is grey and the far bank is not visible and it is the best commute in India.",
      },
    ],
  },
  {
    slug: "a-city-that-reads-at-midnight",
    title: "A city that reads at midnight",
    standfirst:
      "The Kolkata Book Fair is the largest non-trade book fair in the world by footfall. It is held on a field, and it is not really about books.",
    author: "Editorial",
    published: "2026-02-02",
    readingMinutes: 6,
    tags: ["books", "boi mela", "culture"],
    scene: "collegestreet",
    photo: "book-fair",
    body: [
      {
        kind: "para",
        text: "Boi Mela runs for twelve days from late January. It is not a rights fair and there is almost no trade business done at it. It is a retail fair for the general public, and the footfall runs to over two million people, which makes it the largest of its kind anywhere.",
      },
      {
        kind: "para",
        text: "It began in 1976 on the Maidan, moved when the courts ruled the Maidan could not host it, and now sits on the Central Park ground in Salt Lake. Roughly a thousand stalls, a guest country each year, and a gate arch built as a replica of some famous building, which changes annually and is photographed by everybody.",
      },
      {
        kind: "heading",
        text: "What it is instead",
      },
      {
        kind: "para",
        text: "It is the year's largest social event that is not a religious festival. People go in groups, walk for four hours, buy three paperbacks and eat a great deal of fish fry from the Bengal stall. Little Magazine Pavilion, where a few hundred tiny literary magazines sell hand-stapled issues, is where the actual literary culture is, and it is at the back.",
      },
      {
        kind: "para",
        text: "The books are cheap and mostly Bengali. Publishing in the language is unusually decentralised: hundreds of small houses, thin margins, print runs of a few hundred, and a readership that will still buy poetry at scale, which almost no other market anywhere does.",
      },
      {
        kind: "para",
        text: "College Street is the trade the rest of the year. Boi Mela is the twelve days when the trade comes out onto a field and the whole city walks past it.",
      },
      {
        kind: "quote",
        text: "You do not go to buy a book. You go to be seen having bought one.",
      },
      {
        kind: "para",
        text: "That is a joke made in Kolkata about Kolkata, and it is affectionate, and it is also somewhat true, and the two million people go anyway.",
      },
    ],
  },
  {
    slug: "sodium-light",
    title: "Sodium light",
    standfirst:
      "A short defence of the ugliest thing about the city at night, now being replaced.",
    author: "Editorial",
    published: "2025-12-08",
    readingMinutes: 4,
    tags: ["night", "essay", "streets"],
    scene: "tram",
    photo: "park-street-night",
    body: [
      {
        kind: "para",
        text: "The low-pressure sodium lamp emits at 589 nanometres and almost nowhere else. It is monochromatic. Under it, colour does not exist: a red car and a green car are the same car, and skin, brick, water and rust are all the same shade of amber.",
      },
      {
        kind: "para",
        text: "It was installed everywhere because it is absurdly efficient at converting electricity into visible photons, and because the eye is nearly at peak sensitivity at that wavelength. It was never installed because anyone thought it looked good.",
      },
      {
        kind: "para",
        text: "But it does something. A street under sodium is flattened into one tone, and everything in it, the wet road, a dog, a parked Ambassador, a boy carrying a tray of tea, becomes part of a single continuous surface. It is the closest a real place gets to being lit like a film set.",
      },
      {
        kind: "para",
        text: "Every photograph of Kolkata at night taken between about 1975 and about 2015 is amber for this reason, and an entire visual idea of the city was formed by a lighting decision made on cost grounds.",
      },
      {
        kind: "para",
        text: "LEDs are replacing them, for good reasons: less power, longer life, better colour rendering, and you can actually identify a face. The streets are becoming blue-white and legible.",
      },
      {
        kind: "para",
        text: "This is an improvement and it is a loss, and both of those are allowed to be true. Go and stand on a lane in north Kolkata that has not been converted yet. There are fewer every year.",
      },
    ],
  },
];

export const stories: Story[] = [...peopleStories, ...essays].sort(
  (a, b) => b.published.localeCompare(a.published),
);

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
