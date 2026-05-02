import type { CourseStream } from '@/types/course'
import { Clock, Play } from 'lucide-react'
import Link from 'next/link'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}

interface RecordedClassRowProps {
  stream: CourseStream
}

export default function RecordedClassRow({ stream }: RecordedClassRowProps) {
  return (
    <Link
      href={`/clase/${stream.id}`}
      className="group flex gap-4 px-5 py-4 transition-colors hover:bg-muted/60 md:px-8"
    >
      {/* Thumbnail */}
      <div className="relative h-[90px] w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <Play className="size-7 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/60" />
        </div>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <h3 className="font-semibold leading-snug">{stream.title}</h3>

        {/* Duration · Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {stream.durationMinutes !== undefined && (
            <>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatDuration(stream.durationMinutes)}
              </span>
              <span>·</span>
            </>
          )}
          <span>{formatDate(stream.startedAt)}</span>
        </div>

        {/* Description truncated */}
        <p className="line-clamp-2 text-sm text-muted-foreground">{stream.description}</p>
      </div>
    </Link>
  )
}
