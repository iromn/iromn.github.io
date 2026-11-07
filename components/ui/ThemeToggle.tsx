'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

type Theme = 'light' | 'dark'

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
}

const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light') as Theme

export default function ThemeToggle() {
    // Null on the server so the button renders identically before hydration.
    const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null)
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    function toggle() {
        document.documentElement.dataset.theme = next
        try {
            localStorage.setItem('theme', next)
        } catch {
            // Storage blocked: the choice still applies for this visit.
        }
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={theme ? `Switch to ${next} mode` : 'Toggle colour theme'}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface active:scale-[0.96]"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}
