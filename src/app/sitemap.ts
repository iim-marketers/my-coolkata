import type { MetadataRoute } from "next";
import { sceneInfo } from "@/components/scenes/scene-info";
import { dishes, heritageSites, neighbourhoods, stories } from "@/lib/kolkata";
import { blogPath, blogPosts } from "@/lib/kolkata/blog";
import { absoluteUrl, photoUrl } from "@/lib/seo";

const SECTIONS = [
  "/food",
  "/heritage",
  "/neighbourhoods",
  "/durga-puja",
  "/stories",
  "/blog",
  "/hidden",
  "/map",
  "/famous-for",
  "/a-day-in-kolkata",
  "/mood",
  "/today",
  "/culture",
  "/adda",
  "/architecture",
  "/cinema",
  "/college-street",
  "/football",
  "/kumartuli",
  "/literature",
  "/river",
  "/tram",
  "/gallery",
  "/how-kolkata-are-you",
  "/events",
  "/credits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...SECTIONS.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/credits" ? 0.3 : 0.8,
    })),
    ...heritageSites.map((s) => ({
      url: absoluteUrl(`/heritage/${s.slug}`),
      images: [photoUrl(s.photo ?? sceneInfo[s.scene].photo)],
      priority: 0.7,
    })),
    ...dishes.map((d) => ({
      url: absoluteUrl(`/food/${d.slug}`),
      images: [photoUrl(d.photo ?? sceneInfo[d.scene].photo)],
      priority: 0.7,
    })),
    ...neighbourhoods.map((n) => ({
      url: absoluteUrl(`/neighbourhoods/${n.slug}`),
      images: [photoUrl(n.photo ?? sceneInfo[n.scene].photo)],
      priority: 0.7,
    })),
    ...stories.map((s) => ({
      url: absoluteUrl(`/stories/${s.slug}`),
      lastModified: s.published,
      images: [photoUrl(s.photo ?? sceneInfo[s.scene].photo)],
      priority: 0.6,
    })),
    ...blogPosts.map((p) => ({
      url: absoluteUrl(blogPath(p.slug)),
      lastModified: p.updated ?? p.published,
      images: [photoUrl(p.cover)],
      priority: 0.8,
    })),
  ];
}
