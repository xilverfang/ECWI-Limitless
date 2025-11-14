import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EWCI - Expert-Weighted Confidence Index',
  description: 'Follow the Smart Money in Sports Prediction Markets',
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

