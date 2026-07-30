# X9 Creatives — Website Plan v1

Scope source: `X9_Creatives_Service_PRD_Detailed.docx` (12 services).
Design source: `docs/01-brand-design-system.md`, `tokens/x9-tokens.css`.

---

## 1. The structural read on the PRD

Three things in the PRD shape the entire build:

**a) All 12 services share an identical five-part shape** — Objective, Scope of Work,
Deliverables, Workflow, Success Metrics. That is a schema, not twelve documents. One
data-driven service template renders all twelve; adding service #13 is a data entry, not a
page build.

**b) The Workflow is byte-identical across all 12 services**
(`Discovery → Research → Strategy → Planning → Design/Execution → Review → Client Approval →
Delivery → Optimization`). Repeating a nine-step diagram twelve times reads as padding and
tells a visitor nothing about the specific service. Instead: promote it to **"The X9 Process"**
— one owned, well-designed page (`/process`) plus a compact 9-dot strip on each service page
that links there. It becomes a differentiator instead of filler.

**c) The Success Metrics text is boilerplate** — the same sentence twelve times
("Measured using project completion, client satisfaction, business KPIs…"). Published as-is,
this is the weakest copy on the site and it sits at the bottom of every service page, which is
exactly where a buyer decides. **Flagged as the #1 content gap** — see §7.

## 2. Pillar architecture

The tagline in `Logo 2` is already the information architecture:
`STRATEGY × CREATIVE × PERFORMANCE × GROWTH`. All 12 services map onto it:

| Pillar | Services |
|---|---|
| **STRATEGY** | Brand Strategy & Branding · Personal Branding |
| **CREATIVE** | Content Production · Creative Design · Social Media Management |
| **PERFORMANCE** | Performance Marketing · SEO & LLM SEO |
| **GROWTH** | Website Development · Landing Page Development · CRM & ERP Development · AI Automation · Maintenance & AMC |

GROWTH carries the five build/engineering services — framed as *"systems that compound"*
(the things that keep working after the campaign stops). If the client would rather split
engineering out, the clean alternative is a fifth pillar **BUILD**, at the cost of breaking the
tagline symmetry. Recommend keeping four.

Each pillar gets a color-coded accent position in navigation; **Blaze is assigned to
PERFORMANCE** (its only recurring role on the site, per the accent budget).

## 3. Sitemap

```
/                          Home
/services                  All 12, grouped by pillar
/services/[slug]           × 12 — one template, data-driven
/process                   The 9-step X9 Process (owned asset)
/portfolio                 Three segments: Client · Setup · Performance
/about                     Team, story, why X9         ⚠ team bios needed
/contact                   Form + calendar embed
/privacy, /terms           Legal
```

**Service slugs:** `brand-strategy`, `personal-branding`, `content-production`,
`social-media-management`, `performance-marketing`, `seo-llm-seo`, `website-development`,
`landing-page-development`, `crm-erp-development`, `ai-automation`, `creative-design`,
`maintenance-amc`.

## 4. Page compositions

### Home
1. **Hero** — Ink field, oversized display headline, the animated X mark, one Volt CTA
   ("Book a strategy call") + one ghost CTA ("See the work"). Eyebrow = the tagline.
2. **Proof bar** — logos / numbers. ⚠ needs real data; do not ship fake numbers.
3. **Four pillars** — four chamfered panels, each expanding to its services on hover.
4. **Selected work** — 3 case studies. ⚠ blocked on content.
5. **The Process** — the 9 steps as a horizontal Volt-marked track, links to `/process`.
6. **Capability grid** — all 12 services, compact, `×`-separated.
7. **Testimonial** — single, large. ⚠ needs content.
8. **CTA band** — the one light-inversion section on the page (Bone bg, Ink text, Volt fill).

### Service template (`/services/[slug]`)
Driven by one object per service in `content/services.ts`:
```ts
{ slug, name, pillar, objective, scope[], deliverables[], outcomes[], faqs[], related[] }
```
Sections: Hero (name + objective) → **Scope of Work** (`×`-marked grid) → **Deliverables**
(chamfered cards, "what lands in your inbox") → **Process strip** (9 dots → `/process`) →
**Outcomes** (replaces boilerplate Success Metrics — see §7) → FAQ (schema-marked) →
Related services within pillar → CTA.

### Process (`/process`)
The nine steps, one screen-section each, scroll-linked with a sticky Volt progress rail.
States per step: what happens, what X9 needs from the client, what the client receives.
This is the page that makes the agency feel operationally serious — worth the extra effort.

### Contact
Two-column: qualifying form left, direct contact + response-time promise right.
Form fields: name, email, company, service interest (multi-select of the 12), budget band,
timeline, message. Budget band is what makes the lead qualified rather than noise.

