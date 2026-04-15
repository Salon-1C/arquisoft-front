'use client'

import { createContext, useState, useEffect } from 'react'
import { getMe, logout as apiLogout } from '@/lib/api/auth'
import type { AuthContextType, Session, User } from '@/types/auth'

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then((u) => {
        setUser(u)
        if (!u) apiLogout().catch(() => {})
      })
      .finally(() => setIsLoading(false))
  }, [])

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
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
