import type { Metadata } from "next";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PixelList, XList } from "@/components/ui/motifs";
import { Reveal, SplitReveal } from "@/components/motion/SplitReveal";
import { BRAND, PILLARS, SERVICES, type PillarId } from "@/content/brand";

export const metadata: Metadata = {
  title: "About",
  description: BRAND.description,
  alternates: { canonical: "/about" },
};

const PILLAR_ORDER: PillarId[] = ["strategy", "creative", "performance", "growth"];

/**
 * Team members. Empty on purpose — names, roles and bios are facts about real
 * people that I have no source for, and inventing them would be fabricating
 * identities. The section below renders only when this is populated.
 * See docs/02-website-plan.md section 7, gap #4.
 */
const TEAM: { name: string; role: string; bio: string }[] = [];

export default function AboutPage() {
  return (
    <>
      <Section className="border-border border-b">
        {/* Above the fold — fires on load rather than on scroll. */}
        <div className="grid gap-6">
          <Reveal scroll={false} y={12} delay={0.1}>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h1"
            splitBy="chars"
            scroll={false}
            delay={0.25}
            className="text-step-7 max-w-4xl font-extrabold"
          >
            One team, from positioning to production
          </SplitReveal>
          {/* Canonical description, verbatim — same string in the footer and JSON-LD. */}
          <SplitReveal
            as="p"
            splitBy="lines"
            scroll={false}
            delay={0.6}
            className="text-text-muted x9-measure text-step-1"
          >
            {BRAND.description}
          </SplitReveal>
          <Reveal scroll={false} y={12} delay={0.85}>
            <XList
              items={BRAND.tagline}
              className="text-text-subtle mt-2 text-xs font-semibold tracking-eyebrow uppercase"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              animate
              eyebrow="Why we are built this way"
              title="The handoff is where work dies"
            />
            <div className="text-text-muted x9-measure mt-8 grid gap-5">
              <SplitReveal as="p" splitBy="lines">
                A brand agency writes the positioning. A content studio shoots
                the videos. A media buyer runs the ads. A dev shop builds the
                site. Each is competent, and the result is still incoherent —
                because nobody owns the number at the end.
              </SplitReveal>
              <SplitReveal as="p" splitBy="lines">
                X9 is organised around removing those handoffs. The same team
                that decides the positioning writes the scripts, buys the media
                and ships the CRM it all feeds into. Strategy survives contact
                with execution, because the people doing both are in the same
                room.
              </SplitReveal>
            </div>
          </div>

          <div>
            <SectionHeader
              animate
              eyebrow="How that shows up"
              title="What it means for you"
            />
            <PixelList
              className="mt-8"
              items={[
                "One brief, not four — positioning decided once and carried through every asset",
                "No blame gap between the campaign and the landing page it points at",
                "Creative decisions informed by what the ad data actually says",
                "The systems you keep — website, CRM, automations — built by the people who ran the campaigns",
                "One accountable team against one set of KPIs",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section surface>
        <SectionHeader
          animate
          eyebrow="Four pillars"
          title="How the work is organised"
          lead={`${SERVICES.length} services, grouped by the job they do rather than by department.`}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLAR_ORDER.map((id, i) => (
            <Card key={id} className="flex flex-col">
              <span
                aria-hidden="true"
                className="font-display text-accent-text text-step-4 leading-none font-extrabold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-step-3 mt-3 font-bold">{PILLARS[id].name}</h3>
              <p className="text-text-muted mt-3 flex-1 text-sm">
                {PILLARS[id].line}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {TEAM.length > 0 && (
        <Section>
          <SectionHeader animate eyebrow="The team" title="Who you will work with" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <Card key={person.name}>
                <h3 className="text-step-3 font-bold">{person.name}</h3>
                <p className="text-accent-text mt-1 text-xs font-semibold tracking-eyebrow uppercase">
                  {person.role}
                </p>
                <p className="text-text-muted mt-4 text-sm">{person.bio}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section theme="light">
        <div className="grid gap-6">
          <SplitReveal
            as="h2"
            splitBy="chars"
            className="text-step-5 max-w-3xl font-extrabold"
          >
            Start with discovery
          </SplitReveal>
          <SplitReveal as="p" splitBy="lines" className="text-text-muted x9-measure">
            Before anyone proposes a solution, we establish what the business
            actually needs. That conversation is free and it is not a pitch.
          </SplitReveal>
          <div className="flex flex-wrap gap-4">
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
