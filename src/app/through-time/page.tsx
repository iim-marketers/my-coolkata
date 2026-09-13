import type { Metadata } from "next";
import { ThroughTime } from "@/components/through-time";

export const metadata: Metadata = {
  title: "Kolkata Through Time",
  description:
    "Drag a year from 1690 to today and the whole site changes with it: the palette, the photographs, and what the city was.",
};

export default function ThroughTimePage() {
  return (
    <main className="relative z-10 bg-background">
      <ThroughTime />
    </main>
  );
}
