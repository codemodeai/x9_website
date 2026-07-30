import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Admin session handling.
 *
 * The lead inbox contains other people's names, email addresses, company names
 * and free-text messages. That is personal data, so the page cannot simply be
 * an unlisted URL — anyone who guessed or was sent the link would have it. This
 * is deliberately the simplest thing that actually protects it: one shared
 * password, exchanged for a signed, httpOnly, short-lived cookie.
 *
 * Set ADMIN_PASSWORD to enable. If it is unset, /admin refuses to sign anyone
 * in rather than defaulting open.
 */

export const ADMIN_COOKIE = "x9_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12h — long enough for a working day

function sessionSecret(): string {
  // Falls back to the password so there is only one secret to manage, but a
  // separate ADMIN_SESSION_SECRET is better: rotating it logs everyone out
  // without changing the password.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

/** Fixed-length digest so comparisons never leak input length. */
function digest(value: string, key: string): Buffer {
  return createHmac("sha256", key).update(value).digest();
}

export function adminIsConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Both sides hashed first: timingSafeEqual throws on length mismatch, and
  // comparing raw strings would reveal the password's length through timing.
  return timingSafeEqual(digest(input, "x9-pw"), digest(expected, "x9-pw"));
}

export function issueToken(now = Date.now()): string {
  const payload = String(now);
  return `${payload}.${digest(payload, sessionSecret()).toString("hex")}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !sessionSecret()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = digest(payload, sessionSecret()).toString("hex");
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const issuedAt = Number(payload);
  if (!Number.isFinite(issuedAt)) return false;
  const age = Date.now() - issuedAt;
  return age >= 0 && age < MAX_AGE_SECONDS * 1000;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
