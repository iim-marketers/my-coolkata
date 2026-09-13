import type { CultureStrand, QuizQuestion } from "./types";

export const cultureStrands: CultureStrand[] = [
  {
    slug: "adda",
    name: "Adda",
    bengali: "আড্ডা",
    summary:
      "A long, unproductive, argumentative conversation with no agenda and no conclusion. Close to the city's actual religion.",
    body: [
      "Adda is not small talk and it is not a meeting. The defining condition is that it must not accomplish anything. If a decision gets made, it stops being an adda and becomes something worse.",
      "It has a shape. Someone raises a subject, it is disputed, the dispute wanders into three unrelated subjects, and two hours later the group returns to the original point having forgotten who was arguing which side. Tea is involved. So, historically, is a great deal of smoking.",
      "The historian Dipesh Chakrabarty wrote a serious academic essay on it, arguing that adda was the Bengali middle class's answer to the question of what to do with the modern city: a way of holding onto sociability while everything else was becoming transactional.",
      "It has locations. The Coffee House on College Street, the rowak or front stoop of a north Kolkata house, a tea shop, a park bench, and now, contentiously, a WhatsApp group.",
    ],
    seeItAt: [
      "Indian Coffee House, Bankim Chatterjee Street",
      "Any tea shop on College Street after four in the afternoon",
      "The rowaks of Bagbazar, early evening",
      "Nandan's forecourt during the film festival",
    ],
  },
  {
    slug: "rabindrasangeet",
    name: "Rabindrasangeet",
    bengali: "রবীন্দ্রসঙ্গীত",
    summary:
      "Roughly two thousand songs written by one man, and the default emotional vocabulary of Bengali life a century later.",
    body: [
      "Tagore wrote around 2,230 songs and set nearly all of them himself, drawing on Hindustani classical ragas, Baul folk music, Bengali kirtan and, on occasion, Scottish and Irish tunes he had heard as a student in London.",
      "They are organised by subject rather than by form: puja, prem, prakriti, swadesh, bichitra, anushthanik. Worship, love, nature, homeland, the miscellaneous, and the ceremonial. A Bengali household will have a song for the first rain, for a death, for a departure and for a national holiday, and they are all his.",
      "Performance is regulated. Visva-Bharati held the copyright until 2001 and enforced a strict view of how the songs could be sung: no ornamentation beyond what was notated, no instrumental liberties. Since the copyright lapsed there has been a steady and much-argued expansion into jazz, rock and film arrangement.",
      "Learning them is a normal part of a Bengali middle-class childhood, in the way that piano lessons are elsewhere, and the harmonium in the front room is a real and common object.",
    ],
    seeItAt: [
      "Rabindra Sadan, for formal concerts",
      "Jorasanko Thakur Bari on 25 Boishakh, his birthday",
      "Any Bengali wedding, at some point in the evening",
      "Dakshinee and Rabitirtha, the teaching institutions",
    ],
  },
  {
    slug: "durga-puja-art",
    name: "Pandal art",
    bengali: "প্যান্ডেল",
    summary:
      "Several thousand temporary commissioned structures, built and destroyed inside a fortnight. The largest public art programme on earth.",
    body: [
      "A pandal was originally a bamboo-and-cloth marquee to shelter the idol. Since roughly the 1990s it has become something else: a commissioned installation by a named artist, on a theme, built at enormous scale by a neighbourhood committee that has been fundraising all year.",
      "Themes have included the Bengal famine, migrant labour during the pandemic, the destruction of the wetlands, terracotta temple architecture, and, in one notable case, a working model of a paper mill. Materials run from bamboo and jute to bicycle parts, terracotta pots, sewing machines and thousands of clay bhaars.",
      "The competition is fierce and sponsored. Awards go to the best pandal, the best idol, the best lighting, and winning changes what a neighbourhood committee can raise the following year.",
      "All of it is dismantled within about ten days. Nothing is kept. The scale of the annual construction-and-demolition cycle is one of the odder facts about the city, and it is the main reason UNESCO listed the festival.",
    ],
    seeItAt: [
      "Bagbazar Sarbojanin, for the classical approach",
      "Kumartuli Park and Ahiritola, in the north",
      "Suruchi Sangha and Chetla Agrani, in the south",
      "Deshapriya Park, for scale",
    ],
  },
  {
    slug: "bengali-cinema",
    name: "Bengali cinema",
    summary:
      "Ray, Ghatak and Mrinal Sen made three completely different arguments about what a film could be, all within about ten miles of each other.",
    body: [
      "Studio-era Bengali cinema was already substantial by the 1930s, with New Theatres producing in Bengali and Hindi simultaneously and P. C. Barua's Devdas in 1935 setting the template for Indian melodrama.",
      "Then, in the mid-fifties, three filmmakers went in three directions. Ray observed, patiently and humanely, in long takes. Ghatak declaimed, using distorted lenses and sound cut against image, and made almost everything about Partition. Mrinal Sen agitated, made his films political arguments, and in Interview and Calcutta 71 broke the fourth wall entirely.",
      "The Uttam Kumar and Suchitra Sen romances ran in parallel and outsold all of them, and remain what most Bengali households actually rewatch.",
      "The contemporary industry, Tollywood, is based at Tollygunge and has had a strong two decades in the arthouse register through Rituparno Ghosh, Aparna Sen, Kaushik Ganguly and Srijit Mukherji.",
    ],
    seeItAt: [
      "Nandan, the state film centre at Rabindra Sadan",
      "The Satyajit Ray Film and Television Institute",
      "Kolkata International Film Festival, each December",
      "Priya Cinema, one of the last of the single screens",
    ],
  },
  {
    slug: "jatra",
    name: "Jatra",
    bengali: "যাত্রা",
    summary:
      "Travelling folk theatre, played in the round, at maximum volume, to village audiences of thousands. The companies are still cast on Chitpur Road.",
    body: [
      "Jatra is performed on a bare square platform with the audience on all four sides, which means no scenery, no backdrop and no fourth wall. Everything is carried by voice, and the delivery is pitched to reach the back of a field.",
      "It began as devotional processional theatre and became, in the nineteenth and twentieth centuries, a mass popular form covering mythology, history, social melodrama and outright political propaganda. Utpal Dutt took it seriously enough to write for it.",
      "The business is run from a few streets around Chitpur. Companies are assembled in the autumn, contracts signed, and troupes dispatched across rural Bengal for a season running roughly from September to April.",
      "Audiences are large, rural and paying. The form has survived television, and largely survived streaming, on the strength of being genuinely live and genuinely loud.",
    ],
    seeItAt: [
      "The jatra para around Beadon Street, Chitpur, in early autumn",
      "Rural Bengal between September and April",
      "The annual jatra festival at Baghbazar",
    ],
  },
  {
    slug: "football",
    name: "Football",
    summary:
      "Mohun Bagan, East Bengal and Mohammedan Sporting, and the fact that in 1911 a barefoot Indian team beat a British regiment in a final.",
    body: [
      "Mohun Bagan was founded in 1889, East Bengal in 1920, Mohammedan Sporting in 1891. All three are within a few hundred metres of each other on the Maidan, and the rivalry between them has been the organising social fact of the city's sporting life for a century.",
      "On 29 July 1911, Mohun Bagan beat East Yorkshire Regiment 2–1 in the IFA Shield final. The Indian team played barefoot. The political reading of the result was immediate and enormous, and it is still the single most cited sporting event in Bengal.",
      "The Mohun Bagan–East Bengal derby carries Partition inside it. East Bengal was founded by and for those from the eastern districts; after 1947 it became the club of the refugee population. The fish markets sell prawn and hilsa as proxies for the two sides on match day, and the price moves with the result.",
      "Salt Lake Stadium has held crowds well over a hundred thousand for the derby, which for a period made it the second-largest football attendance in the world.",
    ],
    seeItAt: [
      "Salt Lake Stadium, on a derby weekend",
      "The Maidan club tents, any morning",
      "Mohun Bagan Day, 29 July",
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is inside a Kolkata biryani that is not in a Hyderabadi one?",
    options: ["A whole potato", "Fried onion", "Saffron", "Boiled egg"],
    answerIndex: 0,
    because:
      "The potato arrived with the exiled court of Wajid Ali Shah at Metiabruz in 1856 and has been non-negotiable ever since. The egg is optional and modern.",
  },
  {
    question: "Howrah Bridge is held together by what?",
    options: ["Welds", "Bolts", "Rivets", "Cables"],
    answerIndex: 2,
    because:
      "Roughly 26,500 tonnes of steel fastened with hot rivets driven by hand. There are no nuts and bolts in the main structure, and it is a cantilever, so nothing hangs from a cable.",
  },
  {
    question: "In Kumartuli, what happens on Mahalaya?",
    options: [
      "The straw armature is bound",
      "The eyes are painted",
      "The idols are immersed",
      "The clay is collected",
    ],
    answerIndex: 1,
    because:
      "Chokkhu daan, the giving of the eyes. Until it is done the figure is a figure; afterwards it is the goddess, and the workshop treats it differently.",
  },
  {
    question: "What is nolen gur made from?",
    options: ["Sugarcane", "Date palm sap", "Coconut sap", "Molasses"],
    answerIndex: 1,
    because:
      "Sap tapped from the khejur, the date palm, on cold winter nights and boiled the same morning. It has a season of about eight weeks and nothing else tastes like it.",
  },
  {
    question: "Who was the first Asian to win the Nobel Prize in Literature?",
    options: ["Rabindranath Tagore", "Yasunari Kawabata", "Amartya Sen", "Bankim Chandra Chattopadhyay"],
    answerIndex: 0,
    because:
      "Tagore, in 1913, for Gitanjali. He also wrote the national anthems of both India and Bangladesh, which no other person has done.",
  },
  {
    question: "The Kolkata Metro, opened in 1984, was the first in India. Where did the first line run?",
    options: [
      "Dum Dum to Tollygunge",
      "Esplanade to Bhowanipore",
      "Howrah to Sealdah",
      "Park Street to Kalighat",
    ],
    answerIndex: 1,
    because:
      "3.4 kilometres between Esplanade and Bhowanipore, opened on 24 October 1984, seventeen years after construction began.",
  },
  {
    question: "What does adda require in order to count as adda?",
    options: [
      "A fixed topic",
      "At least six people",
      "That nothing is decided",
      "That it happens indoors",
    ],
    answerIndex: 2,
    because:
      "The defining condition is unproductivity. A conversation with an agenda that reaches a conclusion is a meeting, and Bengalis will tell you so.",
  },
  {
    question: "Which of these did Jagadish Chandra Bose refuse to do?",
    options: [
      "Publish his radio results",
      "Patent his inventions",
      "Work on plants",
      "Found an institute",
    ],
    answerIndex: 1,
    because:
      "He demonstrated millimetre-wave radio in Calcutta in 1895, a year before Marconi's public trial, and declined to patent any of it on the principle that knowledge should not be enclosed.",
  },
];
