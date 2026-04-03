'use client'

import Link from 'next/link'
import { Flower2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function NavbarDashboard() {
  const { user } = useAuth()
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/explorar" className="flex items-center gap-2">
          <Flower2 className="size-5 text-primary" />
          <span className="font-semibold text-primary">Blume</span>
        </Link>

        {/* Avatar placeholder */}
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium select-none">
          {initial}
        </div>
      </div>
    </header>
  )
}
