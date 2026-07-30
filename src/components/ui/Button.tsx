import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Foreground colours here are load-bearing, not stylistic:
 *   Ink on Volt  = 16.9:1  (white on Volt would be 1.1:1 — invisible)
 *   Ink on Blaze =  5.95:1 (white on Blaze would be 3.33:1 — fails AA)
 * Both accent variants therefore take --accent-fg / --accent-2-fg, which are Ink
 * in both themes. Do not "fix" these to white.
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover active:translate-y-px",
  secondary:
    "bg-accent-2 text-accent-2-fg hover:bg-accent-2-hover active:translate-y-px",
  ghost:
    "bg-transparent text-text border border-border-strong hover:border-accent hover:text-accent-text active:translate-y-px",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

const BASE =
  "x9-chamfer-sm inline-flex items-center justify-center gap-2 rounded-none " +
  "font-semibold uppercase tracking-[0.08em] whitespace-nowrap " +
  "transition-[background-color,color,border-color,transform] duration-150 ease-x9 " +
  "disabled:pointer-events-none disabled:opacity-40";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className"
  >) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    />
  );
}
