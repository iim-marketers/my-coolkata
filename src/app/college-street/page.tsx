import type { Metadata } from "next";
import Link from "next/link";
import { BookShelf } from "@/components/book-shelf";
import { FindABook } from "@/components/find-a-book";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getNeighbourhood } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "College Street",
  description:
    "Boi Para: a mile and a half of secondhand bookstalls, four universities, the Coffee House, and sixty years of student movements.",
};

const CHAPTERS = [
  {
    id: "book-market",
    title: "The book market",
    body: [
      "It is said to be the largest secondhand book market in the world and the largest book market of any kind in India. Whether or not the superlatives hold, the density does: stalls stacked two and three metres high on both pavements, for about two and a half kilometres.",
      "The trade works on request. You describe what you want, the stallholder disappears into a wall of paper, and eleven minutes later it is in your hand. Nobody knows how the index works and there is not one.",
      "Publishers, printers, binderies and paper wholesalers occupy the buildings behind the stalls, so the whole trade is on one street from typesetting to resale. Some of the binderies still sew signatures by hand.",
    ],
  },
  {
    id: "university",
    title: "The University",
    body: [
      "The University of Calcutta was founded in 1857, the first multidisciplinary Western-style university in Asia, and it examined rather than taught for its first decades. Bankim Chandra Chattopadhyay was one of its first two graduates.",
      "Its Senate House was demolished in 1960 and the loss is still resented. What remains is a run of institutional buildings along the street: Sanskrit College from 1824, Medical College from 1835, Hare School from 1818.",
      "Ishwar Chandra Vidyasagar was principal of Sanskrit College and admitted non-brahmin students, which the institution had never done, while introducing English and Western philosophy on the argument that Sanskrit learning without them would fossilise.",
    ],
  },
  {
    id: "presidency",
    title: "Presidency",
    body: [
      "Hindu College opened in 1817, founded by Rammohan Roy, David Hare and others, to teach European sciences and letters in English. It became Presidency College and then Presidency University, and its students became the Bengal Renaissance.",
      "Henry Louis Vivian Derozio taught here, died at twenty-two, and shaped a generation of Bengali radicals who questioned everything and were mostly disowned for it.",
      "The Baker Laboratory behind the main gate is where Jagadish Chandra Bose and Prafulla Chandra Ray worked, and where Satyendra Nath Bose and Meghnad Saha were taught. Subhas Chandra Bose was expelled from here in 1916.",
    ],
  },
  {
    id: "coffee-house",
    title: "The Coffee House",
    body: [
      "The building opened as the Albert Hall in 1876 and became a coffee house in 1942. The ceiling is very high, the fans are slow and inadequate, the acoustics are appalling, and this is a large part of why it works: nobody can hear the next table, so everyone talks louder.",
      "Satyajit Ray came before Pather Panchali, when he was still designing book jackets. Mrinal Sen came at greater length and more argumentatively. Ritwik Ghatak, Amartya Sen as a Presidency undergraduate, the Krittibas poets in the fifties, and the entire Naxalbari student leadership in the late sixties.",
      "The workers took the chain over as a cooperative in 1958 and have run it since. The uniform, white with a fan-shaped turban and a broad cummerbund, is a leftover of the original Coffee Board service.",
    ],
  },
  {
    id: "writers",
    title: "Famous writers",
    body: [
      "Bankim Chandra Chattopadhyay founded Bangadarshan in 1872 and effectively created a Bengali literary public. Michael Madhusudan Dutt decided at Hindu College that he would be an English poet, failed, and came back at thirty-four to invent Bengali blank verse.",
      "Sarat Chandra Chattopadhyay published almost everything through houses on this street and became the most widely read Bengali novelist of the century. Jibanananda Das was championed here by Buddhadeb Bose and bought by almost nobody.",
      "The little magazines are where most Bengali poetry still first appears: a few hundred of them, hand-stapled, sold from the back of the Book Fair and from these pavements.",
    ],
  },
  {
    id: "student-movements",
    title: "Student movements",
    body: [
      "The revolutionary societies that grew out of the 1905 partition of Bengal recruited through these colleges. Khudiram Bose was distributing banned pamphlets as a schoolboy; he was hanged at eighteen.",
      "The Naxalbari period from 1967 put the universities, the student unions and the police into open conflict for the better part of a decade, and a cohort of the brightest students ended up dead, jailed or exiled.",
      "The tradition has not stopped. Surya Sen Street is named for a schoolmaster who took an armoury, and the walls along it still carry fresh paint every few months.",
    ],
  },
  {
    id: "bengali-literature",
    title: "Bengali literature",
    body: [
      "Publishing in Bengali is unusually decentralised: hundreds of small houses, thin margins, print runs of a few hundred, and a readership that will still buy poetry at scale, which almost no other market anywhere does.",
      "The Kolkata Book Fair, twelve days in late January, draws over two million people. It is not a rights fair and almost no trade business is done at it. It is a retail fair, on a field, and it is the largest of its kind in the world.",
      "College Street is what that trade looks like for the other three hundred and fifty-three days.",
    ],
  },
];

export default function CollegeStreetPage() {
  const quarter = getNeighbourhood("college-street");

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="বইপাড়া · Boi Para"
        title="College Street"
        lede="Books, students, adda, ideas. A mile and a half of secondhand stalls running past four universities and one very loud room on a first floor."
        scene="collegestreet"
        tall
        meta={[
          { label: "Length", value: "About 2.5 km of stalls" },
          { label: "Oldest institution", value: "Hare School, 1818" },
          { label: "Coffee House", value: "In this building since 1942" },
        ]}
      />

      <BookShelf count={18} className="h-24 border-b border-border bg-secondary/40 sm:h-32" />

      {CHAPTERS.map((chapter, i) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className={`scroll-mt-20 border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}
        >
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[0.6rem] text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-tight font-semibold">
                  {chapter.title}
                </h2>
              </div>
              <div className="mt-6 max-w-2xl space-y-4 text-[1rem] leading-[1.75] text-muted-foreground">
                {chapter.body.map((para, n) => (
                  <p key={n}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <BookShelf
            count={16}
            className="h-16 border-t border-border/60 sm:h-20"
          />
        </section>
      ))}

      {/* Find a book. */}
      <section className="border-b border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <FindABook />
          </Reveal>
        </div>
      </section>

      {/* The walk. */}
      {quarter ? (
        <section>
          <div className={`${pageShell} py-16 sm:py-24`}>
            <Reveal>
              <SectionHeading
                eyebrow="On foot"
                title="Twenty-five minutes, six stops"
                href="/neighbourhoods/college-street"
                hrefLabel="The quarter in full"
              />
            </Reveal>
            <ol className="relative mt-12 border-l border-border">
              {quarter.walk.map((stop, i) => (
                <Reveal as="li" key={stop.stop} delay={i * 70} className="relative pb-8 pl-8">
                  <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <p className="font-display text-lg font-medium">{stop.stop}</p>
                    <p className="font-mono text-[0.6rem] tabular-nums text-muted-foreground">
                      +{stop.minutes} min
                    </p>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
                    {stop.note}
                  </p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-10">
              <Link
                href="/adda"
                className="font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase hover:underline"
              >
                What they are arguing about upstairs →
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}
    </main>
  );
}
