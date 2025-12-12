import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sports betting confidence index. Follow the experts, beat the crowd.',
  description: 'Sports betting confidence index. Follow the experts, beat the crowd.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

