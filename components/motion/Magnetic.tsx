'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

type Props = {
    children: ReactNode
    /** Fraction of the pointer's offset from centre that the element follows. */
    strength?: number
    className?: string
}

/** Pulls its child slightly towards a mouse pointer. Inert for touch and reduced motion. */
export default function Magnetic({ children, strength = 0.25, className }: Props) {
    const reduce = useReducedMotion()
    const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 })
    const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 })

    function handleMove(event: PointerEvent<HTMLSpanElement>) {
        if (reduce || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    }

    function reset() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.span
            className={className ?? 'inline-flex'}
            style={{ x, y }}
            onPointerMove={handleMove}
            onPointerLeave={reset}
        >
            {children}
        </motion.span>
    )
}
