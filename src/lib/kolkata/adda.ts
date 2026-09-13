export interface AddaTopic {
  id: string;
  icon: string;
  label: string;
  bengali?: string;
  opener: string;
  /** The positions people actually take, and the counter-argument. */
  positions: { claim: string; counter: string }[];
  /** Where the argument gets had. */
  venues: string[];
  /** Something you can actually go and see. */
  seeAlso?: { label: string; href: string };
}

export const addaTopics: AddaTopic[] = [
  {
    id: "football",
    icon: "⚽",
    label: "Football",
    bengali: "ফুটবল",
    opener:
      "You will be asked which club within about four minutes, and there is no neutral answer.",
    positions: [
      {
        claim: "1911 is the only result that has ever mattered.",
        counter:
          "Mohun Bagan beat East Yorkshire Regiment 2–1 barefoot in the IFA Shield final, and every Bagan supporter will bring it up. East Bengal supporters point out it was 1911 and ask what has happened since.",
      },
      {
        claim: "The derby carries Partition inside it.",
        counter:
          "East Bengal was founded by and for people from the eastern districts and became, after 1947, the refugee club. The fish markets sell prawn and hilsa as proxies on match day and the price moves with the result. Some say this is beautiful; others that it is a wound nobody will let heal.",
      },
      {
        claim: "Indian football died and Kolkata killed it.",
        counter:
          "The counter is that Kolkata kept it alive when the rest of the country went to cricket, filled a hundred-thousand-seat stadium for a league match, and got nothing back for it.",
      },
    ],
    venues: ["The Maidan club tents", "Any tea shop on a derby morning", "Salt Lake Stadium, two hours before kick-off"],
    seeAlso: { label: "Football, on Famous For", href: "/famous-for#football" },
  },
  {
    id: "cinema",
    icon: "🎬",
    label: "Cinema",
    bengali: "সিনেমা",
    opener:
      "Ray, Ghatak or Mrinal Sen. Choose, and then defend it for two hours.",
    positions: [
      {
        claim: "Ray is the only one who actually looked at people.",
        counter:
          "The Ghatak position is that Ray looked at people the way an anthropologist looks at people, and that Meghe Dhaka Tara has more truth about Partition in one cry on a hillside than the whole Apu trilogy has about anything.",
      },
      {
        claim: "Ghatak was a genius who drank it away.",
        counter:
          "Eight features in twenty-four years, mostly commercial failures, and his reputation has risen every decade since he died. His students at Pune carried Indian art cinema for thirty years.",
      },
      {
        claim: "Uttam-Suchitra is what people actually watched.",
        counter:
          "Thirty films, and the shared memory of a generation. The arthouse argument is a middle-class argument; Saptapadi filled halls the trilogy never did.",
      },
      {
        claim: "Tollywood has been in decline since 1980.",
        counter:
          "Rituparno Ghosh, Aparna Sen, Kaushik Ganguly and Srijit Mukherji would like a word, and the last two decades of Bengali arthouse have been better than the two before them.",
      },
    ],
    venues: ["Nandan's forecourt during the festival", "Priya Cinema's lobby", "Any Coffee House table after a screening"],
    seeAlso: { label: "Cinema, on Famous For", href: "/famous-for#cinema" },
  },
  {
    id: "books",
    icon: "📚",
    label: "Books",
    bengali: "বই",
    opener:
      "Somebody will claim Bengali literature peaked in 1930 and somebody else will have read something last week that disproves it.",
    positions: [
      {
        claim: "Tagore is admired and Sarat Chandra is read.",
        counter:
          "Largely true, and the Tagore side argues that reach is not the measure. The Sarat side points out that he put widows, prostitutes and village debt at the centre of the novel while everyone else was writing about themselves.",
      },
      {
        claim: "Jibanananda is the greatest Bengali poet after Tagore.",
        counter:
          "He published almost nothing in his lifetime, was called obscure by Tagore himself, and left thousands of poems in notebooks nobody opened until he was dead. The question is whether that is tragedy or evidence.",
      },
      {
        claim: "The little magazines are where the real writing is.",
        counter:
          "A few hundred of them, hand-stapled, sold at the back of the Book Fair, and it is genuinely where most Bengali poetry first appears. The counter is that most of it is unreadable and always has been.",
      },
    ],
    venues: ["The College Street stalls", "The Little Magazine Pavilion at Boi Mela", "The Coffee House, first floor"],
    seeAlso: { label: "College Street", href: "/college-street" },
  },
  {
    id: "love",
    icon: "❤️",
    label: "Love",
    bengali: "প্রেম",
    opener:
      "Usually somebody else's, discussed with great seriousness and no discretion whatsoever.",
    positions: [
      {
        claim: "Saraswati Puja is the city's real Valentine's Day.",
        counter:
          "Yellow saris, school compounds, and the one day a year that adolescents in a fairly conservative city are allowed out together without explanation. Nobody disputes this one; they just tell you their own story about it.",
      },
      {
        claim: "Every Bengali romance is a Rabindrasangeet.",
        counter:
          "There is a song for the first rain, for a departure, for the thing you could not say. The counter is that this is exactly the problem: an emotional vocabulary handed down whole, which nobody has had to invent for themselves in a century.",
      },
      {
        claim: "Devdas ruined three generations.",
        counter:
          "Written at twenty-four, shelved for seventeen years, filmed more than twenty times, and it taught Bengali men that failing romantically is a form of sensitivity. The defence is that Sarat Chandra was diagnosing it, not prescribing it.",
      },
    ],
    venues: ["Rabindra Sarobar at dusk", "Prinsep Ghat, under the columns", "The Victoria Memorial lawns, under an umbrella"],
    seeAlso: { label: "Rabindra Sangeet", href: "/culture#rabindrasangeet" },
  },
  {
    id: "politics",
    icon: "🏛️",
    label: "Politics",
    bengali: "রাজনীতি",
    opener:
      "Thirty-four years of one government, then a change, and everyone at the table lived through both.",
    positions: [
      {
        claim: "Operation Barga was the most important land reform in India.",
        counter:
          "Registering sharecroppers' tenancy rights transformed rural Bengal's productivity and politics. The counter is that the same government presided over three decades of industrial flight, and that the two facts belong in the same sentence.",
      },
      {
        claim: "Singur and Nandigram ended it.",
        counter:
          "Land acquisition for industry on farmland, and the resistance to it, brought down a thirty-four-year government. Whether that was a victory for farmers or a catastrophe for employment is the argument, and it is unresolved.",
      },
      {
        claim: "The Naxalite years broke a generation.",
        counter:
          "Universities in open conflict with the police between 1967 and the mid-seventies, and a cohort of the brightest students dead, jailed or exiled. Some at the table will have been in it, which changes the register of the conversation entirely.",
      },
    ],
    venues: ["Any tea shop", "The Jadavpur 8B bus stand", "A rowak in the north, after dark"],
    seeAlso: { label: "Hidden Kolkata", href: "/hidden" },
  },
  {
    id: "food",
    icon: "🍛",
    label: "Food",
    bengali: "খাওয়া",
    opener:
      "The safest topic, and the one most likely to end in someone leaving the table.",
    positions: [
      {
        claim: "The rosogolla is Bengali and that is settled.",
        counter:
          "Odisha claims an older Puri temple lineage. India's Geographical Indication registry gave Bengal the tag for Banglar Rosogolla in 2017 and Odisha a separate tag for Odisha Rasagola in 2019. Both sides declared victory, which is the correct outcome.",
      },
      {
        claim: "Kusum does the better roll.",
        counter:
          "Hot Kati Roll is next door and has its own constituency, and Nizam's claims the invention. The argument is unwinnable and is conducted with real feeling.",
      },
      {
        claim: "Biryani without the potato is not biryani.",
        counter:
          "Nobody in this city disputes this. Say it in Hyderabad instead and see what happens.",
      },
      {
        claim: "Hilsa is worth the bones.",
        counter:
          "Padma hilsa against Ganga hilsa, June against September, shorshe against bhapa. The catch has fallen sharply and the price has not, which has given the argument an edge it did not have thirty years ago.",
      },
    ],
    venues: ["Every table in the city", "Gariahat fish market, at seven in the morning"],
    seeAlso: { label: "Taste Kolkata", href: "/food" },
  },
];

