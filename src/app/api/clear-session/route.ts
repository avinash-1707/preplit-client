import { NextRequest, NextResponse } from "next/server";

// Better Auth default cookie names, plus their __Secure- variants used when
// the app runs over https.
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
  "better-auth.session_data",
  "__Secure-better-auth.session_data",
];

export function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  for (const name of SESSION_COOKIES) {
    res.cookies.delete(name);
  }
  return res;
}
