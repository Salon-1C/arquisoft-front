export type ClassStatus = 'live' | 'recorded'
export type ClassType = 'public' | 'private'

export interface Class {
  id: string
  title: string
  description: string
  instructorName: string
  instructorAvatarUrl?: string
  status: ClassStatus
  type: ClassType
  thumbnailUrl?: string
  startedAt: string
  endedAt?: string
}
