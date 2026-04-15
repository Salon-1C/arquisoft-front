'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/api/auth'
import { useAuth } from '@/hooks/useAuth'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
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
      const session = await login(form.email, form.password)
      setSession(session)
      router.replace('/explorar')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
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

          <h1 className="text-3xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa a tu cuenta para continuar aprendiendo
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
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
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

            <Button type="submit" size="lg" className="w-full cursor-pointer rounded-lg" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="font-medium text-foreground hover:text-primary transition-colors">
                Crear una cuenta
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
