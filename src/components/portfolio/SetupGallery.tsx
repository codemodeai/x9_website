import Image from "next/image";
import type { PortfolioSetupShot } from "@/content/portfolio";

/**
 * Behind-the-scenes stills. Server component — these are plain images, so no
 * client JS ships for this segment.
 */
export function SetupGallery({ shots }: { shots: PortfolioSetupShot[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {shots.map((shot) => (
        <figure
          key={shot.id}
          className={`group grid gap-3 ${shot.wide ? "lg:col-span-2" : ""}`}
        >
          <div
            className={`x9-chamfer bg-surface border-border relative overflow-hidden border ${
              shot.wide ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={
                shot.wide
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-500 ease-x9 group-hover:scale-[1.03]"
            />
          </div>
          {(shot.caption || shot.client) && (
            <figcaption className="text-text-subtle flex flex-wrap items-center gap-2 text-xs tracking-eyebrow uppercase">
              {shot.client}
              {shot.client && shot.caption && (
                <span aria-hidden="true" className="text-accent-text">
                  ×
                </span>
              )}
              {shot.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
