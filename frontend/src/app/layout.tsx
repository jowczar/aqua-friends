import FirebaseProvider from '@/context/FirebaseProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const font = Inter({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: 'Aqua Friends',
  description: 'Monitor your aquariums with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-background`}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  )
}
