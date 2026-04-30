import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/mis-clases', '/mis-notas', '/configuracion', '/onboarding']
const AUTH_ROUTES = ['/login', '/registro']

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

  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (authenticated) {
      return NextResponse.redirect(new URL('/explorar', request.url))
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
