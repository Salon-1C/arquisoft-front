export type ClassStatus = 'live' | 'recorded'
export type ClassType = 'public' | 'private'

export interface Class {
  id: string
  title: string
  description: string
  instructorName: string
  status: ClassStatus
  type: ClassType
  thumbnailUrl?: string
  viewerCount?: number
  startedAt: string
}