"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X9Lockup } from "@/components/brand/X9Mark";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-bg/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" aria-label="X9 Creatives — home" className="shrink-0">
          <X9Lockup />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-150 ease-x9",
                  active
                    ? "text-accent-text"
                    : "text-text-muted hover:text-text",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute -bottom-1.5 left-0 h-0.5 w-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Wrapped rather than given `hidden sm:inline-flex` directly. Button's
            base class already sets `inline-flex`, and both are display
            utilities at the same specificity, so which one wins comes down to
            source order in the generated CSS — `hidden` lost, and the CTA stayed
            visible at 375px, pushing the header 3px past the viewport.
          */}
          <div className="hidden sm:block">
            <ButtonLink href="/contact" size="sm">
              Book a call
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            // 44px — this is the only navigation control on mobile, so it gets
            // a full touch target rather than the 36px the desktop rhythm wants.
            className="border-border-strong text-text x9-chamfer-sm inline-flex h-11 w-11 shrink-0 items-center justify-center border lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-border bg-bg border-t px-6 py-4 lg:hidden"
        >
          <ul className="grid">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-text-muted hover:text-text border-border block border-b py-3 text-sm font-semibold tracking-[0.08em] uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              {/* size="md" (44px) not "sm" — this is a primary CTA being tapped,
                  not a dense desktop toolbar button. */}
              <ButtonLink
                href="/contact"
                size="md"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book a call
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
