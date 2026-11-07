'use client'

import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import { useScrollApi } from './SmoothScroll'
import SectionLink from '@/components/ui/SectionLink'
import WorkStage from '@/components/WorkStage'
import type { ProjectCard } from '@/content/projects'
import { cn } from '@/lib/utils'

/**
 * Desktop "Selected work": the section pins for one screen per project, with its
 * heading, a counter and a skip link held at the top of the frame. A sticky index on
 * the left tracks which project the scroll position is on; on the right the projects
 * sit in a deck and each one slides up over the last, scrubbed by the scroll, while
 * the one beneath recedes. React state only changes when the active project changes,
 * not on every scroll frame.
 *
 * With reduced motion (or below md) nothing pins: the heading renders on its own and
 * Work.tsx shows the plain list instead.
 */
const PINNED = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
const subscribe = (callback: () => void) => {
    const query = window.matchMedia(PINNED)
    query.addEventListener('change', callback)
    return () => query.removeEventListener('change', callback)
}

/** Share of each project's scroll slot spent sliding the next card in. */
const HANDOFF = 0.35
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const pad = (n: number) => String(n).padStart(2, '0')

type Props = {
    projects: ProjectCard[]
    heading: ReactNode
    skip: { href: string; label: string }
}

/**
 * The frame is always the same element tree, so the server-rendered heading is never
 * remounted (it would lose its reveal state). Phones and reduced-motion visitors only
 * ever render the heading; the deck mounts once the pinned layout applies. The server
 * renders the frame at full height, so nothing below it moves on hydration.
 */
