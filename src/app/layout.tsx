import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Geist,
  Geist_Mono,
  Noto_Serif_Bengali,
} from "next/font/google";
import { EraBar } from "@/components/era-bar";
import { EraProvider, eraBootScript } from "@/components/era-provider";
import { ThemeProvider } from "@/components/theme-provider";
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

/** A serif with an optical size axis, so the hero can be set very large. */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

/** Bengali needs a face that carries the conjuncts properly. */
const bengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Kolkata — The city of stories",
    template: "%s — Kolkata",
  },
  description:
    "Heritage, food, culture, people, neighbourhoods and three hundred years of history, on the east bank of the Hooghly.",
  openGraph: {
    title: "Kolkata — The city of stories",
    description:
      "Heritage, food, culture, people and neighbourhoods of Kolkata, at 22°34′N 88°22′E.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e8" },
    { media: "(prefers-color-scheme: dark)", color: "#191512" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${bengali.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the stored year before first paint, so the page never
            flashes the present day and then cuts to 1900. */}
        <script dangerouslySetInnerHTML={{ __html: eraBootScript }} />
        {/* Without JavaScript the scroll reveals never fire, so unhide them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <EraProvider>
            <SiteNav />
            {children}
            <SiteFooter />
            {/* <EraBar /> */}
          </EraProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
