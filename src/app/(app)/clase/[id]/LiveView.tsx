'use client'

import VideoPlayer from '@/components/player/VideoPlayer'
import LiveBadge from '@/components/common/LiveBadge/LiveBadge'
import Link from 'next/link'
import { Radio } from 'lucide-react'
import { useViewerCount } from '@/hooks/useViewerCount'
import { useViewMode } from '@/context/ViewModeContext'

interface LiveViewProps {
  classId: string
  streamPath: string
  initialViewerCount: number
  isLive: boolean
}

export default function LiveView({ classId, streamPath, initialViewerCount, isLive }: LiveViewProps) {
  const viewerCount = useViewerCount(classId, initialViewerCount)
  const { isProfesor } = useViewMode()

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isLive && <LiveBadge />}
          <span className="text-sm text-muted-foreground">
            {viewerCount} {viewerCount === 1 ? 'espectador' : 'espectadores'}
          </span>
        </div>

        {isProfesor && (
          <Link
            href={`/transmitir?classId=${classId}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Radio className="size-3" />
            Transmitir esta clase
          </Link>
        )}
      </div>

      {/* Player always renders — state is determined by the WHEP connection, not by a DB flag */}
      <VideoPlayer streamPath={streamPath} />
    </section>
  )
}
