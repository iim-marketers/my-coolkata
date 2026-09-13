import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ThenNowSlider } from "@/components/then-now-slider";
import { thenNow } from "@/lib/kolkata/then-now";

export const metadata: Metadata = {
  title: "Then and Now",
  description:
    "Seven places in Kolkata, wiped between the archival plate and the present: Dalhousie Square, Esplanade, Chowringhee, Howrah Bridge, Park Street, College Street and Burrabazar.",
};

export default function ThenAndNowPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Then and now"
        title="Kolkata vs old Calcutta"
        lede="Drag the handle. The left side is graded like an archival plate, the right is the place today, and underneath each one is the thing that has not changed."
        scene="rooftops"
        meta={[
          { label: "Places", value: String(thenNow.length) },
          { label: "Earliest", value: "1865, Dalhousie Square" },
          { label: "Photographs used", value: "None. Both sides are drawn." },
        ]}
      />

      {thenNow.map((item, i) => (
        <section
          key={item.slug}
          id={item.slug}
          className={`scroll-mt-20 border-t border-border ${i % 2 ? "bg-secondary/40" : ""}`}
        >
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[0.6rem] text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-[clamp(1.6rem,4.2vw,2.6rem)] leading-tight font-semibold">
                    {item.place}
                  </h2>
                  <p className="mt-1 font-mono text-[0.58rem] tracking-[0.2em] text-muted-foreground uppercase">
                    {item.thenYear} → {item.nowYear}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <ThenNowSlider item={item} />
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </main>
  );
}
