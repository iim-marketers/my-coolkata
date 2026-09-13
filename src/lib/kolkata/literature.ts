import type { Coords } from "./types";

/**
 * Excerpts are kept short and are drawn from works in the public domain in
 * India, which applies sixty years after the author's death. Where an
 * author is still in copyright, only a title and a description appear.
 */
export interface LitEntry {
  slug: string;
  work: string;
  bengali?: string;
  author: string;
  authorHref?: string;
  year: string;
  era: string;
  /** Short excerpt, public domain, or null where still in copyright. */
  excerpt?: { bn?: string; en: string };
  context: string;
  place: { name: string; coords: Coords; note: string; href?: string };
  publicDomain: boolean;
}

export const literature: LitEntry[] = [
  {
    slug: "gitanjali",
    work: "Gitanjali",
    bengali: "গীতাঞ্জলি",
    author: "Rabindranath Tagore",
    year: "1910",
    era: "Bengal Renaissance",
    excerpt: {
      bn: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির",
      en: "Where the mind is without fear and the head is held high.",
    },
    context:
      "Tagore translated the collection into English himself, in a plainer register than the Bengali, and it won the Nobel in 1913. The English versions made him internationally famous and are not the work a Bengali reader means.",
    place: {
      name: "Jorasanko Thakurbari",
      coords: { lat: 22.5852, lng: 88.3617 },
      note: "Written in the house he was born and died in.",
      href: "/heritage/jorasanko-thakurbari",
    },
    publicDomain: true,
  },
  {
    slug: "anandamath",
    work: "Anandamath",
    bengali: "আনন্দমঠ",
    author: "Bankim Chandra Chattopadhyay",
    year: "1882",
    era: "Bengal Renaissance",
    excerpt: {
      bn: "বন্দে মাতরম্",
      en: "Vande Mataram. I bow to thee, Mother.",
    },
    context:
      "A novel about the sannyasi rebellion during the Bengal famine of 1770, containing the song that the Swadeshi movement adopted after 1905 and that became India's national song in 1950. The novel's politics are considerably more complicated than the song's later use.",
    place: {
      name: "Bankim Chatterjee Street",
      coords: { lat: 22.5757, lng: 88.3639 },
      note: "Named for him, and the Coffee House is on it.",
      href: "/college-street",
    },
    publicDomain: true,
  },
  {
    slug: "meghnad-badh-kavya",
    work: "Meghnad Badh Kavya",
    bengali: "মেঘনাদবধ কাব্য",
    author: "Michael Madhusudan Dutt",
    year: "1861",
    era: "Bengal Renaissance",
    excerpt: {
      en: "Stop a while, traveller, if Mother Bengal claims thee for her son.",
    },
    context:
      "Bengali blank verse did not exist until this poem. Dutt retold the Ramayana with Ravana's son as the tragic hero, which was a deliberate provocation and is still argued about. The line quoted is from his own epitaph.",
    place: {
      name: "Lower Circular Road Cemetery",
      coords: { lat: 22.5459, lng: 88.3653 },
      note: "His grave, under words he chose himself.",
      href: "/hidden",
    },
    publicDomain: true,
  },
  {
    slug: "devdas",
    work: "Devdas",
    bengali: "দেবদাস",
    author: "Sarat Chandra Chattopadhyay",
    year: "1917",
    era: "Early twentieth century",
    excerpt: {
      en: "If you ever suffer, if a doctor cannot be found, do not forget me.",
    },
    context:
      "Written in 1900 when he was twenty-four and shelved for seventeen years. Filmed at least twenty times in a dozen languages, which makes it probably the most adapted Indian novel there is.",
    place: {
      name: "College Street publishers",
      coords: { lat: 22.5747, lng: 88.365 },
      note: "Where almost everything of his was printed.",
      href: "/college-street",
    },
    publicDomain: true,
  },
  {
    slug: "banalata-sen",
    work: "Banalata Sen",
    bengali: "বনলতা সেন",
    author: "Jibanananda Das",
    year: "1942",
    era: "Bengali modernism",
    excerpt: {
      bn: "হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে",
      en: "For a thousand years I have walked the paths of this earth.",
    },
    context:
      "Sixteen lines, and probably the most quoted poem in modern Bengali. He published almost nothing in his lifetime and left thousands of poems in notebooks nobody opened until after he died.",
    place: {
      name: "Deshapriya Park",
      coords: { lat: 22.5185, lng: 88.3524 },
      note: "Where the tram hit him in October 1954.",
      href: "/neighbourhoods/ballygunge",
    },
    publicDomain: true,
  },
  {
    slug: "sultanas-dream",
    work: "Sultana's Dream",
    author: "Begum Rokeya",
    year: "1905",
    era: "Reform",
    excerpt: {
      en: "We have no hand or voice in the management of our social affairs. In India man is lord and master.",
    },
    context:
      "A feminist science-fiction utopia written in English, in which men are kept in seclusion because they cannot be trusted with public life, and solar power has abolished drudgery. It predates most of the Western feminist utopian canon.",
    place: {
      name: "Sakhawat Memorial Girls' School",
      coords: { lat: 22.5405, lng: 88.3663 },
      note: "The school she moved to Calcutta in 1911 and ran for twenty years.",
    },
    publicDomain: true,
  },
  {
    slug: "rupasi-bangla",
    work: "Rupasi Bangla",
    bengali: "রূপসী বাংলা",
    author: "Jibanananda Das",
    year: "Written 1934, published 1957",
    era: "Bengali modernism",
    excerpt: {
      bn: "বাংলার মুখ আমি দেখিয়াছি",
      en: "I have seen the face of Bengal, and so I seek no beauty of the earth any more.",
    },
    context:
      "Written in 1934 and found in a notebook after his death. It is the book that made him, twenty-three years after he wrote it and three years after he was killed by a tram.",
    place: {
      name: "College Street",
      coords: { lat: 22.5747, lng: 88.365 },
      note: "Championed here by Buddhadeb Bose, and bought by almost nobody.",
      href: "/college-street",
    },
    publicDomain: true,
  },
  {
    slug: "pather-dabi",
    work: "Pather Dabi",
    bengali: "পথের দাবী",
    author: "Sarat Chandra Chattopadhyay",
    year: "1926",
    era: "Nationalist period",
    context:
      "A novel about a revolutionary organisation, banned by the government of Bengal in 1927. Tagore had reservations about the book and argued publicly against the ban anyway.",
    place: {
      name: "College Street",
      coords: { lat: 22.5747, lng: 88.365 },
      note: "Where banned books were bought regardless.",
      href: "/college-street",
    },
    publicDomain: true,
  },
  {
    slug: "bidrohi",
    work: "Bidrohi",
    bengali: "বিদ্রোহী",
    author: "Kazi Nazrul Islam",
    year: "1922",
    era: "Nationalist period",
    context:
      "The Rebel. Published in the weekly Bijli, and it made Nazrul a national figure at twenty-three. He was jailed the following year for sedition and went on hunger strike; Tagore dedicated a play to him. Still in copyright, so the text is not reproduced here.",
    place: {
      name: "Nazrul Mancha, south Kolkata",
      coords: { lat: 22.5063, lng: 88.3641 },
      note: "The concert hall named for him.",
    },
    publicDomain: false,
  },
  {
    slug: "hajar-churashir-maa",
    work: "Hajar Churashir Maa",
    bengali: "হাজার চুরাশির মা",
    author: "Mahasweta Devi",
    year: "1974",
    era: "The Naxalite years",
    context:
      "Mother of 1084. A Kolkata mother learns her son has been killed as a Naxalite and spends a day discovering who he was. Mahasweta Devi is still in copyright, so this is a description rather than an excerpt.",
    place: {
      name: "Ballygunge",
      coords: { lat: 22.5286, lng: 88.3646 },
      note: "The comfortable south the novel takes apart.",
      href: "/neighbourhoods/ballygunge",
    },
    publicDomain: false,
  },
  {
    slug: "sei-samay",
    work: "Sei Samay",
    bengali: "সেই সময়",
    author: "Sunil Gangopadhyay",
    year: "1981–82",
    era: "Modern",
    context:
      "Those Days. A novel of nineteenth-century Calcutta with Vidyasagar, Madhusudan Dutt and the Young Bengal set moving through it. In copyright; described rather than quoted.",
    place: {
      name: "Coffee House, College Street",
      coords: { lat: 22.5757, lng: 88.3639 },
      note: "Where Sunil and the Krittibas poets held a table for years.",
      href: "/adda",
    },
    publicDomain: false,
  },
];

export const litEras = [
  "Bengal Renaissance",
  "Reform",
  "Early twentieth century",
  "Nationalist period",
  "Bengali modernism",
  "The Naxalite years",
  "Modern",
];
