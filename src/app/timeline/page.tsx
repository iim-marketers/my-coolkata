import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { TimelineSlider } from "@/components/timeline-slider";
import { timeline } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "From three villages on the Hooghly in 1495 to the last tram in 2024: twenty-six moments, with a year scrubber.",
};

export default function TimelinePage() {
  const pivots = timeline.filter((t) => t.pivotal).length;

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Timeline"
        title="1495 to now"
        lede="Three villages, a trading post, the capital of an empire, a renaissance, a famine, a partition, and a metro. Drag the year and the history below it truncates."
        scene="howrah"
        photo="calcutta-18th-century"
        meta={[
          { label: "Entries", value: String(timeline.length) },
          { label: "Turning points", value: String(pivots) },
          { label: "Span", value: "531 years" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <TimelineSlider />
        </Reveal>
      </section>
    </main>
  );
}
