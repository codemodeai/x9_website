/**
 * Placeholder shown where a portfolio segment has no entries yet.
 *
 * Rendered ONLY when NODE_ENV !== "production". An agency portfolio that ships
 * with "add your videos here" boxes on it is worse than one that ships with the
 * segment quietly absent, so production hides empty segments entirely — see
 * src/app/portfolio/page.tsx. This exists so the layout stays reviewable while
 * the real work is still being collected.
 */
export function SegmentScaffold({
  label,
  spec,
  count = 3,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  spec: string;
  count?: number;
  aspect?: string;
}) {
  return (
    <div>
      <p className="border-border-strong text-text-subtle x9-chamfer-sm mb-6 border border-dashed px-4 py-3 text-xs tracking-eyebrow uppercase">
        Dev only · empty segment · {label}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`x9-chamfer border-border-strong text-text-subtle flex flex-col items-center justify-center gap-2 border border-dashed p-6 text-center ${aspect}`}
          >
            <span aria-hidden="true" className="bg-border-strong h-2 w-2" />
            <span className="text-xs tracking-eyebrow uppercase">
              {label} {i + 1}
            </span>
            <span className="max-w-[22ch] text-xs">{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
