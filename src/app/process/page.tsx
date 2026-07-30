import type { Metadata } from "next";
import { PROCESS } from "@/content/process";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PixelList } from "@/components/ui/motifs";
import { SERVICES } from "@/content/brand";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The nine steps behind every X9 Creatives engagement — discovery, research, strategy, planning, execution, review, approval, delivery and optimization — including what we need from you at each stage.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>Nine steps × {SERVICES.length} services</Eyebrow>
          <h1 className="text-step-7 max-w-4xl font-extrabold">The X9 Process</h1>
          <p className="text-text-muted x9-measure text-step-1">
            Every engagement runs the same nine steps, whether it is a brand
            strategy sprint or a custom ERP build. Each step below lists what we
            do, what we need from you, and what you receive when it closes —
            because the fastest way to stall a project is an unclear handoff.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              See the services
            </ButtonLink>
          </div>
        </div>
      </Section>

      {PROCESS.map((step, i) => (
        <Section key={step.n} surface={i % 2 === 1} id={`step-${step.n}`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.4fr] lg:gap-16">
            <div>
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-accent-text text-step-7 leading-none font-extrabold"
                >
                  {String(step.n).padStart(2, "0")}
                </span>
                <h2 className="text-step-4 font-extrabold">{step.name}</h2>
              </div>
              <p className="text-text-muted x9-measure mt-5 text-step-1">
                {step.summary}
              </p>
            </div>

            <div className="grid gap-8">
              <div>
                <h3 className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
                  What happens
                </h3>
                <PixelList className="mt-4" items={step.activities} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-accent border-l-2 pl-4">
                  <h3 className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
                    What we need from you
                  </h3>
                  <p className="text-text-muted mt-2 text-sm">{step.needs}</p>
                </div>
                <div className="border-border-strong border-l-2 pl-4">
                  <h3 className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
                    What you receive
                  </h3>
                  <p className="text-text-muted mt-2 text-sm">{step.output}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section theme="light">
        <SectionHeader
          title="Start at step one"
          lead="Discovery is a conversation about your goals and constraints. No pitch deck, no service list."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/contact" size="lg">
            Book a call
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
