import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nganba Irom | Full-Stack Developer',
  description:
    'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks. Building scalable web applications with Next.js, React, and Vue.js.',
  keywords: [
    'Nganba Irom',
    'Full-Stack Developer',
    'Laravel Developer',
    'WordPress Developer',
    'Next.js',
    'React',
    'Vue.js',
    'PHP',
    'TypeScript',
  ],
  authors: [{ name: 'Nganba Irom' }],
  openGraph: {
    title: 'Nganba Irom | Full-Stack Developer',
    description:
      'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nganba Irom | Full-Stack Developer',
    description:
      'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}



