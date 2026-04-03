import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPublic />
      <main className="flex-1 pt-16">
        {children}
      </main>
    </div>
  )
}
