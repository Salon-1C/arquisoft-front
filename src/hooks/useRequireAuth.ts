import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'
import { useAuth } from '@/hooks/useAuth'

export function useRequireAuth(redirectPath?: string) {
  const { isAuthenticated } = useAuth()
  const modalContext = useContext(ModalContext)

  if (!isAuthenticated && modalContext) {
    modalContext.openAuthModal(redirectPath)
  }

  return { isAuthenticated }
}
