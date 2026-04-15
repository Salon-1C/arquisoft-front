import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = ['/mis-notas', '/configuracion', '/onboarding']


function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('blume_session')
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authenticated = isAuthenticated(request)

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!authenticated) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
