# X9 Creatives — website

Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP.

```bash
npm install
npm run dev     # http://127.0.0.1:3000
npm run build
npm run lint
npm run typecheck
```

> Use `127.0.0.1`, not `localhost` — on some machines Chrome resolves `localhost`
> to `::1`, which the dev server does not serve. `next.config.ts` allows
> `127.0.0.1` as a dev origin so HMR works over it.

## Where things live

| Path | What |
|---|---|
| `tokens/x9-tokens.css` | Brand palette + type/geometry tokens. Single source of truth. |
| `src/app/globals.css` | Maps tokens into Tailwind's `@theme`. |
| `src/content/` | All copy and data: services, process, portfolio, contact. |
| `src/components/` | `brand/`, `ui/`, `site/`, `portfolio/`, `motion/`. |
| `docs/` | Design system, site plan, build notes. **Read these first.** |
| `/styleguide` | Live design-system reference (noindex). |

Content changes almost never need markup changes — edit the files in
`src/content/` and the pages follow.

## Before this goes live

1. **Logo** — `public/logo/x9-mark.svg` is a rebuild from a JPEG. Replace with
   the official vector, then generate favicon, app icon and OG image.
2. **Legal** — `/privacy` and `/terms` are scaffolds carrying a visible draft
   banner and `[BRACKETED]` placeholders. They need counsel review; do not
   remove the banner until that has happened.
3. **Contact details** — `src/content/contact.ts` is all `null`, so the direct
   contact block is hidden. Confirm the budget bands and currency there too.
4. **Lead capture** — the contact form fails closed until `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` are set. Table DDL is in `src/lib/leads.ts`.
   It will never report success for an enquiry that went nowhere.
5. **Client permissions** — portfolio names, logos and account screenshots
   belong to the clients. The Meta Ads screenshot shows campaign names and ad
   spend; get sign-off or redact those columns.

## Source material is not in this repo

`Assets/` is gitignored on purpose. It holds the **original, unblurred**
behind-the-scenes photographs — faces of clients and crew are visible — plus
~198MB of raw video. Only the face-obscured, web-sized copies under
`public/portfolio/` are published.

Keep `Assets/` backed up privately. If you add a behind-the-scenes still, it
must go through the same face-blurring pass; never copy one straight from
`Assets/` into `public/`.
