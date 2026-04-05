'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useModal } from '@/hooks/useModal'

export default function AuthModal() {
  const { isOpen, redirectPath, closeAuthModal } = useModal()

  const loginHref = redirectPath
    ? `/login?redirect=${encodeURIComponent(redirectPath)}`
    : '/login'

  const registerHref = redirectPath
    ? `/registro?redirect=${encodeURIComponent(redirectPath)}`
    : '/registro'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inicia sesión para continuar</DialogTitle>
          <DialogDescription>
            Necesitas una cuenta de Blume para acceder a esta funcionalidad.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          <Button asChild className="w-full cursor-pointer">
            <Link href={loginHref} onClick={closeAuthModal}>
              Iniciar sesión
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full cursor-pointer">
            <Link href={registerHref} onClick={closeAuthModal}>
              Crear cuenta
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
