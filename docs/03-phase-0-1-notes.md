# Phase 0 + 1 + 2 — build notes

Status: **complete**. `npm run build` passes, `eslint` clean, `tsc --noEmit` clean.
18 routes prerendered. Review surfaces: `/styleguide`, `/services`, `/process`.

> **Local review:** `npm run dev`, then use `http://127.0.0.1:3000` — Chrome resolves
> `localhost` to `::1` on this machine, which the dev server does not serve.
> `next.config.ts` sets `allowedDevOrigins: ["127.0.0.1"]` so HMR works over that host.

## What shipped

```
tokens/x9-tokens.css          palette + derived neutrals + semantic aliases, both themes
src/app/globals.css           @theme inline mapping, base layer, chamfer utilities
src/app/layout.tsx            fonts, metadata, skip link, nav + footer
src/app/page.tsx              placeholder home (real composition is Phase 3)
src/app/styleguide/page.tsx   the Phase 1 acceptance surface
src/content/brand.ts          canonical description, 4 pillars, all 12 services, 9 process steps
src/components/brand/         X9Mark, X9Lockup
src/components/ui/            Button, Card, StatTile, Section, Eyebrow, ProcessRail, motifs
src/components/site/          SiteNav, SiteFooter
src/lib/                      cn, contrast (WCAG ratio calculation)
public/logo/x9-mark.svg       standalone vector mark
```

## Decisions worth knowing

**Token naming.** Every raw token is prefixed `--x9-`. Tailwind v4 reserves `--font-*`,
`--tracking-*`, `--leading-*`, `--ease-*`, `--color-*` and `--text-*` as `@theme` namespaces,
so an unprefixed `--font-display` in the token file would make the mapping self-referential
and silently produce a broken font stack.

**Why `@theme inline`.** It emits `background-color: var(--bg)` rather than baking the hex in.
That is the entire mechanism behind the light inversion — a component nested inside
`[data-theme="light"]` re-resolves without knowing it moved. Verified in the browser:
`text-accent-text` renders Volt on dark and falls back to Ink on Bone.

**The styleguide computes its own contrast ratios** at render time from the hex values
(`src/lib/contrast.ts`) instead of displaying numbers copied from the spec. Rendered output
matched the figures in `docs/01` exactly — 17.91, 16.85, 1.06 (fail), 5.95, 3.01, 1.38 (fail).
If someone edits a swatch, the failure shows up on the page rather than in review.

**The mark is one path, not five.** Both strokes share a winding direction so they union under
`fill-rule: nonzero`; the notch subpath is wound in reverse so it subtracts. This avoids a
`<mask>`, which would need a document-unique id, which would need `useId`, which would force
`X9Mark` to become a client component — a lot of shipped JS for a static logo.

## Phase 2 additions

```
src/content/process.ts            9 steps expanded: activities, client inputs, outputs
src/content/brand.ts              + SERVICE_OUTCOMES, SERVICE_ANSWERS (drafted)
src/lib/schema.tsx                Organization / Service / BreadcrumbList JSON-LD
src/app/services/page.tsx         index grouped by pillar
src/app/services/[slug]/page.tsx  one template, 12 static pages
src/app/process/page.tsx          the owned process asset
```

**Provenance is marked in the data.** `src/content/brand.ts` has an explicit divider:
everything above it is verbatim from the PRD, everything below was drafted by us and needs
client sign-off. Same for `src/content/process.ts`, which is drafted in full — the PRD gave
step names only.

**The boilerplate Success Metrics are gone.** Each service now lists its own KPIs
(`SERVICE_OUTCOMES`). These are metric *names* the service is measured on, deliberately not
claimed results — nothing on the site asserts a number X9 has achieved.

**Answer-first blocks** (`SERVICE_ANSWERS`) open each service page with a ≤50-word quotable
summary composed from the PRD's objective and deliverables. This is the AEO pattern the
SEO & LLM SEO service sells, applied to our own pages. Verified in rendered HTML: 3 JSON-LD
blocks per service page, unique title and description per route.

**Pillar accent is automatic.** Performance-pillar pages render the Blaze CTA, every other
pillar renders Volt, driven by `PILLARS[id].accent`. That keeps Blaze to its one role without
anyone having to remember the rule.

