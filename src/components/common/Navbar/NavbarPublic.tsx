'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function NavbarPublic() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 md:px-12 md:py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/static/logo.png"
            alt="Blume logo"
            width={25}
            height={25}
            style={{ width: 25, height: 'auto' }}
          />
          <span className="text-lg font-semibold text-primary">Blume</span>
        </Link>

        {!isLoading && !isAuthenticated && (
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/registro">Registrarse</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
