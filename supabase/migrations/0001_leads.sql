-- Lead capture table for the website contact form.
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

create table if not exists public.leads (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null,
  email       text        not null,
  company     text,
  services    text[]      not null default '{}',
  budget      text,
  timeline    text,
  message     text        not null
);

-- The admin inbox lists newest first; this keeps that ordered read cheap.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- ── Access control ─────────────────────────────────────────────────────────
-- RLS on, and DELIBERATELY no policies.
--
-- Row Level Security with zero policies denies every request that is subject to
-- it, which is exactly what we want here:
--
--   * the anon / publishable key gets nothing. That key is designed to be shipped
--     to browsers, so if it could read this table, anyone who viewed source could
--     download every enquiry — names, emails and messages.
--   * the service_role key bypasses RLS by design. It lives only in server-side
--     environment variables on Vercel and is never sent to the client, so the
--     Next.js server can insert and read while nobody else can.
--
-- If you ever add a policy here, be certain it does not grant `anon` select.
alter table public.leads enable row level security;
