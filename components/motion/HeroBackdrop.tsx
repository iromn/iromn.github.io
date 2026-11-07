'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Blueprint grid behind the hero: faint everywhere, brighter in a soft spotlight that
 * trails a mouse pointer. Hints that there is structure under the surface before the
 * visitor finds the lens. Static (faint only) for touch and reduced motion.
 */
export default function HeroBackdrop() {
    const ref = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const x = useSpring(useMotionValue(-1000), { stiffness: 140, damping: 28 })
    const y = useSpring(useMotionValue(-1000), { stiffness: 140, damping: 28 })
    const mask = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, #000 0%, transparent 70%)`

    useEffect(() => {
        const host = ref.current?.parentElement
        if (!host || reduce || !window.matchMedia('(pointer: fine)').matches) return
        const onMove = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect()
            x.set(event.clientX - rect.left)
            y.set(event.clientY - rect.top)
        }
        host.addEventListener('pointermove', onMove, { passive: true })
        return () => host.removeEventListener('pointermove', onMove)
    }, [reduce, x, y])

    return (
        <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-grid absolute inset-0" />
            <motion.div className="hero-grid hero-grid--lit absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }} />
        </div>
    )
}
