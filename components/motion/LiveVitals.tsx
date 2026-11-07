'use client'

import { useEffect, useState } from 'react'

type Vitals = {
    lcp: number | null
    cls: number
    transferKb: number | null
    jsKb: number | null
    requests: number | null
}

const INITIAL: Vitals = { lcp: null, cls: 0, transferKb: null, jsKb: null, requests: null }

/**
 * Reads this visit's own performance from the browser: Largest Contentful Paint and
 * Cumulative Layout Shift via PerformanceObserver, page weight from Resource Timing.
 * Nothing is sent anywhere.
 */
export default function LiveVitals() {
    const [vitals, setVitals] = useState<Vitals>(INITIAL)
    const [supported, setSupported] = useState(true)

    useEffect(() => {
        if (typeof PerformanceObserver === 'undefined') {
            // Deferred so the state change doesn't happen synchronously inside the effect.
            queueMicrotask(() => setSupported(false))
            return
        }

        const observers: PerformanceObserver[] = []
        const watch = (type: string, onEntries: (entries: PerformanceEntryList) => void) => {
            try {
                const observer = new PerformanceObserver((list) => onEntries(list.getEntries()))
                observer.observe({ type, buffered: true })
                observers.push(observer)
            } catch {
                // Entry type not supported in this browser (e.g. Safari has no layout-shift).
            }
        }

        watch('largest-contentful-paint', (entries) => {
            const last = entries.at(-1)
            if (last) setVitals((v) => ({ ...v, lcp: Math.round(last.startTime) }))
        })
        watch('layout-shift', (entries) => {
            const shift = entries.reduce((sum, entry) => {
                const e = entry as PerformanceEntry & { value: number; hadRecentInput: boolean }
                return e.hadRecentInput ? sum : sum + e.value
            }, 0)
            setVitals((v) => ({ ...v, cls: v.cls + shift }))
        })

        const measureWeight = () => {
            const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
            const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
            const all = [...(nav ? [nav] : []), ...resources]
            const bytes = all.reduce((sum, r) => sum + (r.transferSize || 0), 0)
            const js = resources
                .filter((r) => r.initiatorType === 'script' || r.name.endsWith('.js'))
                .reduce((sum, r) => sum + (r.transferSize || 0), 0)
            setVitals((v) => ({
                ...v,
                transferKb: Math.round(bytes / 1024),
                jsKb: Math.round(js / 1024),
                requests: all.length,
            }))
        }
        const timer = window.setTimeout(measureWeight, 1500)

        return () => {
            observers.forEach((observer) => observer.disconnect())
            window.clearTimeout(timer)
        }
    }, [])

    if (!supported) {
        return <p className="text-muted">Your browser doesn&apos;t expose these measurements.</p>
    }

    const rows = [
        { label: 'Largest Contentful Paint', value: vitals.lcp === null ? null : `${vitals.lcp} ms` },
        { label: 'Cumulative Layout Shift', value: vitals.cls.toFixed(3) },
        { label: 'Transferred', value: vitals.transferKb === null ? null : `${vitals.transferKb} KB` },
        { label: 'JavaScript', value: vitals.jsKb === null ? null : `${vitals.jsKb} KB` },
        { label: 'Requests', value: vitals.requests === null ? null : String(vitals.requests) },
    ]

    return (
        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-5" aria-live="polite">
            {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-2 border-b border-line py-6 lg:border-b-0 lg:pr-6">
                    <dt className="text-sm text-muted">{row.label}</dt>
                    <dd className="font-mono text-3xl tabular-nums">
                        {row.value ?? <span className="text-muted">measuring</span>}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
