import type { User } from '@/types/auth'

export const MOCK_USER: User = {
  id: 'mock-user-001',
  email: 'maria.garcia@example.com',
  name: 'María García',
  username: 'maria_garcia',
  role: 'estudiante',
  onboardingComplete: true,
}
