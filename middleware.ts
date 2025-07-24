import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  loginPage: "/api/auth/login",
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
