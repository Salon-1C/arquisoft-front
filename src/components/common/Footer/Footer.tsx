import Image from 'next/image'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-screen-2xl px-6 pb-6 md:px-12">
      <div className="flex items-center justify-between rounded-2xl bg-muted px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/static/logo.png"
            alt="Blume logo"
            width={22}
            height={22}
            style={{ width: 22, height: 'auto' }}
          />
          <span className="font-semibold text-primary">Blume</span>
        </Link>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          Hecho con <Heart className="size-3.5 fill-primary text-primary" /> desde Colombia
        </p>
      </div>
    </footer>
  )
}
