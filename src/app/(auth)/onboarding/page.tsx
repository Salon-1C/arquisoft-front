'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { completeOnboarding } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/client'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

type RoleCode = 'STUDENT' | 'PROFESSOR'

interface RoleCardProps {
  roleCode: RoleCode
  label: string
  description: string
  icon: React.ElementType
  selected: boolean
  onSelect: () => void
}

function RoleCard({ label, description, icon: Icon, selected, onSelect }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex items-start gap-3 w-full rounded-lg border p-4 text-left transition-colors cursor-pointer',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

const ROLE_OPTIONS: Omit<RoleCardProps, 'selected' | 'onSelect'>[] = [
  {
    roleCode: 'STUDENT',
    label: 'Estudiante',
    description: 'Accede a clases en vivo y grabaciones',
    icon: GraduationCap,
  },
  {
    roleCode: 'PROFESSOR',
    label: 'Profesor',
    description: 'Crea y transmite tus clases en directo',
    icon: BookOpen,
  },
]

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/

export default function OnboardingPage() {
  const [username, setUsername] = useState('')
  const [roleCode, setRoleCode] = useState<RoleCode>('STUDENT')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login: setSession } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (username.length < 3 || username.length > 50) {
      setError('El nombre de usuario debe tener entre 3 y 50 caracteres')
      return
    }
    if (!USERNAME_PATTERN.test(username)) {
      setError('Solo letras, números, puntos, guiones y guiones bajos')
      return
    }

    setLoading(true)
    try {
      const session = await completeOnboarding(username, roleCode)
      setSession(session)
      router.replace('/explorar')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('Este nombre de usuario ya está en uso')
      } else {
        setError('No se pudo guardar el perfil. Intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full w-full">

      {/* Left — decorative panel */}
      <div className="hidden md:flex md:w-1/2 p-6">
        <div className="h-full w-full rounded-2xl bg-muted" />
      </div>

      {/* Right — form */}
      <div className="flex w-full flex-col items-center justify-center px-8 py-12 md:w-1/2 md:px-16">
        <div className="w-full max-w-[340px] text-center md:text-left">

          <h1 className="text-3xl font-semibold tracking-tight">Cuéntanos sobre ti</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Elige un nombre de usuario y cómo vas a usar Blume
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div className="space-y-1.5 text-left">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="ej. maria_garcia"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <p className="text-sm font-medium text-foreground">¿Cómo vas a usar Blume?</p>
              <div className="space-y-2">
                {ROLE_OPTIONS.map((option) => (
                  <RoleCard
                    key={option.roleCode}
                    {...option}
                    selected={roleCode === option.roleCode}
                    onSelect={() => setRoleCode(option.roleCode)}
                  />
                ))}
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
              {loading ? 'Guardando...' : 'Continuar'}
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}
