import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Chamfered surface panel. The hover state is the "notch-out" motif: a Volt
 * square punches out of the top-right corner, echoing the negative space inside
 * the logo's X.
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "x9-chamfer bg-surface border-border relative border p-6 md:p-8",
        interactive &&
          "group hover:border-border-strong transition-colors duration-150 ease-x9",
        className,
      )}
    >
      {interactive && <NotchOut />}
      {children}
    </div>
  );
}

export function CardLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "x9-chamfer bg-surface border-border group hover:border-border-strong relative block border p-6 transition-colors duration-150 ease-x9 md:p-8",
        className,
      )}
    >
      <NotchOut />
      {children}
    </Link>
  );
}

/** The notch motif — hidden until hover/focus-within. */
function NotchOut() {
  return (
    <span
      aria-hidden="true"
      className="bg-accent absolute top-0 right-0 h-3 w-3 origin-top-right scale-0 transition-transform duration-150 ease-x9 group-hover:scale-100 group-focus-within:scale-100"
    />
  );
}

/** Large metric. Numerals in the display face; label in body. */
export function StatTile({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-border grid gap-1 border-t pt-5", className)}>
      <span className="font-display text-accent-text text-step-6 leading-none font-extrabold">
        {value}
      </span>
      <span className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase">
        {label}
      </span>
    </div>
  );
}
