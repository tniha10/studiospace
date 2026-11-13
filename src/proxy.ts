import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic route protection only: it checks that a session cookie exists so
 * protected pages do not flash their content. The Express API still verifies
 * every request, so a forged cookie cannot read or change private data.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (sessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/studios/edit/:path*",
  ],
};
