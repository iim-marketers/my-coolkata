import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Noto_Serif_Bengali,
} from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** A grotesque with some character, for headlines that should feel young. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

/** Bengali needs a face that carries the conjuncts properly. */
const bengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Cool-kata — Discover the cool side of Kolkata",
    template: "%s · Cool-kata",
  },
  description:
    "Street food, Durga Puja, hidden gems, neighbourhoods and weekend plans. Your cheat sheet to Kolkata.",
  openGraph: {
    title: "Cool-kata — Discover the cool side of Kolkata",
    description:
      "Street food, Durga Puja, hidden gems, neighbourhoods and weekend plans. Your cheat sheet to Kolkata.",
    siteName: "Cool-kata",
    type: "website",
  },
};

/** Light only, whatever the device prefers. */
export const viewport: Viewport = {
  themeColor: "#fcfbf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${bengali.variable} h-full antialiased`}
    >
      <head>
        {/* Without JavaScript the scroll reveals never fire, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <SiteNav />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
