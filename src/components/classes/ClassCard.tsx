import type { Class } from '@/types/class'
import { Clock, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function formatTimeAgo(startedAt: string): string {
  const diff = Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000)
  if (diff < 1) return 'Hace un momento'
  if (diff < 60) return `Hace ${diff} min`
  const h = Math.floor(diff / 60)
  if (h < 24) return `Hace ${h} h`
  const d = Math.floor(h / 24)
  return `Hace ${d} día${d > 1 ? 's' : ''}`
}

interface ClassCardProps {
  class: Class
}

export default function ClassCard({ class: cls }: ClassCardProps) {
  return (
    <Link
      href={`/clase/${cls.id}`}
      className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-shadow
        md:rounded-xl md:bg-background md:hover:shadow-sm"
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        {cls.thumbnailUrl ? (
          <Image
            src={cls.thumbnailUrl}
            alt={cls.title}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Play className="size-7 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 className="text-base font-semibold leading-snug">{cls.title}</h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">{cls.description}</p>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span>{formatTimeAgo(cls.startedAt)}</span>
        </div>
      </div>

      {/* Ingresar — desktop only */}
      <span className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex">
        Ingresar
      </span>
    </Link>
  )
}
