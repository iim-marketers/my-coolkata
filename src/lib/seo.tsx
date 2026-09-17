import type { Metadata } from "next";
import { photos, type PhotoId } from "@/lib/kolkata/photos";

export const SITE_NAME = "My Coolkata";
export const SITE_TITLE = "My Coolkata — Discover the cool side of Kolkata";
export const SITE_DESCRIPTION =
  "Street food, Durga Puja, hidden gems, neighbourhoods and weekend plans. Your cheat sheet to Kolkata.";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function photoUrl(id: PhotoId) {
  return absoluteUrl(photos[id].image.src);
}

/** Title, description, canonical and share cards for one page, so nothing is inherited from the home page. */
export function pageMetadata({
  title,
  description,
  path,
  article,
}: {
  title?: string;
  description: string;
  path: string;
  photo?: PhotoId;
  article?: { publishedTime: string; authors?: string[]; tags?: string[] };
}): Metadata {
  const images = [
    { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME },
  ];
  const shareTitle = title ? `${title} · ${SITE_NAME}` : SITE_TITLE;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      images,
      ...(article ? { type: "article", ...article } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
