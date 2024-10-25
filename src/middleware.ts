import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { updateSession } from "./utils/supabase/middleware"
import { createClient } from "./utils/supabase/server"

export async function middleware(req: NextRequest) {
  await updateSession(req)

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname, origin } = req.nextUrl;

  const isPublicPath = PUBLIC_PATHS.has(pathname)
  if (user) {
    // if the user is authenticated and tries to access a public path or landing page, redirect to the root
    if (isPublicPath || pathname === "/landing") {
      return NextResponse.redirect(new URL('/', origin))
    }
    // allow authenticated users to access other protected pages
    return NextResponse.next()
  } else {
    // if the user is not authenticated and tries to access a protected page, redirect to the landing page
    if (!isPublicPath && pathname.startsWith("/")) {
      return NextResponse.redirect(new URL('/landing', origin))
    }
    // allow unauthenticated users to access public pages
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

const PUBLIC_PATHS = new Set([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/confirm",
  "/login",
  "/register",
  "/landing",
])