import type { PhotoId } from "./photos";

/** Inline markup: `==highlight==`, `*Bengali term*`, `[label](/href)`. */
export type RichText = string;

export interface BlogFigure {
  photo: PhotoId;
  caption: RichText;
}

export interface BlogStep {
  title: string;
  bengali?: string;
  when?: string;
  body: RichText[];
  figure: BlogFigure;
  sacred?: boolean;
  pullQuote?: string;
}

export type BlogBlock =
  | { kind: "lead"; text: RichText }
  | { kind: "para"; text: RichText }
  | { kind: "figure"; figure: BlogFigure; wide?: boolean }
  | { kind: "pair"; figures: [BlogFigure, BlogFigure] }
  | {
      kind: "etymology";
      parts: { bengali: string; roman: string; meaning: string }[];
      whole: { bengali: string; roman: string };
    }
  | { kind: "steps"; steps: BlogStep[] }
  | {
      kind: "guide";
      rows: { icon: GuideIcon; q: string; a: RichText }[];
      figure: BlogFigure;
      map: { label: string; href: string };
    }
  | { kind: "etiquette"; items: { icon: GuideIcon; text: RichText }[] }
  | { kind: "faq"; items: { q: string; a: string }[] };

export type GuideIcon =
  | "pin"
  | "train"
  | "calendar"
  | "shirt"
  | "camera"
  | "cha"
  | "hand"
  | "name"
  | "gift";

export interface BlogSection {
  id: string;
  nav: string;
  title: string;
  blocks: BlogBlock[];
  tone?: "plain" | "tint";
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  keywords: string[];
  published: string;
  updated?: string;
  author: string;
  reviewedBy?: string;
  eyebrow: string;
  bengaliTitle: string;
  standfirst: string;
  cover: PhotoId;
  glance: { value: string; label: string }[];
  glossary: { bengali: string; roman: string; meaning: string }[];
  sections: BlogSection[];
  closing: {
    id: string;
    nav: string;
    title: string;
    photo: PhotoId;
    lines: RichText[];
    prompt: RichText;
    follow: string;
  };
  related: { href: string; label: string; blurb: string }[];
  tags: string[];
}

