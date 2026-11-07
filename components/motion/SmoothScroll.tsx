'use client'

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { cancelFrame, frame, useReducedMotion } from 'motion/react'
import { NAV_HEIGHT } from '@/lib/constants'

type ScrollApi = {
    /** Smooth-scrolls to a selector or element; falls back to native scrolling when Lenis is off. */
    scrollTo: (target: string | HTMLElement | number) => void
    stop: () => void
    start: () => void
}

const ScrollContext = createContext<ScrollApi | null>(null)

export function useScrollApi() {
    const api = useContext(ScrollContext)
    if (!api) throw new Error('useScrollApi must be used inside <SmoothScroll>')
    return api
}

const OFFSET = -(NAV_HEIGHT + 16)

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const reduce = useReducedMotion()
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        if (reduce) return

        // Lenis is driven by Motion's frame loop, so the scroll position and every
        // scroll-linked transform update in the same frame (no one-frame lag between
        // them, which reads as jitter). It moves the real window scroll position, so
        // GSAP ScrollTrigger (loaded only where used) sees ordinary scroll events.
        const lenis = new Lenis({
            autoRaf: false,
            duration: 1.15,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
        })
        lenisRef.current = lenis
        const tick = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp)
        frame.update(tick, true)

        return () => {
            cancelFrame(tick)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [reduce])

    const api = useMemo<ScrollApi>(
        () => ({
            scrollTo: (target) => {
                const lenis = lenisRef.current
                if (lenis) {
                    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : OFFSET })
                    return
                }
                const el = typeof target === 'string' ? document.querySelector(target) : target
                if (typeof el === 'number') window.scrollTo({ top: el })
                else el?.scrollIntoView()
            },
            stop: () => {
                if (lenisRef.current) lenisRef.current.stop()
                else document.documentElement.style.overflow = 'hidden'
            },
            start: () => {
                if (lenisRef.current) lenisRef.current.start()
                else document.documentElement.style.overflow = ''
            },
        }),
        [],
    )

    return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}
