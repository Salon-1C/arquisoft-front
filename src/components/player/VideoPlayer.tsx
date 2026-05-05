'use client'

import { useEffect, useRef, useState } from 'react'
import { startWhep } from '@/lib/stream/whep-client'
import { useAuth } from '@/hooks/useAuth'

interface VideoPlayerProps {
  streamPath: string
}

type PlayerState = 'idle' | 'connecting' | 'playing' | 'waiting'

export default function VideoPlayer({ streamPath }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<PlayerState>('idle')
  const { token } = useAuth()

  useEffect(() => {
    const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL
    if (!streamUrl || !streamPath || !videoRef.current) return

    let session: Awaited<ReturnType<typeof startWhep>> | null = null
    let cancelled = false

    setState('connecting')

    startWhep({ streamUrl, path: streamPath, videoEl: videoRef.current, token: token || undefined })
      .then((s) => {
        if (cancelled) {
          void s.stop()
          return
        }
        session = s
        setState('playing')
      })
      .catch(() => {
        // WHEP failure = professor hasn't opened OBS yet. Not a fatal error.
        if (!cancelled) setState('waiting')
      })

    return () => {
      cancelled = true
      void session?.stop()
    }
  }, [streamPath])

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        controls
        className="w-full h-full"
      />
      {state === 'connecting' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <span className="text-white text-sm">Conectando al stream...</span>
        </div>
      )}
      {state === 'waiting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
          <span className="text-white/80 text-sm font-medium">
            Esperando a que el profesor inicie la transmisión...
          </span>
          <span className="text-white/40 text-xs">
            El video aparecerá aquí automáticamente
          </span>
        </div>
      )}
    </div>
  )
}
