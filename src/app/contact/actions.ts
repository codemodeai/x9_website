"use server";

import { SERVICES } from "@/content/brand";
import { BUDGET_BANDS, TIMELINES } from "@/content/contact";
import { deliverLead } from "@/lib/leads";
// FormState/INITIAL_STATE live in ./form-state because a "use server" module
// may only export async functions.
import type { FormState } from "./form-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const VALID_SERVICES = new Set(SERVICES.map((s) => s.name));
const VALID_BUDGETS = new Set<string>(BUDGET_BANDS);
const VALID_TIMELINES = new Set<string>(TIMELINES);

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const str = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";

  const name = str("name");
  const email = str("email");
  const company = str("company");
  const budget = str("budget");
  const timeline = str("timeline");
  const message = str("message");
  const services = formData
    .getAll("services")
    .map(String)
    .filter((s) => VALID_SERVICES.has(s));

  // Honeypot: a real user never sees or fills this field.
  if (str("website")) {
    // Report success to the bot so it does not retry, but deliver nothing.
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const values = { name, email, company, budget, timeline, message, services };
  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Please tell us a little more — at least a sentence.";
  if (budget && !VALID_BUDGETS.has(budget)) errors.budget = "Please pick an option.";
  if (timeline && !VALID_TIMELINES.has(timeline))
    errors.timeline = "Please pick an option.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const result = await deliverLead({
    name,
    email,
    company,
    services,
    budget,
    timeline,
    message,
  });

  if (!result.ok) {
    // Never claim success for a lead that went nowhere.
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? "This form isn't connected to our inbox yet. Please email us directly so your enquiry isn't lost."
          : "Something went wrong sending your enquiry. Please try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your enquiry is in. We'll come back to you shortly.",
  };
}
