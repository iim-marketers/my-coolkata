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
    default: "My Coolkata — Discover the cool side of Kolkata",
    template: "%s · My Coolkata",
  },
  description:
    "Street food, Durga Puja, hidden gems, neighbourhoods and weekend plans. Your cheat sheet to Kolkata.",
  openGraph: {
    title: "My Coolkata — Discover the cool side of Kolkata",
    description:
      "Street food, Durga Puja, hidden gems, neighbourhoods and weekend plans. Your cheat sheet to Kolkata.",
    siteName: "My Coolkata",
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
    // The inline script below sets `data-enter` on this element before
    // hydration, so its attributes are expected to differ from the server's.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${bengali.variable} ${galada.variable} h-full antialiased`}
    >
      <head>
        {/* Hold the banner choreography until the phone can actually paint
            it. The animations are pure CSS, so their clock starts the moment
            the markup is styled — on a cold mobile load that is a second or
            more before the photographs have arrived, and every frame decoded
            while they land is a frame of the entrance dropped. This runs
            before the body exists, marks the document held, and lets go once
            the fonts have settled, the banner's own photographs have decoded
            and a run of frames has landed on time. A load too slow for any of
            that gets `skip`: the page simply appears, whole and still, which
            is better than stuttering through a sequence nobody can see.
            See the `data-enter` rules in `globals.css`. */}
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
        <SiteNav />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
