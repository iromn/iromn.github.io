'use client'

import { useEffect, useRef, useState } from 'react'
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'

/*
 * Animated stand-in for a portrait. Drawn in the site palette so it doesn't guess at
 * anyone's appearance. Idle breathing and blinking, eyes and head that follow the
 * pointer, and an Engine view that exposes the construction and the tracking maths.
 * All motion runs on motion values; nothing re-renders per frame.
 */

const EYES = [
    { x: 168, y: 248 },
    { x: 232, y: 248 },
] as const
const HEAD = { x: 200, y: 235 }
const MAX_LOOK = 7 // max eye travel in SVG units

export default function Character({ label, className }: { label: string; className?: string }) {
    const reduce = useReducedMotion()
    const svgRef = useRef<SVGSVGElement>(null)
    // Idle loops only run while the character is on screen.
    const visible = useInView(svgRef, { amount: 0.1 })
    const [engine, setEngine] = useState(false)

    const lookX = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
    const lookY = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
    const tilt = useTransform(lookX, [-MAX_LOOK, MAX_LOOK], [-4, 4])
    const blink = useMotionValue(1)
    const breath = useMotionValue(0)

    // Eyes follow a mouse pointer anywhere on the page.
    useEffect(() => {
        if (reduce || !visible || !window.matchMedia('(pointer: fine)').matches) return
        function onMove(event: PointerEvent) {
            const svg = svgRef.current
            if (!svg) return
            const rect = svg.getBoundingClientRect()
            const scale = rect.width / 400
            const dx = event.clientX - (rect.left + HEAD.x * scale)
            const dy = event.clientY - (rect.top + HEAD.y * scale)
            const distance = Math.hypot(dx, dy) || 1
            const reach = Math.min(1, distance / 400) * MAX_LOOK
            lookX.set((dx / distance) * reach)
            lookY.set((dy / distance) * reach)
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        return () => window.removeEventListener('pointermove', onMove)
    }, [reduce, visible, lookX, lookY])

    // Idle life: a slow breath and a blink every few seconds, paused off-screen.
    useEffect(() => {
        if (reduce || !visible) return
        const breathing = animate(breath, [0, -3, 0], { duration: 4.2, repeat: Infinity, ease: 'easeInOut' })
        let timer: number
        const scheduleBlink = () => {
            timer = window.setTimeout(() => {
                animate(blink, [1, 0.1, 1], { duration: 0.2, ease: 'easeInOut' })
                scheduleBlink()
            }, 2600 + Math.random() * 3200)
        }
        scheduleBlink()
        return () => {
            breathing.stop()
            window.clearTimeout(timer)
        }
    }, [reduce, visible, blink, breath])

    const ink = engine ? 'var(--accent)' : 'var(--ink)'
    const skin = engine ? 'none' : 'var(--surface)'
    const solid = engine ? 'none' : 'var(--ink)'
    const lineProps = { fill: 'none', stroke: ink, strokeLinecap: 'round' as const }

    return (
        <figure className={cn('relative', className)}>
            <div className="blueprint relative aspect-[4/5] overflow-hidden border border-line">
                <svg
                    ref={svgRef}
                    viewBox="0 0 400 480"
                    className="absolute inset-x-0 bottom-0 h-[92%] w-full"
                    role="img"
                    aria-label={label}
                >
                    <motion.g style={{ y: breath }}>
                        {/* Torso and neck */}
                        <path d="M30 480 C34 400 100 360 200 360 C300 360 366 400 370 480 Z" fill={solid} stroke={ink} strokeWidth={2} />
                        {/* Neck: fill plus side lines only, so no edge shows through the chin in Engine view */}
                        <rect x={172} y={296} width={56} height={74} fill={skin} />
                        <path d="M172 318 V370 M228 318 V370" {...lineProps} strokeWidth={3} />
                        <path d="M150 372 Q200 410 250 372" {...lineProps} stroke={engine ? ink : 'var(--bg)'} strokeWidth={3} />
                        <path d="M182 392 L178 440 M218 392 L222 440" {...lineProps} stroke={engine ? ink : 'var(--bg)'} strokeWidth={3} />
                        <rect x={268} y={410} width={34} height={22} fill={engine ? 'none' : 'var(--accent)'} stroke={engine ? ink : 'none'} />

                        {/* Head turns slightly towards the pointer */}
                        <motion.g style={{ rotate: tilt, transformBox: 'view-box', transformOrigin: '200px 330px' }}>
                            <ellipse cx={108} cy={250} rx={14} ry={22} fill={skin} stroke={ink} strokeWidth={3} />
                            <ellipse cx={292} cy={250} rx={14} ry={22} fill={skin} stroke={ink} strokeWidth={3} />
                            <ellipse cx={HEAD.x} cy={HEAD.y} rx={92} ry={102} fill={skin} stroke={ink} strokeWidth={3} />
                            <path
                                d="M108 222 C100 150 148 116 204 118 C262 120 304 152 296 222 C284 196 262 178 230 180 C200 182 176 170 150 178 C128 186 114 204 108 222 Z"
                                fill={solid}
                                stroke={ink}
                                strokeWidth={2}
                            />
                            <path d="M150 214 Q168 206 186 212 M214 212 Q232 206 250 214" {...lineProps} strokeWidth={4} />
                            <path d="M200 256 Q194 276 202 282" {...lineProps} strokeWidth={2.5} />
                            <path d="M180 300 Q200 314 220 300" {...lineProps} strokeWidth={3} />

                            {EYES.map((eye) => (
                                <motion.circle
                                    key={eye.x}
                                    cx={eye.x}
                                    cy={eye.y}
                                    r={7}
                                    fill={engine ? 'var(--accent)' : 'var(--ink)'}
                                    style={{ x: lookX, y: lookY, scaleY: blink }}
                                />
                            ))}

                            {/* Glasses */}
                            <g fill="none" stroke="var(--accent)" strokeWidth={3} strokeLinecap="round">
                                <circle cx={EYES[0].x} cy={EYES[0].y} r={24} />
                                <circle cx={EYES[1].x} cy={EYES[1].y} r={24} />
                                <path d="M192 248 Q200 242 208 248 M144 246 L114 238 M256 246 L286 238" />
                            </g>

                            {engine && <Construction lookX={lookX} lookY={lookY} />}
                        </motion.g>
                    </motion.g>
                </svg>
            </div>

            <figcaption className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted">{label}</span>
                <button
                    type="button"
                    aria-pressed={engine}
                    onClick={() => setEngine((value) => !value)}
                    className="hit shrink-0 rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-accent aria-pressed:text-accent"
                >
                    {engine ? 'Surface' : 'Engine'}
                </button>
            </figcaption>
        </figure>
    )
}

/** Engine overlay: construction guides plus the live look vectors. */
function Construction({ lookX, lookY }: { lookX: MotionValue<number>; lookY: MotionValue<number> }) {
    return (
        <g className="engine-label" fill="var(--accent)" stroke="var(--accent)">
            <ellipse cx={HEAD.x} cy={HEAD.y} rx={110} ry={120} fill="none" strokeDasharray="3 5" strokeWidth={1} />
            <path d={`M${HEAD.x - 12} ${HEAD.y} H${HEAD.x + 12} M${HEAD.x} ${HEAD.y - 12} V${HEAD.y + 12}`} strokeWidth={1} />
            {EYES.map((eye) => (
                <LookVector key={eye.x} eye={eye} lookX={lookX} lookY={lookY} />
            ))}
            <text x={24} y={36} stroke="none">
                head 184 × 204
            </text>
            <text x={24} y={56} stroke="none">
                look = clamp(d, {MAX_LOOK})
            </text>
        </g>
    )
}

/** Line from an eye towards the pointer, drawn 8x longer than the eye travels so it reads. */
function LookVector({
    eye,
    lookX,
    lookY,
}: {
    eye: { x: number; y: number }
    lookX: MotionValue<number>
    lookY: MotionValue<number>
}) {
    const x2 = useTransform(lookX, (v) => eye.x + v * 8)
    const y2 = useTransform(lookY, (v) => eye.y + v * 8)
    return <motion.line x1={eye.x} y1={eye.y} x2={x2} y2={y2} strokeWidth={1.5} />
}
