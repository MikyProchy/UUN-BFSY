import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api/")) {
    const IS_MOCK = true;

    if (!IS_MOCK) {
      return NextResponse.json(
        { message: "Not implemented (backend not available)" },
        { status: 503 },
      );
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
