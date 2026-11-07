'use client'

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type PointerEvent,
    type ReactNode,
} from 'react'
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from 'motion/react'
import { Blueprint } from '@phosphor-icons/react'

/*
 * Hero x-ray lens. The headline renders twice: the real <h1> (Surface) and an
 * aria-hidden copy (Engine) drawn as outlines on a blueprint grid, annotated with
 * measurements read from the live page. A circular mask on the Engine layer follows
 * the pointer. All per-frame values are motion values, so moving the lens never
 * re-renders React.
 */

const LENS_RADIUS = 150

type XrayState = {
    engineOn: boolean
    setEngineOn: (value: boolean) => void
}

const XrayContext = createContext<XrayState | null>(null)

function useXray() {
    const state = useContext(XrayContext)
    if (!state) throw new Error('Xray components must be inside <XrayProvider>')
    return state
}

export function XrayProvider({ children }: { children: ReactNode }) {
    const [engineOn, setEngineOn] = useState(false)
    return <XrayContext.Provider value={{ engineOn, setEngineOn }}>{children}</XrayContext.Provider>
}

export function XrayToggle({ onLabel, offLabel }: { onLabel: string; offLabel: string }) {
    const { engineOn, setEngineOn } = useXray()
    return (
        <button
            type="button"
            aria-pressed={engineOn}
            onClick={() => setEngineOn(!engineOn)}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent aria-pressed:text-accent"
        >
            <Blueprint size={16} className="transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
            {engineOn ? offLabel : onLabel}
        </button>
    )
}

type Dims = { w: number; h: number }
type Spec = { fontSize: string; contrast: string; grade: string }

