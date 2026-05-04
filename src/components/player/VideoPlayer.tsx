'use client'

import { useEffect, useRef, useState } from 'react'
import { startWhep } from '@/lib/stream/whep-client'
import { useAuth } from '@/hooks/useAuth'

interface VideoPlayerProps {
  streamPath: string
}

type PlayerState = 'idle' | 'connecting' | 'playing' | 'error'

export default function VideoPlayer({ streamPath }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<PlayerState>('idle')
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL
    if (!streamUrl || !streamPath || !videoRef.current) return

    let session: Awaited<ReturnType<typeof startWhep>> | null = null
    let cancelled = false

    setState('connecting')
    setError(null)

    startWhep({ streamUrl, path: streamPath, videoEl: videoRef.current, token: token || undefined })
      .then((s) => {
        if (cancelled) {
          void s.stop()
          return
        }
        session = s
        setState('playing')
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message)
        setState('error')
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
      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
          <span className="text-red-400 text-sm font-medium">Error al conectar</span>
          {error && <span className="text-white/60 text-xs">{error}</span>}
        </div>
      )}
    </div>
  )
}
