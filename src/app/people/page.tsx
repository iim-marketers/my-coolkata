import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { PortraitWall } from "@/components/portrait-wall";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { people } from "@/lib/kolkata";
import { personGroups } from "@/lib/kolkata/types";

export const metadata: Metadata = {
  title: "People Who Made Kolkata",
  description:
    "Twenty-five lives, from Rammohan Roy to Sourav Ganguly: literature, science, cinema, the freedom movement, social reform, spirituality and sport.",
};

export default function PeoplePage() {
  const earliest = people[0];
  const nobels = ["rabindranath-tagore", "amartya-sen", "mother-teresa"];

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="People who made Kolkata"
        title="The portrait wall"
        lede="A poet who wrote two national anthems. A physicist who refused to patent radio. A schoolteacher who took an armoury. A confectioner who worked out how to boil curd."
        scene="rooftops"
        meta={[
          { label: "Lives", value: String(people.length) },
          { label: "Earliest born", value: String(earliest.born) },
          { label: "Nobel laureates", value: String(nobels.length) },
          { label: "Groups", value: String(personGroups.length) },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <PortraitWall />
        </Reveal>
      </section>

      {/* The overlap chart: almost everyone here knew almost everyone. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Two and a half centuries"
              title="Almost all of them overlapped"
              lede="A surprising number drank coffee in the same room on College Street, and several taught each other."
            />
          </Reveal>
          <Reveal className="mt-12 overflow-x-auto">
            <div className="min-w-[42rem]">
              <div className="mb-2 flex justify-between font-mono text-[0.56rem] text-muted-foreground/60">
                {[1770, 1820, 1870, 1920, 1970, 2026].map((y) => (
                  <span key={y}>{y}</span>
                ))}
              </div>
              <ul className="space-y-1.5">
                {people.map((p) => {
                  const span = 2026 - 1770;
                  const start = ((p.born - 1770) / span) * 100;
                  const end = (((p.died ?? 2026) - 1770) / span) * 100;
                  return (
                    <li key={p.slug} className="flex items-center gap-4">
                      <span className="w-52 shrink-0 truncate text-right text-[0.74rem] text-muted-foreground">
                        {p.name}
                      </span>
                      <span className="relative h-2 flex-1 rounded-full bg-border/50">
                        <span
                          className="absolute inset-y-0 rounded-full bg-terracotta/75"
                          style={{
                            left: `${Math.max(0, start)}%`,
                            width: `${Math.max(1, end - start)}%`,
                          }}
                        />
                      </span>
                      <span className="w-24 shrink-0 font-mono text-[0.58rem] tabular-nums text-muted-foreground/70">
                        {p.born}–{p.died ?? "now"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
