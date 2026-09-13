import type { Metadata } from "next";
import { DayClock } from "@/components/day-clock";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { dayMoments } from "@/lib/kolkata/day";

export const metadata: Metadata = {
  title: "A Day in Kolkata",
  description:
    "From the ghats at half past five to the all-night stalls at two. Ten hours of an ordinary day, on a dial that opens at whatever time it actually is in Kolkata.",
};

export default function DayPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="A day in Kolkata"
        title="The city is not its monuments"
        lede="It is a sequence of hours, and each one belongs to somebody different. This opens at whatever time it currently is in Kolkata."
        scene="streetfood"
        meta={[
          { label: "Hours", value: String(dayMoments.length) },
          { label: "Starts", value: "05:30, at the ghats" },
          { label: "Ends", value: "02:00, and not really" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <DayClock />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="The whole day"
              title="Ten hours, in order"
            />
          </Reveal>
          <ol className="relative mt-12 border-l border-border">
            {dayMoments.map((m, i) => (
              <Reveal as="li" key={m.time} delay={(i % 5) * 60} className="relative pb-9 pl-8">
                <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-display text-xl font-semibold tabular-nums text-terracotta">
                    {m.time}
                  </p>
                  <h3 className="font-display text-lg font-medium">{m.title}</h3>
                </div>
                <p className="mt-2 max-w-2xl text-[0.94rem] leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
                <p className="mt-1.5 font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
                  {m.where}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