## Phase 3 additions

```
src/app/page.tsx                  full home composition
src/app/about/page.tsx            story, pillars, team (renders only when populated)
src/app/contact/page.tsx          form + what-happens-next
src/app/contact/ContactForm.tsx   client form, useActionState
src/app/contact/actions.ts        "use server" — validation, honeypot
src/app/contact/form-state.ts     FormState + INITIAL_STATE (see gotcha below)
src/lib/leads.ts                  fail-closed Supabase sink
src/content/contact.ts            contact details (null), budget bands, timelines
src/components/ui/Legal.tsx       Prose, Clause, DraftNotice
src/app/privacy, src/app/terms    legal scaffolds
```

**Decisions taken this phase.** No `/pricing` page — all pricing questions route to the
contact form, and the budget-band field is the instrument that will show whether that hurts
lead quality. Lead backend not provisioned; no cloud resources created.

**The form fails closed.** With no sink configured it rejects the submission and tells the
user to email instead, preserving everything they typed. It never reports success for a lead
that went nowhere — a form that silently swallows enquiries is worse than no form, because
the business cannot tell it is losing work. To enable, set `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` and create the table in the docblock at the top of
`src/lib/leads.ts`.

**Gotcha worth remembering:** a `"use server"` module may only export async functions.
Exporting `INITIAL_STATE` as a const from `actions.ts` threw at module evaluation
("can only export async functions, found object") — and neither `tsc --noEmit` nor `eslint`
caught it, because it is a runtime constraint. Only clicking the button surfaced it. Hence
`form-state.ts`.

**Nothing on these pages claims a result.** No proof bar, no testimonials, no case studies, no
invented team members, no fabricated contact details. The home stat tiles use counts derivable
from the PRD (12 services, 4 pillars, 9 steps) rather than outcomes. Every one of those
sections is built and waiting for real content.

## Motion — GSAP text reveal

```
src/components/motion/SplitReveal.tsx    SplitReveal + Reveal
```

`SplitReveal` splits text into lines, masks each line with `overflow: clip`, and slides the
characters (or whole lines) up out of the mask on a stagger — the treatment gsap.com uses on
its own headings. Applied to the home hero and to every heading and paragraph on `/about`.
`SectionHeader` takes an opt-in `animate` prop so other pages stay static unless asked.

GSAP 3.15; SplitText and ScrollTrigger are free in the public package since 3.13, so no Club
licence is needed.

**Two things that cost real debugging time:**

1. **Do not create the tween inside SplitText's `onSplit` callback**, even though that is the
   pattern in the GSAP docs. Doing so ties the tween's lifecycle to the SplitText instance;
   here it left the tween killed immediately after creation — `gsap.from` had baked in the
   start values, chars sat frozen 99px below their line masks, and `gsap.getTweensOf(char)`
   returned zero while the global timeline ran normally. It reproduced in the production build
   too, so it was not React StrictMode. Splitting and animating as two independent steps, with
   an explicit `fromTo`, fixed it.
2. **Fonts must be loaded before splitting**, or lines break against fallback metrics — but
   do NOT simply await `document.fonts.ready`. It waits for every face on the page (21 here),
   which left the hero blank for over a second on a hard reload. Since the `<h1>` is the LCP
   element, that is an LCP regression, not just a cosmetic delay. The wait is capped by racing
   `document.fonts.ready` against a 400ms deadline, with a 1.2s failsafe that force-reveals
   the text so the headline can never stay invisible because a font stalled.

Accessibility: `aria: "auto"` restores the original string as an `aria-label` and hides the
per-character fragments, so screen readers do not spell headings out. The text ships in the
server HTML and is split client-side, so crawlers see an intact `<h1>` — which matters more
than usual for an agency selling SEO and LLM SEO.

**Reduced motion:** the blanket rule in `globals.css` only kills CSS animation — GSAP writes
inline styles and ignores it — so the check happens in the component. If
`prefers-reduced-motion: reduce` is set, no split runs at all and the server-rendered text is
left untouched. Note that the dev machine used for this build has it enabled (Windows →
Settings → Accessibility → Visual effects → Animation effects), so the animation will not play
there until that is switched on.

## Portfolio

`/work` and `/insights` are gone, replaced by a single `/portfolio` with three segments:

