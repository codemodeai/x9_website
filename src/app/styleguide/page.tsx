import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, CardLink, StatTile } from "@/components/ui/Card";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { ProcessRail, ProcessList } from "@/components/ui/ProcessRail";
import { PixelList, PixelMarker, XDivider, XList } from "@/components/ui/motifs";
import { X9Lockup, X9Mark } from "@/components/brand/X9Mark";
import { BRAND, PILLARS, SERVICES } from "@/content/brand";
import { contrast, grade } from "@/lib/contrast";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design system review surface — palette, type, motifs, components.",
  robots: { index: false, follow: false },
};

const INK = "#0a0a0a";
const BONE = "#f7f3ed";

const PALETTE = [
  { name: "Ink", hex: INK, role: "Page background (dark)" },
  { name: "Bone", hex: BONE, role: "Primary text on dark / light background" },
  { name: "Volt", hex: "#ccff00", role: "Primary accent" },
  { name: "Graphite", hex: "#2a2a2a", role: "Raised surface" },
  { name: "Blaze", hex: "#ff4d00", role: "Secondary accent — Performance only" },
];

const DERIVED = [
  { name: "Ink Raised", hex: "#141414", role: "Section banding" },
  { name: "Bone 70", hex: "#a8a49e", role: "Secondary text on dark" },
  { name: "Bone 45", hex: "#7a776f", role: "Muted text on dark — AA floor" },
  { name: "Line Strong", hex: "#3d3d3d", role: "Interactive borders" },
  { name: "Volt Dim", hex: "#a3cc00", role: "Volt hover" },
  { name: "Blaze Dim", hex: "#cc3e00", role: "Blaze hover" },
];

const TYPE_SCALE = [
  { token: "step-7", cls: "text-step-7", note: "Hero display" },
  { token: "step-6", cls: "text-step-6", note: "Stat numerals" },
  { token: "step-5", cls: "text-step-5", note: "Section title" },
  { token: "step-4", cls: "text-step-4", note: "Sub-section" },
  { token: "step-3", cls: "text-step-3", note: "Card title" },
  { token: "step-2", cls: "text-step-2", note: "Lead-in" },
  { token: "step-1", cls: "text-step-1", note: "Large body" },
  { token: "step-0", cls: "text-step-0", note: "Body" },
];

function GradePill({ ratio }: { ratio: number }) {
  const g = grade(ratio);
  const ok = g === "AAA" || g === "AA";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wider uppercase " +
        (ok
          ? "bg-accent text-accent-fg"
          : g === "AA-large"
            ? "bg-border-strong text-text"
            : "bg-accent-2 text-accent-2-fg")
      }
    >
      {ratio.toFixed(2)}:1 {g}
    </span>
  );
}

function SwatchRow({
  name,
  hex,
  role,
}: {
  name: string;
  hex: string;
  role: string;
}) {
  // A colour compared against itself is not a meaningful pairing — show a dash
  // rather than a "1.00:1 FAIL" that reads like a real problem.
  const onInk = hex === INK ? null : contrast(hex, INK);
  const onBone = hex === BONE ? null : contrast(hex, BONE);
  return (
    <tr className="border-border border-b align-middle">
      <td className="py-3 pr-4">
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="border-border-strong x9-chamfer-sm inline-block h-9 w-14 shrink-0 border"
            style={{ backgroundColor: hex }}
          />
          <span className="font-semibold whitespace-nowrap">{name}</span>
        </span>
      </td>
      <td className="text-text-muted py-3 pr-4 font-mono text-xs uppercase">
        {hex}
      </td>
      <td className="text-text-muted py-3 pr-4 text-sm">{role}</td>
      <td className="py-3 pr-4">
        {onInk === null ? (
          <span className="text-text-subtle">—</span>
        ) : (
          <GradePill ratio={onInk} />
        )}
      </td>
      <td className="py-3">
        {onBone === null ? (
          <span className="text-text-subtle">—</span>
        ) : (
          <GradePill ratio={onBone} />
        )}
      </td>
    </tr>
  );
}

