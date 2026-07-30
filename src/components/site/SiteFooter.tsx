import Link from "next/link";
import { BRAND, PILLARS, servicesByPillar } from "@/content/brand";
import { X9Mark } from "@/components/brand/X9Mark";
import { XList } from "@/components/ui/motifs";

const PILLAR_ORDER = ["strategy", "creative", "performance", "growth"] as const;

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2fr]">
          <div className="grid gap-6">
            <X9Mark className="text-accent-text h-10 w-10" title="X9 Creatives" />
            {/* Canonical description — must stay verbatim across footer, /about and JSON-LD. */}
            <p className="text-text-muted x9-measure max-w-sm text-sm">
              {BRAND.description}
            </p>
            <XList
              items={BRAND.tagline}
              className="text-text-subtle text-xs font-semibold tracking-eyebrow uppercase"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PILLAR_ORDER.map((id) => (
              <div key={id} className="grid gap-4">
                <h2 className="text-text text-xs font-semibold tracking-eyebrow uppercase">
                  {PILLARS[id].name}
                </h2>
                {/* gap tightened and padding added to the links themselves:
                    same visual rhythm, but a ~30px tap target instead of 20px. */}
                <ul className="grid gap-0.5">
                  {servicesByPillar(id).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-text-muted hover:text-accent-text inline-block py-1.5 text-sm transition-colors duration-150 ease-x9"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border text-text-subtle mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-xs">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className="hover:text-text">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text">
              Terms
            </Link>
            <Link href="/styleguide" className="hover:text-text">
              Styleguide
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
