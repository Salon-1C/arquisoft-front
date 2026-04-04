import type { Note } from '@/types/note'

export const MOCK_NOTES: Note[] = [
  {
    id: 'note-001',
    userId: 'mock-user-001',
    classId: 'class-001',
    classTitle: 'Introducción a React',
    content: 'Los hooks permiten usar estado en componentes funcionales.',
    createdAt: '2026-04-03T13:15:00Z',
    updatedAt: '2026-04-03T13:15:00Z',
  },
  {
    id: 'note-002',
    userId: 'mock-user-001',
    classId: 'class-002',
    classTitle: 'TypeScript avanzado',
    content: 'Los tipos genéricos permiten escribir código reutilizable con tipado fuerte.',
    createdAt: '2026-04-03T14:20:00Z',
    updatedAt: '2026-04-03T14:20:00Z',
  },
]
