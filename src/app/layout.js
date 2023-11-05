import { Inter } from 'next/font/google'
import './globals.css'
import HeroProvider from '@/context/heroContext'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HeroProvider>
        <body className={inter.className}>{children}</body>
      </HeroProvider>
    </html>
  )
}
