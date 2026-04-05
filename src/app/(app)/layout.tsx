import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/common/Sidebar/AppSidebar'
import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <NavbarPublic />
        <div className="flex flex-1 min-h-0">
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
