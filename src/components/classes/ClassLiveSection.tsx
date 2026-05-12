import { Play, Radio, Users } from 'lucide-react'
import Link from 'next/link'

interface ClassLiveSectionProps {
  isLive: boolean
  liveStreamId?: string
  liveTitle?: string
  viewerCount?: number
}

export default function ClassLiveSection({
  isLive,
  liveStreamId,
  liveTitle,
  viewerCount,
}: ClassLiveSectionProps) {
  if (!isLive) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
        <Radio className="size-4 shrink-0 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No hay transmisión en vivo en este momento</p>
      </div>
    )
  }

  return (
    <div className="mb-2">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        En vivo ahora
      </h2>

      <Link
        href={liveStreamId ? `/clase/${liveStreamId}` : '#'}
        className="group flex gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-colors hover:bg-red-500/10"
      >
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="size-8 text-muted-foreground/40" />
          </div>
          <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            EN VIVO
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          {liveTitle && <h3 className="font-semibold leading-snug">{liveTitle}</h3>}
          {viewerCount !== undefined && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <Users className="size-3.5" />
              <span>{viewerCount} espectadores</span>
            </div>
          )}
        </div>

        <div className="hidden shrink-0 self-center md:flex">
          <span className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-red-600">
            Unirse
          </span>
        </div>
      </Link>
    </div>
  )
}