## 5. Technical stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | Static-rendered marketing pages; the agency sells website development, so the site must itself score well |
| Styling | **Tailwind v4** with `@theme` fed by `tokens/x9-tokens.css` | Single source of truth for the palette |
| Components | **shadcn/ui**, restyled to the chamfer/no-radius language | Accessible primitives; the default rounded look is overridden |
| Motion | **Motion (Framer Motion)** — reveals and the X mark only | Keep the bundle honest |
| Content | **MDX + typed content collections** for insights/case studies; services as a typed TS data file | No CMS cost at launch; the service schema is stable and rarely edited |
| Forms/leads | **Supabase** table + **Resend** notification | Owned lead data, not trapped in a form vendor |
| Analytics | Vercel Analytics + GA4 + Meta/LinkedIn pixels | They run paid campaigns; conversion tracking is table stakes |
| Hosting | **Vercel** | Preview deploys per branch |

**If the client wants non-developers editing services and case studies**, swap MDX for
**Sanity** (~2 extra days). Recommend launching on MDX and adding a CMS only if editing
frequency actually demands it.

**Performance budget** (enforced in CI via Lighthouse CI):
LCP < 1.8s · CLS < 0.05 · TBT < 150ms · JS < 130KB gzipped on the home route.
Self-host both fonts (`.woff2`, `font-display: swap`, preload display face only).

## 6. SEO & LLM SEO — the site must prove the service

X9 sells "LLM SEO / Answer Engine Optimization". The site is the proof, so this is not optional:

- **Structured data**: `Organization`, `LocalBusiness`, `Service` (per service page),
  `FAQPage`, `BreadcrumbList`, `Article`.
- **Answer-first copy**: every service page opens with a direct, quotable, ≤50-word answer to
  "what is X and what do I get" — the format extraction models actually lift.
- **Entity clarity**: one canonical description of X9 Creatives repeated verbatim in the
  footer, `about`, and schema, so models resolve the entity consistently.
- `llms.txt` at root, clean `sitemap.xml`, semantic HTML, real `<h1>`–`<h3>` hierarchy.
- Per-page unique title/description/OG; no template-filled duplicates across the 12 services.

## 7. Content gaps — blocking, needs client input

Ranked by how much they hurt:

1. **Success Metrics per service** — the PRD's identical boilerplate must be replaced with
   3–5 concrete outcome statements per service (e.g. Performance Marketing → "CPL, ROAS,
   qualified lead volume, CAC payback"). Without this, 12 pages end on a dead sentence.
2. **Portfolio content** — an agency site without proof cannot sell. `/portfolio` is built and
   waiting on three things: edited videos (poster + YouTube/Vimeo ID or MP4), behind-the-scenes
   stills, and performance results (screenshot + 2–4 metrics + timeframe). Drop them into
   `src/content/portfolio.ts`; no markup changes needed. Confirm client permission for every
   name, logo and account screenshot before publishing.
3. ~~**Pricing / engagement model**~~ — **decided: no `/pricing` page.** All pricing questions
   route to the contact form. Revisit if enquiry quality suffers; the budget-band field on the
   form is the instrument that will tell us.
4. **Team & founder story** — Personal Branding is a service they sell; their own About page
   has to demonstrate it.
5. **Testimonials** — minimum 3 with name, role, company, photo.
6. **Contact details** — address, phone, support email, service hours, legal entity name.
7. **Logo SVGs** — see `docs/01-brand-design-system.md` §5. Blocks final asset production.

I can draft 1, 4, and 6 from the PRD and have the client edit — that's usually faster than
waiting on a blank page.

## 8. Build phases

| Phase | Work | Est. |
|---|---|---|
| **0 — Foundation** | Next.js + Tailwind v4 scaffold, tokens wired, fonts self-hosted, logo rebuilt as SVG, chamfer/`×`/pixel primitives, base layout + nav + footer | 2–3 d |
| **1 — Design system in code** | Button/Card/Eyebrow/Section/StatTile/ProcessRail components, both themes, motion primitives, a `/styleguide` route to review it all in one place | 3–4 d |
| **2 — Service engine** | `content/services.ts` with all 12 from the PRD, service template, `/services` index, `/process` | 4–5 d |
| **3 — Home + core pages** | Home, About, Contact (+ Supabase/Resend), Pricing, legal | 4–5 d |
| **4 — Content surfaces** | `/insights` MDX pipeline, `/work` case study template | 3 d |
| **5 — SEO, analytics, a11y** | Schema, sitemap, `llms.txt`, pixels, Lighthouse CI, axe pass, keyboard + screen-reader audit | 2–3 d |
| **6 — Content load & launch** | Real copy, images, redirects, domain, launch checklist | 2–3 d |

≈ **20–26 working days** with content arriving in parallel. Phases 0–2 are unblocked and can
start immediately; phases 3–4 depend on §7.

## 9. Immediate next step

Say the word and I'll run **Phase 0 + 1**: scaffold the app, wire `tokens/x9-tokens.css` into
Tailwind v4, rebuild the X mark as SVG, and put up a `/styleguide` route so the full palette,
type scale, and components can be reviewed in the browser before any page gets built.
