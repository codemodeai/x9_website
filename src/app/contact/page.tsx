import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PROCESS } from "@/content/process";
import { CONTACT, RESPONSE_PROMISE, hasDirectContact } from "@/content/contact";
import { PixelList } from "@/components/ui/motifs";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start with discovery, not a pitch. Tell X9 Creatives what you are trying to solve and we will tell you which of our twelve services fits — or whether one does at all.",
  alternates: { canonical: "/contact" },
};

const DIRECT: { label: string; value: string | null; href?: string }[] = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
  { label: "WhatsApp", value: CONTACT.whatsapp },
  { label: "Office", value: CONTACT.address },
  { label: "Hours", value: CONTACT.hours },
];

export default function ContactPage() {
  const discovery = PROCESS[0];

  return (
    <>
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>Step 01 — Discovery</Eyebrow>
          <h1 className="text-step-7 max-w-4xl font-extrabold">
            Tell us the problem
          </h1>
          <p className="text-text-muted x9-measure text-step-1">
            The first conversation is about what your business needs, not what we
            sell. If a different service fits better — or none of ours do — we
            will say so.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <h2 className="sr-only">Enquiry form</h2>
            <ContactForm />
          </div>

          <aside className="grid h-fit gap-10">
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <p className="text-text-muted mt-4 text-sm">{RESPONSE_PROMISE}</p>
              <p className="text-text-muted mt-4 text-sm">{discovery.summary}</p>
              <PixelList className="mt-5" items={discovery.activities} />
              <p className="text-text-subtle mt-5 text-sm">
                <span className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
                  You&apos;ll receive —{" "}
                </span>
                {discovery.output}
              </p>
              <Link
                href="/process"
                className="text-accent-text mt-5 inline-block text-xs font-semibold tracking-eyebrow uppercase underline underline-offset-4 hover:no-underline"
              >
                See all nine steps →
              </Link>
            </div>

            {hasDirectContact && (
              <div className="border-border border-t pt-8">
                <Eyebrow>Direct</Eyebrow>
                <dl className="mt-4 grid gap-4">
                  {DIRECT.filter((d) => d.value).map((d) => (
                    <div key={d.label} className="grid gap-1">
                      <dt className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
                        {d.label}
                      </dt>
                      <dd className="text-text-muted text-sm">
                        {d.href ? (
                          <a href={d.href} className="hover:text-accent-text">
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
