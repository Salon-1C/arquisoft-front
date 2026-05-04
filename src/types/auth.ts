export type UserRole = 'estudiante' | 'profesor'

export interface User {
  id: string
  email: string
  name: string
  username?: string
  role: UserRole
  avatarUrl?: string
  onboardingComplete: boolean
}

export interface Session {
  user: User
  token: string
}

export interface AuthContextType {
  user: User | null
  token: string
  isAuthenticated: boolean
  isLoading: boolean
  login: (session: Session) => void
  logout: () => void
}