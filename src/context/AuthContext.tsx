'use client'

import { createContext, useState, useEffect } from 'react'
import type { AuthContextType, Session, User } from '@/types/auth'
import { getMe, logout as apiLogout } from '@/lib/api/auth'

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from the blume_session cookie on mount.
  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setIsLoading(false))
  }, [])

  const login = (session: Session) => {
    setUser(session.user)
  }

  const logout = () => {
    apiLogout().catch(() => {})
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
