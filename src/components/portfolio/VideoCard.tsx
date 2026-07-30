"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioVideo } from "@/content/portfolio";

/**
 * Click-to-load facade. Nothing but a poster image renders until the visitor
 * asks to play — embedding a dozen YouTube iframes on page load would pull in
 * roughly half a megabyte each and wreck the performance budget in
 * docs/02-website-plan.md section 5. The iframe is only created on click.
 */
export function VideoCard({ video }: { video: PortfolioVideo }) {
  const [playing, setPlaying] = useState(false);

  const aspect =
    video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

  const embedSrc = video.youtubeId
    ? // -nocookie so no tracking cookie is set for visitors who never play.
      `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`
    : video.vimeoId
      ? `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1`
      : null;

  return (
    <figure className="group grid gap-3">
      <div
        className={`x9-chamfer bg-surface border-border relative overflow-hidden border ${aspect}`}
      >
        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-x9 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-ink/25 transition-colors duration-150 group-hover:bg-ink/10"
            />
            {/* Play affordance built from the chamfer motif, not a rounded pill. */}
            <span
              aria-hidden="true"
              className="x9-chamfer-sm bg-accent text-accent-fg absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M6 4l14 8-14 8z" />
              </svg>
            </span>
          </button>
        )}

        {playing && embedSrc && (
          <iframe
            src={embedSrc}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}

        {playing && !embedSrc && video.src && (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      <figcaption className="grid gap-1">
        <span className="text-step-0 font-semibold">{video.title}</span>
        <span className="text-text-subtle flex flex-wrap items-center gap-2 text-xs tracking-eyebrow uppercase">
          {video.client}
          {video.client && video.format && (
            <span aria-hidden="true" className="text-accent-text">
              ×
            </span>
          )}
          {video.format}
        </span>
      </figcaption>
    </figure>
  );
}
