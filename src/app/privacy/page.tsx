import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Clause, DraftNotice, Prose } from "@/components/ui/Legal";
import { BRAND } from "@/content/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} collects, uses and stores personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-step-6 font-extrabold">Privacy Policy</h1>
          <p className="text-text-subtle text-sm">
            Last updated: [DATE] · Effective: [DATE]
          </p>
        </div>
      </Section>

      <Section theme="light">
        <DraftNotice />
        <Prose>
          <p>
            This policy explains how [LEGAL ENTITY NAME] (&ldquo;{BRAND.name}
            &rdquo;, &ldquo;we&rdquo;) handles personal data collected through
            this website. It is written to describe what the site actually does;
            if our practices change, this page changes with them.
          </p>

          <Clause heading="1. Who we are">
            <p>
              [LEGAL ENTITY NAME], registered at [REGISTERED ADDRESS],
              [JURISDICTION]. For any question about this policy or your data,
              contact [PRIVACY CONTACT EMAIL].
            </p>
          </Clause>

          <Clause heading="2. What we collect">
            <p>When you submit the enquiry form, we collect:</p>
            <ul>
              <li>Your name and email address (required)</li>
              <li>Your company name, if you provide it</li>
              <li>The services you indicate interest in</li>
              <li>Your indicated budget range and timeline, if provided</li>
              <li>The message you write</li>
            </ul>
            <p>
              We also collect standard technical data through analytics —
              approximate location, device and browser type, pages visited and
              referring source. [CONFIRM WHICH ANALYTICS AND ADVERTISING TOOLS
              ARE IN USE: e.g. Vercel Analytics, Google Analytics 4, Meta Pixel,
              LinkedIn Insight Tag.]
            </p>
            <p>
              We do not ask for, and you should not send us, payment card
              details, government identification numbers or other sensitive
              personal data through this website.
            </p>
          </Clause>

          <Clause heading="3. Why we use it">
            <ul>
              <li>To respond to your enquiry and scope potential work</li>
              <li>To provide services you engage us for</li>
              <li>To measure and improve how this website performs</li>
              <li>To meet legal, tax and accounting obligations</li>
            </ul>
            <p>
              [IF MARKETING EMAILS WILL BE SENT, STATE IT HERE AND DESCRIBE THE
              OPT-IN AND UNSUBSCRIBE MECHANISM.]
            </p>
          </Clause>

          <Clause heading="4. Legal basis">
            <p>
              Where [JURISDICTION] law requires a legal basis, we rely on your
              consent for analytics and marketing, on the necessity of taking
              steps at your request before entering a contract for enquiry
              handling, and on our legitimate interest in operating and securing
              the site. [CONFIRM WITH COUNSEL — WORDING DEPENDS ON WHETHER GDPR,
              DPDP ACT OR ANOTHER REGIME APPLIES.]
            </p>
          </Clause>

          <Clause heading="5. Who we share it with">
            <p>
              We do not sell personal data. We share it only with service
              providers that operate this site and our business, and only as far
              as needed: [LIST ACTUAL PROCESSORS — e.g. hosting, database,
              email delivery, analytics, CRM]. Each is bound by contract to
              process data only on our instructions.
            </p>
          </Clause>

          <Clause heading="6. Where it is stored">
            <p>
              Enquiry data is stored in [DATA LOCATION / REGION]. If data leaves
              your jurisdiction, we rely on [TRANSFER MECHANISM]. [CONFIRM ONCE
              THE LEAD DATABASE AND EMAIL PROVIDER ARE PROVISIONED.]
            </p>
          </Clause>

          <Clause heading="7. How long we keep it">
            <p>
              Enquiries are retained for [RETENTION PERIOD] from last contact,
              after which they are deleted. Records we must keep for legal or
              accounting reasons are retained for the period the law requires.
            </p>
          </Clause>

          <Clause heading="8. Your rights">
            <p>
              Subject to [JURISDICTION] law, you may request access to the
              personal data we hold about you, correction of it, deletion of it,
              a copy in portable form, or restriction of how we use it. You may
              also withdraw consent at any time where we rely on it. To exercise
              any of these, email [PRIVACY CONTACT EMAIL]. If you are not
              satisfied with our response you may complain to [SUPERVISORY
              AUTHORITY].
            </p>
          </Clause>

          <Clause heading="9. Cookies">
            <p>
              [DESCRIBE COOKIE USE AND THE CONSENT MECHANISM. If non-essential
              cookies are set, a compliant consent banner is required before
              they load — this is a build item, not just a copy item.]
            </p>
          </Clause>

          <Clause heading="10. Security">
            <p>
              We apply reasonable technical and organisational measures to
              protect personal data, including encryption in transit and
              restricted access to the enquiry database. No system is perfectly
              secure, and we cannot guarantee absolute security.
            </p>
          </Clause>

          <Clause heading="11. Children">
            <p>
              This site is intended for business use and is not directed at
              children. We do not knowingly collect data from children.
            </p>
          </Clause>

          <Clause heading="12. Changes">
            <p>
              We may update this policy. Material changes will be reflected in
              the &ldquo;last updated&rdquo; date above and, where required,
              notified to you directly.
            </p>
          </Clause>

          <p>
            See also our{" "}
            <Link href="/terms" className="text-text">
              Terms of Use
            </Link>
            .
          </p>
        </Prose>
      </Section>
    </>
  );
}
