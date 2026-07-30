import { cn } from "@/lib/cn";

/** Long-form legal copy. Rendered in the light inversion for readability. */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "x9-measure grid gap-10",
        "[&_h2]:text-step-3 [&_h2]:font-bold",
        "[&_h3]:text-step-1 [&_h3]:font-bold",
        "[&_p]:text-text-muted [&_li]:text-text-muted",
        "[&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_li]:list-disc",
        "[&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Clause({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3">
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

/**
 * Unmissable pre-launch banner. Legal pages are the one place where plausible
 * placeholder text is actively dangerous — it reads as a binding document.
 * Delete this component's usage only when counsel has signed the copy off.
 */
export function DraftNotice() {
  return (
    <div
      role="note"
      className="x9-chamfer-sm border-accent-2 bg-surface mb-12 border-l-4 p-5"
    >
      <p className="text-text text-sm font-semibold">
        Draft — not legal advice, not yet in force.
      </p>
      <p className="text-text-muted mt-2 text-sm">
        This document is a structural scaffold describing what the site actually
        does. Every <code>[BRACKETED]</code> value must be filled in and the whole
        text reviewed by qualified counsel in your jurisdiction before launch.
      </p>
    </div>
  );
}
