import Image from "next/image";
import type { ClientProfile } from "@/content/portfolio";
import { Eyebrow } from "@/components/ui/Section";

/**
 * Live client accounts. Screenshots prove what happened; a link lets someone
 * check it for themselves, which is the stronger signal.
 *
 * rel="noopener noreferrer nofollow" on every external link — nofollow so the
 * portfolio does not hand link equity to client profiles unintentionally.
 */

const PLATFORM_LABEL: Record<ClientProfile["platform"], string> = {
  instagram: "Instagram",
  youtube: "YouTube",
};

function PlatformIcon({ platform }: { platform: ClientProfile["platform"] }) {
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.83.91 1.4.17.42.37 1.05.42 2.2C21.98 8.4 22 8.8 22 12s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.42.43-.83.7-1.4.91-.42.17-1.05.37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.91-1.4c-.17-.42-.37-1.05-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.42-.43.83-.7 1.4-.91.42-.17 1.05-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.18a6.62 6.62 0 1 0 0 13.24 6.62 6.62 0 0 0 0-13.24Zm0 10.92a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.88-11.1a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z" />
    </svg>
  );
}

export function ProfileLinks({ profiles }: { profiles: ClientProfile[] }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Eyebrow>Accounts we run</Eyebrow>
        <p className="text-text-muted x9-measure text-sm">
          X9 manages the day-to-day publishing on these accounts — including the
          YouTube channel behind Beyond Headlines Media. Open any of them and
          judge the work directly.
        </p>
      </div>

      {/*
        min-w-0 all the way down. Grid and flex items default to
        `min-width: auto`, which refuses to shrink below content size — and the
        `truncate` spans inside set `white-space: nowrap`, so their min-content
        is the full untruncated string. Without this the list forced itself to
        460px inside a 327px column and pushed the page 109px wide on mobile.
      */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {profiles.map((p) => (
          <li key={`${p.platform}-${p.handle}`} className="min-w-0">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="x9-chamfer bg-surface border-border hover:border-accent group flex min-w-0 items-center gap-4 border p-4 transition-colors duration-150 ease-x9 sm:p-5"
            >
              {p.avatar && (
                <span className="x9-chamfer-sm relative h-12 w-12 shrink-0 overflow-hidden bg-white">
                  <Image
                    src={p.avatar}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </span>
              )}

              <span className="grid min-w-0 gap-1">
                <span className="text-step-0 min-w-0 truncate font-semibold">
                  {p.name}
                </span>
                <span className="text-text-subtle flex min-w-0 items-center gap-1.5 text-xs tracking-eyebrow uppercase">
                  <PlatformIcon platform={p.platform} />
                  <span className="min-w-0 truncate">
                    {PLATFORM_LABEL[p.platform]}
                    {p.note ? ` · ${p.note}` : ""}
                  </span>
                </span>
                {p.stats && (
                  <span className="text-accent-text min-w-0 truncate text-xs font-semibold">
                    {p.stats}
                  </span>
                )}
              </span>

              <span
                aria-hidden="true"
                className="text-accent-text ml-auto shrink-0 text-lg transition-transform duration-150 ease-x9 group-hover:translate-x-1"
              >
                ↗
              </span>
              <span className="sr-only">
                (opens {PLATFORM_LABEL[p.platform]} in a new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
