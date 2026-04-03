import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <NavbarPublic />
      {children}
    </>
  )
}
