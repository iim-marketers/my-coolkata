import type { Person } from "./types";
import { peopleExtra } from "./people-extra";
import { peopleProfiles } from "./people-profiles";

const core: Omit<Person, "group">[] = [
  {
    slug: "rabindranath-tagore",
    photo: "person-rabindranath-tagore",
    name: "Rabindranath Tagore",
    bengali: "রবীন্দ্রনাথ ঠাকুর",
    born: 1861,
    died: 1941,
    field: "Poet, composer, painter, educator",
    address: "Jorasanko Thakur Bari, North Kolkata",
    coords: { lat: 22.5852, lng: 88.3617 },
    summary:
      "Wrote the national anthems of two countries, won the Nobel in 1913, returned the knighthood in 1919, and started painting seriously at sixty-three.",
    body: [
      "He was born in a house in Jorasanko that already contained a movement. The Tagores were reformers, Brahmos, patrons and publishers, and the household ran its own magazines, its own theatre and its own arguments. He was the fourteenth child and largely educated in it rather than at school, which he hated and left.",
      "The 1913 Nobel came for Gitanjali, which he had translated into English himself, in a plainer register than the Bengali. The English versions made him internationally famous and are not the work the Bengali reader means. The songs are: roughly two thousand of them, collected as Rabindrasangeet, and they are still what a Bengali household sings at a funeral, a wedding and on a rainy afternoon.",
      "In 1919, after the Jallianwala Bagh massacre, he renounced the knighthood in a letter to the Viceroy that remains one of the sharpest documents of the period. He wanted, he wrote, to stand beside his countrymen shorn of all special distinctions.",
      "He founded Visva-Bharati at Santiniketan on the argument that education should happen outdoors and in a common language with the world. He took up painting in his sixties, working out of crossed-out manuscript corrections, and produced roughly two thousand canvases in fifteen years.",
      "The house at Jorasanko is a museum now. He died in it, in August 1941, in the room he was born in.",
    ],
    quote: {
      text: "Where the mind is without fear and the head is held high.",
      source: "Gitanjali, 35",
    },
    works: [
      { title: "Gitanjali", year: "1910", note: "Nobel Prize in Literature, 1913" },
      { title: "Jana Gana Mana", year: "1911", note: "National anthem of India" },
      { title: "Amar Sonar Bangla", year: "1905", note: "National anthem of Bangladesh" },
      { title: "Ghare Baire", year: "1916", note: "Filmed by Satyajit Ray in 1984" },
      { title: "Visva-Bharati", year: "1921", note: "The university at Santiniketan" },
    ],
  },
  {
    slug: "satyajit-ray",
    photo: "person-satyajit-ray",
    name: "Satyajit Ray",
    bengali: "সত্যজিৎ রায়",
    born: 1921,
    died: 1992,
    field: "Filmmaker, writer, illustrator, composer",
    address: "Bishop Lefroy Road, Ballygunge",
    coords: { lat: 22.5346, lng: 88.3596 },
    summary:
      "Made Pather Panchali on weekends with a borrowed camera and an amateur crew, and changed what an Indian film could be.",
    body: [
      "He trained as a commercial artist and spent his twenties designing book covers at D. J. Keymer, an advertising agency. Two things pushed him: meeting Jean Renoir, who was in Bengal shooting The River in 1949, and seeing Bicycle Thieves in London in 1950.",
      "Pather Panchali was shot over two and a half years, on weekends, whenever there was money. He pawned his wife's jewellery. The film was finally completed with a grant from the West Bengal government, which had booked it, confusingly, under roads.",
      "It opened in 1955 and won at Cannes the following year. With Aparajito and Apur Sansar it became the Apu Trilogy, and it did something no Indian film had done: it treated an ordinary poor Bengali family as sufficient subject matter, without music-hall interruption.",
      "He wrote his own screenplays, drew his own storyboards, designed his own posters, and from 1961 composed his own scores. He also wrote a great deal of Bengali children's fiction, including the Feluda detective stories and the Professor Shonku science fiction, which are what most Bengalis actually read him for first.",
      "He received an honorary Academy Award in 1992. He was in a hospital bed in Kolkata when it was presented to him, and died weeks later.",
    ],
    quote: {
      text: "The raw material of the cinema is life itself.",
      source: "Our Films, Their Films, 1976",
    },
    works: [
      { title: "Pather Panchali", year: "1955", note: "Best Human Document, Cannes 1956" },
      { title: "Charulata", year: "1964", note: "The one he said he would change least" },
      { title: "Feluda stories", year: "1965–1992", note: "35 detective stories and novels" },
      { title: "Goopy Gyne Bagha Byne", year: "1969", note: "Music, comedy, and his own songs" },
      { title: "Honorary Academy Award", year: "1992", note: "Accepted from a hospital bed" },
    ],
  },
  {
    slug: "swami-vivekananda",
    photo: "person-swami-vivekananda",
    name: "Swami Vivekananda",
    bengali: "স্বামী বিবেকানন্দ",
    born: 1863,
    died: 1902,
    field: "Monk, philosopher, reformer",
    address: "3 Gourmohan Mukherjee Street, Simla",
    coords: { lat: 22.5876, lng: 88.3648 },
    summary:
      "Narendranath Datta of Simla Street, who walked into the 1893 Parliament of Religions in Chicago and opened with 'Sisters and brothers of America'.",
    body: [
      "He was a sceptical, argumentative student at Scottish Church College, reading Hume and Spencer, and he came to Ramakrishna at Dakshineswar largely to test him. The question he asked, and had asked others without a useful answer, was whether the man had seen God. Ramakrishna said yes, as clearly as he saw him, and more intensely.",
      "After Ramakrishna's death in 1886 he took vows and spent years walking across India, largely anonymous. What he came back with was an argument: that Indian spiritual philosophy was not a curiosity but a working system, and that it was useless if it did not feed people.",
      "At the World's Parliament of Religions in Chicago in September 1893 he was given a few minutes. He began by addressing the audience as sisters and brothers, and the hall stood up before he had said anything else. He stayed in the West for nearly four years.",
      "He founded the Ramakrishna Mission in 1897 on a model that put famine relief, schools and hospitals on the same footing as contemplation. He also insisted, repeatedly and unpopularly, that a nation that let its poor go hungry had no business discussing metaphysics.",
      "He died at Belur Math at thirty-nine, having said he would not see forty.",
    ],
    quote: {
      text: "Arise, awake, and stop not till the goal is reached.",
      source: "Adapted from the Katha Upanishad",
    },
    works: [
      { title: "Chicago address", year: "1893", note: "World's Parliament of Religions" },
      { title: "Ramakrishna Mission", year: "1897", note: "Service as spiritual practice" },
      { title: "Raja Yoga", year: "1896", note: "Introduced yoga philosophy to Western readers" },
      { title: "Belur Math", year: "1898", note: "Land acquired; temple built after his death" },
    ],
  },
  {
    slug: "ritwik-ghatak",
    photo: "person-ritwik-ghatak",
    name: "Ritwik Ghatak",
    bengali: "ঋত্বিক ঘটক",
    born: 1925,
    died: 1976,
    field: "Filmmaker, playwright, teacher",
    address: "Rajshahi to Kolkata, 1947",
    summary:
      "Made eight features, most of them about Partition, most of them commercial failures, and is now the argument against calling Ray the whole story.",
    body: [
      "He came from Dhaka and crossed after Partition, and the crossing is essentially the subject of his work. Where Ray observed, Ghatak declaimed. His films are loud, operatic, formally violent, full of wide-angle distortion and sound cut against image, and they are about refugees.",
      "Meghe Dhaka Tara in 1960 is the one people start with: a refugee family in a colony outside Calcutta consuming its eldest daughter, who supports them all and dies of tuberculosis. The final cry on the hillside is one of the most cited moments in Indian cinema.",
      "With Komal Gandhar and Subarnarekha it forms a Partition trilogy. None of them made money. He drank heavily, was in and out of institutions, and finished only eight features in twenty-four years.",
      "He taught at the Film and Television Institute of India in Pune, where Mani Kaul, Kumar Shahani and John Abraham were his students, and his influence on Indian art cinema runs largely through them.",
      "He died at fifty. His reputation has gone up steadily every decade since.",
    ],
    quote: {
      text: "Cinema, to me, is a means of expressing my anger at the sorrows and sufferings of my people.",
      source: "Rows and Rows of Fences",
    },
    works: [
      { title: "Ajantrik", year: "1958", note: "A man and his car; possibly the first Indian film to give a machine a character" },
      { title: "Meghe Dhaka Tara", year: "1960", note: "The refugee colony film" },
      { title: "Komal Gandhar", year: "1961", note: "Theatre, politics, and the border" },
      { title: "Subarnarekha", year: "1965", note: "Shot 1962, released three years later" },
    ],
  },
  {
    slug: "begum-rokeya",
    photo: "person-begum-rokeya",
    name: "Begum Rokeya",
    bengali: "বেগম রোকেয়া",
    born: 1880,
    died: 1932,
    field: "Writer, educator, feminist",
    address: "Sakhawat Memorial Girls' School, Lower Circular Road",
    coords: { lat: 22.5405, lng: 88.3663 },
    summary:
      "Wrote a feminist science-fiction utopia in English in 1905, then spent the rest of her life running a girls' school in Calcutta.",
    body: [
      "She was born in Rangpur into a conservative Muslim landowning family that did not educate its daughters. Her elder brother taught her English and Bengali at night, in secret. She was married at eighteen to a magistrate who, unusually, encouraged her to write.",
      "Sultana's Dream appeared in 1905 in The Indian Ladies' Magazine, in English. It describes Ladyland, where men are kept in seclusion because they cannot be trusted with public life, women run the state, and solar power and cloud-condensers have abolished drudgery. It predates most of the Western feminist utopian canon.",
      "Her husband died in 1909. Five months later she opened a girls' school in Bhagalpur with five pupils. She moved it to Calcutta in 1911 as the Sakhawat Memorial Girls' School, and it is still open.",
      "She went door to door to recruit students, argued with fathers, and organised transport so that girls could attend without breaking purdah. She also founded the Anjuman-e-Khawateen-e-Islam to press for women's education and legal reform.",
      "Bangladesh marks 9 December as Rokeya Day, her birth and death date.",
    ],
    quote: {
      text: "We constitute half the society. If we remain backward, can society move forward?",
      source: "Attributed",
    },
    works: [
      { title: "Sultana's Dream", year: "1905", note: "Feminist utopian science fiction, written in English" },
      { title: "Sakhawat Memorial Girls' School", year: "1911", note: "Still operating in Kolkata" },
      { title: "Padmarag", year: "1924", note: "Novel about a women's refuge" },
      { title: "Abarodhbasini", year: "1931", note: "Reportage on the effects of seclusion" },
    ],
  },
  {
    slug: "jagadish-chandra-bose",
    photo: "person-jagadish-chandra-bose",
    name: "Jagadish Chandra Bose",
    bengali: "জগদীশ চন্দ্র বসু",
    born: 1858,
    died: 1937,
    field: "Physicist, biologist, writer",
    address: "Bose Institute, Upper Circular Road",
    coords: { lat: 22.5776, lng: 88.3717 },
    summary:
      "Demonstrated millimetre-wave radio in Calcutta in 1895, refused to patent any of it, and then spent thirty years proving that plants respond.",
    body: [
      "In November 1895, at the Town Hall in Calcutta, he sent a radio wave through two walls and the body of the Lieutenant-Governor to ring a bell and set off a small explosion in another room. This was a year before Marconi's public demonstration on Salisbury Plain.",
      "He worked at millimetre wavelengths, built the waveguides, horn antennas and semiconductor detectors himself, and published the results. He also refused, on principle, to patent them, believing that knowledge should not be enclosed. The commercial consequences were exactly what you would expect.",
      "From about 1900 he turned to plants, and built instruments of extraordinary sensitivity to measure their responses. The crescograph magnified plant growth ten thousand times. He argued that plants respond to stimulus, injury and drugs in ways continuous with animal response, which was ridiculed at the time and looks considerably better now.",
      "He founded the Bose Institute in 1917, the first modern research institute in Asia dedicated to interdisciplinary work, and gave it his own money.",
      "He also wrote Bengali science fiction. Niruddesher Kahini, from 1896, in which a cyclone is calmed by pouring hair oil on the sea, is among the earliest works of the genre in the language.",
    ],
    quote: {
      text: "The true laboratory is the mind, where behind illusions we uncover the laws of truth.",
      source: "Inscribed at the Bose Institute",
    },
    works: [
      { title: "Millimetre-wave demonstration", year: "1895", note: "Calcutta Town Hall, before Marconi's public trial" },
      { title: "Crescograph", year: "c. 1900", note: "Measured plant growth at 10,000× magnification" },
      { title: "Response in the Living and Non-Living", year: "1902", note: "The argument that got him ridiculed" },
      { title: "Bose Institute", year: "1917", note: "Asia's first interdisciplinary research institute" },
    ],
  },
  {
    slug: "jibanananda-das",
    photo: "person-jibanananda-das",
    name: "Jibanananda Das",
    bengali: "জীবনানন্দ দাশ",
    born: 1899,
    died: 1954,
    field: "Poet",
    address: "Died at Bhowanipore, near the tram line",
    coords: { lat: 22.5262, lng: 88.3435 },
    summary:
      "The most quietly influential Bengali poet after Tagore, largely unread in his lifetime, killed by a Kolkata tram.",
    body: [
      "He published little, taught English without security or enthusiasm, lost jobs, moved from Barisal to Calcutta after Partition, and was poor for most of his life. Almost none of the work that made him central was published while he was alive.",
      "What he wrote is unlike anything before it in Bengali: rural, nocturnal, saturated with birds, rivers, owls and the specific colour of the Bengal countryside at dusk, and structurally modernist. Banalata Sen, sixteen lines, is probably the most quoted Bengali poem of the twentieth century.",
      "Tagore admired the imagery and complained about the obscurity. Buddhadeb Bose championed him. Most readers ignored him.",
      "On 14 October 1954 he was hit by a tram near Deshapriya Park in Bhowanipore. He died of his injuries eight days later. Whether he stepped in front of it has been argued about ever since, without resolution.",
      "After his death his family found notebooks containing thousands of unpublished poems and several complete novels. Editors are still working through them.",
    ],
    quote: {
      text: "I have seen the face of Bengal, and so I seek no beauty of the earth any more.",
      source: "Rupasi Bangla",
    },
    works: [
      { title: "Jhara Palak", year: "1927", note: "First collection" },
      { title: "Banalata Sen", year: "1942", note: "Sixteen lines; the best-known poem in modern Bengali" },
      { title: "Rupasi Bangla", year: "1957", note: "Written 1934, published after his death" },
      { title: "The notebooks", year: "1954–", note: "Thousands of unpublished poems, still being edited" },
    ],
  },
  {
    slug: "mother-teresa",
    photo: "person-mother-teresa",
    name: "Mother Teresa",
    born: 1910,
    died: 1997,
    field: "Missionary, founder of the Missionaries of Charity",
    address: "Mother House, 54A A.J.C. Bose Road",
    coords: { lat: 22.5457, lng: 88.3617 },
    summary:
      "Arrived from Skopje at eighteen to teach at a convent school, left it at thirty-eight to work in the slums, and built an order that now runs in more than a hundred countries.",
    body: [
      "Anjezë Gonxhe Bojaxhiu came to India in 1929 and taught geography at the Loreto convent school in Entally for nearly twenty years. In September 1946, on a train to Darjeeling, she experienced what she later described as a call within a call: to leave the convent and work among the poorest.",
      "She was allowed out in 1948, took basic medical training, and began in the slums with no funding. The Missionaries of Charity were recognised as a congregation in 1950. Nirmal Hriday, the home for the dying at Kalighat, opened in 1952 in a former pilgrim hostel next to the temple.",
      "She received the Nobel Peace Prize in 1979 and declined the ceremonial banquet, asking that the money be given to the poor of Calcutta instead.",
      "Her work has been seriously criticised: on the quality of medical care in the homes, on the sources of donations, and on her positions on contraception and abortion. Her private letters, published in 2007, revealed decades of what she described as an absence of God, which she never spoke about publicly.",
      "She was canonised in 2016. Her tomb at the Mother House is a plain slab, and the room she lived in is preserved as it was.",
    ],
    quote: {
      text: "Not all of us can do great things. But we can do small things with great love.",
      source: "Attributed",
    },
    works: [
      { title: "Missionaries of Charity", year: "1950", note: "Now in over 130 countries" },
      { title: "Nirmal Hriday", year: "1952", note: "Home for the dying, at Kalighat" },
      { title: "Nobel Peace Prize", year: "1979", note: "Banquet declined; funds redirected" },
      { title: "Canonised", year: "2016", note: "Saint Teresa of Calcutta" },
    ],
  },
  {
    slug: "suchitra-sen",
    name: "Suchitra Sen",
    bengali: "সুচিত্রা সেন",
    born: 1931,
    died: 2014,
    field: "Actor",
    address: "Ballygunge",
    summary:
      "Bengali cinema's defining star for two decades, who stopped acting in 1978 and was never photographed in public again for thirty-six years.",
    body: [
      "Rama Dasgupta of Pabna became Suchitra Sen, and with Uttam Kumar formed a screen pairing that ran through more than thirty films and effectively defined Bengali romantic cinema of the 1950s and 60s. Saptapadi, Harano Sur, Agnipariksha: the films are the shared memory of a generation.",
      "She was the first Indian actor to win a prize at an international film festival, taking best actress at Moscow in 1963 for Saat Paake Bandha.",
      "In Hindi she made Devdas, Bombai Ka Babu, and Gulzar's Aandhi in 1975, where her politician character was read as a portrait of Indira Gandhi and the film was briefly withdrawn during the Emergency.",
      "Pranay Pasha, in 1978, was her last film. She then withdrew completely, spent much of her time at the Ramakrishna Mission, and refused every request. She declined the Dadasaheb Phalke Award in 2005 rather than appear in public to collect it.",
      "No photograph of her after 1978 was published in her lifetime. When she died in 2014 the funeral was closed.",
    ],
    works: [
      { title: "Agnipariksha", year: "1954", note: "The film that made the Uttam–Suchitra pairing" },
      { title: "Saat Paake Bandha", year: "1963", note: "Best Actress, Moscow International Film Festival" },
      { title: "Aandhi", year: "1975", note: "Withdrawn during the Emergency" },
      { title: "Pranay Pasha", year: "1978", note: "Her last appearance of any kind" },
    ],
  },
  {
    slug: "amartya-sen",
    photo: "person-amartya-sen",
    name: "Amartya Sen",
    bengali: "অমর্ত্য সেন",
    born: 1933,
    field: "Economist, philosopher",
    address: "Presidency College, College Street",
    coords: { lat: 22.5747, lng: 88.3634 },
    summary:
      "Was nine years old during the Bengal famine, and spent a career proving that famines are caused by entitlement failures rather than by an absence of food.",
    body: [
      "He was born on the Visva-Bharati campus at Santiniketan, and Tagore gave him his name. He was nine in 1943 when the Bengal famine killed somewhere between two and three million people, and he later wrote about noticing that nobody in his own school or family was affected.",
      "Poverty and Famines, in 1981, made the central argument: the 1943 famine occurred in a year of adequate food supply in Bengal. What collapsed was entitlement, the ability of particular groups to command food through wages, trade or production. Rural labourers priced out by wartime inflation starved while grain moved through the province.",
      "The related claim, that no substantial famine has occurred in a functioning democracy with a free press, has been argued over for forty years and has not been overturned in its main line.",
      "With Martha Nussbaum he developed the capability approach, which reframes development as the expansion of what people are actually able to do and be. It underpins the UN Human Development Index, which he helped design with Mahbub ul Haq.",
      "He won the Nobel Memorial Prize in Economic Sciences in 1998, and used a large part of it to endow the Pratichi Trust for literacy and health in India and Bangladesh.",
    ],
    quote: {
      text: "Famines are easy to prevent if there is a serious effort to do so.",
      source: "Development as Freedom, 1999",
    },
    works: [
      { title: "Collective Choice and Social Welfare", year: "1970", note: "Social choice theory after Arrow" },
      { title: "Poverty and Famines", year: "1981", note: "The entitlement account of the 1943 famine" },
      { title: "Human Development Index", year: "1990", note: "Designed with Mahbub ul Haq" },
      { title: "Nobel Memorial Prize", year: "1998", note: "Welfare economics" },
    ],
  },
  {
    slug: "nobin-chandra-das",
    name: "Nobin Chandra Das",
    bengali: "নবীন চন্দ্র দাস",
    born: 1845,
    died: 1925,
    field: "Confectioner",
    address: "Bagbazar and Jorasanko",
    coords: { lat: 22.6006, lng: 88.3684 },
    summary:
      "Worked out in 1868 how to boil chhena in syrup without it falling apart, and is called the Columbus of the rosogolla by people who mean it.",
    body: [
      "Chhena, the fresh acid-set curd that Bengali sweets are built from, does not want to be boiled. It breaks. Every attempt to make a syrup-poached chhena sweet before 1868 produced a pan of debris.",
      "Das, running a small shop, worked at it for years: how hard to knead, how much semolina to bind with, how thin the syrup had to be to enter the sphere rather than seal it. He got it in 1868 in Bagbazar.",
      "The sweet did not sell at first, because customers did not trust it. The usual account is that a Marwari businessman sheltering from rain gave one to his son, who demanded more, and the shop was busy from then on.",
      "His son Krishna Chandra Das worked out how to can it in 1930, which is how the rosogolla left Bengal.",
      "The family firm, K.C. Das, still operates. The original Bagbazar address is still there.",
    ],
    works: [
      { title: "The rosogolla", year: "1868", note: "Chhena boiled in thin syrup without disintegrating" },
      { title: "K.C. Das", year: "1930s", note: "Canning, by his son, which exported the sweet" },
      { title: "GI tag for Banglar Rosogolla", year: "2017", note: "Awarded 92 years after his death" },
    ],
  },
];

export const people: Person[] = [
  ...core.map((p) => ({ ...p, ...peopleProfiles[p.slug] })),
  ...peopleExtra,
].sort((a, b) => a.born - b.born);

export function getPerson(slug: string) {
  return people.find((p) => p.slug === slug);
}

export function peopleInGroup(group: Person["group"]) {
  return people.filter((p) => p.group === group);
}
