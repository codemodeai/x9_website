/**
 * Minimal class joiner. Deliberately dependency-free for now — every component
 * here uses explicit variant maps, so there are no competing Tailwind utilities
 * to de-conflict. If arbitrary className overrides start colliding, swap this
 * for clsx + tailwind-merge.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
