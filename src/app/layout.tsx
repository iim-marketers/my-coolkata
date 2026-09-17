import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Galada,
  Geist,
  Geist_Mono,
  Noto_Serif_Bengali,
} from "next/font/google";
import { ENTER_EVENT, ENTER_GIVE_UP, ENTER_IMAGES } from "@/lib/enter";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Toaster } from "@/components/ui/sonner";
import {
  JsonLd,
  pageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
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

const siteDefaults = pageMetadata({ description: SITE_DESCRIPTION, path: "/" });

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "My Cool Kata",
    "cool kata",
    "coolkata",
    "my coolkata",
    "Bengali culture",
    "Bengali food",
    "Bengali festivals",
    "Bengali literature",
    "Kolkata",
    "Calcutta",
    "Kolkata travel guide",
    "Kolkata street food",
    "Durga Puja",
    "Kolkata heritage",
    "Kolkata neighbourhoods",
    "things to do in Kolkata",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: siteDefaults.openGraph,
  twitter: siteDefaults.twitter,
};

/** Light only, whatever the device prefers. */
export const viewport: Viewport = {
  themeColor: "#fcfbf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${bengali.variable} ${galada.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
var root=document.documentElement;
try{
root.dataset.enter="hold";
var settled=0;
var end=function(state){if(settled)return;settled=1;root.dataset.enter=state;document.dispatchEvent(new Event(${JSON.stringify(ENTER_EVENT)}))};
var giveUp=setTimeout(function(){end("skip")},${ENTER_GIVE_UP});
var go=function(){clearTimeout(giveUp);end("go")};
var calm=function(){var last=0,run=0;var tick=function(t){if(last)run=t-last<50?run+1:0;last=t;if(run>=5)return go();requestAnimationFrame(tick)};requestAnimationFrame(tick)};
var start=function(){
var imgs=[].slice.call(document.querySelectorAll(${JSON.stringify(ENTER_IMAGES)}));
var left=imgs.length;
if(!left)return calm();
var one=function(){if(--left===0)calm()};
imgs.forEach(function(img){(img.decode?img.decode():Promise.reject()).then(one,one)})};
var afterDom=function(){document.fonts?document.fonts.ready.then(start,start):start()};
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",afterDom,{once:true}):afterDom();
}catch(e){root.dataset.enter="go"}
})()`,
          }}
        />
        {/* Without JavaScript the scroll reveals never fire, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL.toString(),
            description: SITE_DESCRIPTION,
            inLanguage: "en-IN",
            about: { "@type": "City", name: "Kolkata" },
          }}
        />
        <SiteNav />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
