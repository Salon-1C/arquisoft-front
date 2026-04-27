'use client'

import VideoPlayer from '@/components/player/VideoPlayer'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import { useViewerCount } from '@/hooks/useViewerCount'

interface LiveViewProps {
  classId: string
  streamPath: string
  initialViewerCount: number
}

export default function LiveView({ classId, streamPath, initialViewerCount }: LiveViewProps) {
  const viewerCount = useViewerCount(classId, initialViewerCount)

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
