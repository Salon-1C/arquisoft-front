'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type ViewMode = 'student' | 'professor'

interface ViewModeContextType {
  viewMode: ViewMode
  isProfesor: boolean
  setViewMode: (mode: ViewMode) => void
}

const ViewModeContext = createContext<ViewModeContextType | null>(null)

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('student')

  useEffect(() => {
    const stored = localStorage.getItem('blume_view_mode') as ViewMode | null
    if (stored === 'professor' || stored === 'student') {
      setViewModeState(stored)
    }
  }, [])

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
    localStorage.setItem('blume_view_mode', mode)
  }

  return (
    <ViewModeContext.Provider
      value={{ viewMode, isProfesor: viewMode === 'professor', setViewMode }}
    >
      {children}
    </ViewModeContext.Provider>
  )
}

export function useViewMode(): ViewModeContextType {
  const ctx = useContext(ViewModeContext)
  if (!ctx) throw new Error('useViewMode must be used within ViewModeProvider')
  return ctx
}
