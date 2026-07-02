import { headers } from "next/headers";
import { redirect } from "next/navigation";

// src/proxy.ts only checks that a session cookie *exists* — this layout is the
// real check: it asks the backend whether the session is actually valid.
async function hasValidSession(): Promise<boolean> {
  const cookie = (await headers()).get("cookie");
  if (!cookie) return false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
      {
        headers: { cookie },
        cache: "no-store",
      }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.session);
  } catch {
    // Backend unreachable — can't validate, treat as signed out.
    return false;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasValidSession())) {
    // Must clear the stale cookie before landing on /login, otherwise
    // src/proxy.ts sees the cookie and bounces straight back to /dashboard.
    redirect("/api/clear-session");
  }
  return <>{children}</>;
}
