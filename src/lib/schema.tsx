import { BRAND } from "@/content/brand";

export const SITE_URL = "https://x9creatives.com";

/**
 * Structured data. X9 sells Answer Engine Optimization, so the site carrying
 * correct schema is part of the proof, not a nice-to-have.
 * See docs/02-website-plan.md section 6.
 */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored by us, not user input, so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND.name,
  url: SITE_URL,
  // Verbatim from BRAND.description — entity consistency across every surface.
  description: BRAND.description,
  slogan: BRAND.tagline.join(" × "),
});

export const serviceSchema = (service: {
  name: string;
  slug: string;
  objective: string;
  scope: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.objective,
  url: `${SITE_URL}/services/${service.slug}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${service.name} scope`,
    itemListElement: service.scope.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item },
    })),
  },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path}`,
  })),
});
