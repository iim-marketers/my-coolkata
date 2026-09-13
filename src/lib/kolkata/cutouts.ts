/* Food with the background lifted off. Each is cut from a Wikimedia Commons
   photograph, and every entry needs its credit: see /credits. */
import type { StaticImageData } from "next/image";
import cBegunBhaja from "@/assets/cutouts/begun-bhaja.webp";
import cChaBhaar from "@/assets/cutouts/cha-bhaar.webp";
import cCheloKebab from "@/assets/cutouts/chelo-kebab.webp";
import cChingriMalaikari from "@/assets/cutouts/chingri-malaikari.webp";
import cChutney from "@/assets/cutouts/chutney.webp";
import cDal from "@/assets/cutouts/dal.webp";
import cJhalmuri from "@/assets/cutouts/jhalmuri.webp";
import cKathiRoll from "@/assets/cutouts/kathi-roll.webp";
import cKolkataBiryani from "@/assets/cutouts/kolkata-biryani.webp";
import cKoshaMangsho from "@/assets/cutouts/kosha-mangsho.webp";
import cLuchiAlurDom from "@/assets/cutouts/luchi-alur-dom.webp";
import cMishtiDoi from "@/assets/cutouts/mishti-doi.webp";
import cNolenGur from "@/assets/cutouts/nolen-gur.webp";
import cPhuchka from "@/assets/cutouts/phuchka.webp";
import cRosogolla from "@/assets/cutouts/rosogolla.webp";
import cShorsheIlish from "@/assets/cutouts/shorshe-ilish.webp";
import cShukto from "@/assets/cutouts/shukto.webp";
import cTelebhaja from "@/assets/cutouts/telebhaja.webp";
import cThali from "@/assets/cutouts/thali.webp";
import type { Photo } from "./photos";

export interface Cutout {
  image: StaticImageData;
  alt: string;
  credit: Photo["credit"];
}

const BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

export const cutouts = {
  "begun-bhaja": {
    image: cBegunBhaja,
    alt: "Two rounds of begun bhaja on a flowered plate",
    credit: { title: "Begun Bhaja", author: "Atudu", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Begun_Bhaja.jpg" },
  },
  "cha-bhaar": {
    image: cChaBhaar,
    alt: "Milky tea in a clay bhaar",
    credit: { title: "Tea served in Kulhar in India", author: "Ravi Dwivedi", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Tea_served_in_Kulhar_in_India.jpg" },
  },
  "chelo-kebab": {
    image: cCheloKebab,
    alt: "A plate of chelo kebab with a fried egg",
    credit: { title: "Chelow Kabab, Peter Cat, Park Street, Kolkata, West Bengal, IMG 20210410 131018800", author: "Boby Ortain", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Chelow_Kabab,_Peter_Cat,_Park_Street,_Kolkata,_West_Bengal,_IMG_20210410_131018800.jpg" },
  },
  "chingri-malaikari": {
    image: cChingriMalaikari,
    alt: "Prawns in a coconut-milk malaikari",
    credit: { title: "Prawn Malai Curry", author: "Prads2189", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Prawn_Malai_Curry.jpg" },
  },
  chutney: {
    image: cChutney,
    alt: "Sweet tomato chutney flecked with mustard seed",
    credit: { title: "Sweet chutney made from ripe tomatoes, at a Bengali household, photographed by Yogabrata Chakraborty, on April 5, 2023", author: "Billjones94", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Sweet_chutney_made_from_ripe_tomatoes,_at_a_Bengali_household,_photographed_by_Yogabrata_Chakraborty,_on_April_5,_2023.jpg" },
  },
  dal: {
    image: cDal,
    alt: "A bowl of cholar dal with a green chilli",
    credit: { title: "Cholar daal - Kolkata - West Bengal", author: "Pkd2512", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Cholar_daal_-_Kolkata_-_West_Bengal.jpg" },
  },
  jhalmuri: {
    image: cJhalmuri,
    alt: "Jhalmuri in a paper cone",
    credit: { title: "Jhaal Muri From Kolkata", author: "Sumit Surai", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Jhaal_Muri_From_Kolkata.jpg" },
  },
  "kathi-roll": {
    image: cKathiRoll,
    alt: "Two kathi rolls, one cut open",
    credit: { title: "Kolkata Rolls", author: "Satyajit Dhawale (Satyajit888)", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Kolkata_Rolls.jpg" },
  },
  "kolkata-biryani": {
    image: cKolkataBiryani,
    alt: "Kolkata mutton biryani with its potato and egg",
    credit: { title: "Kolkata mutton biryani", author: "DeepanjanGhosh", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Kolkata_mutton_biryani.jpg" },
  },
  "kosha-mangsho": {
    image: cKoshaMangsho,
    alt: "Kosha mangsho on a plate with rice and salad",
    credit: { title: "Kosha Mangsho", author: "Miansari66", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Kosha_Mangsho.JPG" },
  },
  "luchi-alur-dom": {
    image: cLuchiAlurDom,
    alt: "Luchi around a bowl of alur dom",
    credit: { title: "Alur dom & luchi", author: "Rocky Masum", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Alur_dom_%26_luchi.jpg" },
  },
  "mishti-doi": {
    image: cMishtiDoi,
    alt: "Mishti doi in a clay pot with a wooden spoon",
    credit: { title: "Mishti Doi", author: "Kirti Poddar", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", source: "https://commons.wikimedia.org/wiki/File:Mishti_Doi.jpg" },
  },
  "nolen-gur": {
    image: cNolenGur,
    alt: "Moulded gur sandesh on a banana leaf",
    credit: { title: "Gur er Sandesh", author: "Daliadasgupta2022", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Gur_er_Sandesh.jpg" },
  },
  phuchka: {
    image: cPhuchka,
    alt: "Phuchka filled with potato in a foil bowl",
    credit: { title: "Panipuri-MB40", author: "Rajeeb Dutta", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Panipuri-MB40.jpg" },
  },
  rosogolla: {
    image: cRosogolla,
    alt: "Rosogolla in syrup in a steel pot",
    credit: { title: "Sweet Rasgulla", author: "Vashisthapathak2015", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Sweet_Rasgulla.JPG" },
  },
  "shorshe-ilish": {
    image: cShorsheIlish,
    alt: "Hilsa steaks in mustard gravy",
    credit: { title: "A photo of popular Bengali dish Sorshe Ilish served traditionally", author: "Billjones94", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:A_photo_of_popular_Bengali_dish_Sorshe_Ilish_served_traditionally.jpg" },
  },
  shukto: {
    image: cShukto,
    alt: "Shukto in a steel bowl",
    credit: { title: "Shukto (তেতো শুক্তো)", author: "শক্তিশেল", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Shukto_(%E0%A6%A4%E0%A7%87%E0%A6%A4%E0%A7%8B_%E0%A6%B6%E0%A7%81%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A7%8B).jpg" },
  },
  telebhaja: {
    image: cTelebhaja,
    alt: "Telebhaja on muri with a green chilli",
    credit: { title: "Puffed rice with Telebhaja (Bengali fritters) Kolkata - West Bengal - DSC 0045", author: "TAPAS KUMAR HALDER", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Puffed_rice_with_Telebhaja_(Bengali_fritters)_Kolkata_-_West_Bengal_-_DSC_0045.jpg" },
  },
  thali: {
    image: cThali,
    alt: "A Bengali thali on bell metal, seen from above",
    credit: { title: "Bengali Non-vegetarian thali", author: "Marajozkee", ...BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Bengali_Non-vegetarian_thali.jpg" },
  },
} satisfies Record<string, Cutout>;

export type CutoutId = keyof typeof cutouts;
