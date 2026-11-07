'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Native horizontal scroller (keyboard, touch and trackpad work as normal) that a
 * mouse can also grab and drag. A drag that moves suppresses the click it ends on.
 * `relative` keeps absolutely positioned children (e.g. sr-only labels) inside the
 * scroller; without it they widened the page on phones and made mobile browsers zoom out.
 */
export default function DragScroll({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

    function onPointerDown(event: PointerEvent<HTMLDivElement>) {
        if (event.pointerType !== 'mouse' || !ref.current) return
        drag.current = { active: true, startX: event.clientX, startScroll: ref.current.scrollLeft, moved: false }
    }

    function onPointerMove(event: PointerEvent<HTMLDivElement>) {
        const el = ref.current
        if (!drag.current.active || !el) return
        const dx = event.clientX - drag.current.startX
        if (!drag.current.moved && Math.abs(dx) > 4) {
            drag.current.moved = true
            el.setPointerCapture(event.pointerId)
            el.dataset.dragging = 'true'
        }
        if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx
    }

    function onPointerUp() {
        drag.current.active = false
        if (ref.current) delete ref.current.dataset.dragging
    }

    return (
        <div
            ref={ref}
            role="region"
            aria-label={label}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={(event) => {
                if (drag.current.moved) {
                    event.preventDefault()
                    event.stopPropagation()
                    drag.current.moved = false
                }
            }}
            className={cn(
                'relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:cursor-grab md:gap-6 data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:select-none [&::-webkit-scrollbar]:hidden',
                className,
            )}
        >
            {children}
        </div>
    )
}
