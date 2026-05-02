import type { ClassRecording } from '@/types/class'
import { Clock, Play } from 'lucide-react'
import Link from 'next/link'

interface ClassRecordingCardProps {
  recording: ClassRecording
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDuration(startedAt: string, endedAt: string): string {
  const diffMin = Math.round(
    (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 60000
  )
  if (diffMin < 1) return ''
  if (diffMin < 60) return `${diffMin} min`
  const h = Math.floor(diffMin / 60)
  const m = diffMin % 60
  return m > 0 ? `${h} h ${m} min` : `${h} h`
}

export default function ClassRecordingCard({ recording }: ClassRecordingCardProps) {
  const duration = recording.endedAt ? formatDuration(recording.startedAt, recording.endedAt) : ''

  return (
    <Link
      href={`/clase/${recording.id}`}
      className="group flex gap-4 px-5 py-4 transition-colors hover:bg-muted/60 md:px-8"
    >
      <div className="relative h-[90px] w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <Play className="size-7 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/60" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <h3 className="font-semibold leading-snug">{recording.title}</h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {duration && (
            <>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {duration}
              </span>
              <span>·</span>
            </>
          )}
          <span>{formatDate(recording.startedAt)}</span>
        </div>

        {recording.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{recording.description}</p>
        )}
      </div>
    </Link>
  )
}
