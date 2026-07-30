"use client";

import { useActionState, useId } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { signIn } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, {} as { error?: string });
  const uid = useId();

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-3">
        <Eyebrow>X9 Creatives</Eyebrow>
        <h1 className="text-step-4 font-extrabold">Lead inbox</h1>
        <p className="text-text-muted text-sm">
          Enquiries submitted through the website. Sign in to view them.
        </p>
      </div>

      {state.error && (
        <p
          role="alert"
          className="x9-chamfer-sm border-accent-2 bg-surface text-text border-l-4 p-4 text-sm font-medium"
        >
          {state.error}
        </p>
      )}

      <div className="grid gap-2">
        <label
          htmlFor={`${uid}-pw`}
          className="text-text-muted text-xs font-semibold tracking-eyebrow uppercase"
        >
          Password
        </label>
        <input
          id={`${uid}-pw`}
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="x9-chamfer-sm border-border-strong bg-surface text-text hover:border-accent focus:border-accent w-full border px-4 py-3 transition-colors duration-150 ease-x9"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </Button>
    </form>
  );
}
