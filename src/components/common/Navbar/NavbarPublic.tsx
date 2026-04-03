'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export default function NavbarPublic() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Flower2 className="size-5 text-primary" />
          <span className="font-semibold text-primary">Blume</span>
        </Link>

        {/* Center nav — hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/explorar"
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              pathname === '/explorar'
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Explorar
          </Link>
        </nav>

        {/* Right — auth buttons or avatar */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium select-none">
              {initial}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/registro">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
