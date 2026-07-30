import type { Metadata } from "next";
import Link from "next/link";
import { PILLARS, SERVICES, servicesByPillar, type PillarId } from "@/content/brand";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { CardLink } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { PixelMarker } from "@/components/ui/motifs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Twelve services across four pillars — strategy, creative, performance and growth engineering. Brand strategy, content production, paid media, SEO and LLM SEO, websites, CRM/ERP and AI automation.",
};

const PILLAR_ORDER: PillarId[] = ["strategy", "creative", "performance", "growth"];

export default function ServicesPage() {
  return (
    <>
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>{SERVICES.length} services × 4 pillars</Eyebrow>
          <h1 className="text-step-7 max-w-4xl font-extrabold">
            Everything needed to grow, under one roof
          </h1>
          <p className="text-text-muted x9-measure text-step-1">
            Most agencies hand off between strategy, creative and engineering.
            X9 runs all three, which means the brand work, the campaigns and the
            systems they run on are decided by the same team against the same
            numbers.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
            <ButtonLink href="/process" variant="ghost" size="lg">
              How we work
            </ButtonLink>
          </div>
        </div>
      </Section>

      {PILLAR_ORDER.map((id, index) => {
        const pillar = PILLARS[id];
        const services = servicesByPillar(id);
        return (
          <Section key={id} id={id} surface={index % 2 === 1}>
            <SectionHeader
              eyebrow={`0${index + 1} — ${pillar.name}`}
              title={pillar.line}
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <CardLink
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex flex-col"
                >
                  <h3 className="text-step-3 font-bold">{service.name}</h3>
                  <p className="text-text-muted mt-3 flex-1 text-sm">
                    {service.objective}
                  </p>
                  <div className="text-text-subtle mt-6 flex items-center gap-2 text-xs tracking-eyebrow uppercase">
                    <PixelMarker />
                    {service.deliverables.length} deliverables
                  </div>
                  <span className="text-accent-text mt-4 inline-block text-xs font-semibold tracking-eyebrow uppercase">
                    View service →
                  </span>
                </CardLink>
              ))}
            </div>
          </Section>
        );
      })}

      <Section className="border-border border-t">
        <SectionHeader
          eyebrow="The same nine steps, every time"
          title="One process across all twelve"
          lead="Whichever service you buy, delivery runs the same way — so you always know which stage you are in and what is expected of you."
        />
        <ProcessRail className="mt-10" />
      </Section>

      <Section theme="light">
        <div className="grid gap-6">
          <h2 className="text-step-5 max-w-3xl font-extrabold">
            Not sure which of these you need?
          </h2>
          <p className="text-text-muted x9-measure">
            That is what discovery is for. Bring the problem, not a shopping
            list — the first conversation is about what the business needs, not
            what we sell.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
            <Link
              href="/process"
              className="text-text self-center text-xs font-semibold tracking-eyebrow uppercase underline underline-offset-4 hover:no-underline"
            >
              See the process
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
