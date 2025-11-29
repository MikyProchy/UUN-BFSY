import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const IS_MOCK = true;
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
