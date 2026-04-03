export type UserRole = 'estudiante' | 'profesor'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatarUrl?: string
}

export interface Session {
  user: User
  token: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (session: Session) => void
  logout: () => void
}