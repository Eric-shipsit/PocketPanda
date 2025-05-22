import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/dev") &&
    String(req?.nextauth?.token?.role) !== "admin"
  ) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/this-month/:path*",
    "/year/:path*",
    "/dev/:path*",
    "/reports/:path*",
  ],
};
