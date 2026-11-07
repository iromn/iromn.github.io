import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children: ReactNode
    className?: string
    /** Seconds before this element starts rising in. */
    delay?: number
    as?: 'div' | 'p' | 'h1' | 'section'
}

/**
 * Entrance for above-the-fold content. Pure CSS, so it plays on first paint instead
 * of waiting for JavaScript to hydrate (which would delay Largest Contentful Paint).
 * Below the fold, use the Motion-based Reveal instead.
 */
export default function Rise({ children, className, delay = 0, as: Tag = 'div' }: Props) {
    return (
        <Tag className={cn('rise', className)} style={{ '--delay': `${delay}s` } as CSSProperties}>
            {children}
        </Tag>
    )
}
