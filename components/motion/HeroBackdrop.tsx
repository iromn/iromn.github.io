'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

const SPOT = 380 // spotlight radius in px

/**
 * Blueprint grid behind the hero: faint everywhere, brighter in a soft spotlight that
 * follows a mouse pointer 1:1. Hints that there is structure under the surface before
 * the visitor finds the lens. Static (faint only) for touch and reduced motion.
 *
 * The spotlight is a fixed-size element with a static soft-edged mask, moved with a
 * transform; the bright grid inside it moves the opposite way so it lines up with the
 * faint one. Only transforms change per frame, so following the pointer never repaints.
 */
export default function HeroBackdrop() {
    const ref = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const x = useMotionValue(-10_000)
    const y = useMotionValue(-10_000)
    const spotX = useTransform(x, (v) => v - SPOT)
    const spotY = useTransform(y, (v) => v - SPOT)
    const gridX = useTransform(x, (v) => SPOT - v)
    const gridY = useTransform(y, (v) => SPOT - v)
    const width = useMotionValue(0)
    const height = useMotionValue(0)

    useEffect(() => {
        const backdrop = ref.current
        const host = backdrop?.parentElement
        if (!backdrop || !host || reduce || !window.matchMedia('(pointer: fine)').matches) return
        const resize = new ResizeObserver(() => {
            width.set(backdrop.offsetWidth)
            height.set(backdrop.offsetHeight)
        })
        resize.observe(backdrop)
        const onMove = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect()
            x.set(event.clientX - rect.left)
            y.set(event.clientY - rect.top)
        }
        host.addEventListener('pointermove', onMove, { passive: true })
        return () => {
            resize.disconnect()
            host.removeEventListener('pointermove', onMove)
        }
    }, [reduce, x, y, width, height])

    return (
        <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-grid absolute inset-0" />
            <motion.div
                className="hero-spot absolute left-0 top-0 will-change-transform"
                style={{ width: SPOT * 2, height: SPOT * 2, x: spotX, y: spotY }}
            >
                <motion.div
                    className="hero-grid hero-grid--lit absolute left-0 top-0 will-change-transform"
                    style={{ width, height, x: gridX, y: gridY }}
                />
            </motion.div>
        </div>
    )
}
