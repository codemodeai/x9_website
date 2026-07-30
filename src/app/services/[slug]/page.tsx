import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PILLARS,
  SERVICES,
  SERVICE_ANSWERS,
  SERVICE_OUTCOMES,
  getService,
  relatedServices,
} from "@/content/brand";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Card, CardLink } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { PixelList, PixelMarker } from "@/components/ui/motifs";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";

/**
 * One template for all twelve services. The PRD gives every service the same
 * five-part shape, so this is a schema, not twelve pages — adding service #13
 * is a data entry in src/content/brand.ts.
 * See docs/02-website-plan.md section 1a.
 */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    // Per-page unique description — no template-filled duplicates across the 12.
    description: SERVICE_ANSWERS[slug] ?? service.objective,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.name} — X9 Creatives`,
      description: SERVICE_ANSWERS[slug] ?? service.objective,
      url: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pillar = PILLARS[service.pillar];
  const answer = SERVICE_ANSWERS[slug];
  const outcomes = SERVICE_OUTCOMES[slug] ?? [];
  const related = relatedServices(slug);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${slug}` },
        ])}
      />

      {/* ---------------------------------------------------------------- */}
      <Section className="border-border border-b">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-text-subtle flex flex-wrap items-center gap-2 text-xs tracking-eyebrow uppercase">
            <li>
              <Link href="/" className="hover:text-text">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-accent-text">
              ×
            </li>
            <li>
              <Link href="/services" className="hover:text-text">
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-accent-text">
              ×
            </li>
            <li className="text-text">{service.name}</li>
          </ol>
        </nav>

        <div className="grid gap-6">
          <Eyebrow>{pillar.name}</Eyebrow>
          <h1 className="text-step-6 max-w-4xl font-extrabold">{service.name}</h1>
          {/*
            Answer-first block: a direct, quotable summary in the position an
            extraction model reads first. This is the AEO pattern the SEO & LLM
            SEO service sells, applied to our own pages.
          */}
          {answer && (
            <p className="text-text x9-measure text-step-2 leading-snug">
              {answer}
            </p>
          )}
          <p className="text-text-muted x9-measure">
            <span className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
              Objective —{" "}
            </span>
            {service.objective}
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <ButtonLink
              href="/contact"
              size="lg"
              variant={pillar.accent === "blaze" ? "secondary" : "primary"}
            >
              Book a call
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              All services
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow="Scope of work" title="What we do" />
            <PixelList className="mt-8" items={service.scope} />
          </div>
          <div>
            <SectionHeader eyebrow="Deliverables" title="What you receive" />
            <div className="mt-8 grid gap-3">
              {service.deliverables.map((d) => (
                <Card key={d} className="px-5 py-4">
                  <span className="flex items-center gap-3">
                    <PixelMarker />
                    <span className="font-semibold">{d}</span>
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <SectionHeader
          eyebrow="Process"
          title="How this gets delivered"
          lead="The same nine steps run across every X9 engagement, so you always know which stage you are in and what is needed from you."
        />
        <ProcessRail className="mt-10" />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {outcomes.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Outcomes"
            title="How this is measured"
            lead="Agreed as targets during Strategy and reported against from Optimization onward."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o} className="border-border flex gap-3 border-t pt-4">
                <PixelMarker className="mt-2" />
                <span className="text-text-muted text-sm">{o}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      {related.length > 0 && (
        <Section surface>
          <SectionHeader
            eyebrow={`More in ${pillar.name}`}
            title="Usually bought together"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CardLink key={r.slug} href={`/services/${r.slug}`}>
                <h3 className="text-step-3 font-bold">{r.name}</h3>
                <p className="text-text-muted mt-3 text-sm">{r.objective}</p>
                <span className="text-accent-text mt-6 inline-block text-xs font-semibold tracking-eyebrow uppercase">
                  View service →
                </span>
              </CardLink>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      <Section theme="light">
        <div className="grid gap-6">
          <h2 className="text-step-5 max-w-3xl font-extrabold">
            Talk through {service.name.toLowerCase()}
          </h2>
          <p className="text-text-muted x9-measure">
            Discovery starts with your goals and constraints, not our service
            list. If a different service fits better, we will say so.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
