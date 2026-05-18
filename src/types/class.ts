export interface Class {
  id: string
  name: string
  description?: string
  instructorName: string
  instructorAvatarUrl?: string
  thumbnailUrl?: string
  isLive: boolean
  liveStreamId?: string
}

export interface ClassRecording {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  startedAt: string
  endedAt: string
}

export interface ClassMaterial {
  id: string
  title: string
  description?: string
  fileUrl: string
  fileType: string
  createdAt: string
}

export interface ClassDetail {
  cls: Class
  recordings: ClassRecording[]
  materials: ClassMaterial[]
}

export interface ClassGrade {
  id: number
  name: string
  type: 'EXAM' | 'PROJECT' | 'PRESENTATION' | 'QUIZ'
  weight: number
  score: number | null
}
