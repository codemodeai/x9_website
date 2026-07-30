"use client";

import { useActionState, useId } from "react";
import { SERVICES } from "@/content/brand";
import { BUDGET_BANDS, TIMELINES } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { PixelMarker } from "@/components/ui/motifs";
import { submitEnquiry } from "./actions";
import { INITIAL_STATE, type FormState } from "./form-state";

const FIELD =
  "x9-chamfer-sm w-full border border-border-strong bg-surface px-4 py-3 text-text " +
  "placeholder:text-text-subtle transition-colors duration-150 ease-x9 " +
  "hover:border-accent focus:border-accent";

const LABEL = "text-xs font-semibold tracking-eyebrow uppercase text-text-muted";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="text-accent-2-text text-sm font-medium">
      {error}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitEnquiry,
    INITIAL_STATE,
  );
  const uid = useId();
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="x9-chamfer border-accent bg-surface border p-8"
      >
        <span className="flex items-center gap-3">
          <PixelMarker />
          <h2 className="text-step-3 font-bold">Enquiry received</h2>
        </span>
        <p className="text-text-muted mt-4">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-6" noValidate>
      {/* Honeypot — hidden from users, irresistible to bots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="x9-chamfer-sm border-accent-2 bg-surface border-l-4 p-4"
        >
          <p className="text-text text-sm font-medium">{state.message}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${uid}-name`} className={LABEL}>
            Name <span className="text-accent-text">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            autoComplete="name"
            defaultValue={typeof v.name === "string" ? v.name : ""}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? `${uid}-name-err` : undefined}
            className={FIELD}
          />
          <FieldError id={`${uid}-name-err`} error={err.name} />
        </div>

        <div className="grid gap-2">
          <label htmlFor={`${uid}-email`} className={LABEL}>
            Email <span className="text-accent-text">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={typeof v.email === "string" ? v.email : ""}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? `${uid}-email-err` : undefined}
            className={FIELD}
          />
          <FieldError id={`${uid}-email-err`} error={err.email} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${uid}-company`} className={LABEL}>
          Company
        </label>
        <input
          id={`${uid}-company`}
          name="company"
          autoComplete="organization"
          defaultValue={typeof v.company === "string" ? v.company : ""}
          className={FIELD}
        />
      </div>

      <fieldset className="grid gap-3">
        <legend className={LABEL}>What are you interested in?</legend>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <label
              key={s.slug}
              // min-h-10 + a larger box: a 16px checkbox is a miss-tap magnet on
              // a phone, and there are twelve of them.
              className="text-text-muted hover:text-text flex min-h-10 cursor-pointer items-center gap-3 py-1 text-sm transition-colors duration-150"
            >
              <input
                type="checkbox"
                name="services"
                value={s.name}
                defaultChecked={
                  Array.isArray(v.services) && v.services.includes(s.name)
                }
                className="accent-volt h-5 w-5 shrink-0"
              />
              {s.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${uid}-budget`} className={LABEL}>
            Budget
          </label>
          <select
            id={`${uid}-budget`}
            name="budget"
            defaultValue={typeof v.budget === "string" ? v.budget : ""}
            className={FIELD}
          >
            <option value="">Select a range</option>
            {BUDGET_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor={`${uid}-timeline`} className={LABEL}>
            Timeline
          </label>
          <select
            id={`${uid}-timeline`}
            name="timeline"
            defaultValue={typeof v.timeline === "string" ? v.timeline : ""}
            className={FIELD}
          >
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${uid}-message`} className={LABEL}>
          What are you trying to solve? <span className="text-accent-text">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          defaultValue={typeof v.message === "string" ? v.message : ""}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? `${uid}-message-err` : undefined}
          placeholder="The problem, not the shopping list — what does success look like?"
          className={FIELD}
        />
        <FieldError id={`${uid}-message-err`} error={err.message} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-text-subtle text-xs">
          Fields marked <span className="text-accent-text">*</span> are required.
        </p>
      </div>
    </form>
  );
}
