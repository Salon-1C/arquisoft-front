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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronUp, Compass, LogIn, LogOut, NotebookPen, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  icon: React.ElementType
  href?: string
  requiresAuth: boolean
  onClick?: () => void
}

export function AppSidebar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  const { openAuthModal } = useModal()

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
        if (!isAuthenticated) {
          openAuthModal('/explorar')
        }
        // Future: open join room flow
      },
    },
    {
      label: 'Mis notas',
      icon: NotebookPen,
      href: '/mis-notas',
      requiresAuth: true,
    },
    {
      label: 'Configuración',
      icon: Settings,
      href: '/configuracion',
      requiresAuth: true,
    },
  ]

  return (
    <Sidebar>
      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup className="pt-4">
          <SidebarGroupContent className="gap-1">
            <SidebarMenu>
              {navItems.map((item) => {
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
                  <SidebarMenuButton size="lg" className="cursor-pointer">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">{user.name}</span>
                      <span className="mt-0.5 text-xs capitalize text-muted-foreground">{user.role}</span>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut />
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
