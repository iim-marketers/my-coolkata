import type { Metadata } from "next";
import { HiddenIndex } from "@/components/hidden-index";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { hiddenKinds, hiddenPlaces } from "@/lib/kolkata/hidden";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hidden Kolkata",
  description:
    "Forty things in Kolkata you probably did not know existed: a grave older than the city, a Kali temple where the prasad is noodles, and the brass lines nobody notices outside the GPO.",
  path: "/hidden",
  photo: "north-kolkata-lane",
});

export default function HiddenPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Hidden Kolkata"
        title="You probably didn't know this existed"
        lede="Not the famous places. A numbered catalogue of the forgotten buildings, hidden temples, old signs, dead theatres and half-shut bakeries that the guidebooks skip."
        scene="rooftops"
        photo="north-kolkata-lane"
        meta={[
          { label: "Catalogued", value: String(hiddenPlaces.length) },
          { label: "Categories", value: String(hiddenKinds.length) },
          { label: "Numbers", value: "Permanent. The list is not finished." },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <HiddenIndex />
        </Reveal>
      </section>
    </main>
  );
}
