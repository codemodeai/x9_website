import Link from "next/link";
import { X9Mark } from "@/components/brand/X9Mark";

/**
 * Admin chrome.
 *
 * The public header and footer are hidden for this subtree by the
 * `body:has([data-admin])` rule in globals.css, rather than by moving every
 * public route into a `(site)` group just to escape the root layout. Same
 * result, far smaller change.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-admin className="bg-bg min-h-screen">
      <header className="border-border sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <X9Mark className="text-accent-text h-6 w-6" />
            <span className="font-display text-step-1 leading-none font-extrabold uppercase">
              Lead inbox
            </span>
          </Link>
          <Link
            href="/"
            className="text-text-subtle hover:text-text text-xs font-semibold tracking-eyebrow uppercase"
          >
            View site ↗
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
