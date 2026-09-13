import type { Metadata } from "next";
import { DayBuilder } from "@/components/day-builder";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { planBlocks } from "@/lib/kolkata/planner";

export const metadata: Metadata = {
  title: "Build My Kolkata Day",
  description:
    "Say how long you have and what you are here for, and this packs a day out of thirty real places, in order, with the travel time built in.",
};

export default function BuildMyDayPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Build my day"
        title="Your Kolkata"
        lede="Three hours or three days, and any combination of food, history, photography, culture, shopping and architecture. It packs the day forward from dawn and leaves the afternoon alone."
        scene="streetfood"
        photo="hand-rickshaw"
        meta={[
          { label: "Places in the pool", value: String(planBlocks.length) },
          { label: "Lengths", value: "3 hours to 3 days" },
          { label: "Interests", value: "Six, combinable" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <DayBuilder />
        </Reveal>
      </section>
    </main>
  );
}
