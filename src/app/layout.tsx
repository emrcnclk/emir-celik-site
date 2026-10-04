import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/fraunces";
import "@fontsource/bebas-neue";
import "@fontsource/special-elite";
import "./globals.css";

import { site } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FilmGrain } from "@/components/atmosphere/film-grain";
import { Stardust } from "@/components/atmosphere/stardust";
import { CustomCursor } from "@/components/atmosphere/custom-cursor";
import { OpeningGate, OpeningTitles } from "@/components/bebop/opening-titles";
import { personJsonLd } from "@/lib/seo";
import { getServerLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await getServerLang();

  return (
    <html
      lang={lang}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <OpeningGate />
      </head>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <Stardust />
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main className="relative z-10">{children}</main>
        <SiteFooter />
        <OpeningTitles />
        <FilmGrain />
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
