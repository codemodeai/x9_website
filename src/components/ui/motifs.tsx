import { cn } from "@/lib/cn";

/**
 * The three motifs lifted from the logo.
 * See docs/01-brand-design-system.md section 4.
 */

/** The `×` from the lockup, promoted to a typographic system element. */
export function XDivider({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("text-accent-text select-none", className)}>
      ×
    </span>
  );
}

/** Joins items with the `×` glyph. Used for pillar labels and inline lists. */
export function XList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-x-3">
          {i > 0 && <XDivider />}
          <span>{item}</span>
        </span>
      ))}
    </span>
  );
}

/** The detached square flanking the X. Section marker and list bullet. */
export function PixelMarker({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("bg-accent inline-block h-2 w-2 shrink-0", className)}
    />
  );
}

/** Bulleted list using the pixel marker instead of a disc. */
export function PixelList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <PixelMarker className="mt-2.5" />
          <span className="text-text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}
