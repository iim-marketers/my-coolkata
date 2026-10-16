import Link from "next/link";
import type { RichText as RichTextValue } from "@/lib/kolkata/blog";

const TOKEN = /(==[^=]+==|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function RichText({ text }: { text: RichTextValue }) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("==")) {
      return (
        <mark key={i} data-hl="" className="hl">
          {part.slice(2, -2)}
        </mark>
      );
    }
    if (part.startsWith("*")) {
      return (
        <em key={i} className="font-medium text-terracotta not-italic in-data-[tone=dark]:text-marigold">
          {part.slice(1, -1)}
        </em>
      );
    }
    const link = part.match(LINK);
    if (link) {
      return (
        <Link
          key={i}
          href={link[2]}
          className="font-medium underline decoration-terracotta/50 decoration-2 underline-offset-4 transition-colors hover:text-terracotta"
        >
          {link[1]}
        </Link>
      );
    }
    return part;
  });
}
