import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { PersonalityQuiz } from "@/components/personality-quiz";
import { Reveal } from "@/components/reveal";
import { pQuestions, pResults } from "@/lib/kolkata/personality";

export const metadata: Metadata = {
  title: "How Kolkata Are You?",
  description:
    "Six questions about evenings, hundred-rupee notes, fish, football and where you would rather be, and one result you can share.",
};

export default function PersonalityPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="A quiz"
        title="How Kolkata are you?"
        lede="Six questions. There are no wrong answers, though there is a Bengali answer, and it is usually both."
        scene="streetfood"
        photo="yellow-taxis-traffic"
        meta={[
          { label: "Questions", value: String(pQuestions.length) },
          { label: "Results", value: String(Object.keys(pResults).length) },
          { label: "Time", value: "Ninety seconds" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <PersonalityQuiz />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-14 sm:py-20`}>
          <Reveal>
            <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
              The six you could be
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(pResults).map((r, i) => (
              <Reveal as="li" key={r.trait} delay={(i % 3) * 70} className="h-full">
                <div className="h-full rounded-lg border border-border bg-card p-5">
                  <p className="font-display text-lg font-semibold">{r.title}</p>
                  <p className="mt-1.5 text-[0.88rem] leading-snug text-muted-foreground italic">
                    {r.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
