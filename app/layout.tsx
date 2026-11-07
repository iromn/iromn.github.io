import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/motion/SmoothScroll'
import RevealObserver from '@/components/motion/RevealObserver'
import { site } from '@/content/site'
import { Z } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s | ${site.name}` },
    description: site.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    // Social cards and icons are rendered to public/ by scripts/generate-social.mts.
    openGraph: {
        type: 'website',
        url: site.url,
        siteName: site.name,
        title: site.title,
        description: site.description,
        locale: 'en_US',
        images: [{ url: '/og/site.png', width: 1200, height: 630, alt: site.title }],
    },
    twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og/site.png'] },
    icons: {
        icon: [{ url: '/icon.png', type: 'image/png', sizes: '64x64' }],
        apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    robots: { index: true, follow: true },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#edefec' },
        { media: '(prefers-color-scheme: dark)', color: '#0d0f0e' },
    ],
}

// Runs before first paint: marks JS as available (scroll reveals rely on it) and applies
// the saved or system theme without a flash.
const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>
                <a
                    href="#main"
                    className="fixed left-4 top-4 -translate-y-24 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink focus:translate-y-0"
                    style={{ zIndex: Z.skipLink }}
                >
                    Skip to content
                </a>
                <SmoothScroll>
                    <Nav />
                    <main id="main">{children}</main>
                    <Footer />
                    <RevealObserver />
                </SmoothScroll>
                <div className="grain" style={{ zIndex: Z.grain }} aria-hidden="true" />
            </body>
        </html>
    )
}
