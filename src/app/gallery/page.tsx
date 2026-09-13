import type { Metadata } from "next";
import { FacesGallery } from "@/components/faces-gallery";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { plateCategories, plates } from "@/lib/kolkata/gallery";

export const metadata: Metadata = {
  title: "Faces of Kolkata",
  description:
    "Twenty-seven plates across ten categories: people, streets, architecture, food, rain, Puja, night, river, trams and para, each with the story behind the frame.",
};

export default function GalleryPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Faces of Kolkata"
        title="Every frame has a story behind it"
        lede="Ten categories, and each plate opens to what is actually going on in it. Everything here is drawn rather than photographed, which is a limitation the site is honest about."
        scene="streetfood"
        meta={[
          { label: "Plates", value: String(plates.length) },
          { label: "Categories", value: String(plateCategories.length) },
          { label: "Photographs", value: "None" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <FacesGallery />
        </Reveal>
      </section>
    </main>
  );
}
