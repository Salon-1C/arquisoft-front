import type { Stream } from '@/types/stream'

export const MOCK_STREAMS: Stream[] = [
  {
    id: 'stream-001',
    channelId: 'class-001',
    title: 'Introducción a React – Sesión en vivo',
    description: 'Fundamentos de React: componentes, estado y efectos.',
    instructorName: 'Carlos López',
    status: 'live',
    type: 'public',
    startedAt: '2026-04-03T13:00:00Z',
  },
  {
    id: 'stream-002',
    channelId: 'class-002',
    title: 'TypeScript avanzado – Sesión en vivo',
    description: 'Tipos genéricos, utility types y decoradores.',
    instructorName: 'Ana Martínez',
    status: 'live',
    type: 'public',
    startedAt: '2026-04-03T14:00:00Z',
  },
  {
    id: 'stream-003',
    channelId: 'class-003',
    title: 'Diseño de APIs REST',
    description: 'Mejores prácticas para diseñar APIs REST con Spring Boot.',
    instructorName: 'Pedro Sánchez',
    status: 'recorded',
    type: 'public',
    startedAt: '2026-04-01T10:00:00Z',
    endedAt: '2026-04-01T12:00:00Z',
  },
]
