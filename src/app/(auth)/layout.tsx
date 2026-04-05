import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <NavbarPublic />
      <main className="flex flex-1 min-h-0">
        {children}
      </main>
    </div>
  )
}
