/**
 * X9 Creatives mark — vector rebuild from Assets/Logo 1.jpeg.
 *
 * DEV PLACEHOLDER. The supplied logos are JPEGs: no transparency, and the
 * compression is chewing the neon edges (Volt on black is the worst case for
 * chroma subsampling). Replace with the client's official vector artwork —
 * see docs/01-brand-design-system.md section 5.
 *
 * Single-colour and driven by `currentColor`, so the same component works in
 * Volt on Ink, Ink on Bone, or Bone on Ink without a second file.
 */

interface X9MarkProps extends React.SVGProps<SVGSVGElement> {
  /** Renders as a labelled image. Omit inside a link/heading that already names the brand. */
  title?: string;
}

export function X9Mark({ title, ...props }: X9MarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {/*
        One path, fill-rule nonzero. Subpaths in order:
          1. primary stroke, corner to corner, chamfered terminals
          2. notch — wound in REVERSE so it subtracts and becomes a real hole
             (no <mask>, so no document-unique id is needed and this stays a
             server component)
          3. counter-stroke, cut short, same 28.3u width as the primary
          4/5. detached pixels, sitting exactly on the counter axis y = -x + 120
      */}
      <path
        fill="currentColor"
        d="M28 8 L112 92 L112 106 L106 112 L92 112 L8 28 L8 14 L14 8 Z
           M30 36 L30 47 L50 47 L50 36 Z
           M78 22 L98 42 L42 98 L22 78 Z
           M96 10 L110 10 L110 24 L96 24 Z
           M10 96 L24 96 L24 110 L10 110 Z"
      />
    </svg>
  );
}

/**
 * Horizontal lockup: mark + wordmark.
 *
 * NOTE: the official wordmark is a custom-drawn condensed face (it stylises the
 * "I" as an inverted exclamation). This sets the name in the display face as a
 * stand-in — swap for the client's vector lockup before launch.
 */
export function X9Lockup({
  className = "",
  markClassName = "",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <X9Mark className={`h-7 w-7 shrink-0 text-accent-text ${markClassName}`} />
      <span className="font-display text-step-2 leading-none font-extrabold tracking-tight uppercase">
        X9 Creatives
      </span>
    </span>
  );
}
