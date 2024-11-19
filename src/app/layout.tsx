import ReactQueryProvider from '@/components/providers/ReactQuery'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import AuthSessionProvider from '@/components/providers/AuthSessionProvider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthSessionProvider>
          <body>
            {children}
          </body>
        </AuthSessionProvider>
      </ReactQueryProvider>
    </html>
  )
}