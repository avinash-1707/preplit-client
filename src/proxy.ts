import { createAuthClient } from "better-auth/react";
import { NextRequest, NextResponse } from "next/server";

const { useSession } = createAuthClient();

export async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("better-auth.session");
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/interview"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthPath = ["/login", "/signup"].some((route) => {
    pathname.startsWith(route);
  });

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
  matcher: ["/dashboard/:path*", "/interview/:path*"],
};
