'use client'

import { useContext } from 'react'
import { ModalContext } from '@/context/ModalContext'

export default function AuthModal() {
  const context = useContext(ModalContext)

  if (!context?.isOpen) return null

  return <div>AuthModal</div>
}
