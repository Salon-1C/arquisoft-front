'use client'

import { createContext, useState } from 'react'

interface ModalContextType {
  isOpen: boolean
  redirectPath: string | undefined
  openAuthModal: (redirectPath?: string) => void
  closeAuthModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

interface ModalProviderProps {
  children: React.ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined)

  const openAuthModal = (path?: string) => {
    setRedirectPath(path)
    setIsOpen(true)
  }

  const closeAuthModal = () => {
    setIsOpen(false)
    setRedirectPath(undefined)
  }

  return (
    <ModalContext.Provider value={{ isOpen, redirectPath, openAuthModal, closeAuthModal }}>
      {children}
    </ModalContext.Provider>
  )
}
