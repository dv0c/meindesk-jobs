import ReactQueryProvider from '@/components/providers/ReactQuery'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  )
}