'use client'

import { useEffect, type ReactNode } from 'react'
import { Z } from '@/lib/constants'

// Set after the first page has mounted in this browser session. Written only in an
// effect, so every render (including hydration replays) of the first page reads false.
let hasMounted = false

/**
 * Re-mounts on every route change. The first page load shows no curtain (it would hold
 * back the first paint); later navigations get a quick accent wipe.
 */
export default function Template({ children }: { children: ReactNode }) {
    const showCurtain = hasMounted

    useEffect(() => {
        hasMounted = true
    }, [])

    return (
        <>
            {showCurtain && <div aria-hidden="true" className="page-curtain" style={{ zIndex: Z.curtain }} />}
            {children}
        </>
    )
}
