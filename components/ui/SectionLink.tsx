'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps, MouseEvent } from 'react'
import { useScrollApi } from '@/components/motion/SmoothScroll'

type Props = ComponentProps<typeof Link> & { href: string }

/**
 * Link to a home-page section ("/#work"). On the home page it smooth-scrolls in place;
 * from any other page it navigates normally and the browser lands on the anchor.
 */
export default function SectionLink({ href, onClick, ...rest }: Props) {
    const pathname = usePathname()
    const { scrollTo } = useScrollApi()

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
        onClick?.(event)
        if (event.defaultPrevented || pathname !== '/') return
        const hash = href.split('#')[1]
        if (!hash) return
        event.preventDefault()
        if (hash === 'top') scrollTo(0)
        else scrollTo(`#${hash}`)
        history.replaceState(null, '', hash === 'top' ? '/' : `#${hash}`)
    }

    return <Link href={href} onClick={handleClick} {...rest} />
}
