export interface Recording {
  id: string
  streamKey: string
  title: string
  description: string
  instructorName: string
  startedAt: string
  endedAt: string
  durationSec: number
  objectKey: string
  playbackUrl: string
  status: 'ready' | 'failed' | 'pending'
  createdAt: string
}

export interface RecordingsResponse {
  recordings: Recording[]
  count: number
}
