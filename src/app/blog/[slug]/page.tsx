import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { blogFaqs, blogPath, blogPosts, getBlogPost, plainText } from "@/lib/kolkata/blog";
import { photos } from "@/lib/kolkata/photos";
import { absoluteUrl, JsonLd, photoUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  const path = blogPath(post.slug);
  const cover = photos[post.cover];
  const images = [
    {
      url: cover.image.src,
      width: cover.image.width,
      height: cover.image.height,
      alt: cover.alt,
    },
  ];

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author, url: SITE_URL.toString() }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      images,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [post.author],
      section: post.tags[0],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  const url = absoluteUrl(blogPath(post.slug));
  const cover = photos[post.cover];
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL.toString(),
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.png") },
  };

  return (
    <main className="relative z-10 overflow-x-clip bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          alternativeHeadline: post.metaTitle,
          description: post.metaDescription,
          image: {
            "@type": "ImageObject",
            url: photoUrl(post.cover),
            width: cover.image.width,
            height: cover.image.height,
            caption: cover.alt,
          },
          datePublished: post.published,
          dateModified: post.updated ?? post.published,
          author: { "@type": "Organization", name: post.author, url: SITE_URL.toString() },
          publisher,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          inLanguage: "en-IN",
          articleSection: post.tags[0],
          keywords: post.keywords.join(", "),
          about: {
            "@type": "Place",
            name: "Kumartuli",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolkata",
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blogFaqs(post).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      <BlogArticle post={post} />
    </main>
  );
}