const kumartuli: BlogPost = {
  slug: "kumartuli-how-durga-idols-are-made",
  title: "A Walk Through Kumartuli: How Durga Idols Are Actually Made",
  metaTitle: "How Durga Idols Are Made: A Walk Through Kumartuli",
  metaDescription:
    "Walk through Kumartuli, North Kolkata’s idol-making lane, and see how Durga idols are made by hand, from bamboo frame to chokkhu daan. Plus visiting tips.",
  primaryKeyword: "how Durga idols are made",
  keywords: [
    "how Durga idols are made",
    "Kumartuli",
    "Kumartuli Durga idol making",
    "Kumartuli visit guide",
    "chokkhu daan",
    "Durga Puja artisans Kolkata",
    "North Kolkata Pujo",
    "things to do in Kolkata before Pujo",
  ],
  published: "2026-10-14",
  author: "My Coolkata",
  eyebrow: "Durga Puja · North Kolkata",
  bengaliTitle: "কুমোরটুলি",
  standfirst:
    "Most of us meet her at the pandal, finished and glowing under the lights. This is the walk through the months of work that happen before that moment.",
  cover: "kumartuli-hands-face",
  tags: ["Durga Puja", "Kumartuli", "Craft", "North Kolkata"],
  glance: [
    { value: "9", label: "Stages, almost entirely by hand" },
    { value: "Rath Yatra", label: "When the bamboo frames often begin" },
    { value: "Mahalaya", label: "When the eyes are traditionally painted" },
    { value: "Early 1700s", label: "Where the tradition is commonly traced" },
  ],
  glossary: [
    { bengali: "কাঠামো", roman: "kathamo", meaning: "The bamboo and straw frame" },
    { bengali: "গঙ্গামাটি", roman: "Ganga mati", meaning: "Fine clay from the river" },
    { bengali: "পুণ্যমাটি", roman: "punyamati", meaning: "Soil from a sex worker’s doorstep" },
    { bengali: "কারিগর", roman: "karigor", meaning: "The artisan" },
    { bengali: "ডাকের সাজ", roman: "daker saaj", meaning: "Silver-foil decoration" },
    { bengali: "চক্ষুদান", roman: "chokkhu daan", meaning: "The giving of the eyes" },
  ],
  sections: [
    {
      id: "intro",
      nav: "The smell",
      title: "",
      blocks: [
        {
          kind: "lead",
          text: "There is a smell you only get in Kumartuli. Wet river clay, damp straw, a little paint thinner, and somewhere underneath it all, the Hooghly. If you grew up in Kolkata, you may not have visited, but you know this place the way you know the sound of the dhaak in October. ==It is where Maa Durga is born.==",
        },
        {
          kind: "para",
          text: "Most of us meet her at the pandal, finished and glowing under the lights. We say *‘Ki shundor!’* and take a photo. Very few of us have seen the months of work that happened before that moment. This is that walk.",
        },
      ],
    },
    {
      id: "what-is-kumartuli",
      nav: "Kumartuli",
      title: "What is Kumartuli, and why does Durga Puja begin here?",
      blocks: [
        {
          kind: "para",
          text: "Kumartuli is a potters’ quarter in North Kolkata, close to the Hooghly, in the old part of the city near Sovabazar. The name itself says it: *kumor* means potter, and *tuli* means a locality.",
        },
        {
          kind: "etymology",
          parts: [
            { bengali: "কুমোর", roman: "kumor", meaning: "potter" },
            { bengali: "টুলি", roman: "tuli", meaning: "locality" },
          ],
          whole: { bengali: "কুমোরটুলি", roman: "Kumartuli" },
        },
        {
          kind: "para",
          text: "Families of idol makers have worked in these narrow lanes for generations, and the tradition is ==commonly traced back to the early 1700s==, when the city was still taking shape.",
        },
        {
          kind: "figure",
          wide: true,
          figure: {
            photo: "kumartuli-street-workshop",
            caption:
              "Workshops open straight onto the street, and the idols wait outside them.",
          },
        },
        {
          kind: "para",
          text: "The lanes are tight. Workshops open straight onto the street. Half-made idols stand in rows, some only straw skeletons, some with faces but no colour, some fully dressed and waiting for a truck. Walking in feels less like visiting a studio and more like walking through someone’s home, because ==for many of these families, it is exactly that.==",
        },
      ],
    },
    {
      id: "how-durga-idols-are-made",
      nav: "The process",
      title: "How are Durga idols made? The process, step by step",
      tone: "tint",
      blocks: [
        {
          kind: "para",
          text: "No two workshops do it identically, but the broad journey is the same everywhere. ==It is slow, physical, and almost entirely by hand.==",
        },
        {
          kind: "steps",
          steps: [
            {
              title: "The kathamo: bamboo and straw frame",
              bengali: "কাঠামো",
              when: "Around Rath Yatra",
              body: [
                "Everything starts with the skeleton. Bamboo is cut and tied into the frame of the idol, and the figures of Durga, Lakshmi, Saraswati, Kartik, Ganesh and the Asura are each built separately. Straw is then bound tightly around the bamboo with rope to give the body its rough shape. This stage often begins ==months before Pujo, around the time of Rath Yatra.==",
              ],
              figure: {
                photo: "kumartuli-straw-binding",
                caption: "Straw bound over bamboo. This frame will become Ganesh.",
              },
            },
            {
              title: "The first coat of clay",
              body: [
                "A coarse clay, usually mixed with straw or husk, is pressed over the straw by hand. This layer is about ==strength and shape, not beauty.== It has to hold the weight and survive the drying.",
              ],
              figure: {
                photo: "kumartuli-clay-texture",
                caption: "The first coat on a lion: rough, straw-flecked, and built to hold.",
              },
            },
            {
              title: "Ganga mati: the river clay",
              bengali: "গঙ্গামাটি",
              body: [
                "Then comes the clay the whole tradition is known for. Artisans traditionally use fine alluvial clay from the Ganga, which is why you will hear the word *Ganga mati* in every workshop. It is applied in thin layers and ==smoothed by palm and fingertip.==",
                "Many artisans also say a small handful of soil from the doorstep of a sex worker, known as *punyamati*, is traditionally added, a custom with its own long story about who gets included in the making of the Goddess. Ask a *karigor* about it and you will learn more than any article can tell you.",
              ],
              figure: {
                photo: "kumartuli-first-clay",
                caption: "Thin layers of finer clay, pressed and smoothed by hand.",
              },
            },
            {
              title: "Drying, in sun and in worry",
              body: [
                "Every idol must dry slowly and evenly, or it cracks. ==Rain is the enemy==, and an uncertain Bengali monsoon can undo days of patient work. Artisans move idols, cover them, and watch the sky the way farmers do.",
              ],
              figure: {
                photo: "kumartuli-monsoon",
                caption: "When the rain comes early, the idol gets the umbrella.",
              },
            },
            {
              title: "The face and the hands",
              body: [
                "Faces and hands are the most delicate work, and they are usually handled by the most experienced hands in the workshop. This is the part visitors stop and stare at. The curve of an eyebrow, the line of a lip, the angle of a fingertip, all shaped from wet clay with small tools and ==a lifetime of practice.==",
              ],
              figure: {
                photo: "kumartuli-clay-heads",
                caption: "Heads are modelled on their own, and wait on a bench for their bodies.",
              },
            },
            {
              title: "Colour, layer by layer",
              body: [
                "Once the clay is dry, a base coat goes on, followed by colour in layers. The shine of the skin, the red of the sari, the deep colour of the Asura are all built up slowly. It is quieter work than the modelling, and ==the workshop gets very still while it happens.==",
              ],
              figure: {
                photo: "kumartuli-painting-asura",
                caption: "The Asura and the lion get their colour too, one layer at a time.",
              },
            },
            {
              title: "Ornaments, crowns and daker saaj",
              bengali: "ডাকের সাজ",
              body: [
                "The crown, the jewellery and the dazzling silver-foil decoration known as *daker saaj* are added near the end, along with *shola* work in many idols. The idol starts to look like the Maa we recognise, but ==she is still not complete.==",
              ],
              figure: {
                photo: "kumartuli-crown",
                caption: "The crown goes on near the end, and she starts to look like Maa.",
              },
            },
            {
              title: "Chokkhu daan: giving the eyes",
              bengali: "চক্ষুদান",
              when: "Around Mahalaya",
              sacred: true,
              pullQuote:
                "The moment the idol stops being clay and becomes the Goddess.",
              body: [
                "The last and most sacred step is painting the eyes, known as *chokkhu daan*, traditionally done around Mahalaya. It is often done by a senior artisan, and the workshop tends to go quiet.",
                "Many people say this is ==the moment the idol stops being clay and becomes the Goddess.== If you are lucky enough to be there, you do not need anyone to tell you to be silent.",
              ],
              figure: {
                photo: "kumartuli-chokkhudan",
                caption: "One bulb, one brush, and the eyes go in last of all.",
              },
            },
            {
              title: "The journey out",
              body: [
                "Then a truck arrives, the idol is carefully lifted and wrapped, and she leaves Kumartuli for a pandal across the city, or for a Pujo abroad. The artisans watch her go. A few days later, her work is done, and ==the lane begins preparing for the next year.==",
              ],
              figure: {
                photo: "kumartuli-finished-idol",
                caption: "Dressed, crowned, and waiting for the truck.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "the-people",
      nav: "The people",
      title: "The people behind the idols",
      blocks: [
        {
          kind: "para",
          text: "It is easy to write about Kumartuli as if it is a museum. It is not. It is a workplace, and the people in it have deadlines, small margins, aching backs and families to feed. ==Pujo is the high point of their year and the most pressured one.==",
        },
        {
          kind: "pair",
          figures: [
            {
              photo: "kumartuli-sleeping-artisan",
              caption: "A few minutes of sleep, between the idols.",
            },
            {
              photo: "kumartuli-lunch",
              caption: "Dinner on the workshop floor, at her feet.",
            },
          ],
        },
        {
          kind: "para",
          text: "So when you walk through, remember that ==the person you are photographing is working, not posing.==",
        },
        {
          kind: "etiquette",
          items: [
            { icon: "camera", text: "Ask before you point a camera." },
            { icon: "name", text: "Learn a name if you can." },
            {
              icon: "gift",
              text: "A thank you, a tip, or a small idol bought directly from a workshop means ==far more than a hundred likes on a photo.==",
            },
          ],
        },
      ],
    },
    {
      id: "visit-guide",
      nav: "Visit guide",
      title: "Kumartuli visit guide: how to go",
      tone: "tint",
      blocks: [
        {
          kind: "guide",
          rows: [
            {
              icon: "pin",
              q: "Where is it?",
              a: "North Kolkata, near Sovabazar and the Hooghly, close to Banamali Sarkar Street. Locals will point you in the right direction.",
            },
            {
              icon: "train",
              q: "How to get there",
              a: "Take the metro to ==Shobhabazar Sutanuti==, then walk or take a short auto ride.",
            },
            {
              icon: "calendar",
              q: "Best time to visit",
              a: "The ==weeks leading up to Durga Puja==, when idols are at every stage. Workshops also make other idols through the year.",
            },
            {
              icon: "shirt",
              q: "What to wear",
              a: "Comfortable shoes and clothes you do not mind getting dusty. The lanes are narrow, uneven and can be wet.",
            },
            {
              icon: "camera",
              q: "Photography",
              a: "==Always ask first.== Do not touch the idols. Never block a workspace for a better shot.",
            },
            {
              icon: "cha",
              q: "Pair it with",
              a: "A walk to Kumartuli Ghat on the Hooghly, the old [Sovabazar Rajbari](/neighbourhoods/sovabazar) area, and a cup of cha from a nearby stall.",
            },
          ],
          figure: {
            photo: "kumartuli-ghat",
            caption: "Kumartuli Ghat, a short walk from the workshops.",
          },
          map: {
            label: "Open Kumartuli in Maps",
            href: "https://www.google.com/maps/search/?api=1&query=Kumartuli%2C+Kolkata",
          },
        },
      ],
    },
    {
      id: "faq",
      nav: "FAQ",
      title: "Frequently asked questions",
      blocks: [
        {
          kind: "faq",
          items: [
            {
              q: "Where is Kumartuli in Kolkata?",
              a: "It is in North Kolkata, in the old part of the city near Sovabazar, close to the Hooghly river.",
            },
            {
              q: "When is the best time to visit Kumartuli for Durga idols?",
              a: "In the weeks before Durga Puja, when workshops are at their busiest. You will see idols at every stage, from straw frames to finished faces.",
            },
            {
              q: "What is chokkhu daan?",
              a: "It is the painting of the idol’s eyes, traditionally done around Mahalaya. Many consider it the moment the idol becomes the Goddess.",
            },
            {
              q: "Why is Ganga clay used for Durga idols?",
              a: "The tradition holds that clay from the Ganga is pure and fitting for the Goddess, and the fine alluvial clay is also well suited to shaping detail.",
            },
            {
              q: "Can tourists visit and take photos in Kumartuli?",
              a: "Yes, visitors are generally welcome, but ask before photographing people or idols, and respect the fact that it is an active workplace.",
            },
            {
              q: "Can I buy a small idol from Kumartuli?",
              a: "Many workshops make smaller idols and clay items. Ask directly and buy from the artisan, not a middleman, if you can.",
            },
          ],
        },
      ],
    },
  ],
  closing: {
    id: "before-you-go",
    nav: "Before you go",
    title: "Before you go",
    photo: "kumartuli-mother-in-making",
    lines: [
      "The next time you stand in front of Maa at a pandal, take a moment before you take your photo. ==Look at her eyes.==",
      "Somewhere in North Kolkata, a pair of clay-stained hands gave them to her.",
    ],
    prompt:
      "Have you ever been to Kumartuli? Tell us which year, and who you went with. And if this made you want to go, share it with the person you will go with.",
    follow:
      "Follow @mycoolkata for more Kolkata stories, Pujo guides and the hidden faces behind the city we love.",
  },
  related: [
    {
      href: "/kumartuli",
      label: "Kumartuli, stage by stage",
      blurb: "Scroll the figure from bamboo to goddess, and what it costs to make one.",
    },
    {
      href: "/durga-puja",
      label: "The Pujo pandal guide",
      blurb: "Where she goes next: the pandals, the routes and the five days.",
    },
    {
      href: "/food",
      label: "Eat your way through it",
      blurb: "A food map of the city and a trail built from your answers.",
    },
  ],
};

export const blogPosts: BlogPost[] = [kumartuli];

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

const MARKUP = /==|\*|\[([^\]]+)\]\([^)]+\)/g;

export function plainText(text: RichText) {
  return text.replace(MARKUP, (_, label) => label ?? "");
}

export function blogFaqs(post: BlogPost) {
  return post.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => (b.kind === "faq" ? b.items : []));
}

function blockText(block: BlogBlock): string[] {
  switch (block.kind) {
    case "lead":
    case "para":
      return [block.text];
    case "steps":
      return block.steps.flatMap((s) => [s.title, ...s.body]);
    case "guide":
      return block.rows.flatMap((r) => [r.q, r.a]);
    case "etiquette":
      return block.items.map((i) => i.text);
    case "faq":
      return block.items.flatMap((i) => [i.q, i.a]);
    default:
      return [];
  }
}

export function readingMinutes(post: BlogPost) {
  const words = [
    ...post.sections.flatMap((s) => [s.title, ...s.blocks.flatMap(blockText)]),
    ...post.closing.lines,
    post.closing.prompt,
  ]
    .map(plainText)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
