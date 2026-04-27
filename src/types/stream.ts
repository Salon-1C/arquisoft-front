import type { Class } from '@/types/class'

export interface StreamSession {
  classId: string
  // WHEP path consumed by VideoPlayer to open a WebRTC (WHEP) connection via
  // stream-engine. Format: `/live/<STREAM_KEY>`.
  // In development: use NEXT_PUBLIC_STREAM_KEY env var.
  // undefined when the class is in 'recorded' status (no live stream).
  streamPath: string | undefined
  // Initial viewer count from the REST response.
  // This value is stale — use useViewerCount hook for live updates via polling.
  initialViewerCount: number
}

export interface ClassWithSession {
  class: Class
  session: StreamSession | undefined // undefined when status === 'recorded'
}