| # | Segment | Holds | Data |
|---|---|---|---|
| 01 | **Client** | Edited videos — reels, shorts, long-form | `VIDEOS` |
| 02 | **Setup** | Behind-the-scenes stills | `SETUP_SHOTS` |
| 03 | **Performance** | Account/campaign results + proof screenshots | `RESULTS` |

All three live in `src/content/portfolio.ts` and start empty. Add entries and the page fills
in — no markup changes. Asset folders are created and waiting:
`public/portfolio/{videos,setup,results}`. Full specs and a commented example for each type
are at the top of the content file.

**Empty segments hide in production, and render a labelled dashed scaffold in development**
(`SegmentScaffold`, gated on `NODE_ENV`). An agency portfolio that ships with "add your
videos here" boxes is worse than one that ships a segment short, but the layout still needs
to be reviewable while the work is being collected. If every segment is empty, production
falls back to a short "selected work is being published" block rather than a blank page.

**Videos use a click-to-load facade.** Only the poster image renders until a visitor presses
play; the YouTube/Vimeo iframe is created on click. A dozen eagerly-embedded players would
each pull ~0.5MB and blow the performance budget in `docs/02-website-plan.md` section 5.
YouTube embeds use `youtube-nocookie.com`, so no tracking cookie is set for visitors who
never play.

### Real content loaded

| Segment | Loaded |
|---|---|
| 01 Client | 5 videos (2 portrait, 3 landscape) + 5 GBS Systems campaign designs |
| 02 Setup | 12 behind-the-scenes stills, **all faces obscured** |
| 03 Performance | Instagram organic + Meta Ads results, plus 4 live account links |

**"Accounts we run"** lists the live client accounts: three Instagram profiles and the Beyond
Headlines Media YouTube channel (35.6K subscribers · 3.5K videos), which X9 also manages.
Share URLs are stored stripped of their `utm_source` / `igsh` parameters — those identify
whoever copied the link, and there is no reason to publish that or to route every visitor
through someone else's attribution. The `stats` string is point-in-time; refresh it when it
drifts, since a subscriber count frozen for a year reads as a neglected page.

**Face blurring (`Assets/setup and bts` → `public/portfolio/setup`).** Faces were located with
OpenCV YuNet at 0.6 confidence, then a second high-sensitivity tiled pass over frame edges and
camera monitors. Detection alone was not enough — the wide pass missed a **crew member at the
right edge of one frame**, and two shots showed the subject's face on a camera preview screen.
Each region is mosaicked then blurred, which destroys the pixels rather than smoothing them,
so it cannot be sharpened back. Four images contain no people and were left untouched.
Verified by eye at full resolution, not just by the detector.
**Originals in `Assets/` are unmodified — only blurred copies were published. Any new still
must go through the same pass; never copy straight from `Assets/`.**

**Video (`Assets/Works` → `public/portfolio/videos`).** Sources ran 7–15 Mbps, which is
mastering bitrate. Re-encoded at CRF 26 with the short edge capped at 720 and `+faststart`:
**183MB → 10MB, ~94% smaller**, with no visible loss at card size.

All five files from `Assets/Works` are published. `Gemini_R0.mp4` and `Anireel_R0.mp4` are
AI-tool explainers (published as "AI workflow explainer" and "Script-to-animation explainer").
The Gemini poster is pulled from 00:40 rather than 00:20 — the earlier frame has the account
name "Hello, Suriya" on screen, which is no reason to publish.

**Before publishing:** client names, logos and account screenshots belong to the client —
confirm permission for each. In particular the **Meta Ads screenshot shows client campaign
names (brand + city) and exact spend**, which is commercially sensitive; get written sign-off
or have those two columns redacted. Crop result screenshots to the panel itself; Instagram and
Ads Manager views often carry DM lists, follower names or account emails at the edges.

## Mobile

Audited every page at **320 / 360 / 390 / 414 / 768px** and verified no horizontal overflow
at any of them, plus 1440px to confirm nothing regressed on desktop. Testing was done by
loading each route in a same-origin iframe at a fixed width — the browser window would not
resize below the desktop viewport, and an iframe gives media queries a genuine narrow
viewport rather than a simulated one.

