import type { Class, ClassDetail, ClassMaterial, ClassRecording } from '@/types/class'

const MOCK_CLASSES: Class[] = [
  {
    id: 'class-001',
    name: 'Introducción a React',
    description: 'Canal dedicado al aprendizaje de React desde los fundamentos: componentes, estado, efectos y patrones modernos.',
    instructorName: 'Carlos López',
    isLive: true,
    liveStreamId: 'stream-001',
  },
  {
    id: 'class-002',
    name: 'TypeScript Avanzado',
    description: 'Explora los tipos genéricos, utility types, decoradores y las características más profundas de TypeScript.',
    instructorName: 'Ana Martínez',
    isLive: true,
    liveStreamId: 'stream-002',
  },
  {
    id: 'class-003',
    name: 'APIs REST con Spring Boot',
    description: 'Mejores prácticas para el diseño y construcción de APIs REST escalables con Spring Boot y Java.',
    instructorName: 'Pedro Sánchez',
    isLive: false,
  },
]

const MOCK_RECORDINGS: Record<string, ClassRecording[]> = {
  'class-001': [
    {
      id: 'rec-001-1',
      title: 'Sesión 1: Componentes y JSX',
      description: 'Introducción a los componentes funcionales y la sintaxis JSX.',
      startedAt: '2026-04-01T13:00:00Z',
      endedAt: '2026-04-01T15:00:00Z',
    },
    {
      id: 'rec-001-2',
      title: 'Sesión 2: Estado con useState',
      description: 'Gestión del estado local con el hook useState.',
      startedAt: '2026-04-08T13:00:00Z',
      endedAt: '2026-04-08T15:00:00Z',
    },
    {
      id: 'rec-001-3',
      title: 'Sesión 3: Efectos con useEffect',
      description: 'Ciclo de vida de componentes y efectos secundarios.',
      startedAt: '2026-04-15T13:00:00Z',
      endedAt: '2026-04-15T15:00:00Z',
    },
  ],
  'class-002': [
    {
      id: 'rec-002-1',
      title: 'Sesión 1: Tipos genéricos',
      description: 'Cómo usar y crear tipos genéricos en TypeScript.',
      startedAt: '2026-04-02T14:00:00Z',
      endedAt: '2026-04-02T16:00:00Z',
    },
    {
      id: 'rec-002-2',
      title: 'Sesión 2: Utility Types',
      description: 'Partial, Required, Pick, Omit y más.',
      startedAt: '2026-04-09T14:00:00Z',
      endedAt: '2026-04-09T16:00:00Z',
    },
  ],
  'class-003': [
    {
      id: 'rec-003-1',
      title: 'Sesión 1: Principios REST',
      description: 'Los seis principios fundamentales de una API REST.',
      startedAt: '2026-04-01T10:00:00Z',
      endedAt: '2026-04-01T12:00:00Z',
    },
  ],
}

const MOCK_MATERIALS: Record<string, ClassMaterial[]> = {
  'class-001': [
    {
      id: 'mat-001-1',
      title: 'Guía de componentes React',
      description: 'Referencia completa de la API de componentes funcionales.',
      fileUrl: '#',
      fileType: 'PDF',
      createdAt: '2026-03-25T10:00:00Z',
    },
    {
      id: 'mat-001-2',
      title: 'Ejercicios prácticos – Semana 1',
      description: 'Ejercicios para practicar los conceptos de la sesión 1.',
      fileUrl: '#',
      fileType: 'PDF',
      createdAt: '2026-04-01T16:00:00Z',
    },
  ],
  'class-002': [
    {
      id: 'mat-002-1',
      title: 'Cheatsheet de TypeScript',
      description: 'Referencia rápida de todos los tipos y utilidades de TypeScript.',
      fileUrl: '#',
      fileType: 'PDF',
      createdAt: '2026-03-28T10:00:00Z',
    },
  ],
  'class-003': [
    {
      id: 'mat-003-1',
      title: 'Guía de Spring Boot',
      description: 'Configuración y buenas prácticas con Spring Boot.',
      fileUrl: '#',
      fileType: 'PDF',
      createdAt: '2026-03-20T10:00:00Z',
    },
    {
      id: 'mat-003-2',
      title: 'Patrones de diseño para APIs',
      description: 'Patrones comunes en el diseño de APIs REST.',
      fileUrl: '#',
      fileType: 'PDF',
      createdAt: '2026-03-27T10:00:00Z',
    },
    {
      id: 'mat-003-3',
      title: 'Colección de Postman',
      description: 'Colección de endpoints de ejemplo para la API del curso.',
      fileUrl: '#',
      fileType: 'JSON',
      createdAt: '2026-04-01T14:00:00Z',
    },
  ],
}

export function getMockClassById(id: string): ClassDetail | undefined {
  const cls = MOCK_CLASSES.find((c) => c.id === id)
  if (!cls) return undefined
  return {
    cls,
    recordings: MOCK_RECORDINGS[id] ?? [],
    materials: MOCK_MATERIALS[id] ?? [],
  }
}
