import NavbarPublic from '@/components/common/Navbar/NavbarPublic'
import Footer from '@/components/common/Footer/Footer'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <NavbarPublic />
      <main className="min-h-0 flex-1 overflow-y-auto">
        {children}
        <Footer />
      </main>
    </div>
  )
}
