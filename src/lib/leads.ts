/**
 * Lead delivery.
 *
 * Only ever imported from a "use server" action, so the service-role key stays
 * on the server. (Not using the `server-only` package to avoid an extra
 * dependency — if this module ever gets imported from a client component,
 * add it.)
 *
 * Deliberately fails closed. If no sink is configured the submission is
 * REJECTED and the user is told to email instead — it never returns success for
 * a lead that went nowhere. A contact form that silently swallows enquiries is
 * worse than no form, because the business does not know it is losing work.
 *
 * To enable, set both:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (server-only — never expose to the client)
 *
 * and create the table:
 *   create table public.leads (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz not null default now(),
 *     name text not null,
 *     email text not null,
 *     company text,
 *     services text[],
 *     budget text,
 *     timeline text,
 *     message text not null
 *   );
 *   alter table public.leads enable row level security;
 *   -- no policies: the service role bypasses RLS, anon gets nothing.
 */

export interface Lead {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget?: string;
  timeline?: string;
  message: string;
}

export type SinkResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "failed" };

export async function deliverLead(lead: Lead): Promise<SinkResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return { ok: false, reason: "not-configured" };

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        services: lead.services,
        budget: lead.budget || null,
        timeline: lead.timeline || null,
        message: lead.message,
      }),
    });

    if (!res.ok) {
      console.error("[leads] sink rejected submission", res.status, await res.text());
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[leads] sink threw", error);
    return { ok: false, reason: "failed" };
  }
}
