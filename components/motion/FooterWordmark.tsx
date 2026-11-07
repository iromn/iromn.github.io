'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Oversized outlined name that fills with ink as it scrolls into view. The fill is a
 * transform-only wipe: an overflow-hidden window slides right while its contents slide
 * left by the same amount, so nothing but transforms animate.
 *
 * Reduced motion switches the wipe off through a motion value after mount rather than
 * by picking different styles while rendering: the server cannot know the preference,
 * so a render-time branch made the hydrated HTML disagree with the server's.
 */
export default function FooterWordmark({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const wipe = useMotionValue(1)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
    // How much of the name is still unfilled, 1 to 0; always 0 under reduced motion.
    const remaining = useTransform([scrollYProgress, wipe], ([progress, on]: number[]) =>
        on * (1 - Math.min(1, Math.max(0, (progress - 0.15) / 0.85))),
    )
    const windowX = useTransform(remaining, (r) => `${-r * 100}%`)
    const contentX = useTransform(remaining, (r) => `${r * 100}%`)

    useEffect(() => wipe.set(reduce ? 0 : 1), [reduce, wipe])

    const type = 'block whitespace-nowrap text-[min(16.9vw,15.3rem)] font-medium leading-[0.82] tracking-[-0.06em]'

    return (
        <div ref={ref} aria-hidden="true" className="relative select-none overflow-hidden pb-[1.5vw]">
            <span className={`engine-text ${type}`}>{text}</span>
            <motion.div className="absolute inset-0 overflow-hidden" style={{ x: windowX }}>
                <motion.span className={`${type} text-ink`} style={{ x: contentX }}>
                    {text}
                </motion.span>
            </motion.div>
        </div>
    )
}
