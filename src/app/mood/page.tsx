import type { Metadata } from "next";
import { MoodPicker } from "@/components/mood-picker";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { moods } from "@/lib/kolkata/moods";

export const metadata: Metadata = {
  title: "Kolkata by Mood",
  description:
    "Rainy, romantic, bookish, foodie, heritage, artistic, football, night, Puja or slow. Pick how you want the day to feel and get a sequence you could follow.",
};

export default function MoodPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Kolkata by mood"
        title="How do you want to experience Kolkata?"
        lede="Not what do you want to see. Ten moods, each with a day attached, because the same city is a completely different place at six in the morning and eleven at night."
        scene="tram"
        meta={[
          { label: "Moods", value: String(moods.length) },
          { label: "Each gives you", value: "Four or five stops, in order" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <MoodPicker />
        </Reveal>
      </section>
    </main>
  );
}
