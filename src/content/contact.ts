/**
 * Contact details.
 *
 * These are deliberately null. Every value here is a factual claim about the
 * client's business that I have no source for, and a wrong phone number or
 * address on a live site is worse than an absent one. The contact page renders
 * only the entries that are filled in, so populating these is the only step
 * needed — no markup changes.
 *
 * See docs/02-website-plan.md section 7, gap #6.
 */
export const CONTACT: {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  hours: string | null;
} = {
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  hours: null,
};

export const hasDirectContact = Object.values(CONTACT).some(Boolean);

/** DRAFTED — a service promise. Confirm before launch. */
export const RESPONSE_PROMISE = "We reply to every enquiry within one business day.";

/**
 * DRAFTED. Budget bands assume INR — the PRD's use of "AMC" points to an
 * India-first market. Confirm the currency and the band boundaries; these
 * are the single biggest lever on lead quality.
 */
export const BUDGET_BANDS = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000 – ₹15,00,000",
  "₹15,00,000+",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Just exploring",
] as const;