export function getAddaTopic(id: string) {
  return addaTopics.find((t) => t.id === id);
}

export const addaRules = [
  {
    n: "01",
    rule: "It must be unproductive.",
    note: "If a decision gets made it stops being an adda and becomes a meeting, which is worse.",
  },
  {
    n: "02",
    rule: "The table outlasts the people.",
    note: "Groups held the same Coffee House table for decades. Membership changed by attrition. You were not invited; you were absorbed.",
  },
  {
    n: "03",
    rule: "Digression is the form, not a failure of it.",
    note: "Start on the derby, arrive at Ghatak, end on your uncle's second marriage, and return to the derby having forgotten who was arguing which side.",
  },
  {
    n: "04",
    rule: "Tea is mandatory. Food is optional.",
    note: "Nobody comes for the infusion coffee at the Coffee House and everyone orders it.",
  },
  {
    n: "05",
    rule: "Nobody has to win.",
    note: "Dipesh Chakrabarty wrote a serious academic essay arguing adda was the Bengali middle class's answer to the modern city: a way of keeping sociability while everything else became transactional.",
  },
  {
    n: "06",
    rule: "Complaining that adda is dead is part of adda.",
    note: "The complaint has been made continuously since about 1961, which suggests it is a feature of the institution rather than evidence about it.",
  },
];
