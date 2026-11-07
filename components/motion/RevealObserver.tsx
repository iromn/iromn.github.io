'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Marks every `.reveal` / `.reveal-words` element as shown the first time it scrolls into view. Mounted once. */
export default function RevealObserver() {
    const pathname = usePathname()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.setAttribute('data-shown', '')
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
        )
        document.querySelectorAll('.reveal:not([data-shown]), .reveal-words:not([data-shown])').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [pathname])

    return null
}
