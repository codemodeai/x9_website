import Link from "next/link";
import { PROCESS_STEPS } from "@/content/brand";
import { cn } from "@/lib/cn";

/**
 * The nine-step workflow is byte-identical across all 12 services in the PRD.
 * Rather than repeat a full diagram twelve times, service pages get this
 * compact rail and the detail lives once at /process.
 * See docs/02-website-plan.md section 1b.
 */
export function ProcessRail({
  className,
  href = "/process",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <div className={cn("grid gap-5", className)}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="bg-border h-px w-6 shrink-0" />
            )}
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "h-2 w-2 shrink-0",
                  i === 0 ? "bg-accent" : "bg-border-strong",
                )}
              />
              <span className="text-text-muted text-xs font-semibold tracking-eyebrow whitespace-nowrap uppercase">
                {step}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <Link
        href={href}
        className="text-accent-text w-fit text-xs font-semibold tracking-eyebrow uppercase underline underline-offset-4 hover:no-underline"
      >
        How we work →
      </Link>
    </div>
  );
}

/** Numbered vertical form, for /process itself. */
export function ProcessList({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-0", className)}>
      {PROCESS_STEPS.map((step, i) => (
        <li
          key={step}
          className="border-border grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t py-6 last:border-b"
        >
          <span className="font-display text-accent-text text-step-2 leading-none font-extrabold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-step-2 font-bold">{step}</h3>
        </li>
      ))}
    </ol>
  );
}
