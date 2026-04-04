import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <NavbarPublic />
      <main className="min-h-0 flex-1">
        {children}
      </main>
    </div>
  )
}
