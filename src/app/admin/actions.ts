"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  COOKIE_OPTIONS,
  adminIsConfigured,
  checkPassword,
  issueToken,
} from "@/lib/admin-auth";

export async function signIn(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  if (!adminIsConfigured()) {
    return { error: "Admin access is not configured on this deployment." };
  }

  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    // Small fixed delay: makes automated guessing slow and flattens any timing
    // difference left between a wrong password and a missing one.
    await new Promise((r) => setTimeout(r, 600));
    return { error: "Incorrect password." };
  }

  (await cookies()).set(ADMIN_COOKIE, issueToken(), COOKIE_OPTIONS);
  redirect("/admin");
}

export async function signOut() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