export default function StyleguidePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Eyebrow>Phase 1 — design system review</Eyebrow>
          <h1 className="text-step-7 font-extrabold">Styleguide</h1>
          <p className="text-text-muted x9-measure text-step-1">
            Every token, motif and component in one place. Contrast ratios below
            are computed at render time from the hex values, not copied from the
            spec — if a pairing fails, it fails here first.
          </p>
          <XList
            items={BRAND.tagline}
            className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase"
          />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="01 — Colour"
          title="Brand palette"
          lead="Two of the five brand colours are dark-background-only. The ratios in the last two columns are why."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-border text-text-subtle border-b text-xs tracking-eyebrow uppercase">
                <th className="py-3 pr-4 font-semibold">Swatch</th>
                <th className="py-3 pr-4 font-semibold">Hex</th>
                <th className="py-3 pr-4 font-semibold">Role</th>
                <th className="py-3 pr-4 font-semibold">vs Ink</th>
                <th className="py-3 font-semibold">vs Bone</th>
              </tr>
            </thead>
            <tbody>
              {PALETTE.map((c) => (
                <SwatchRow key={c.hex} {...c} />
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-10">
          <h3 className="text-step-2 font-bold">The three rules</h3>
          <PixelList
            className="mt-5"
            items={[
              "Volt is never text on a light background — 1.06:1 against Bone is invisible. On light it may only be a fill with Ink on top.",
              "Volt and Blaze fills always take Ink text. White on Volt is 1.1:1; white on Blaze is 3.33:1 and fails AA.",
              "Graphite is a surface, not a border — 1.38:1 against Ink is below the 3:1 a UI boundary needs. Borders use Line Strong.",
            ]}
          />
        </Card>

        <h3 className="text-step-3 mt-14 font-bold">Derived neutrals</h3>
        <p className="text-text-muted x9-measure mt-3">
          Not in the supplied palette, but required — the five brand colours
          alone cannot express muted text or a perceivable border.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <tbody>
              {DERIVED.map((c) => (
                <SwatchRow key={c.hex} {...c} />
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <SectionHeader
          eyebrow="02 — Type"
          title="Scale"
          lead="Big Shoulders Display for headings and numerals only. Inter for everything that has to be read."
        />
        <div className="mt-10 grid gap-6">
          {TYPE_SCALE.map((t) => (
            <div
              key={t.token}
              className="border-border grid gap-2 border-t pt-5 md:grid-cols-[10rem_1fr] md:items-baseline"
            >
              <span className="text-text-subtle font-mono text-xs">
                {t.token}
                <span className="text-text-subtle/70 ml-2">{t.note}</span>
              </span>
              <span
                className={`${t.cls} ${t.token >= "step-3" ? "font-display font-extrabold uppercase" : ""}`}
              >
                Strategy × Creative
              </span>
            </div>
          ))}
          <div className="border-border grid gap-2 border-t pt-5 md:grid-cols-[10rem_1fr] md:items-baseline">
            <span className="text-text-subtle font-mono text-xs">eyebrow</span>
            <Eyebrow marker={false}>Strategy × Creative × Performance</Eyebrow>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="03 — Motifs"
          title="Marks"
          lead="Lifted from the logo: the chamfer, the × glyph, the detached pixel, and the notch punch-out."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <Eyebrow marker={false}>Mark</Eyebrow>
            <div className="mt-6 flex items-center gap-6">
              <X9Mark className="text-accent-text h-16 w-16" title="X9 Creatives" />
              <X9Mark className="text-text h-10 w-10" />
              <X9Mark className="text-text-subtle h-6 w-6" />
            </div>
            <p className="text-text-subtle mt-6 text-sm">
              Single-colour, driven by currentColor. Dev rebuild — replace with
              the client&apos;s official vector.
            </p>
          </Card>
          <Card>
            <Eyebrow marker={false}>Lockup</Eyebrow>
            <div className="mt-6">
              <X9Lockup />
            </div>
            <p className="text-text-subtle mt-6 text-sm">
              Wordmark is set in the display face as a stand-in for the custom
              lettering.
            </p>
          </Card>
          <Card interactive>
            <Eyebrow marker={false}>Notch-out</Eyebrow>
            <p className="text-text-muted mt-6 text-sm">
              Hover this card. A Volt square punches out of the top-right corner,
              echoing the negative space inside the X.
            </p>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <Eyebrow marker={false}>× divider</Eyebrow>
            <div className="mt-6 flex flex-col gap-4">
              <XList items={BRAND.tagline} className="font-semibold" />
              <span className="text-text-muted flex flex-wrap items-center gap-3 text-sm">
                Discovery <XDivider /> Research <XDivider /> Strategy
              </span>
            </div>
          </Card>
          <Card>
            <Eyebrow marker={false}>Pixel marker</Eyebrow>
            <PixelList
              className="mt-6"
              items={["Brand positioning", "Brand messaging", "Visual identity"]}
            />
          </Card>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <SectionHeader
          eyebrow="04 — Components"
          title="Buttons"
          lead="Accent foregrounds are Ink in both themes. That is an accessibility constraint, not a style choice."
        />
        <div className="mt-10 grid gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg">
              Book a call
            </Button>
            <Button variant="primary">Book a call</Button>
            <Button variant="primary" size="sm">
              Book a call
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary" size="lg">
              Start a campaign
            </Button>
            <Button variant="secondary">Start a campaign</Button>
            <Button variant="secondary" size="sm">
              Start a campaign
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="ghost" size="lg">
              See the work
            </Button>
            <Button variant="ghost">See the work</Button>
            <ButtonLink href="/styleguide" variant="ghost" size="sm">
              As a link
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader eyebrow="05 — Components" title="Cards & stats" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(["strategy", "creative", "performance"] as const).map((id) => (
            <CardLink key={id} href="/styleguide">
              <Eyebrow marker={false}>{PILLARS[id].name}</Eyebrow>
              <h3 className="text-step-3 mt-4 font-bold">{PILLARS[id].line}</h3>
              <span className="text-accent-text mt-6 inline-block text-xs font-semibold tracking-eyebrow uppercase">
                Explore →
              </span>
            </CardLink>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile value="12" label="Services" />
          <StatTile value="09" label="Process steps" />
          <StatTile value="04" label="Pillars" />
          <StatTile value="—" label="Case studies pending" />
        </div>
        <p className="text-text-subtle mt-6 text-sm">
          Stat values are placeholders. Real figures are a content dependency —
          see docs/02-website-plan.md section 7.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface>
        <SectionHeader
          eyebrow="06 — Components"
          title="Process rail"
          lead="The PRD repeats the same nine steps for all twelve services. It lives here once."
        />
        <div className="mt-10 grid gap-14">
          <ProcessRail />
          <ProcessList />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section theme="light">
        <SectionHeader
          eyebrow="07 — Inversion"
          title="Light sections"
          lead="Everything below re-resolves through [data-theme=light]. Volt and Blaze survive only as fills — their text roles fall back to Ink automatically."
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button variant="primary">Volt fill, Ink text</Button>
          <Button variant="secondary">Blaze fill, Ink text</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card interactive>
            <Eyebrow marker>Same component, inverted</Eyebrow>
            <h3 className="text-step-3 mt-4 font-bold">
              No component knows which theme it is in
            </h3>
            <p className="text-text-muted mt-4 text-sm">
              Semantic tokens are mapped with{" "}
              <code className="text-accent-text">@theme inline</code>, so
              utilities emit <code>var(--bg)</code> rather than a baked value and
              re-resolve inside any subtree.
            </p>
          </Card>
          <Card>
            <Eyebrow marker={false}>Accent as text</Eyebrow>
            <p className="text-accent-text mt-4 font-semibold">
              This line uses text-accent-text. On dark it renders Volt; here it
              falls back to Ink, because Volt on Bone is 1.06:1.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <PixelMarker />
              <span className="text-text-muted text-sm">
                The pixel marker keeps the Volt fill — fills are safe.
              </span>
            </div>
          </Card>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="08 — Content"
          title="Service data"
          lead={`All ${SERVICES.length} services are already loaded from the PRD into one typed data file. Phase 2 renders them through a single template.`}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.slug}
              className="border-border flex items-center gap-3 border-t pt-3"
            >
              <PixelMarker />
              <span className="text-sm">{s.name}</span>
              <span className="text-text-subtle ml-auto text-xs tracking-eyebrow uppercase">
                {PILLARS[s.pillar].name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
