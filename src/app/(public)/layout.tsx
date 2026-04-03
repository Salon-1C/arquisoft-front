import NavbarPublic from '@/components/common/Navbar/NavbarPublic'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <NavbarPublic />
      {children}
    </>
  )
}
