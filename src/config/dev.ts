import type { User } from '@/types/auth'

export const AUTH_MOCK_MODE: 'unauthenticated' | 'authenticated' = 'unauthenticated'

export const MOCK_USER: User = {
  id: 'mock-user-001',
  email: 'maria.garcia@example.com',
  name: 'María García',
  username: 'maria_garcia',
  role: 'estudiante',
  onboardingComplete: true,
}