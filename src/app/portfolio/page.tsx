import type { Metadata } from "next";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { XList } from "@/components/ui/motifs";
import { Reveal, SplitReveal } from "@/components/motion/SplitReveal";
import { VideoCard } from "@/components/portfolio/VideoCard";
import { DesignGrid } from "@/components/portfolio/DesignGrid";
import { SetupGallery } from "@/components/portfolio/SetupGallery";
import { ResultCard } from "@/components/portfolio/ResultCard";
import { ProfileLinks } from "@/components/portfolio/ProfileLinks";
import { SegmentScaffold } from "@/components/portfolio/SegmentScaffold";
import { DESIGNS, PROFILES, RESULTS, SETUP_SHOTS, VIDEOS } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Work from X9 Creatives — edited video for clients, behind the scenes from our shoots, and the performance results the work produced.",
  alternates: { canonical: "/portfolio" },
};

/**
 * Three segments, in the order the client asked for:
 *   1. CLIENT      — edited videos
 *   2. SETUP       — behind-the-scenes stills
 *   3. PERFORMANCE — results with proof screenshots
 *
 * Content lives in src/content/portfolio.ts. Empty segments are hidden in
 * production and shown as labelled scaffolds in development, so this page can
 * never ship with placeholder boxes on it.
 */
const isDev = process.env.NODE_ENV !== "production";

const PORTRAIT = VIDEOS.filter((v) => v.orientation === "portrait");
const LANDSCAPE = VIDEOS.filter((v) => v.orientation === "landscape");

export default function PortfolioPage() {
  const showVideos = VIDEOS.length > 0 || DESIGNS.length > 0;
  const showSetup = SETUP_SHOTS.length > 0;
  const showResults = RESULTS.length > 0;
  const nothingYet = !showVideos && !showSetup && !showResults;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      <Section className="border-border border-b">
        <div className="grid gap-6">
          <Reveal scroll={false} y={12} delay={0.1}>
            <XList
              items={["Client", "Setup", "Performance"]}
              className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase"
            />
          </Reveal>
          <SplitReveal
            as="h1"
            splitBy="chars"
            scroll={false}
            delay={0.25}
            className="text-step-7 max-w-4xl font-extrabold"
          >
            The work, the set, and the numbers
          </SplitReveal>
          <SplitReveal
            as="p"
            splitBy="lines"
            scroll={false}
            delay={0.6}
            className="text-text-muted x9-measure text-step-1"
          >
            Finished work is easy to show. So here is the shoot that produced it
            and the performance it went on to deliver — because a reel that
            looks good and a reel that works are not always the same reel.
          </SplitReveal>
        </div>
      </Section>

      {/* ── 1. CLIENT — edited videos ───────────────────────────────────── */}
      {(showVideos || isDev) && (
        <Section id="client">
          <SectionHeader
            eyebrow="01 — Client"
            title="Edited work"
            lead="Reels, motion graphics and campaign design cut for client channels."
          />
          <div className="mt-12 grid gap-16">
            {VIDEOS.length > 0 ? (
              /*
                Grouped by orientation. A 9:16 card is roughly twice the height
                of a 16:9 one, so mixing them in a single grid leaves a large
                dead gap under every landscape item.
              */
              <div className="grid gap-10">
                {PORTRAIT.length > 0 && (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {PORTRAIT.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                )}
                {LANDSCAPE.length > 0 && (
                  <div className="grid gap-8 sm:grid-cols-2">
                    {LANDSCAPE.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <SegmentScaffold
                label="Video"
                spec="Poster image + YouTube / Vimeo ID or MP4"
                aspect="aspect-[9/16]"
              />
            )}

            {DESIGNS.length > 0 && (
              <div className="grid gap-8">
                <h3 className="text-step-2 font-bold">Campaign design</h3>
                <DesignGrid designs={DESIGNS} />
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── 2. SETUP — behind the scenes ────────────────────────────────── */}
      {(showSetup || isDev) && (
        <Section id="setup" surface>
          <SectionHeader
            eyebrow="02 — Setup"
            title="Behind the scenes"
            lead="Lighting, framing and the days that produced the work above."
          />
          <div className="mt-12">
            {showSetup ? (
              <SetupGallery shots={SETUP_SHOTS} />
            ) : (
              <SegmentScaffold
                label="BTS still"
                spec="1600px long edge · JPG or WebP · needs alt text"
              />
            )}
          </div>
        </Section>
      )}

      {/* ── 3. PERFORMANCE — results ────────────────────────────────────── */}
      {(showResults || isDev) && (
        <Section id="performance">
          <SectionHeader
            eyebrow="03 — Performance"
            title="What it did"
            lead="Account and campaign results, with the screenshots they came from."
          />
          <div className="mt-12 grid gap-8">
            {showResults ? (
              RESULTS.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))
            ) : (
              <SegmentScaffold
                label="Result"
                spec="Insights screenshot + 2–4 metrics + timeframe"
                count={2}
                aspect="aspect-[16/9]"
              />
            )}
          </div>
          {PROFILES.length > 0 && (
            <div className="border-border mt-16 border-t pt-12">
              <ProfileLinks profiles={PROFILES} />
            </div>
          )}
        </Section>
      )}

      {/* Production fallback: page must never be blank if nothing is loaded. */}
      {nothingYet && !isDev && (
        <Section>
          <div className="grid gap-6">
            <Eyebrow>Coming soon</Eyebrow>
            <h2 className="text-step-4 max-w-2xl font-extrabold">
              Selected work is being published
            </h2>
            <p className="text-text-muted x9-measure">
              In the meantime, we will walk you through relevant work on a call.
            </p>
          </div>
        </Section>
      )}

      {/* ---------------------------------------------------------------- */}
      <Section theme="light">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="grid gap-6">
            <h2 className="text-step-5 max-w-3xl font-extrabold">
              Want this for your brand?
            </h2>
            <p className="text-text-muted x9-measure">
              Tell us what you are trying to move and we will show you the
              closest thing we have made to it.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <ButtonLink href="/contact" size="lg">
              Book a call
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              See the services
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
