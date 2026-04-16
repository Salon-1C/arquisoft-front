'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/lib/firebase'
import { firebaseLogin } from '@/lib/api/auth'
import { useAuth } from '@/hooks/useAuth'

interface GoogleSignInButtonProps {
  redirectTo?: string
}

export default function GoogleSignInButton({ redirectTo = '/explorar' }: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login: setSession } = useAuth()
  const router = useRouter()

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)
    try {
      const idToken = await signInWithGoogle()
      const session = await firebaseLogin(idToken)
      setSession(session)
      router.replace(redirectTo)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión con Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full cursor-pointer rounded-lg"
        disabled={loading}
        onClick={handleGoogleSignIn}
      >
        <GoogleLogo />
        {loading ? 'Conectando...' : 'Continuar con Google'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}
