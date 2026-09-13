import type { FoodPlace, FoodPlaceKind } from "./types";

export const foodPlaceKinds: {
  id: FoodPlaceKind;
  label: string;
  dot: string;
  line: string;
}[] = [
  { id: "street", label: "Street food", dot: "#e2513a", line: "Phuchka, rolls, telebhaja, jhalmuri. Cash, standing up, and no menu." },
  { id: "sweets", label: "Sweets", dot: "#e9a83a", line: "Chhena, gur and a counter your grandparents also queued at." },
  { id: "bengali", label: "Bengali restaurants", dot: "#3f7fb8", line: "Sit-down Bengali, mostly a 1990s invention, and mostly very good." },
  { id: "old", label: "Old restaurants", dot: "#4f9e73", line: "Cabins and eating houses that have not changed the menu in eighty years." },
  { id: "chinese", label: "Chinese", dot: "#9a5fb5", line: "Indian Chinese, invented in Tangra, and the Hakka original." },
  { id: "continental", label: "Continental & Park Street", dot: "#e07a2f", line: "The street that taught Kolkata how to dine after dark." },
];

export const foodPlaces: FoodPlace[] = [
  // Street
  { id: "vivekananda-park", name: "Vivekananda Park phuchka", kind: "street", where: "Southern Avenue", coords: { lat: 22.5133, lng: 88.3489 }, order: "Six phuchka, then ask for the fauchka", note: "Evening crowd, high turnover, therefore fresh." },
  { id: "kusum", name: "Kusum Rolls", kind: "street", since: 1975, where: "Park Street", coords: { lat: 22.5528, lng: 88.3527 }, order: "Double egg mutton roll", note: "The consensus best in the city. Queue after six." },
  { id: "kalika", name: "Kalika Mukhorochak", kind: "street", since: 1962, where: "Surya Sen Street, College Street", coords: { lat: 22.5751, lng: 88.3639 }, order: "Beguni and a mochar chop", note: "Students have kept it going for sixty years." },
  { id: "maddox", name: "Maddox Square stalls", kind: "street", where: "Ballygunge", coords: { lat: 22.5259, lng: 88.3585 }, order: "Whatever the queue is for", note: "Four days a year this is the busiest food in south Kolkata." },
  { id: "zakaria", name: "Zakaria Street, at iftar", kind: "street", where: "Below Nakhoda Masjid", coords: { lat: 22.5804, lng: 88.3561 }, order: "Haleem, suta kebab, phirni", note: "One month a year, and the best eating in the city." },
  { id: "mullick-tea", name: "Mullick Ghat tea", kind: "street", where: "Under Howrah Bridge", coords: { lat: 22.5842, lng: 88.3436 }, order: "Cha in a bhaar, before dawn", note: "With two thousand flower traders, from four in the morning." },

  // Sweets
  { id: "kc-das", name: "K.C. Das", kind: "sweets", since: 1930, where: "Esplanade", coords: { lat: 22.5648, lng: 88.3524 }, order: "Rosogolla, warm", note: "Nobin Chandra's descendants, and the family that invented the tin." },
  { id: "balaram", name: "Balaram Mullick & Radharaman Mullick", kind: "sweets", since: 1885, where: "Bhowanipore", coords: { lat: 22.5273, lng: 88.3436 }, order: "Baked mishti doi; nolen gur rosogolla in winter", note: "The winter counter is a different shop from the summer one." },
  { id: "nakur", name: "Girish Ch. Dey & Nakur Ch. Nandy", kind: "sweets", since: 1844, where: "Hatibagan", coords: { lat: 22.5941, lng: 88.3684 }, order: "Jolbhora sandesh", note: "Standing room only. The best sandesh in the city." },
  { id: "nobin-chandra", name: "Nobin Chandra Das", kind: "sweets", since: 1868, where: "Bagbazar", coords: { lat: 22.6003, lng: 88.3681 }, order: "Rosogolla, at the original address", note: "Where it was invented, in 1868." },
  { id: "putiram", name: "Putiram", kind: "sweets", since: 1868, where: "College Street", coords: { lat: 22.5757, lng: 88.3646 }, order: "Kochuri, and a radhaballavi if it is early", note: "Before ten in the morning or there is nothing left." },

  // Bengali
  { id: "6ballygunge", name: "6 Ballygunge Place", kind: "bengali", where: "Ballygunge Place", coords: { lat: 22.5299, lng: 88.3653 }, order: "Daab chingri and kosha mangsho", note: "A converted house, a tablecloth, and a proper Sunday lunch." },
  { id: "bhojohori", name: "Bhojohori Manna", kind: "bengali", since: 2003, where: "Ekdalia Road and branches", coords: { lat: 22.5222, lng: 88.3701 }, order: "Kosha mangsho, bhetki paturi", note: "Consistent, unromantic, good." },
  { id: "kasturi", name: "Kasturi", kind: "bengali", where: "Mirza Ghalib Street", coords: { lat: 22.5588, lng: 88.3527 }, order: "Kochu pata chingri", note: "Bangladeshi Bengali, and hotter than the West Bengal version." },
  { id: "koshe-kosha", name: "Koshe Kosha", kind: "bengali", where: "Multiple", coords: { lat: 22.5158, lng: 88.362 }, order: "The mutton, obviously", note: "Named after the verb. It delivers on it." },

  // Old
  { id: "golbari", name: "Golbari", kind: "old", since: 1920, where: "Shyambazar five-point crossing", coords: { lat: 22.5993, lng: 88.3742 }, order: "Kosha mangsho, to take away", note: "Nearly black. The recipe has never been given out." },
  { id: "mitra-cafe", name: "Mitra Cafe", kind: "old", since: 1920, where: "Sovabazar", coords: { lat: 22.5964, lng: 88.3702 }, order: "Kobiraji cutlet and the brain chop", note: "Cabin food, which is a Kolkata genre of its own." },
  { id: "allen-kitchen", name: "Allen Kitchen", kind: "old", since: 1900, where: "Jatindra Mohan Avenue", coords: { lat: 22.5919, lng: 88.3714 }, order: "Prawn cutlet", note: "One thing, done since 1900, and nothing else matters." },
  { id: "anadi-cabin", name: "Anadi Cabin", kind: "old", since: 1925, where: "Esplanade", coords: { lat: 22.5646, lng: 88.3505 }, order: "Mughlai paratha with mutton", note: "Standing, at a marble counter." },
  { id: "royal-india", name: "Royal India Hotel", kind: "old", since: 1905, where: "Chitpur, near Nakhoda Masjid", coords: { lat: 22.5797, lng: 88.3568 }, order: "Mutton biryani", note: "Since 1905, and it is not a hotel." },
  { id: "aminia", name: "Aminia", kind: "old", since: 1929, where: "New Market and branches", coords: { lat: 22.5626, lng: 88.3524 }, order: "Mutton biryani with the potato", note: "The reliable benchmark." },
  { id: "shiraz", name: "Shiraz Golden Restaurant", kind: "old", since: 1941, where: "Park Circus", coords: { lat: 22.5399, lng: 88.3691 }, order: "Mutton biryani, chicken chaap", note: "Many people's default answer to where the biryani is." },
  { id: "nizams", name: "Nizam's", kind: "old", since: 1932, where: "Hogg Street, New Market", coords: { lat: 22.5624, lng: 88.3513 }, order: "Double egg mutton roll", note: "The claimed birthplace of the kathi roll." },
  { id: "paramount", name: "Paramount Sherbets", kind: "old", since: 1918, where: "Bankim Chatterjee Street", coords: { lat: 22.5757, lng: 88.3639 }, order: "Daab sherbet", note: "A marble counter unchanged since 1918." },
  { id: "balwant", name: "Balwant Singh's Eating House", kind: "old", since: 1937, where: "Bhowanipore", coords: { lat: 22.5279, lng: 88.3423 }, order: "Doodh cola, if you are brave", note: "Open all night, and the reason people are out at three." },

  // Chinese
  { id: "kim-ling", name: "Kim Ling", kind: "chinese", where: "Tangra", coords: { lat: 22.5563, lng: 88.3958 }, order: "Chilli garlic prawn", note: "Tangra Hakka, in a converted tannery." },
  { id: "beijing", name: "Beijing", kind: "chinese", where: "Tangra", coords: { lat: 22.5571, lng: 88.3971 }, order: "Hakka noodles and chilli chicken", note: "One of the older survivors on the strip." },
  { id: "territi", name: "Territi Bazar breakfast", kind: "chinese", where: "Central Kolkata", coords: { lat: 22.5745, lng: 88.3564 }, order: "Pork bun and fish ball soup", note: "Six until half past seven, on the pavement, then gone." },
  { id: "eau-chew", name: "Eau Chew", kind: "chinese", since: 1927, where: "Ganesh Chandra Avenue", coords: { lat: 22.5679, lng: 88.3559 }, order: "Josephine noodles", note: "Family-run since 1927, in a first-floor room." },

  // Continental
  { id: "peter-cat", name: "Peter Cat", kind: "continental", since: 1975, where: "18 Park Street", coords: { lat: 22.5529, lng: 88.3521 }, order: "Chelo kebab", note: "Red turbans, no reservations, and forty minutes on a Saturday." },
  { id: "mocambo", name: "Mocambo", kind: "continental", since: 1956, where: "Park Street", coords: { lat: 22.5531, lng: 88.3516 }, order: "Devilled crab, prawn cocktail", note: "Next door to Peter Cat, and the rivalry is real." },
  { id: "trincas", name: "Trincas", kind: "continental", since: 1959, where: "Park Street", coords: { lat: 22.5526, lng: 88.3532 }, order: "A drink, and whoever is playing", note: "The last of the live circuit." },
  { id: "flurys", name: "Flurys", kind: "continental", since: 1927, where: "Park Street", coords: { lat: 22.5524, lng: 88.3541 }, order: "Breakfast; the rum ball in December", note: "Swiss, since 1927, and the queue is worst at Christmas." },
  { id: "oly-pub", name: "Oly Pub", kind: "continental", since: 1947, where: "Park Street", coords: { lat: 22.5522, lng: 88.3536 }, order: "Beef steak, upstairs", note: "Nothing has changed and nothing will." },
  { id: "nahoums", name: "Nahoum & Sons", kind: "continental", since: 1902, where: "New Market", coords: { lat: 22.5629, lng: 88.3517 }, order: "Plum cake in December", note: "The last Jewish bakery in the city. The queue is real." },
];

export function placesOfKind(kind: FoodPlaceKind) {
  return foodPlaces.filter((p) => p.kind === kind);
}
