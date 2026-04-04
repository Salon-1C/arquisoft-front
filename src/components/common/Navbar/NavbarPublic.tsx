'use client'

import Image from 'next/image'
import Link from 'next/link'
import ArrowButton from '@/components/ui/ArrowButton'

export default function NavbarPublic() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 md:px-12 py-3 md:py-3">
        {/* Logo + wordmark */}
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

        <ArrowButton href="/login">Ingresar</ArrowButton>
      </div>
    </header>
  )
}
