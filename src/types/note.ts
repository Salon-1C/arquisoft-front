export interface Note {
  id: string
  userId: string
  classId?: string
  className?: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface NoteWithClass extends Note {
  classTitle?: string
}