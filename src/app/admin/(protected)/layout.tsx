import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";

/**
 * Auth guard for everything at /admin except /admin/login.
 *
 * The route group keeps the URL as /admin while letting the login page sit
 * outside the guard. Any future admin page added inside this group is
 * protected automatically — nothing to remember.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyToken(token)) redirect("/admin/login");
  return <>{children}</>;
}
