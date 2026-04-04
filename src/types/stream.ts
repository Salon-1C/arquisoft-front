import type { Class } from '@/types/class'

export interface StreamSession {
  classId: string
  // Direct URL to Cloudflare R2 — served by Go + Gin streaming server.
  // In development: undefined. VideoPlayer must handle this gracefully with a placeholder.
  // In production: `${NEXT_PUBLIC_STREAM_URL}/hls/{classId}/index.m3u8`
  hlsUrl: string | undefined
  // Initial viewer count from the REST response.
  // This value is stale — use useViewerCount hook for live updates via SSE.
  initialViewerCount: number
}

export interface ClassWithSession {
  class: Class
  session: StreamSession | undefined // undefined when status === 'recorded'
}
