import type { Metadata } from 'next'
import '@/styles/globals.css'
import { sora } from '@/lib/fonts'
import { AuthProvider } from '@/context/AuthContext'
import { ModalProvider } from '@/context/ModalContext'
import { ViewModeProvider } from '@/context/ViewModeContext'
import AuthModal from '@/components/common/AuthModal/AuthModal'

export const metadata: Metadata = {
  title: 'Blume',
  description: 'Aprende en vivo con Blume',
  icons: {
    icon: '/static/logo.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={sora.variable}>
      <body>
        <AuthProvider>
          <ViewModeProvider>
            <ModalProvider>
              {children}
              <AuthModal />
            </ModalProvider>
          </ViewModeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
