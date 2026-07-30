import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Clause, DraftNotice, Prose } from "@/components/ui/Legal";
import { BRAND } from "@/content/brand";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing use of the ${BRAND.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-step-6 font-extrabold">Terms of Use</h1>
          <p className="text-text-subtle text-sm">
            Last updated: [DATE] · Effective: [DATE]
          </p>
        </div>
      </Section>

      <Section theme="light">
        <DraftNotice />
        <Prose>
          <p>
            These terms govern your use of this website, operated by [LEGAL
            ENTITY NAME] (&ldquo;{BRAND.name}&rdquo;, &ldquo;we&rdquo;). By using
            the site you accept them. They do not govern any engagement for
            services — that is covered by a separate signed agreement.
          </p>

          <Clause heading="1. The site is information, not an offer">
            <p>
              Descriptions of services, deliverables and process on this site are
              provided for information. They are not an offer capable of
              acceptance, and they do not form part of any contract unless
              incorporated into a signed statement of work.
            </p>
          </Clause>

          <Clause heading="2. No guaranteed results">
            <p>
              Marketing, advertising and search outcomes depend on factors
              outside our control, including your market, budget, product and
              platform behaviour. Nothing on this site is a promise or guarantee
              of any specific result. Where we publish metrics, they describe
              what we measure, not what we warrant.
            </p>
          </Clause>

          <Clause heading="3. Enquiries">
            <p>
              Submitting the enquiry form does not create a contract or a
              client relationship. Do not send confidential information through
              it — wait until a confidentiality agreement is in place. See our{" "}
              <Link href="/privacy" className="text-text">
                Privacy Policy
              </Link>{" "}
              for how enquiry data is handled.
            </p>
          </Clause>

          <Clause heading="4. Intellectual property">
            <p>
              The content, design, code and marks on this site belong to [LEGAL
              ENTITY NAME] or its licensors. You may view and share it, but you
              may not copy, adapt or republish it commercially without written
              permission. Third-party trade marks referenced on this site
              belong to their respective owners.
            </p>
          </Clause>

          <Clause heading="5. Acceptable use">
            <ul>
              <li>Do not attempt to gain unauthorised access to the site or its systems</li>
              <li>Do not submit unlawful, misleading or infringing content</li>
              <li>Do not use automated means to scrape or overload the site</li>
              <li>Do not use the enquiry form to send unsolicited marketing</li>
            </ul>
          </Clause>

          <Clause heading="6. Third-party links">
            <p>
              The site may link to third-party sites. We do not control them and
              are not responsible for their content, products or practices.
            </p>
          </Clause>

          <Clause heading="7. Availability">
            <p>
              We aim to keep the site available but do not guarantee
              uninterrupted access. We may change, suspend or withdraw any part
              of it without notice.
            </p>
          </Clause>

          <Clause heading="8. Liability">
            <p>
              [LIABILITY WORDING MUST BE DRAFTED BY COUNSEL. Caps and exclusions
              vary by jurisdiction, and unenforceable wording is worse than none.
              Nothing should exclude liability for death or personal injury
              caused by negligence, for fraud, or for anything else that cannot
              lawfully be excluded.]
            </p>
          </Clause>

          <Clause heading="9. Governing law">
            <p>
              These terms are governed by the laws of [JURISDICTION], and the
              courts of [VENUE] have exclusive jurisdiction over any dispute.
            </p>
          </Clause>

          <Clause heading="10. Changes">
            <p>
              We may update these terms. The version published here at the time
              you use the site is the version that applies.
            </p>
          </Clause>

          <Clause heading="11. Contact">
            <p>
              Questions about these terms: [LEGAL CONTACT EMAIL], [LEGAL ENTITY
              NAME], [REGISTERED ADDRESS].
            </p>
          </Clause>
        </Prose>
      </Section>
    </>
  );
}
