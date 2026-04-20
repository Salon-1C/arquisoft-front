export interface CourseStream {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  startedAt: string
  endedAt?: string
  durationMinutes?: number // simulado para grabaciones
  status: 'live' | 'recorded'
  viewerCount?: number // solo significativo cuando está en vivo
}

export interface Course {
  id: string
  name: string
  description: string
  instructorName: string
  instructorAvatarUrl?: string
  streams: CourseStream[]
}
