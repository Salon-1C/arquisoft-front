import type { CourseStream } from '@/types/course'
import { Play, Users } from 'lucide-react'
import Link from 'next/link'

interface LiveStreamBannerProps {
  stream: CourseStream
}

export default function LiveStreamBanner({ stream }: LiveStreamBannerProps) {
  const isLive = stream.status === 'live'

  return (
    <div className="px-5 mb-6 md:px-8">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {isLive ? 'En vivo ahora' : 'Última transmisión'}
      </h2>

      <Link
        href={`/clase/${stream.id}`}
        className={`group flex gap-4 rounded-xl border p-4 transition-colors ${
          isLive
            ? 'border-red-500/20 bg-red-500/5 hover:bg-red-500/10'
            : 'border-border bg-muted/40 hover:bg-muted/60'
        }`}
      >
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="size-8 text-muted-foreground/40" />
          </div>
          {isLive ? (
            <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-white" />
              </span>
              EN VIVO
            </span>
          ) : (
            <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
              GRABACIÓN
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <h3 className="font-semibold leading-snug">{stream.title}</h3>
          {isLive && stream.viewerCount !== undefined && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <Users className="size-3.5" />
              <span>{stream.viewerCount} espectadores</span>
            </div>
          )}
          <p className="line-clamp-2 text-sm text-muted-foreground">{stream.description}</p>
        </div>

        <div className="hidden shrink-0 self-center md:flex">
          <span
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
              isLive ? 'bg-red-500 group-hover:bg-red-600' : 'bg-primary group-hover:opacity-90'
            }`}
          >
            {isLive ? 'Unirse' : 'Ver grabación'}
          </span>
        </div>
      </Link>
    </div>
  )
}
