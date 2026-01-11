import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const target = BACKEND_URL + url.pathname + url.search;

  const res = await fetch(target, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      authorization: req.headers.get("authorization") ?? "",
      "content-type": req.headers.get("content-type") ?? "",
    },
    body: req.body,
    redirect: "manual",
  });

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const GET = proxy;
export const POST = proxy;