Four real bugs, none of which were visible at desktop width:

1. **The header CTA never hid on mobile.** It carried `hidden sm:inline-flex`, but `Button`'s
   base class already sets `inline-flex`. Both are display utilities at equal specificity, so
   the winner is decided by order in the generated CSS — `hidden` lost, the button stayed
   visible at 375px and pushed the header 3px past the viewport on *every page*. Fixed by
   wrapping the button in `<div className="hidden sm:block">` rather than fighting utility
   order. Worth remembering as a general rule: **do not override `display` on a component
   whose base class already sets it.**
2. **The portfolio profile list forced the page 109px wide.** Grid and flex items default to
   `min-width: auto` and refuse to shrink below min-content, and the `truncate` spans inside
   set `white-space: nowrap`, so min-content was the full untruncated string. Needed `min-w-0`
   at every level, not just the one.
3. **Result metrics overflowed at 320px** — a 7-glyph figure like "699,097" at `step-5` does
   not fit a ~100px column. Numerals step down to `step-4` below `sm`, and the delta wraps.
4. **Styleguide motif card** had a non-wrapping flex row; added `flex-wrap`.

Tap targets: the mobile menu button was 36px and is now **44px**; the twelve contact-form
checkboxes were 16px boxes in ~23px rows and are now 20px boxes in 40px labels; the in-menu
"Book a call" was a 36px `sm` button and is now a full-width 44px one. Footer and pillar
service links gained vertical padding for a ~30px target without changing the visual rhythm.

The `/styleguide` palette tables still scroll horizontally inside their own container. That is
by design — wide data tables scroll in place rather than making the page scroll.

## Lead capture — live

Contact form → server action → Supabase → `/admin`. Verified end to end with a real
submission on 30 Jul 2026.

```
src/lib/leads.ts               deliverLead() + fetchLeads()
src/lib/admin-auth.ts          password check, HMAC session token
src/app/admin/                 login + guarded inbox
supabase/migrations/0001_leads.sql
```

**Supabase project** `cvjiwgfjblhdzkfiplau` — a different account from the one the
Supabase MCP is connected to, so DDL has to be run by hand in the SQL Editor; it cannot be
applied from here.

**RLS is the load-bearing part.** The `leads` table has RLS enabled and *no policies*, which
denies everything subject to it. Verified directly: the service-role key reads rows, the
publishable key gets `[]`. That matters because the publishable key is designed to be shipped
to browsers — if it could read this table, anyone viewing source could download every
enquiry. **Never add a policy granting `anon` select here.**

Env vars set in Vercel (Production, Preview, Development): `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, plus `ADMIN_PASSWORD` (set by the client, not stored here).

### Outstanding

- **Rotate `SUPABASE_SERVICE_ROLE_KEY`.** It was pasted into a chat transcript on 30 Jul.
  Supabase → Settings → API → rotate, then update it in the Vercel dashboard and redeploy.
- One test row from the client is in the table (`JAGADEESHWARAN B`). Left in place — theirs
  to delete.
- Optional `ADMIN_SESSION_SECRET` is unset, so session cookies are signed with the password.
  Setting it means the password can change without logging everyone out, and vice versa.

## Carried forward

- **Logo SVGs from the client still blocking.** `public/logo/x9-mark.svg` and the `X9Lockup`
  wordmark are dev rebuilds. The supplied JPEGs cannot ship: no transparency, and the
  compression is mangling the neon edges.
- No favicon, app icon, or OG image yet — all derive from the official mark.
- No 404s left in the nav — every linked route exists.
- Stat values on `/styleguide` are placeholders (the home page ones are real counts).
- **Blocking before launch:**
  1. Official logo SVGs — the JPEGs cannot ship.
  2. Legal pages must have every `[BRACKETED]` value filled and be reviewed by counsel. The
     `DraftNotice` banner must not be removed until that happens.
  3. Contact details in `src/content/contact.ts` — all null, so the "Direct" block is hidden.
  4. Confirm budget bands and currency in the same file. INR was assumed from the PRD's use of
     "AMC"; these bands are the biggest lever on lead quality.
  5. Lead sink env vars, or the form stays fail-closed.
- Still needed from the client: case studies, team bios, testimonials — the sections exist and
  render only when populated.
