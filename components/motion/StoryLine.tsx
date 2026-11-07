'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll } from 'motion/react'

/**
 * Vertical timeline whose accent line draws downwards as the reader scrolls through
 * the story, so progress through the chapters is visible. Fully drawn under reduced motion.
 */
export default function StoryLine({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLOListElement>(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

    return (
        <ol ref={ref} className="relative flex flex-col gap-14 pl-8 md:gap-20 md:pl-12">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[7px]" />
            <motion.span
                aria-hidden="true"
                className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent md:left-[7px]"
                style={{ scaleY: reduce ? 1 : scrollYProgress }}
            />
            {children}
        </ol>
    )
}
