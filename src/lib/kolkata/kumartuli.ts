import type { PhotoId } from "./photos";
import type { SceneName } from "./types";

export interface CraftStage {
  n: number;
  key: string;
  label: string;
  bengali?: string;
  title: string;
  standfirst: string;
  body: string[];
  material: string;
  takes: string;
  month: string;
  scene: SceneName;
  photo?: PhotoId;
  /** 0–1, how far along the figure is. Drives the progress rail. */
  progress: number;
}

export const craftStages: CraftStage[] = [
  {
    n: 1,
    key: "bamboo",
    label: "Bamboo",
    bengali: "বাঁশ",
    title: "The frame",
    standfirst: "It starts as scaffolding, months before anyone thinks about a face.",
    body: [
      "Bamboo is cut, split and lashed into a skeleton: a vertical spine, a crossbar for the shoulders, and the outriggers that will carry ten arms. Nothing about it looks like a goddess.",
      "The proportions are set here and cannot be changed later. A studio working to a pandal commission is given a height and a width, and the frame is what makes those numbers real.",
      "For an ekchala idol, where all five figures share one backdrop, the whole group is framed together and the chala arch is built at the same time.",
    ],
    material: "Split bamboo, jute rope, nails",
    takes: "One to two days",
    month: "June and July",
    scene: "kumartuli",
    photo: "kumartuli-bamboo",
    progress: 0.08,
  },
  {
    n: 2,
    key: "straw",
    label: "Straw",
    bengali: "খড়",
    title: "The structure",
    standfirst: "Rice straw twisted into rope and bound on until the frame has a body.",
    body: [
      "Straw is twisted into cord and wound around the bamboo, building up the mass of torso, limbs and head. This is the stage that decides posture, and it is done fast, by hand, by people whose names are not on the studio.",
      "The straw has to be dry and tight. Loose binding means the clay cracks as it dries, and a cracked figure in September cannot be rescued in time.",
      "At the end of it there is a many-armed scarecrow standing in a two-metre lane, and it already reads, unmistakably, as her.",
    ],
    material: "Rice straw, jute rope",
    takes: "Two to four days",
    month: "July",
    scene: "kumartuli",
    photo: "kumartuli-straw",
    progress: 0.24,
  },
  {
    n: 3,
    key: "clay",
    label: "Clay",
    bengali: "মাটি",
    title: "The body",
    standfirst: "Two grades of river mud, in two coats, with a drying wait between them.",
    body: [
      "Entel mati, a heavy clay from the Hooghly bed, is packed on first and gives the figure its bulk. It is wet, heavy work and it is what most people picture when they picture Kumartuli.",
      "Then bele mati, a finer sandy clay mixed with rice husk, is laid over the top for the surface that will take paint. Between the coats the figure has to dry, and in a wet September that is what goes wrong.",
      "Tradition requires punya mati, a handful of earth from outside a brothel in Sonagachi, on the argument that a man leaves his virtue at that threshold. Sex workers' collectives have pointed out that a city willing to build its goddess from their doorstep is less willing to admit their children to its schools. The custom continues, and so does the argument.",
      "The fingers and the face are modelled last, in the finer clay, by the senior artisan.",
    ],
    material: "Entel mati, bele mati, rice husk, river water",
    takes: "Two to three weeks, drying included",
    month: "August",
    scene: "kumartuli",
    photo: "kumartuli-clay",
    progress: 0.5,
  },
  {
    n: 4,
    key: "paint",
    label: "Painting",
    bengali: "রং",
    title: "The colour",
    standfirst: "A base coat, then the skin, then the jewellery, then the sari.",
    body: [
      "The dried figure is primed white, then given its skin: traditionally a warm ochre for Durga, blue for Kartik's peacock, and the specific dark that Kali requires.",
      "Colour used to be earth pigment and khori mati. Since the immersion rules tightened, water-based lead-free paints are required, which the workshops adopted with some grumbling about how the old colours sat on the clay.",
      "Then the ornament. Daker saj, the old style, uses beaten silver foil once imported by post, which is where the name comes from. Sholapith, a soft white pith cut into filigree, is the other traditional finish. Both are made by separate specialists.",
      "The sari goes on last, real cloth, pinned and pleated onto the clay.",
    ],
    material: "Water-based pigment, khori mati, sholapith, silver foil, cloth",
    takes: "Four to seven days",
    month: "September",
    scene: "kumartuli",
    photo: "kumartuli-painting",
    progress: 0.74,
  },
  {
    n: 5,
    key: "eyes",
    label: "Chokkhu Daan",
    bengali: "চক্ষুদান",
    title: "The giving of the eyes",
    standfirst: "Three strokes each, at dawn on Mahalaya, and the figure stops being a figure.",
    body: [
      "The eyes are painted last, on Mahalaya, the day that ends the fortnight of the ancestors and begins the goddess's. The artisan fasts, bathes, and works in one sitting.",
      "Three strokes for each eye, then the third eye on the forehead, and the pupils go in last of all. It takes a few minutes and it is the only part of the whole process nobody rushes.",
      "Before it, the figure is a figure. Afterwards it is the goddess, and everyone in the workshop moves around it differently. This is not a metaphor about art; it is a procedural fact you can watch happen.",
      "Birendra Krishna Bhadra's Mahishasuramardini has been broadcast at four in the morning on this day since 1931, and much of the state is awake for it while this is going on.",
    ],
    material: "A fine brush, and black",
    takes: "Minutes, after a night of preparation",
    month: "Mahalaya, a week before Puja",
    scene: "kumartuli",
    photo: "chokkhu-daan",
    progress: 0.92,
  },
  {
    n: 6,
    key: "goddess",
    label: "Durga",
    bengali: "দুর্গা",
    title: "She leaves",
    standfirst: "Out of the lane on a lorry, into a pandal for five days, then back into the river.",
    body: [
      "The finished group leaves Kumartuli in the last days before Shashthi, on lorries and handcarts, through lanes barely wide enough for it. Idols from these workshops go to pandals across the city and to Pujas in New Jersey, London and Sydney.",
      "She stands for five days. On Dashami the lorries queue along Strand Road, cranes lift the larger figures, and the clay goes back into the Hooghly it came from. Under the current rules the bamboo and straw frames are pulled out again afterwards.",
      "The lanes are silent in November. By January somebody is binding straw for a festival eight months away.",
    ],
    material: "Everything above, and about ten days of standing",
    takes: "Five days, then the river",
    month: "October",
    scene: "pujo",
    photo: "durga-face",
    progress: 1,
  },
];
