import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // 1. Check Better Auth session token & Instagram connection status
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better_auth_session")?.value ||
    request.cookies.get("session_token")?.value

  const isAuthenticated = Boolean(sessionToken)
  const isIgConnected = request.cookies.get("instadm_ig_connected")?.value === "true"

  // 2. Auth routes: /login, /signup, /signin, /register
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register")

  if (isAuthRoute) {
    if (isAuthenticated) {
      // If user is already logged in:
      // If they have connected Instagram -> send to /dashboard
      // Else -> send to /connect-instagram onboarding
      if (isIgConnected) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
      return NextResponse.redirect(new URL("/connect-instagram", request.url))
    }
    return NextResponse.next()
  }

  // 3. Connect Instagram route: /connect-instagram
  if (pathname.startsWith("/connect-instagram")) {
    if (!isAuthenticated) {
      // Must be logged in to connect Instagram
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If Instagram is already connected, redirect to /dashboard
    // unless user explicitly requests reconnecting with ?reconnect=true
    const isReconnecting = searchParams.get("reconnect") === "true"
    if (isIgConnected && !isReconnecting) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  }

  // 4. Protected routes: /dashboard and all /dashboard/:path*
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      // Unauthenticated visitor -> redirect to /login
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!isIgConnected) {
      // Logged in, but has not connected their Instagram yet -> redirect to /connect-instagram
      return NextResponse.redirect(new URL("/connect-instagram", request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (/api/*)
     * - static media files (svg, png, jpg, jpeg, gif, webp, mp4)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
}
