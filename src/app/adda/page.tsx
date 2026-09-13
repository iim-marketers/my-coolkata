import type { Metadata } from "next";
import Link from "next/link";
import { AddaNotebook } from "@/components/adda-notebook";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { addaRules, addaTopics } from "@/lib/kolkata/adda";

export const metadata: Metadata = {
  title: "Adda",
  description:
    "The long, unproductive, argumentative conversation that is close to Kolkata's actual religion. Six rules, six topics, and the positions people take on each.",
};

export default function AddaPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="আড্ডা"
        title="Adda"
        lede="Politics. Cinema. Football. Literature. Relationships. Life. Absolutely everything, at length, and nobody has to win."
        scene="collegestreet"
        meta={[
          { label: "Rules", value: String(addaRules.length) },
          { label: "Topics", value: String(addaTopics.length) },
          { label: "Duration", value: "Longer than it needs to be" },
        ]}
      />

      {/* What it is. */}
      <section className={`${pageShell} py-16 sm:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Definition"
              title="Not conversation. An institution."
            />
            <div className="mt-6 max-w-xl space-y-4 text-[1rem] leading-[1.75] text-muted-foreground">
              <p>
                Adda is not small talk and it is not a meeting. The defining
                condition is that it must not accomplish anything. If a
                decision gets made, it stops being an adda and becomes
                something worse.
              </p>
              <p>
                The historian Dipesh Chakrabarty wrote a serious academic essay
                on it, arguing that adda was the Bengali middle class&rsquo;s
                answer to the question of what to do with the modern city: a
                way of holding onto sociability while everything else was
                becoming transactional.
              </p>
              <p>
                It has locations. The Coffee House on College Street, the rowak
                or front stoop of a north Kolkata house, a tea shop, a park
                bench, and now, contentiously, a WhatsApp group.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ol className="space-y-6">
              {addaRules.map((r) => (
                <li key={r.n} className="flex gap-5 border-t border-border pt-4">
                  <span className="font-mono text-[0.6rem] text-terracotta">
                    {r.n}
                  </span>
                  <div>
                    <p className="font-display text-[1.08rem] font-semibold">
                      {r.rule}
                    </p>
                    <p className="mt-1.5 max-w-xl text-[0.88rem] leading-relaxed text-muted-foreground">
                      {r.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The notebook. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <AddaNotebook />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Where to sit"
              title="Four places it still happens"
            />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Indian Coffee House",
                d: "A very high ceiling, slow fans and appalling acoustics, so nobody can hear the next table and everyone talks louder.",
                href: "/neighbourhoods/college-street",
              },
              {
                t: "A rowak in the north",
                d: "The raised front stoop of an old house. Municipal rules and street widening have removed most of them.",
                href: "/neighbourhoods/bagbazar",
              },
              {
                t: "The 8B stand, Jadavpur",
                d: "Bookstalls, tea and argument, from mid-afternoon until the shops close.",
                href: "/neighbourhoods/jadavpur",
              },
              {
                t: "Any cha-er dokan",
                d: "Clay cups, a bench, and no expectation that you will buy anything else.",
                href: "/food/cha-in-bhaar",
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 80} className="h-full">
                <Link
                  href={v.href}
                  className="flex h-full flex-col border-t border-border pt-4 transition-colors hover:border-terracotta"
                >
                  <p className="font-display text-lg font-semibold">{v.t}</p>
                  <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {v.d}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