export default function ProjectIndex({ projects, heading, skip }: Props) {
    const pinned = useSyncExternalStore(subscribe, () => window.matchMedia(PINNED).matches, () => false)
    const ref = useRef<HTMLDivElement>(null)
    const { scrollTo } = useScrollApi()
    const [active, setActive] = useState(0)
    const count = projects.length
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        if (!pinned) return
        const next = Math.min(count - 1, Math.max(0, Math.floor(progress * count)))
        if (next !== active) setActive(next)
    })

    // Scrolls to the middle of a project's slot, where its card is fully settled.
    function jumpTo(index: number) {
        const el = ref.current
        if (!el) return
        const range = el.offsetHeight - window.innerHeight
        scrollTo(el.getBoundingClientRect().top + window.scrollY + ((index + 0.5) / count) * range)
    }

    // Keyboard and screen-reader users land in the next section, not back at the skip link.
    function focusSkipTarget() {
        const target = document.getElementById(skip.href.split('#')[1] ?? '')
        if (!target) return
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
    }

    return (
        <div
            ref={ref}
            className="relative md:motion-safe:h-[calc(var(--slots)*100dvh)]"
            style={{ '--slots': count } as CSSProperties}
        >
            <div className="md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:flex md:motion-safe:h-[100dvh] md:motion-safe:flex-col md:motion-safe:pt-[88px]">
                <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-8 px-4 md:px-8">
                    {heading}
                    {pinned && (
                        <div className="flex shrink-0 items-center gap-8 pb-1">
                            <Counter progress={scrollYProgress} active={active} count={count} />
                            <SectionLink
                                href={skip.href}
                                onClick={focusSkipTarget}
                                className="group inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors duration-300 hover:border-ink"
                            >
                                {skip.label}
                                <ArrowDown
                                    size={14}
                                    aria-hidden="true"
                                    className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
                                />
                            </SectionLink>
                        </div>
                    )}
                </div>

                {pinned && (
                    <div className="mx-auto grid min-h-0 w-full max-w-[1400px] flex-1 grid-cols-12 gap-12 px-8 pb-6 pt-6">
                        <nav aria-label="Projects" className="col-span-4 self-center">
                            <ol className="flex flex-col">
                                {projects.map((project, index) => (
                                    <IndexItem
                                        key={project.slug}
                                        project={project}
                                        index={index}
                                        isActive={index === active}
                                        onSelect={() => jumpTo(index)}
                                    />
                                ))}
                            </ol>
                        </nav>

                        <div className="col-span-8 flex items-center justify-end">
                            {/* Width follows the viewport height, so the panel, one-liner and
                                numbers always fit under the pinned heading. The panel is 16:9
                                here (the diagram's own shape) to leave room for the text. */}
                            <div className="grid w-full max-w-[calc((100dvh-23.5rem)*16/9)] overflow-hidden">
                                {projects.map((project, index) => (
                                    <DeckCard
                                        key={project.slug}
                                        project={project}
                                        index={index}
                                        count={count}
                                        progress={scrollYProgress}
                                        isActive={index === active}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="sr-only" aria-live="polite">
                            Project {active + 1} of {count}: {projects[active].title}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

/** "02 / 04" plus one segment per project that fills as its slot is scrolled through. */
function Counter({ progress, active, count }: { progress: MotionValue<number>; active: number; count: number }) {
    return (
        <div aria-hidden="true" className="flex flex-col items-end gap-2">
            <p className="flex items-baseline gap-1.5 font-mono text-sm tabular-nums text-muted">
                {/* Keyed so the number ticks up into place every time the project changes. */}
                <span className="inline-flex overflow-hidden">
                    <span key={active} className="tick-in text-accent">
                        {pad(active + 1)}
                    </span>
                </span>
                <span>/</span>
                <span>{pad(count)}</span>
            </p>
            <div className="flex gap-1.5">
                {Array.from({ length: count }, (_, index) => (
                    <Segment key={index} progress={progress} index={index} count={count} />
                ))}
            </div>
        </div>
    )
}

function Segment({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
    const fill = useTransform(progress, (p) => Math.min(1, Math.max(0, p * count - index)))
    return (
        <span className="h-0.5 w-8 overflow-hidden bg-line">
            <motion.span className="block h-full origin-left bg-accent" style={{ scaleX: fill }} />
        </span>
    )
}

type IndexItemProps = { project: ProjectCard; index: number; isActive: boolean; onSelect: () => void }

function IndexItem({ project, index, isActive, onSelect }: IndexItemProps) {
    return (
        <li className="border-t border-line last:border-b">
            <button
                type="button"
                onClick={onSelect}
                aria-current={isActive ? 'true' : undefined}
                className="group grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-2 py-4 text-left"
            >
                <span
                    className={cn(
                        'font-mono text-xs tabular-nums transition-colors duration-500',
                        isActive ? 'text-accent' : 'text-muted',
                    )}
                >
                    {pad(index + 1)}
                </span>
                <span className="flex flex-col gap-1">
                    <span
                        className={cn(
                            'text-2xl font-medium tracking-tight transition-[color,transform] duration-500 ease-out-expo lg:text-3xl',
                            isActive ? 'translate-x-2 text-ink' : 'text-muted group-hover:text-ink',
                        )}
                    >
                        {project.title}
                    </span>
                    <span
                        className={cn(
                            'font-mono text-xs text-muted transition-opacity duration-500',
                            isActive ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        {project.client}, {project.period}
                    </span>
                </span>
            </button>
        </li>
    )
}

type DeckCardProps = {
    project: ProjectCard
    index: number
    count: number
    progress: MotionValue<number>
    isActive: boolean
}

/**
 * One card in the deck. All cards share a grid cell, so the deck is as tall as the
 * tallest card. Over the last part of the previous project's slot this card slides up
 * from below; over the last part of its own slot it shrinks back and fades as the next
 * card covers it. Only the active card can be focused or clicked.
 */
function DeckCard({ project, index, count, progress, isActive }: DeckCardProps) {
    const slot = useTransform(progress, (p) => p * count)
    const enter = useTransform(slot, (s) => (index === 0 ? 1 : easeOut(clamp((s - index + HANDOFF) / HANDOFF))))
    const cover = useTransform(slot, (s) => (index === count - 1 ? 0 : easeOut(clamp((s - index - 1 + HANDOFF) / HANDOFF))))
    const y = useTransform(enter, (t) => `${(1 - t) * 100}%`)
    const scale = useTransform(cover, (t) => 1 - t * 0.06)
    const opacity = useTransform(cover, (t) => 1 - t)

    return (
        <motion.div
            inert={!isActive}
            aria-hidden={!isActive}
            className="col-start-1 row-start-1 origin-top bg-bg"
            style={{ y, scale, opacity, zIndex: index }}
        >
            <WorkStage project={project} panelClassName="md:aspect-video" />
        </motion.div>
    )
}

function clamp(value: number) {
    return Math.min(1, Math.max(0, value))
}
