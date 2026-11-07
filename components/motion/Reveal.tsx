import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children: ReactNode
    className?: string
    delay?: number
    /** Vertical travel in px before the element settles. */
    y?: number
    as?: 'div' | 'li' | 'section' | 'p' | 'span'
}

/**
 * Fades and lifts content into place the first time it enters the viewport.
 * Server-rendered: one shared IntersectionObserver (RevealObserver, mounted in the
 * layout) flips `data-shown`, and CSS does the transition. No per-instance JS.
 * Content is only hidden once the `js` class is on <html>, so it never disappears
 * without JavaScript. Reduced motion shows everything immediately.
 */
export default function Reveal({ children, className, delay = 0, y = 24, as: Tag = 'div' }: Props) {
    return (
        <Tag className={cn('reveal', className)} style={{ '--delay': `${delay}s`, '--y': `${y}px` } as CSSProperties}>
            {children}
        </Tag>
    )
}
