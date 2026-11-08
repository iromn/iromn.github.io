'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Pins the section and converts vertical scroll into horizontal travel through its
 * panels, with a progress line scrubbed alongside. From md up and only without
 * reduced motion; otherwise the panels simply stack. GSAP is imported on demand, and
 * only once the pan can apply, so phones and reduced-motion visitors never load it.
 */
const PAN = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

export default function HorizontalPan({ children }: { children: ReactNode }) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const wrap = wrapRef.current
        const track = trackRef.current
        const bar = barRef.current
        if (!wrap || !track || !bar) return

        let cancelled = false
        let revert: (() => void) | undefined

        // Load GSAP the first time the query matches (on mount, or when the window grows
        // into it). After that, gsap.matchMedia turns the pan on and off by itself.
        const query = window.matchMedia(PAN)
        const load = () => {
            if (!query.matches) return
            query.removeEventListener('change', load)
            Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
                if (cancelled) return
                gsap.registerPlugin(ScrollTrigger)

                const mm = gsap.matchMedia()
                mm.add(PAN, () => {
                    // Layout switches to a horizontal track only while the pan is live (see classes below).
                    wrap.dataset.pan = 'on'
                    const distance = () => track.scrollWidth - window.innerWidth
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: wrap,
                            start: 'top top',
                            end: () => `+=${distance()}`,
                            pin: true,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    })
                    timeline.to(track, { x: () => -distance(), ease: 'none' }, 0)
                    timeline.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
                    return () => {
                        delete wrap.dataset.pan
                    }
                })

                // Fonts change panel widths; measure again once they are in.
                document.fonts?.ready.then(() => ScrollTrigger.refresh())
                revert = () => mm.revert()
            })
        }
        load()
        query.addEventListener('change', load)

        return () => {
            cancelled = true
            query.removeEventListener('change', load)
            revert?.()
        }
    }, [])

    return (
        <div
            ref={wrapRef}
            className="group/pan relative data-[pan=on]:flex data-[pan=on]:h-[100dvh] data-[pan=on]:flex-col data-[pan=on]:justify-center data-[pan=on]:overflow-hidden"
        >
            <div aria-hidden="true" className="absolute inset-x-0 top-[96px] hidden h-px bg-line group-data-[pan=on]/pan:block">
                <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
            </div>
            <div ref={trackRef} className="flex flex-col group-data-[pan=on]/pan:w-max group-data-[pan=on]/pan:flex-row">
                {children}
            </div>
        </div>
    )
}
