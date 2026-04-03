'use client'

import { createContext, useState } from 'react'
import { AUTH_MOCK_MODE, MOCK_USER } from '@/config/dev'
import type { AuthContextType, Session, User } from '@/types/auth'

export const AuthContext = createContext<AuthContextType | null>(null)

function getInitialUser(): User | null {
  return AUTH_MOCK_MODE === 'authenticated' ? MOCK_USER : null
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getInitialUser)

  const login = (session: Session) => {
    setUser(session.user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading: false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
