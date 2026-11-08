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
 * measurements read from the live page. The Engine copy is seen through a circular
 * window that follows the pointer 1:1.
 *
 * The window is a fixed-size circle moved and scaled with transforms, and the Engine
 * copy inside it is moved and scaled the opposite way, so it stays pinned over the
 * headline. Everything per-frame is a transform on a composited layer: no animated
 * mask-image, so moving or opening the lens never repaints the outlined type. All
 * per-frame values are motion values, so it never re-renders React either.
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
            className="hit group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent aria-pressed:text-accent"
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

    // Pointer position, tracked 1:1. Only the lens opening and closing is sprung, and
    // stiffly enough (critically damped) to settle in about a sixth of a second.
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const radius = useSpring(0, { stiffness: 500, damping: 45 })

    // Scrolling away opens a second lens from the bottom edge, so the headline turns
    // into its Engine view as the hero leaves the screen. Reduced motion switches it (and
    // the lift) off through a motion value after mount, not by picking other styles while
    // rendering: the server cannot know the preference, so that made hydration disagree.
    const { scrollY } = useScroll()
    const scrollMotion = useMotionValue(1)
    const stageWidth = useMotionValue(1400)
    const stageHeight = useMotionValue(400)
    const stageDiagonal = useTransform([stageWidth, stageHeight], ([w, h]: number[]) => Math.hypot(w, h))
    const scrollLens = useTransform([scrollY, stageDiagonal, scrollMotion], ([scrolled, diagonal, on]: number[]) =>
        on * Math.min(1, Math.max(0, (scrolled - 60) / 420)) * diagonal,
    )
    // The scroll lens grows from the middle of the stage's bottom edge.
    const scrollX = useTransform(stageWidth, (w) => w / 2)
    const lift = useTransform([scrollY, scrollMotion], ([scrolled, on]: number[]) => on * -80 * Math.min(1, Math.max(0, scrolled / 700)))

    useEffect(() => scrollMotion.set(reduce ? 0 : 1), [reduce, scrollMotion])

    // Measure the engine copy (identical layout, never transformed) and read real
    // computed styles for the spec sheet. Re-runs on resize and theme change.
    useEffect(() => {
        const stage = stageRef.current
        const surface = surfaceRef.current
        if (!stage || !surface) return

        function measure() {
            // Layout size, not the bounding box: the stage lifts with a transform on scroll.
            stageWidth.set(stage!.offsetWidth)
            stageHeight.set(stage!.offsetHeight)
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
    }, [stageWidth, stageHeight])

    // Toggle: open the lens to cover the whole headline, or close it again.
    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return
        if (engineOn) {
            const width = stage.offsetWidth
            const height = stage.offsetHeight
            x.set(width / 2)
            y.set(height / 2)
            if (reduce) radius.jump(Math.hypot(width, height) / 2 + 40)
            else radius.set(Math.hypot(width, height) / 2 + 40)
        } else if (reduce) {
            radius.jump(0)
        } else {
            radius.set(0)
        }
    }, [engineOn, reduce, radius, x, y])

    // Touch devices get the reveal from the scroll-driven lens above. An automatic sweep
    // on load was removed: it made the decorative Engine copy the page's largest paint.

    function trackPointer(event: PointerEvent<HTMLDivElement>) {
        if (reduce || engineOn || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - rect.left)
        y.set(event.clientY - rect.top)
    }

    function openLens(event: PointerEvent<HTMLDivElement>) {
        if (reduce || engineOn || event.pointerType !== 'mouse') return
        trackPointer(event)
        radius.set(LENS_RADIUS)
    }

    function closeLens() {
        if (!engineOn) radius.set(0)
    }

    function renderEngine(measured: boolean) {
        return (
            <>
                <div className="text-hero font-medium">
                    {lines.map((line, index) => (
                        <span key={line} className="block pb-[0.08em]">
                            <span
                                ref={
                                    measured
                                        ? (el) => {
                                              engineLineRefs.current[index] = el
                                          }
                                        : undefined
                                }
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
            </>
        )
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

            {/* Pointer lens, then the scroll lens; each shows its own copy of the Engine
                layer, and only the first one carries the measuring refs. */}
            <LensWindow cx={x} cy={y} radius={radius} width={stageWidth} height={stageHeight}>
                {renderEngine(true)}
            </LensWindow>
            <LensWindow cx={scrollX} cy={stageHeight} radius={scrollLens} width={stageWidth} height={stageHeight}>
                {renderEngine(false)}
            </LensWindow>

            <LensRing x={x} y={y} radius={radius} hidden={engineOn} />
        </motion.div>
    )
}

/**
 * A circular window onto the Engine layer, centred on (cx, cy) in stage coordinates
 * with the given radius. The window is a fixed LENS_RADIUS circle, translated and
 * scaled; its contents get the inverse transform, so they line up with the stage
 * exactly. Hidden while closed, which skips painting it and keeps the real <h1> (not
 * this decorative copy) as the page's Largest Contentful Paint element.
 */
function LensWindow({
    cx,
    cy,
    radius,
    width,
    height,
    children,
}: {
    cx: MotionValue<number>
    cy: MotionValue<number>
    radius: MotionValue<number>
    width: MotionValue<number>
    height: MotionValue<number>
    children: ReactNode
}) {
    // The spring can settle a hair below zero; keep the scale positive and invertible.
    const scale = useTransform(radius, (r) => Math.max(0.5, r) / LENS_RADIUS)
    const visibility = useTransform(radius, (r) => (r > 0.5 ? 'visible' : 'hidden'))
    const left = useTransform(cx, (v) => v - LENS_RADIUS)
    const top = useTransform(cy, (v) => v - LENS_RADIUS)
    const innerScale = useTransform(scale, (k) => 1 / k)
    const innerX = useTransform([cx, scale], ([c, k]: number[]) => LENS_RADIUS - c / k)
    const innerY = useTransform([cy, scale], ([c, k]: number[]) => LENS_RADIUS - c / k)

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full will-change-transform"
            style={{ width: LENS_RADIUS * 2, height: LENS_RADIUS * 2, x: left, y: top, scale, visibility }}
        >
            <motion.div
                className="blueprint absolute left-0 top-0 p-6 will-change-transform"
                style={{ width, height, x: innerX, y: innerY, scale: innerScale, originX: 0, originY: 0 }}
            >
                {children}
            </motion.div>
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
