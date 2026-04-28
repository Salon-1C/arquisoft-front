export type StreamStatus = 'live' | 'recorded' | 'scheduled' | 'cancelled'
export type StreamType = 'public' | 'private'

export interface Stream {
  id: string
  channelId: string
  title: string
  description: string
  instructorName: string
  instructorAvatarUrl?: string
  status: StreamStatus
  type: StreamType
  thumbnailUrl?: string
  startedAt?: string
  endedAt?: string
}

export interface StreamSession {
  streamId: string
  streamPath: string | undefined
  initialViewerCount: number
}

export interface StreamWithSession {
  stream: Stream
  session: StreamSession | undefined
}
