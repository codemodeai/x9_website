import { cn } from "@/lib/cn";
import { PixelMarker } from "./motifs";
import { Reveal, SplitReveal } from "@/components/motion/SplitReveal";

/**
 * Eyebrow — the tagline treatment from Logo 2 promoted to a reusable label.
 * Letterspaced caps at 12px, never larger.
 */
export function Eyebrow({
  children,
  marker = true,
  className,
}: {
  children: React.ReactNode;
  marker?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-text-subtle flex items-center gap-2.5 text-xs font-semibold tracking-eyebrow uppercase",
        className,
      )}
    >
      {marker && <PixelMarker />}
      {children}
    </p>
  );
}

/**
 * Section wrapper. `theme="light"` flips the whole subtree to the Bone
 * inversion via the [data-theme] hook in tokens/x9-tokens.css — used for CTA
 * bands and long-form copy, not as a global mode.
 */
export function Section({
  children,
  theme,
  surface = false,
  className,
  id,
}: {
  children: React.ReactNode;
  theme?: "light";
  surface?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        "px-6 py-20 md:px-10 md:py-28",
        theme === "light" && "bg-bg text-text",
        surface && "bg-surface",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
  animate = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
  /** Opt in to the GSAP masked reveal. Off by default so pages stay static unless asked. */
  animate?: boolean;
}) {
  if (animate) {
    return (
      <header className={cn("grid gap-5", className)}>
        {eyebrow && (
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <SplitReveal as="h2" splitBy="chars" className="text-step-5 font-extrabold">
          {title}
        </SplitReveal>
        {lead && (
          <SplitReveal
            as="p"
            splitBy="lines"
            className="text-text-muted x9-measure text-step-1"
          >
            {lead}
          </SplitReveal>
        )}
      </header>
    );
  }

  return (
    <header className={cn("grid gap-5", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-step-5 font-extrabold">{title}</h2>
      {lead && <p className="text-text-muted x9-measure text-step-1">{lead}</p>}
    </header>
  );
}
