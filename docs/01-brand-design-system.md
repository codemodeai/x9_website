# X9 Creatives — Brand & Design System v1

Derived from `Assets/Color Pallete.jpeg`, `Assets/Logo 1.jpeg`, `Assets/Logo 2.jpeg`.
This is the source of truth for the website palette. All contrast ratios below are computed
(WCAG 2.1 relative luminance), not estimated.

---

## 1. The critical palette finding

The five brand colors are **not interchangeable**. Two of them are dark-background-only:

| Color | Hex | Luminance | On `#0A0A0A` | On `#F7F3ED` |
|---|---|---|---|---|
| Ink | `#0A0A0A` | 0.003 | — | **17.9:1** ✅ |
| Bone | `#F7F3ED` | 0.900 | **17.9:1** ✅ | — |
| Volt | `#CCFF00` | 0.844 | **16.9:1** ✅ | **1.06:1** ❌ |
| Graphite | `#2A2A2A` | 0.023 | 1.38:1 (surface only) | 12.9:1 ✅ |
| Blaze | `#FF4D00` | 0.266 | **5.95:1** ✅ | **3.01:1** ❌ |

**Rules that fall out of this — treat as non-negotiable:**

1. **Volt (`#CCFF00`) is never text on a light background.** 1.06:1 is invisible. On Bone,
   Volt may only appear as a *fill* (button, chip, block) with Ink text on top.
2. **Volt buttons always take Ink text**, never white. Ink-on-Volt = 16.9:1.
3. **Blaze (`#FF4D00`) is never text on Bone**, and **never takes white text**
   (white-on-Blaze = 3.33:1, fails AA). Blaze fills take Ink text (5.95:1).
4. **Graphite is a surface, not a border.** 1.38:1 against Ink is below the 3:1 needed for a
   perceivable UI boundary. Borders need the derived tokens in §2.
5. The site is **dark-first**. The logo lockup, the palette weighting, and the fact that the
   brand's two accents both die on light backgrounds all point the same way. Light sections
   exist as deliberate inversions (pricing, long-form articles, forms), not as the default.

## 2. Token set

Ships as CSS custom properties → `tokens/x9-tokens.css`. Semantic names, not color names,
so a rebrand touches one file.

### Core
```
--x9-ink            #0A0A0A   page background (dark mode)
--x9-graphite       #2A2A2A   raised surface: cards, nav bar, input wells
--x9-bone           #F7F3ED   primary text on dark / page background (light mode)
--x9-volt           #CCFF00   primary accent — CTAs, active state, data highlights
--x9-blaze          #FF4D00   secondary accent — urgency, "performance" pillar, alerts
```

### Derived (needed; not in the source palette but required for accessible UI)
```
--x9-ink-raised     #141414   between Ink and Graphite — section banding
--x9-bone-70        #A8A49E   secondary text on dark        (8.3:1 ✅)
--x9-bone-45        #7A776F   muted / captions on dark      (4.6:1 ✅ — do not go lighter-to-darker than this)
--x9-line           #2A2A2A   hairline dividers (decorative only)
--x9-line-strong    #3D3D3D   interactive borders, focus rings on dark
--x9-volt-dim       #A3CC00   Volt hover/pressed state
--x9-blaze-dim      #CC3E00   Blaze hover/pressed state
```

### Semantic mapping
```
bg / surface / surface-2   → ink / ink-raised / graphite
text / text-muted / text-subtle → bone / bone-70 / bone-45
accent / accent-fg         → volt / ink
accent-2 / accent-2-fg     → blaze / ink
border / border-strong     → line / line-strong
focus-ring                 → volt (3px, offset 2px — 16.9:1 against Ink, always visible)
```

### Accent allocation (prevents the "neon everywhere" failure mode)
Volt is a **spotlight, not a paint**. Budget: ≤ 10% of any viewport's pixels.
- Volt: primary CTA, the "X" mark, active nav item, metric numerals, list markers, focus ring.
- Blaze: exactly one role per page — reserved for the *Performance Marketing / paid* surfaces
  and for genuine urgency (limited slots, error states). Never adjacent to Volt at equal size;
  the two vibrate. Separate them with Ink or Graphite.

## 3. Typography

The wordmark is a heavy **condensed squared** face with chamfered corners. Closest free match:

- **Display** — `Big Shoulders` 600/700/800, UPPERCASE, tracking `-0.01em`.
  Squared, condensed, chamfered — reads as a sibling of the logo without impersonating it.
  Use for H1/H2 and stat numerals only.
  (Google renamed this family from "Big Shoulders Display"; the old name no longer resolves
  in `next/font/google`. It also ships no fallback override metrics, so `layout.tsx` names a
  condensed fallback stack explicitly and disables `adjustFontFallback`.)
- **Body / UI** — `Inter` (variable). Neutral, high x-height, excellent at 14–18px.
- **Eyebrow / label** — `Inter` 600, `0.75rem`, `letter-spacing: 0.2em`, UPPERCASE.
  This is the tagline treatment (`STRATEGY × CREATIVE × PERFORMANCE × GROWTH`) promoted to a
  reusable component.

Scale (fluid, `clamp()`): 12 / 14 / 16 / 18 / 21 / 28 / 40 / 56 / 80 / 112px.
Display line-height `0.92`, body `1.6`, measure capped at `68ch`.

**Do not set body copy in the display face.** Condensed squared type below ~21px loses
legibility fast, and the PRD's service pages are copy-dense.

## 4. Motifs lifted from the logo

These give the site a brand signature that costs almost nothing to implement:

1. **Chamfer** — 45° cut corner, `clip-path: polygon(...)` at 10px. Applied to buttons, cards,
   and image frames. Never `border-radius` — the brand has zero curves.
2. **The `×` glyph** — used as an inline separator between list items, breadcrumb segments, and
   pillar labels. It's in the logo twice; make it a typographic system element.
3. **Detached pixel** — the small offset squares flanking the X. Use as a section-start marker
   and as the list bullet.
4. **Notch-out** — the negative-space rectangle inside the X. Becomes the hover state on cards:
   a small Volt square punches out of the corner.

Motion: fast and mechanical, matching the geometry. `150ms` for state changes, `400ms` for
section reveals, easing `cubic-bezier(0.2, 0, 0, 1)`. Reveals translate on one axis only.
All motion behind `prefers-reduced-motion`.

## 5. Asset gaps — blocking, needs client action

| Gap | Why it blocks | Ask |
|---|---|---|
| Logos are **JPEG** | No transparency, and JPEG compression is visibly mangling the neon edges — Volt on black is the worst case for chroma subsampling. Unusable on the web at any size. | **SVG** (vector) of both the mark and the horizontal lockup. |
| No favicon / app icon | — | Derived from `Logo 1` mark once SVG exists. |
| No OG / social share image | Every link shared is unbranded | 1200×630, Ink bg + lockup + Volt rule. |
| No monochrome logo variant | Needed for the light-inversion sections and for print/partner use | Ink-on-Bone and Bone-on-Ink single-color versions. |

Until SVGs arrive I'll rebuild the mark as inline SVG from the raster for development, but the
production build should use the client's official vector file.
