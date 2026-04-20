export { MOCK_CLASSES } from '@/lib/mocks/data/classes'
export { MOCK_NOTES } from '@/lib/mocks/data/notes'
export { MOCK_USER } from '@/lib/mocks/data/user'
export { MOCK_COURSES } from '@/lib/mocks/data/courses'

// Mutable record used by createViewerCountSSE to simulate live viewer counts.
// Keys are class IDs; values are the current simulated viewer count.
export const MOCK_VIEWER_COUNTS: Record<string, number> = {
  'class-001': 42,
  'class-002': 17,
}
