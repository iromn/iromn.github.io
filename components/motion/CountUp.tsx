'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

type Props = { value: number; decimals?: number; suffix?: string; className?: string }

/**
 * Counts up to `value` once, the first time it scrolls into view. The server renders
 * the final number, so it reads correctly without JavaScript or with reduced motion.
 */
export default function CountUp({ value, decimals = 0, suffix = '', className }: Props) {
    const ref = useRef<HTMLSpanElement>(null)
    const reduce = useReducedMotion()
    const inView = useInView(ref, { once: true, amount: 0.6 })
    const format = (n: number) => `${n.toFixed(decimals)}${suffix}`

    // Reset to zero while still off-screen so the count has somewhere to start from.
    useEffect(() => {
        if (reduce || !ref.current) return
        if (ref.current.getBoundingClientRect().top > window.innerHeight) {
            ref.current.textContent = format(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
    }, [reduce])

    useEffect(() => {
        if (!inView || reduce || !ref.current) return
        const el = ref.current
        const controls = animate(0, value, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                el.textContent = format(latest)
            },
        })
        return () => controls.stop()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- format is derived from props
    }, [inView, reduce, value])

    return (
        <span ref={ref} className={className}>
            {format(value)}
        </span>
    )
}
