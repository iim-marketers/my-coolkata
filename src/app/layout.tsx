import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Galada,
  Geist,
  Geist_Mono,
  Noto_Serif_Bengali,
} from "next/font/google";
import { ENTER_EVENT } from "@/lib/enter";
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

/** Hand-lettered Bengali, the register of a sweet-shop signboard. Display sizes only. */
const galada = Galada({
  variable: "--font-galada",
  subsets: ["bengali"],
  weight: "400",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${bengali.variable} ${galada.variable} h-full antialiased`}
    >
      <head>
        {/* Hold the banner choreography until the phone can actually paint it.
            Runs before the body exists, so nothing has started animating yet;
            releases on the first frame that lands on time once the fonts have
            settled and the deferred scripts have run, and in any case within
            a beat and a half. See the `data-enter` rules in `globals.css`. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;try{r.dataset.enter="hold";var d=0;var go=function(){if(d)return;d=1;r.dataset.enter="go";document.dispatchEvent(new Event("${ENTER_EVENT}"))};setTimeout(go,1600);var settle=function(){var l=0;var tick=function(t){if(l&&t-l<50)return go();l=t;requestAnimationFrame(tick)};requestAnimationFrame(tick)};var ready=function(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",settle,{once:true}):settle()};document.fonts?document.fonts.ready.then(ready,ready):ready()}catch(e){r.dataset.enter="go"}})()`,
          }}
        />
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
