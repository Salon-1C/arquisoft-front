'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronUp, Compass, History, LogIn, LogOut, NotebookPen, Radio, Settings, UserRound, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'
import { useViewMode } from '@/context/ViewModeContext'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  icon: React.ElementType
  href?: string
  requiresAuth: boolean
  professorOnly?: boolean
  onClick?: () => void
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.replace('/')
  }
  const { openAuthModal } = useModal()
  const { viewMode, isProfesor, setViewMode } = useViewMode()

  const navItems: NavItem[] = [
    {
      label: 'Explorar clases',
      icon: Compass,
      href: '/explorar',
      requiresAuth: false,
    },
    {
      label: 'Unirme a un salón',
      icon: LogIn,
      href: undefined,
      requiresAuth: true,
      onClick: () => {
        if (!isAuthenticated) openAuthModal('/explorar')
      },
    },
    {
      label: 'Mis notas',
      icon: NotebookPen,
      href: '/mis-notas',
      requiresAuth: true,
    },
    {
      label: 'Transmisiones pasadas',
      icon: History,
      href: '/grabaciones',
      requiresAuth: false,
    },
    {
      label: 'Configuración',
      icon: Settings,
      href: '/configuracion',
      requiresAuth: true,
    },
    // Professor-only
    {
      label: 'Transmitir',
      icon: Radio,
      href: '/transmitir',
      requiresAuth: true,
      professorOnly: true,
    },
  ]

  const visibleItems = navItems.filter((item) => {
    if (item.professorOnly && !isProfesor) return false
    return true
  })

  return (
    <Sidebar>
      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup className="pt-4">
          <SidebarGroupContent className="gap-1">
            <SidebarMenu>
              {visibleItems.map((item) => {
                const isActive = item.href ? pathname === item.href : false

                if (!item.requiresAuth || isAuthenticated) {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={isActive} className="cursor-pointer">
                        {item.href ? (
                          <Link href={item.href}>
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <button onClick={item.onClick} className="cursor-pointer">
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </button>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                // Protected tab — triggers modal
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="cursor-pointer"
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick()
                        } else if (item.href) {
                          openAuthModal(item.href)
                        }
                      }}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {isAuthenticated && user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="cursor-pointer focus-visible:ring-0 focus-visible:outline-none data-[state=open]:ring-0"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{user.name}</span>
                      <span className="mt-0.5 text-xs capitalize text-muted-foreground">
                        {isProfesor ? 'profesor' : user.role}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  {/* Toggle view mode */}
                  {isProfesor ? (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setViewMode('student')}
                    >
                      <GraduationCap className="size-4" />
                      <span>Vista de estudiante</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setViewMode('professor')}
                    >
                      <UserRound className="size-4" />
                      <span>Vista de profesor</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="size-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <div className="flex flex-col gap-2 px-3 py-3">
            <Button asChild variant="default" size="sm" className="w-full cursor-pointer">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full cursor-pointer">
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
