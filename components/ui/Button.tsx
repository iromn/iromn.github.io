import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import SectionLink from './SectionLink'

type Variant = 'primary' | 'secondary'

const base =
    'inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98]'

const variants: Record<Variant, string> = {
    primary: 'bg-accent text-accent-ink hover:bg-ink hover:text-bg',
    secondary: 'border border-line text-ink hover:border-ink',
}

type Props = {
    href: string
    children: ReactNode
    variant?: Variant
    className?: string
}

/** Pill-shaped link button. Internal "/#section" links smooth-scroll via SectionLink. */
export default function Button({ href, children, variant = 'primary', className }: Props) {
    const classes = cn(base, variants[variant], className)

    if (href.startsWith('/#') || href.startsWith('#')) {
        return (
            <SectionLink href={href} className={classes}>
                {children}
            </SectionLink>
        )
    }

    const external = href.startsWith('http')
    return (
        <a
            href={href}
            className={classes}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {children}
        </a>
    )
}
