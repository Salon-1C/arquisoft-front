import type { Class } from '@/types/class'

export const MOCK_CLASSES: Class[] = [
  {
    id: 'class-001',
    title: 'Introducción a React',
    description: 'Fundamentos de React: componentes, estado y efectos.',
    instructorName: 'Carlos López',
    status: 'live',
    type: 'public',
    thumbnailUrl: undefined,
    startedAt: '2026-04-03T13:00:00Z',
  },
  {
    id: 'class-002',
    title: 'TypeScript avanzado',
    description: 'Tipos genéricos, utility types y decoradores.',
    instructorName: 'Ana Martínez',
    status: 'live',
    type: 'public',
    thumbnailUrl: undefined,
    startedAt: '2026-04-03T14:00:00Z',
  },
  {
    id: 'class-003',
    title: 'Diseño de APIs REST',
    description: 'Mejores prácticas para diseñar APIs REST con Spring Boot.',
    instructorName: 'Pedro Sánchez',
    status: 'recorded',
    type: 'public',
    thumbnailUrl: undefined,
    startedAt: '2026-04-01T10:00:00Z',
    endedAt: '2026-04-01T12:00:00Z',
  },
]
