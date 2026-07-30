import Image from "next/image";
import type { PortfolioResult } from "@/content/portfolio";
import { Eyebrow } from "@/components/ui/Section";

/**
 * A results panel: the proof screenshot beside the numbers it evidences.
 *
 * The period is rendered next to the metrics on purpose. A number without a
 * timeframe is not a claim anyone can check, and this page is the one place on
 * the site that asserts outcomes rather than capabilities.
 */
export function ResultCard({ result }: { result: PortfolioResult }) {
  return (
    <article className="x9-chamfer bg-surface border-border grid gap-8 border p-6 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Eyebrow>
            {result.platform ?? "Results"}
            {result.period ? ` · ${result.period}` : ""}
          </Eyebrow>
          <h3 className="text-step-3 font-bold">{result.client}</h3>
          {result.summary && (
            <p className="text-text-muted text-sm">{result.summary}</p>
          )}
        </div>

        {/*
          At 320px each column is ~100px, and a 7-glyph figure like "699,097"
          set at step-5 does not fit. The numeral steps down a size on small
          screens and the delta is allowed to wrap onto its own line rather
          than forcing the column wider.
        */}
        <dl className="grid grid-cols-2 gap-5 sm:gap-6">
          {result.metrics.map((m) => (
            <div
              key={m.label}
              className="border-border grid min-w-0 gap-1 border-t pt-4"
            >
              <dt className="text-text-subtle order-2 text-xs font-semibold tracking-eyebrow uppercase">
                {m.label}
              </dt>
              <dd className="order-1 flex min-w-0 flex-wrap items-baseline gap-x-2">
                <span className="font-display text-accent-text text-step-4 sm:text-step-5 leading-none font-extrabold">
                  {m.value}
                </span>
                {m.delta && (
                  <span className="text-text-muted text-xs font-semibold">
                    {m.delta}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {result.screenshot && (
        /*
          object-contain, not cover. These are data screenshots — the numbers
          are the whole point, so cropping them to fill a box defeats the
          purpose. The light plate matches the screenshots' own background so
          the letterboxing reads as intentional.
        */
        <div className="x9-chamfer-sm border-border relative aspect-[3/2] overflow-hidden border bg-[#f4f4f6]">
          <Image
            src={result.screenshot}
            alt={
              result.screenshotAlt ??
              `${result.platform ?? "Campaign"} results for ${result.client}`
            }
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      )}
    </article>
  );
}
