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

## Lead inbox (`/admin`)

Whoever books a call through the contact form shows up at **`/admin`**, newest
first, with everything they submitted: name, email, company, services chosen,
budget band, timeline and message.

| Env var | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Enables sign-in. **Unset = nobody can sign in** — it fails closed rather than defaulting open. |
| `ADMIN_SESSION_SECRET` | Optional. Signs session cookies. Rotating it logs everyone out without changing the password. Falls back to `ADMIN_PASSWORD`. |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Where the leads are read from and written to. |

Set the production password yourself so it never passes through a chat log or
a file:

```bash
vercel env add ADMIN_PASSWORD production   # prompts for the value
vercel deploy --prod
```

**Why it is password-gated rather than an unlisted URL:** the inbox holds other
people's names, email addresses and messages. An unlisted URL is not access
control — anyone sent the link, or any crawler that finds it, would have the
lot. Sign-in exchanges the password for an HMAC-signed, httpOnly cookie that
expires after 12 hours; tampered, expired and future-dated cookies are all
rejected, and the password is compared in constant time.

`/admin` is `noindex, nofollow` and is not linked from anywhere on the public
site.
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
