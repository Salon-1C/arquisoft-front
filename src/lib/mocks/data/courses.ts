import type { Course } from '@/types/course'

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-001',
    name: 'Arquitectura de Software',
    description:
      'Explora los principios, patrones y estilos arquitectónicos que guían el diseño de sistemas de software escalables y mantenibles. A lo largo del curso se estudian patrones como MVC, microservicios, arquitectura hexagonal y event-driven, aplicándolos a proyectos reales con Java y Spring Boot.',
    instructorName: 'Carlos López',
    streams: [
      {
        id: 'stream-001',
        title: 'Introducción a Microservicios',
        description:
          'Definición y motivación de la arquitectura de microservicios. Comparación con monolitos y SOA. Casos de uso reales en empresas como Netflix y Amazon. Discutimos cuándo tiene sentido adoptar microservicios y cuándo es mejor no hacerlo.',
        status: 'live',
        startedAt: '2026-04-19T22:00:00Z',
        viewerCount: 34,
      },
      {
        id: 'stream-002',
        title: 'Patrones de Diseño GoF',
        description:
          'Repaso de los 23 patrones del libro Gang of Four. Implementación práctica de Factory, Observer y Strategy en Java con ejemplos extraídos directamente del proyecto del curso.',
        status: 'recorded',
        startedAt: '2026-04-12T14:00:00Z',
        endedAt: '2026-04-12T16:00:00Z',
        durationMinutes: 112,
      },
      {
        id: 'stream-003',
        title: 'Arquitectura Hexagonal en Spring Boot',
        description:
          'Implementación del patrón Ports & Adapters con Spring Boot. Organización del proyecto en capas de dominio, aplicación e infraestructura. Revisamos cómo este patrón mejora la testabilidad y el desacoplamiento.',
        status: 'recorded',
        startedAt: '2026-04-05T14:00:00Z',
        endedAt: '2026-04-05T16:30:00Z',
        durationMinutes: 95,
      },
      {
        id: 'stream-004',
        title: 'Event-Driven Architecture con Kafka',
        description:
          'Conceptos de mensajería asíncrona, colas y tópicos. Integración de Apache Kafka con Spring Boot para comunicación desacoplada entre microservicios. Comparación con REST síncrono.',
        status: 'recorded',
        startedAt: '2026-03-29T14:00:00Z',
        endedAt: '2026-03-29T16:00:00Z',
        durationMinutes: 88,
      },
      {
        id: 'stream-005',
        title: 'CQRS y Event Sourcing',
        description:
          'Separación de comandos y consultas con CQRS. Almacenamiento de eventos como fuente de verdad con Event Sourcing. Implementación con Axon Framework.',
        status: 'recorded',
        startedAt: '2026-03-22T14:00:00Z',
        endedAt: '2026-03-22T15:45:00Z',
        durationMinutes: 74,
      },
    ],
  },
  {
    id: 'course-002',
    name: 'Desarrollo Web con React',
    description:
      'Curso práctico de desarrollo frontend con React 19 y TypeScript. Cubrimos hooks, context, manejo de estado global y patrones modernos de componentes. El curso culmina con un proyecto final desplegado en Vercel.',
    instructorName: 'Ana Martínez',
    streams: [
      {
        id: 'stream-006',
        title: 'Introducción a React y JSX',
        description:
          'Primeros pasos con React: configuración del entorno con Vite, creación de componentes funcionales y comprensión del Virtual DOM. Escribimos nuestro primer componente desde cero.',
        status: 'recorded',
        startedAt: '2026-04-10T10:00:00Z',
        endedAt: '2026-04-10T12:00:00Z',
        durationMinutes: 105,
      },
      {
        id: 'stream-007',
        title: 'Hooks: useState y useEffect',
        description:
          'Manejo del estado local con useState. Efectos secundarios y ciclo de vida del componente con useEffect. Patrones de fetching de datos y cancelación de efectos con AbortController.',
        status: 'recorded',
        startedAt: '2026-04-03T10:00:00Z',
        endedAt: '2026-04-03T11:30:00Z',
        durationMinutes: 78,
      },
      {
        id: 'stream-008',
        title: 'Context API y manejo de estado global',
        description:
          'Creación de contextos para compartir estado entre componentes sin prop drilling. Comparación con Zustand y Redux Toolkit para casos más complejos.',
        status: 'recorded',
        startedAt: '2026-03-27T10:00:00Z',
        endedAt: '2026-03-27T11:45:00Z',
        durationMinutes: 92,
      },
    ],
  },
]
