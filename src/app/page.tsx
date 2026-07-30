import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardLink, StatTile } from "@/components/ui/Card";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { PixelMarker, XList } from "@/components/ui/motifs";
import { Reveal, SplitReveal } from "@/components/motion/SplitReveal";
import { X9Mark } from "@/components/brand/X9Mark";
import {
  BRAND,
  PILLARS,
  SERVICES,
  PROCESS_STEPS,
  servicesByPillar,
  type PillarId,
} from "@/content/brand";

const PILLAR_ORDER: PillarId[] = ["strategy", "creative", "performance", "growth"];

/**
 * NOTE: the plan's proof bar, selected-work and testimonial sections are
 * deliberately absent. All three require real client outcomes, and inventing
 * them is the one thing an agency site must never do. They slot in at Phase 4
 * once case studies exist. The stat tiles below use only facts derivable from
 * the PRD — counts, not claimed results.
 */
export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <Section className="border-border relative overflow-hidden border-b py-24 md:py-32">
        {/*
          Hero cascade. Above the fold, so scroll={false} — these fire on load,
          each delay picking up roughly where the previous element lands.
        */}
        <div className="grid gap-8">
          <Reveal scroll={false} y={12} delay={0.1}>
            <XList
              items={BRAND.tagline}
              className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase"
            />
          </Reveal>
          <SplitReveal
            as="h1"
            splitBy="chars"
            scroll={false}
            delay={0.25}
            className="text-step-7 max-w-5xl font-extrabold"
          >
            Strategy, creative and engineering under one roof
          </SplitReveal>
          <SplitReveal
            as="p"
            splitBy="lines"
            scroll={false}
            delay={0.6}
            className="text-text-muted x9-measure text-step-1"
          >
            Most agencies hand off between the people who decide the brand, the
            people who make the work, and the people who build the systems it
            runs on. X9 runs all three — so the strategy, the campaigns and the
            software are decided by one team against one set of numbers.
          </SplitReveal>
          <Reveal scroll={false} delay={0.85}>
            <div className="mt-2 flex flex-wrap gap-4">
              <ButtonLink href="/contact" size="lg">
                Book a call
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost" size="lg">
                See the services
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <X9Mark
          className="text-accent pointer-events-none absolute -right-16 -bottom-24 hidden h-[28rem] w-[28rem] opacity-[0.06] lg:block"
        />
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface className="py-14 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Zero-padded to match the display face's tabular feel. */}
          <StatTile
            value={String(SERVICES.length).padStart(2, "0")}
            label="Services"
          />
          <StatTile value="04" label="Pillars" />
          <StatTile
            value={String(PROCESS_STEPS.length).padStart(2, "0")}
            label="Step process"
          />
          <StatTile value="01" label="Accountable team" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="Four pillars"
          title="How the work fits together"
          lead="Twelve services, grouped by the job they do. Most engagements start in one pillar and grow into the next."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PILLAR_ORDER.map((id, i) => {
            const pillar = PILLARS[id];
            const services = servicesByPillar(id);
            return (
              <Card key={id} interactive className="flex flex-col">
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-accent-text text-step-4 leading-none font-extrabold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-step-3 font-bold">{pillar.name}</h3>
                </div>
                <p className="text-text-muted mt-4 text-step-1">{pillar.line}</p>
                <ul className="mt-6 grid flex-1 gap-0.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-text-muted hover:text-accent-text flex items-center gap-3 py-1.5 text-sm transition-colors duration-150 ease-x9"
                      >
                        <PixelMarker />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow="The process"
            title="The same nine steps, every time"
            lead="Whether it is a brand sprint or a custom ERP build, delivery runs the same way — so you always know which stage you are in, and what is needed from you."
          />
          <div className="grid gap-8">
            <ProcessRail />
            <ButtonLink href="/process" variant="ghost" className="w-fit">
              Read the process
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="Capabilities"
          title="Everything we do"
          lead="No retainers for services you do not need. Scope is set in discovery."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <CardLink
              key={service.slug}
              href={`/services/${service.slug}`}
              className="flex flex-col"
            >
              <Eyebrow marker={false}>{PILLARS[service.pillar].name}</Eyebrow>
              <h3 className="text-step-3 mt-3 font-bold">{service.name}</h3>
              <p className="text-text-muted mt-3 flex-1 text-sm">
                {service.objective}
              </p>
              <span className="text-accent-text mt-6 inline-block text-xs font-semibold tracking-eyebrow uppercase">
                View service →
              </span>
            </CardLink>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section theme="light">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="grid gap-6">
            <h2 className="text-step-6 max-w-3xl font-extrabold">
              Bring the problem, not the shopping list
            </h2>
            <p className="text-text-muted x9-measure text-step-1">
              {BRAND.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
            <ButtonLink href="/process" variant="ghost" size="lg">
              How we work
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
