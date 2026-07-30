import type { Metadata } from "next";
import { fetchLeads, type StoredLead } from "@/lib/leads";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { signOut } from "../actions";

export const metadata: Metadata = {
  title: "Lead inbox",
  robots: { index: false, follow: false },
};

// Always read live — a cached inbox showing yesterday's enquiries is worse
// than a slightly slower page.
export const dynamic = "force-dynamic";

function formatWhen(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
}

function LeadRow({ lead }: { lead: StoredLead }) {
  const when = formatWhen(lead.created_at);
  return (
    <article className="x9-chamfer bg-surface border-border grid gap-5 border p-5 md:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid min-w-0 gap-1">
          <h2 className="text-step-2 font-bold">{lead.name}</h2>
          <a
            href={`mailto:${lead.email}`}
            className="text-accent-text w-fit text-sm font-semibold break-all underline underline-offset-4 hover:no-underline"
          >
            {lead.email}
          </a>
          {lead.company && (
            <p className="text-text-muted text-sm">{lead.company}</p>
          )}
        </div>
        <p className="text-text-subtle shrink-0 text-right text-xs tracking-eyebrow uppercase">
          {when.date}
          <br />
          {when.time}
        </p>
      </header>

      {(lead.budget || lead.timeline) && (
        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {lead.budget && (
            <div className="grid gap-0.5">
              <dt className="text-text-subtle text-xs tracking-eyebrow uppercase">
                Budget
              </dt>
              <dd className="text-sm font-semibold">{lead.budget}</dd>
            </div>
          )}
          {lead.timeline && (
            <div className="grid gap-0.5">
              <dt className="text-text-subtle text-xs tracking-eyebrow uppercase">
                Timeline
              </dt>
              <dd className="text-sm font-semibold">{lead.timeline}</dd>
            </div>
          )}
        </dl>
      )}

      {lead.services?.length > 0 && (
        <div className="grid gap-2">
          <p className="text-text-subtle text-xs tracking-eyebrow uppercase">
            Interested in
          </p>
          <ul className="flex flex-wrap gap-2">
            {lead.services.map((s) => (
              <li
                key={s}
                className="x9-chamfer-sm border-border-strong text-text-muted border px-2.5 py-1 text-xs"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-border grid gap-2 border-t pt-4">
        <p className="text-text-subtle text-xs tracking-eyebrow uppercase">
          Message
        </p>
        {/* whitespace-pre-line: keep the line breaks they typed. */}
        <p className="text-text-muted x9-measure text-sm whitespace-pre-line">
          {lead.message}
        </p>
      </div>
    </article>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="x9-chamfer border-border bg-surface grid gap-3 border p-8">
      <h2 className="text-step-2 font-bold">{title}</h2>
      <div className="text-text-muted x9-measure grid gap-3 text-sm">{children}</div>
    </div>
  );
}

export default async function AdminInboxPage() {
  const result = await fetchLeads();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2">
          <Eyebrow>Enquiries</Eyebrow>
          <h1 className="text-step-5 font-extrabold">
            {result.ok
              ? `${result.leads.length} ${result.leads.length === 1 ? "enquiry" : "enquiries"}`
              : "Lead inbox"}
          </h1>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="sm">
            Sign out
          </Button>
        </form>
      </div>

      {!result.ok && result.reason === "not-configured" && (
        <Notice title="Not connected to a database yet">
          <p>
            Set <code className="text-accent-text">SUPABASE_URL</code> and{" "}
            <code className="text-accent-text">SUPABASE_SERVICE_ROLE_KEY</code>,
            then create the <code className="text-accent-text">leads</code> table
            using the SQL at the top of{" "}
            <code className="text-accent-text">src/lib/leads.ts</code>.
          </p>
          <p>
            Until then the contact form deliberately rejects submissions and
            tells people to email instead, so nothing is being silently lost.
          </p>
        </Notice>
      )}

      {!result.ok && result.reason === "failed" && (
        <Notice title="Could not read the database">
          <p>The credentials are set, but the query failed.</p>
          {result.detail && (
            <pre className="bg-bg border-border overflow-x-auto border p-3 text-xs">
              {result.detail}
            </pre>
          )}
        </Notice>
      )}

      {result.ok && result.leads.length === 0 && (
        <Notice title="No enquiries yet">
          <p>
            Submissions from the contact form will appear here, newest first.
          </p>
        </Notice>
      )}

      {result.ok && result.leads.length > 0 && (
        <div className="grid gap-5">
          {result.leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </main>
  );
}
