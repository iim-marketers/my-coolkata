import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { CityScene } from "@/components/scenes/city-scene";
import { photos, type Photo, type PhotoId } from "@/lib/kolkata/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "The photographers whose work appears on this site, and the licences it is used under.",
};

export default function CreditsPage() {
  const ids = Object.keys(photos) as PhotoId[];

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Credits"
        title="Who took the photographs"
        lede={`All ${ids.length} photographs on this site come from Wikimedia Commons, under Creative Commons licences or in the public domain. They have been resized and cropped to fit, and the era and night settings colour-grade them.`}
        scene="howrah"
        photo="howrah-bridge-night"
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {ids.map((id) => {
            const credit: Photo["credit"] = photos[id].credit;
            return (
              <li key={id} className="flex gap-4 border-t border-border pt-5">
                <CityScene
                  photo={id}
                  detail="card"
                  className="aspect-square w-20 shrink-0 rounded-md"
                />
                <div className="min-w-0 text-[0.82rem] leading-relaxed text-muted-foreground">
                  <a
                    href={credit.source}
                    rel="noopener"
                    target="_blank"
                    className="block font-medium text-foreground transition-colors hover:text-terracotta"
                  >
                    {credit.title}
                  </a>
                  <span className="block truncate">{credit.author}</span>
                  {credit.licenseUrl ? (
                    <a
                      href={credit.licenseUrl}
                      rel="license noopener"
                      target="_blank"
                      className="underline underline-offset-2 hover:text-terracotta"
                    >
                      {credit.license}
                    </a>
                  ) : (
                    <span>{credit.license}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
