import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"

export function middleware(req: NextRequest) {
    const isAuth = !!cookies().get("email")?.value

    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard/profile", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  }


export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}
