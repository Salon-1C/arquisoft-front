'use client'

import VideoPlayer from '@/components/player/VideoPlayer'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import { useViewerCount } from '@/hooks/useViewerCount'

interface LiveViewProps {
  classId: string
  streamPath: string
  initialViewerCount: number
  isLive: boolean
}

export default function LiveView({ classId, streamPath, initialViewerCount, isLive }: LiveViewProps) {
  const viewerCount = useViewerCount(classId, initialViewerCount)

  if (!isLive) {
    return (
      <section className="flex flex-col gap-4">
        <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-muted">
          <p className="text-sm text-muted-foreground">Grabación no disponible aún</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <LiveBadge />
        <span className="text-sm text-muted-foreground">
          {viewerCount} {viewerCount === 1 ? 'espectador' : 'espectadores'}
        </span>
      </div>
      <VideoPlayer streamPath={streamPath} />
    </section>
  )
}
