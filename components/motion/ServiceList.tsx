'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Plus } from '@phosphor-icons/react'
import type { Service } from '@/content/services'
import { cn } from '@/lib/utils'

const DESKTOP = '(min-width: 768px)'
/** Hover has to rest this long before the panel switches, so sweeping across rows doesn't flicker. */
const HOVER_INTENT_MS = 90

/**
 * Services list. On mobile it is an accordion. On desktop the rows never change
 * height: hovering or clicking a row swaps the sticky blueprint panel beside the list
 * (description, typical stack, deliverables), so nothing below the pointer moves.
 */
export default function ServiceList({ services }: { services: Service[] }) {
    const [open, setOpen] = useState(0)
    const active = services[open] ?? services[0]
    const hoverTimer = useRef<number | undefined>(undefined)

    useEffect(() => () => window.clearTimeout(hoverTimer.current), [])

    function preview(index: number) {
        window.clearTimeout(hoverTimer.current)
        hoverTimer.current = window.setTimeout(() => setOpen(index), HOVER_INTENT_MS)
    }

    // Desktop always shows one service in the panel, so a click there selects, never closes.
    function toggle(index: number) {
        window.clearTimeout(hoverTimer.current)
        const closes = open === index && !window.matchMedia(DESKTOP).matches
        setOpen(closes ? -1 : index)
    }

    return (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <ul className="border-b border-line md:col-span-7">
                {services.map((service, index) => {
                    const isOpen = open === index
                    const panelId = `service-${service.id}`
                    return (
                        <li key={service.id} className="relative border-t border-line">
                            <h3>
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`${panelId} service-detail`}
                                    onClick={() => toggle(index)}
                                    onPointerEnter={(event) => event.pointerType === 'mouse' && preview(index)}
                                    onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                                    className={cn(
                                        'group relative flex w-full items-center justify-between gap-6 py-6 text-left text-2xl font-medium tracking-tight transition-colors md:py-7 md:text-3xl',
                                        isOpen ? 'text-ink' : 'text-muted hover:text-ink',
                                    )}
                                >
                                    {/* Directional fill that sweeps in from the left on hover and stays while open. */}
                                    <span
                                        aria-hidden="true"
                                        className={cn(
                                            'absolute inset-y-0 -left-4 -right-4 origin-left bg-surface transition-transform duration-700 ease-out-expo md:-left-6 md:-right-6',
                                            isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                                        )}
                                    />
                                    <span className="relative transition-transform duration-700 ease-out-expo group-hover:translate-x-2">{service.title}</span>
                                    {/* Mobile: plus turns into a close cross. Desktop: an arrow points at the panel. */}
                                    <Plus
                                        size={20}
                                        className={cn(
                                            'relative shrink-0 transition-transform duration-500 ease-out-expo md:hidden',
                                            isOpen && 'rotate-45 text-accent',
                                        )}
                                    />
                                    <ArrowRight
                                        size={20}
                                        className={cn(
                                            'relative hidden shrink-0 transition-[transform,opacity] duration-500 ease-out-expo md:block',
                                            isOpen ? 'translate-x-0 text-accent opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                                        )}
                                    />
                                </button>
                            </h3>
                            {/* Mobile only: on desktop this content lives in the side panel. */}
                            <div id={panelId} hidden={!isOpen} className="md:hidden">
                                <div className="enter-up flex flex-col gap-6 pb-8">
                                    <p className="max-w-[52ch] text-lead text-muted">{service.body}</p>
                                    <ServiceSpec service={service} />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <div className="hidden md:col-span-4 md:col-start-9 md:block">
                <div
                    id="service-detail"
                    aria-live="polite"
                    className="blueprint sticky top-28 grid min-h-[34rem] items-end border border-line p-8"
                >
                    {/* Every service sits invisibly in the same cell, so the panel is always as
                        tall as the longest one and never resizes when the selection changes. */}
                    {services.map((service) => (
                        <div key={service.id} aria-hidden="true" className="invisible col-start-1 row-start-1">
                            <ServiceDetail service={service} />
                        </div>
                    ))}
                    {/* Keyed so the entrance replays whenever the open service changes. */}
                    <div key={active.id} className="enter-up col-start-1 row-start-1">
                        <ServiceDetail service={active} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ServiceDetail({ service }: { service: Service }) {
    return (
        <>
            <p className="mb-3 text-2xl font-medium tracking-tight">{service.title}</p>
            <p className="mb-8 text-[15px] leading-relaxed text-muted">{service.body}</p>
            <ServiceSpec service={service} />
        </>
    )
}

function ServiceSpec({ service }: { service: Service }) {
    return (
        <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <dt className="engine-label">Typical stack</dt>
                <dd className="flex flex-wrap gap-2">
                    {service.stack.map((item) => (
                        <span key={item} className="border border-accent/40 bg-bg px-2.5 py-1 font-mono text-xs text-ink">
                            {item}
                        </span>
                    ))}
                </dd>
            </div>
            <div className="flex flex-col gap-3">
                <dt className="engine-label">What you get</dt>
                <dd>
                    <ul className="flex flex-col gap-1.5 text-[15px]">
                        {service.deliverables.map((item) => (
                            <li key={item} className="flex items-baseline gap-3">
                                <span aria-hidden="true" className="font-mono text-accent">
                                    +
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </dd>
            </div>
        </dl>
    )
}
