import type { Metadata } from "next";
import { Big_Shoulders, Inter } from "next/font/google";
import { BRAND } from "@/content/brand";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd, organizationSchema } from "@/lib/schema";
import "./globals.css";

/**
 * Display face: condensed, squared, chamfered — the closest free match to the
 * wordmark in Assets/Logo 2.jpeg. Headings only; it is not a body face.
 *
 * Google renamed this family from "Big Shoulders Display" to "Big Shoulders";
 * the old export no longer exists in next/font/google.
 */
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-x9-display",
  display: "swap",
  preload: true,
  // Google publishes no override metrics for this family, so Next cannot
  // synthesise a matched fallback. Name a condensed stack explicitly instead.
  fallback: ["Arial Narrow", "Helvetica Neue", "sans-serif"],
  adjustFontFallback: false,
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-x9-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://x9creatives.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline.join(" × ")}`,
    template: `%s — ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline.join(" × ")}`,
    description: BRAND.description,
  },
  twitter: { card: "summary_large_image" },
  // TODO(phase 5): verification tokens + canonical host once the domain is confirmed.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
