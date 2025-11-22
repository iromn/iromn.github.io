import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://iromn.github.io'),
  title: {
    default: 'Nganba Irom | Full-Stack Developer',
    template: '%s | Nganba Irom'
  },
  description: 'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks. Building scalable web applications with Next.js, React, and Vue.js.',
  keywords: [
    'Nganba Irom',
    'Full-Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Laravel Developer',
    'WordPress Developer',
    'Next.js',
    'React',
    'Vue.js',
    'PHP',
    'TypeScript',
    'Tailwind CSS',
    'Portfolio',
    'Imphal',
    'Manipur',
    'India'
  ],
  authors: [{ name: 'Nganba Irom', url: 'https://iromn.github.io' }],
  creator: 'Nganba Irom',
  publisher: 'Nganba Irom',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Nganba Irom | Full-Stack Developer',
    description: 'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks.',
    url: 'https://iromn.github.io',
    siteName: 'Nganba Irom Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/icon.png', // Using icon as OG image for now, ideally should be a larger banner
        width: 512,
        height: 512,
        alt: 'Nganba Irom Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nganba Irom | Full-Stack Developer',
    description: 'Full-stack software developer specializing in PHP, Laravel, WordPress, and modern JavaScript frameworks.',
    images: ['/icon.png'],
    creator: '@iromn', // Assuming handle, can be updated
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}



