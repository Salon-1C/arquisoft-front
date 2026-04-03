'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Flower2, NotebookPen, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { href: '/explorar',     label: 'Explorar',      icon: Compass },
  { href: '/mis-notas',    label: 'Mis notas',     icon: NotebookPen },
  { href: '/configuracion', label: 'Configuración', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'
  const role = user?.role === 'profesor' ? 'Profesor' : 'Estudiante'

  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-sidebar-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        <Link href="/explorar" className="flex items-center gap-2">
          <Flower2 className="size-5 text-sidebar-primary" />
          <span className="font-semibold text-sidebar-primary">Blume</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium select-none">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
