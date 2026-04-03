import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_MOCK_MODE } from '@/config/dev'

const protectedRoutes = ['/mis-notas', '/configuracion', '/onboarding']
const authRoutes = ['/login', '/registro']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = AUTH_MOCK_MODE === 'authenticated'

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/explorar', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/mis-notas/:path*',
    '/configuracion/:path*',
    '/onboarding/:path*',
    '/login',
    '/registro',
  ],
}
