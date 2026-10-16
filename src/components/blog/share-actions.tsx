"use client";

import { Link2, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareActions({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
      return;
    }
    copy();
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const pill =
    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.86rem] font-semibold transition-colors";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <button type="button" onClick={share} className={`${pill} bg-marigold text-ink hover:bg-cream`}>
        <Share2 className="size-4" />
        Share this walk
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener"
        className={`${pill} border border-cream/25 text-cream hover:border-cream/60`}
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </a>
      <button
        type="button"
        onClick={copy}
        className={`${pill} border border-cream/25 text-cream hover:border-cream/60`}
      >
        <Link2 className="size-4" />
        Copy link
      </button>
    </div>
  );
}
