import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPublic />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
