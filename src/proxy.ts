import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/interview"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthPath = ["/login", "/signup"].some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !sessionCookie) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isAuthPath) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
