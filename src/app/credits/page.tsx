import type { Metadata } from "next";
import { FoodCutout } from "@/components/food/food-cutout";
import { PageHeader, pageShell } from "@/components/page-header";
import { CityScene } from "@/components/scenes/city-scene";
import { cutouts, type CutoutId } from "@/lib/kolkata/cutouts";
import { photos, type Photo, type PhotoId } from "@/lib/kolkata/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Photo credits",
  description:
    "The photographers whose work appears on this site, and the licences it is used under.",
  path: "/credits",
  photo: "howrah-bridge-night",
});

function Credit({ credit }: { credit: Photo["credit"] }) {
  return (
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
  );
}

export default function CreditsPage() {
  const ids = Object.keys(photos) as PhotoId[];
  const cutoutIds = Object.keys(cutouts) as CutoutId[];

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Credits"
        title="Who took the photographs"
        lede={`All ${ids.length} photographs on this site, and the ${cutoutIds.length} dishes cut out of photographs, come from Wikimedia Commons, under Creative Commons licences or in the public domain. They have been resized and cropped to fit, the cut-outs have had their backgrounds removed, and the era and night settings colour-grade them.`}
        scene="howrah"
        photo="howrah-bridge-night"
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {ids.map((id) => (
            <li key={id} className="flex gap-4 border-t border-border pt-5">
              <CityScene
                photo={id}
                detail="card"
                className="aspect-square w-20 shrink-0 rounded-md"
              />
              <Credit credit={photos[id].credit} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`${pageShell} pb-16 sm:pb-24`}>
        <h2 className="border-t border-border pt-10 font-display text-2xl font-semibold">
          Cut-out dishes
        </h2>
        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
          The food on the plates and menu cards, with the background removed
          from the original photograph. The original licence carries over to
          the cut-out.
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {cutoutIds.map((id) => (
            <li key={id} className="flex gap-4 border-t border-border pt-5">
              <div className="grid size-20 shrink-0 place-items-center rounded-md bg-secondary p-1.5">
                <FoodCutout id={id} sizes="80px" shadow={false} className="size-full object-contain" />
              </div>
              <Credit credit={cutouts[id].credit} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
