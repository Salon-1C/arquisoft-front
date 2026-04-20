'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signup } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/client'
import { useAuth } from '@/hooks/useAuth'

interface RegisterForm {
  email: string
  password: string
}

export default function RegistroPage() {
  const [form, setForm] = useState<RegisterForm>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login: setSession } = useAuth()
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const session = await signup(form.email, form.password)
      setSession(session)
      router.push('/onboarding')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('Ya existe una cuenta con ese correo')
      } else if (err instanceof ApiError && err.status === 400) {
        setError('La contraseña debe tener al menos 8 caracteres')
      } else {
        setError('No se pudo crear la cuenta. Intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full w-full">

      {/* Left — image */}
      <div className="hidden md:flex md:w-1/2 p-6">
        <div className="h-full w-full rounded-2xl bg-muted" />
      </div>

      {/* Right — form */}
      <div className="flex w-full flex-col items-center justify-center px-8 py-12 md:w-1/2 md:px-16">
        <div className="w-full max-w-[340px] text-center md:text-left">

          <h1 className="text-3xl font-semibold tracking-tight">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accede a cientos de clases en vivo de forma completamente gratuita
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Tu correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="micorreo@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full cursor-pointer rounded-lg"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Empezar ahora'}
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="font-medium text-foreground hover:text-primary transition-colors">
                Iniciar sesión
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
