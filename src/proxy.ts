import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_MOCK_MODE } from '@/config/dev'

// Routes that require authentication
const PROTECTED_ROUTES = ['/mis-notas', '/configuracion', '/onboarding']

// Routes that should redirect authenticated users away
const AUTH_ROUTES = ['/login', '/registro']

function isAuthenticated(): boolean {
  // In development, read from the mock flag
  // In production, this will read the JWT cookie from the request
  return AUTH_MOCK_MODE === 'authenticated'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const authenticated = isAuthenticated()

  // Redirect authenticated users away from login/registro
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (authenticated) {
      return NextResponse.redirect(new URL('/explorar', request.url))
    }
    return NextResponse.next()
  }

  // Protect dashboard routes
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
