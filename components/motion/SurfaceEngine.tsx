'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import ArchitectureDiagram from './ArchitectureDiagram'
import CoverPoster from '@/components/ui/CoverPoster'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import type { ProjectCard } from '@/content/projects'
import { cn } from '@/lib/utils'

type View = 'surface' | 'engine'

/**
 * A project panel that switches between its finished product (Surface) and how it
 * is built (Engine). Opens on Engine until the project has a cover image.
 */
export default function SurfaceEngine({ project, className }: { project: ProjectCard; className?: string }) {
    const reduce = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { amount: 0.4 })
    const [view, setView] = useState<View>(project.cover ? 'surface' : 'engine')

    // The panel tilts a few degrees towards a mouse pointer, like a card held in the hand.
    const tiltX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
    const tiltY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

    function tilt(event: PointerEvent<HTMLDivElement>) {
        if (reduce || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        tiltY.set(px * 7)
        tiltX.set(-py * 7)
    }

    function untilt() {
        tiltX.set(0)
        tiltY.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onPointerMove={tilt}
            onPointerLeave={untilt}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
            className={cn('relative overflow-hidden border border-line bg-bg md:aspect-[16/10]', className)}
        >
            {/* Both views stay mounted and crossfade with CSS (cheaper than mounting and
                unmounting on every switch). Small screens show only the active one. */}
            <div
                aria-hidden={view !== 'surface'}
                className={cn(
                    'relative aspect-[16/10] transition-[opacity,transform] duration-700 ease-out-expo md:absolute md:inset-0 md:aspect-auto',
                    view === 'surface' ? 'opacity-100' : 'hidden scale-[1.03] opacity-0 md:pointer-events-none md:block',
                )}
            >
                {project.cover ? (
                    <ResponsiveImage
                        src={project.cover.src}
                        alt={project.cover.alt}
                        width={1600}
                        height={1000}
                        sizes="(min-width: 768px) 58vw, 100vw"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <CoverPoster project={project} />
                )}
            </div>
            <div
                aria-hidden={view !== 'engine'}
                className={cn(
                    'blueprint relative px-4 pb-4 pt-16 transition-opacity duration-500 ease-out-expo md:absolute md:inset-0 md:flex md:items-center md:px-8',
                    view === 'engine' ? 'opacity-100' : 'hidden opacity-0 md:pointer-events-none md:flex',
                )}
            >
                <ArchitectureDiagram
                    className="w-full"
                    nodes={project.diagram.nodes}
                    edges={project.diagram.edges}
                    active={inView && view === 'engine'}
                    title={project.title}
                />
            </div>

            <div
                role="group"
                aria-label={`${project.title} view`}
                className="absolute left-4 top-4 grid grid-cols-2 rounded-full border border-line bg-bg/85 p-1 backdrop-blur-sm"
            >
                {/* Sliding pill: a transform, not a layout animation. */}
                <span
                    aria-hidden="true"
                    className={cn(
                        'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-out-expo',
                        view === 'engine' && 'translate-x-full',
                    )}
                />
                {(['surface', 'engine'] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        aria-pressed={view === option}
                        onClick={() => setView(option)}
                        className={cn(
                            'hit rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300',
                            view === option ? 'text-bg' : 'text-muted hover:text-ink',
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
