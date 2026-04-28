import type { ClassRecording } from '@/types/class'
import { Clock, Play } from 'lucide-react'
import Image from 'next/image'

interface ClassRecordingCardProps {
  recording: ClassRecording
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDuration(startedAt: string, endedAt: string): string {
  const diffMin = Math.round(
    (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 60000
  )
  if (diffMin < 60) return `${diffMin} min`
  const h = Math.floor(diffMin / 60)
  const m = diffMin % 60
  return m > 0 ? `${h} h ${m} min` : `${h} h`
}

export default function ClassRecordingCard({ recording }: ClassRecordingCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className="relative aspect-video w-full bg-muted">
        {recording.thumbnailUrl ? (
          <Image
            src={recording.thumbnailUrl}
            alt={recording.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play className="size-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">{recording.title}</h3>
        {recording.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{recording.description}</p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <span>{formatDate(recording.startedAt)}</span>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{formatDuration(recording.startedAt, recording.endedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
