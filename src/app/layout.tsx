import { AuthProvider } from '@/context/AuthContext'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Header } from '../components/ui/Header'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'JWT Admin Auth Test',
  description: 'Dashboard to test admin auth'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          roboto.className,
          'relative flex min-h-screen flex-col bg-gray-light'
        )}
      >
        <AuthProvider>
          <Header />

          <main className="grow basis-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