export function XrayHeadline({ lines }: { lines: readonly string[] }) {
    const reduce = useReducedMotion()
    const { engineOn } = useXray()
    const stageRef = useRef<HTMLDivElement>(null)
    const surfaceRef = useRef<HTMLHeadingElement>(null)
    const engineLineRefs = useRef<(HTMLSpanElement | null)[]>([])
    const [dims, setDims] = useState<Dims[]>([])
    const [spec, setSpec] = useState<Spec | null>(null)

    // Raw pointer position, smoothed by springs for the lens itself.
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const x = useSpring(rawX, { stiffness: 420, damping: 40 })
    const y = useSpring(rawY, { stiffness: 420, damping: 40 })
    const radius = useSpring(0, { stiffness: 180, damping: 26 })
    // The spring can settle a hair below zero; clamp so the gradient stays valid.
    const outer = useTransform(radius, (r) => Math.max(0, r))
    const inner = useTransform(radius, (r) => Math.max(0, r - 1))

    // Scrolling away opens a second lens from the bottom edge, so the headline turns
    // into its Engine view as the hero leaves the screen. Reduced motion switches it (and
    // the lift) off through a motion value after mount, not by picking other styles while
    // rendering: the server cannot know the preference, so that made hydration disagree.
    const { scrollY } = useScroll()
    const scrollMotion = useMotionValue(1)
    const stageDiagonal = useMotionValue(1600)
    const scrollLens = useTransform([scrollY, stageDiagonal, scrollMotion], ([scrolled, diagonal, on]: number[]) =>
        on * Math.min(1, Math.max(0, (scrolled - 60) / 420)) * diagonal,
    )
    const scrollInner = useTransform(scrollLens, (r) => Math.max(0, r - 1))
    const fullMask = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, #000 ${inner}px, transparent ${outer}px), radial-gradient(circle at 50% 100%, #000 ${scrollInner}px, transparent ${scrollLens}px)`
    const lift = useTransform([scrollY, scrollMotion], ([scrolled, on]: number[]) => on * -80 * Math.min(1, Math.max(0, scrolled / 700)))

    useEffect(() => scrollMotion.set(reduce ? 0 : 1), [reduce, scrollMotion])

    // Fully hidden while both lenses are closed: skips painting it, and keeps the real
    // <h1> (not this decorative copy) as the page's Largest Contentful Paint element.
    const engineVisibility = useTransform([radius, scrollLens], ([r, s]: number[]) => (r > 0.5 || s > 0.5 ? 'visible' : 'hidden'))

    // Measure the engine copy (identical layout, never transformed) and read real
    // computed styles for the spec sheet. Re-runs on resize and theme change.
    useEffect(() => {
        const stage = stageRef.current
        const surface = surfaceRef.current
        if (!stage || !surface) return

        function measure() {
            const box = stage!.getBoundingClientRect()
            stageDiagonal.set(Math.hypot(box.width, box.height))
            setDims(engineLineRefs.current.map((el) => ({ w: el?.offsetWidth ?? 0, h: el?.offsetHeight ?? 0 })))
            const styles = getComputedStyle(surface!)
            const ratio = contrastRatio(styles.color, getComputedStyle(document.body).backgroundColor)
            setSpec({
                fontSize: `${Math.round(parseFloat(styles.fontSize))}px`,
                contrast: ratio ? `${ratio.toFixed(1)}:1` : 'n/a',
                grade: ratio && ratio >= 7 ? 'AAA' : ratio && ratio >= 4.5 ? 'AA' : '',
            })
        }

        const resize = new ResizeObserver(measure)
        resize.observe(stage)
        engineLineRefs.current.forEach((el) => el && resize.observe(el))
        const theme = new MutationObserver(measure)
        theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        document.fonts?.ready.then(measure)

        return () => {
            resize.disconnect()
            theme.disconnect()
        }
    }, [stageDiagonal])

    // Toggle: open the lens to cover the whole headline, or close it again.
    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return
        if (engineOn) {
            const { width, height } = stage.getBoundingClientRect()
            const set = reduce ? 'jump' : 'set'
            rawX[set](width / 2)
            rawY[set](height / 2)
            radius[set](Math.hypot(width, height) / 2 + 40)
            if (reduce) {
                x.jump(width / 2)
                y.jump(height / 2)
            }
        } else if (reduce) {
            radius.jump(0)
        } else {
            radius.set(0)
        }
    }, [engineOn, reduce, rawX, rawY, radius, x, y])

    // Touch devices get the reveal from the scroll-driven lens above. An automatic sweep
    // on load was removed: it made the decorative Engine copy the page's largest paint.

    function trackPointer(event: PointerEvent<HTMLDivElement>) {
        if (reduce || engineOn || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        rawX.set(event.clientX - rect.left)
        rawY.set(event.clientY - rect.top)
    }

    function openLens(event: PointerEvent<HTMLDivElement>) {
        if (reduce || engineOn || event.pointerType !== 'mouse') return
        // Start the lens where the pointer entered instead of sliding in from a corner.
        const rect = event.currentTarget.getBoundingClientRect()
        x.jump(event.clientX - rect.left)
        y.jump(event.clientY - rect.top)
        trackPointer(event)
        radius.set(LENS_RADIUS)
    }

    function closeLens() {
        if (!engineOn) radius.set(0)
    }

    return (
        <motion.div
            ref={stageRef}
            className="relative -m-6 p-6"
            style={{ y: lift }}
            onPointerEnter={openLens}
            onPointerMove={trackPointer}
            onPointerLeave={closeLens}
        >
            <h1 ref={surfaceRef} className="text-hero font-medium">
                {lines.map((line, index) => (
                    <span key={line} className="block overflow-hidden pb-[0.08em]">
                        {/* CSS animation: paints immediately, no wait for hydration. */}
                        <span className="line-up" style={{ '--delay': `${0.15 + index * 0.12}s` } as CSSProperties}>
                            {line}
                        </span>
                    </span>
                ))}
            </h1>

            <motion.div
                aria-hidden="true"
                className="blueprint pointer-events-none absolute inset-0 overflow-hidden p-6"
                style={{ maskImage: fullMask, WebkitMaskImage: fullMask, visibility: engineVisibility }}
            >
                <div className="text-hero font-medium">
                    {lines.map((line, index) => (
                        <span key={line} className="block pb-[0.08em]">
                            <span
                                ref={(el) => {
                                    engineLineRefs.current[index] = el
                                }}
                                className="engine-text relative inline-block outline-1 outline-dashed outline-accent/60"
                            >
                                {line}
                                {dims[index] && (
                                    <span className="engine-label absolute left-full top-1/2 ml-4 -translate-y-1/2">
                                        span {dims[index].w} × {dims[index].h}
                                    </span>
                                )}
                            </span>
                        </span>
                    ))}
                </div>

                {spec && (
                    <dl className="engine-label absolute bottom-6 right-6 hidden grid-cols-[auto_auto] gap-x-6 gap-y-1 md:grid">
                        <dt className="opacity-60">element</dt>
                        <dd>h1, LCP candidate</dd>
                        <dt className="opacity-60">font</dt>
                        <dd>Geist Sans 500</dd>
                        <dt className="opacity-60">size</dt>
                        <dd>{spec.fontSize}, fluid</dd>
                        <dt className="opacity-60">tracking</dt>
                        <dd>-0.04em</dd>
                        <dt className="opacity-60">contrast</dt>
                        <dd>
                            {spec.contrast} {spec.grade}
                        </dd>
                    </dl>
                )}
            </motion.div>

            <LensRing x={x} y={y} radius={radius} hidden={engineOn} />
        </motion.div>
    )
}

function LensRing({
    x,
    y,
    radius,
    hidden,
}: {
    x: MotionValue<number>
    y: MotionValue<number>
    radius: MotionValue<number>
    hidden: boolean
}) {
    const left = useTransform(x, (v) => v - LENS_RADIUS)
    const top = useTransform(y, (v) => v - LENS_RADIUS)
    const scale = useTransform(radius, (r) => Math.max(0, r) / LENS_RADIUS)
    const opacity = useTransform(radius, (r) => (hidden || r < 4 ? 0 : 1))

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 rounded-full border border-accent"
            style={{ width: LENS_RADIUS * 2, height: LENS_RADIUS * 2, x: left, y: top, scale, opacity }}
        />
    )
}

// WCAG 2 contrast ratio between two computed `rgb()` colours.
function contrastRatio(foreground: string, background: string) {
    const a = luminance(foreground)
    const b = luminance(background)
    if (a === null || b === null) return null
    const [light, dark] = a > b ? [a, b] : [b, a]
    return (light + 0.05) / (dark + 0.05)
}

function luminance(color: string) {
    const match = color.match(/[\d.]+/g)
    if (!match || match.length < 3) return null
    const [r, g, b] = match.slice(0, 3).map((value) => {
        const channel = Number(value) / 255
        return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
