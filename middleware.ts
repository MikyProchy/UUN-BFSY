import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const NODE_ENV = process.env.NODE_ENV;
  const IS_MOCK = NODE_ENV !== "production" && NODE_ENV !== "test";
  const isApiCall = req.nextUrl.pathname.startsWith("/api/");

  if (isApiCall && !IS_MOCK) {
    return NextResponse.json(
      { message: "Not implemented (backend not available)" },
      { status: 503 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
