import type { Stream } from '@/types/stream'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
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

interface StreamCardProps {
  stream: Stream
}

export default function StreamCard({ stream }: StreamCardProps) {
  return (
    <Link
      href={`/canal/${stream.channelId}`}
      className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-shadow
        md:rounded-xl md:bg-background md:hover:shadow-sm"
    >
      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        {stream.thumbnailUrl ? (
          <Image
            src={stream.thumbnailUrl}
            alt={stream.title}
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

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          {stream.status === 'live' && <LiveBadge />}
          <h2 className="text-base font-semibold leading-snug truncate">{stream.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{stream.instructorName}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{stream.description}</p>
        {stream.startedAt && (
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-3.5 shrink-0" />
            <span>{formatTimeAgo(stream.startedAt)}</span>
          </div>
        )}
      </div>

      <span className="hidden shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex">
        Ingresar
      </span>
    </Link>
  )
}
