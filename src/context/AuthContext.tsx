'use client'

import { createContext, useState, useEffect } from 'react'
import type { AuthContextType, Session, User } from '@/types/auth'
import { getMe, logout as apiLogout } from '@/lib/api/auth'

export const AuthContext = createContext<AuthContextType | null>(null)

async function clearSessionCookie(): Promise<void> {
  await fetch('/api/auth/clear-session', { method: 'POST' })
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Restore token from localStorage (survives page reload)
    const stored = localStorage.getItem('blume_stream_token')
    if (stored) setToken(stored)

    getMe()
      .then((u) => {
        if (u) {
          setUser(u)
        } else {
          // No valid session — clear any stale cookie so proxy.ts stops blocking /login
          clearSessionCookie().catch(() => { })
          localStorage.removeItem('blume_stream_token')
          setToken('')
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = (session: Session) => {
    setUser(session.user)
    if (session.token) {
      setToken(session.token)
      localStorage.setItem('blume_stream_token', session.token)
    }
  }

  const logout = () => {
    apiLogout().catch(() => { })
    clearSessionCookie().catch(() => { })
    localStorage.removeItem('blume_stream_token')
    setToken('')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
