import Image from "next/image";
import type { PortfolioDesign } from "@/content/portfolio";

/** Creative design pieces — static posters, so this stays a server component. */
export function DesignGrid({ designs }: { designs: PortfolioDesign[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {designs.map((design) => (
        <figure key={design.id} className="group grid gap-3">
          <div className="x9-chamfer bg-surface border-border relative aspect-[4/5] overflow-hidden border">
            <Image
              src={design.src}
              alt={design.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-x9 group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="grid gap-1">
            <span className="text-step-0 font-semibold">{design.title}</span>
            <span className="text-text-subtle flex flex-wrap items-center gap-2 text-xs tracking-eyebrow uppercase">
              {design.client}
              {design.client && design.format && (
                <span aria-hidden="true" className="text-accent-text">
                  ×
                </span>
              )}
              {design.format}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
