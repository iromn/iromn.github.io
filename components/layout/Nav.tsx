'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SectionLink from '@/components/ui/SectionLink'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useScrollApi } from '@/components/motion/SmoothScroll'
import { ctas, navLinks, site } from '@/content/site'
import { EASE_OUT_EXPO, NAV_HEIGHT, Z } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Nav() {
    const reduce = useReducedMotion()
    const { scrollY } = useScroll()
    const { stop, start } = useScrollApi()
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    // Hide while reading downwards, return as soon as the visitor scrolls up.
    // State only changes when the direction or threshold flips, not every frame.
    useMotionValueEvent(scrollY, 'change', (y) => {
        const previous = scrollY.getPrevious() ?? 0
        const shouldHide = !reduce && y > previous && y > 160
        if (shouldHide !== hidden) setHidden(shouldHide)
        const isScrolled = y > 8
        if (isScrolled !== scrolled) setScrolled(isScrolled)
    })

    useEffect(() => {
        if (!open) return
        stop()
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        const button = menuButtonRef.current
        return () => {
            start()
            window.removeEventListener('keydown', onKey)
            button?.focus()
        }
    }, [open, stop, start])

    return (
        <>
            <motion.header
                className={cn(
                    'fixed inset-x-0 top-0 border-b transition-[background-color,border-color] duration-500',
                    scrolled && !open ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent',
                )}
                style={{ zIndex: Z.nav, height: NAV_HEIGHT }}
                animate={{ y: hidden && !open ? '-100%' : '0%' }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
                <Container className="flex h-full items-center justify-between gap-6">
                    <SectionLink
                        href="/#top"
                        className="hit text-[15px] font-medium tracking-tight"
                        onClick={() => setOpen(false)}
                    >
                        {site.name}
                    </SectionLink>

                    <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <SectionLink
                                key={link.href}
                                href={link.href}
                                className="hit text-[15px] text-muted transition-colors hover:text-ink"
                            >
                                {link.label}
                            </SectionLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button href={ctas.contact.href} className="hit hidden h-10 px-5 text-sm md:inline-flex">
                            {ctas.contact.label}
                        </Button>
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            className="hit inline-flex size-10 items-center justify-center rounded-full hover:bg-surface md:hidden"
                        >
                            {open ? <X size={20} /> : <List size={20} />}
                        </button>
                    </div>
                </Container>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="fixed inset-0 flex flex-col bg-bg md:hidden"
                        style={{ zIndex: Z.nav - 1, paddingTop: NAV_HEIGHT }}
                        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                        exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    >
                        <Container className="flex flex-1 flex-col justify-between pb-10 pt-8">
                            <nav aria-label="Mobile" className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={reduce ? false : { opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: EASE_OUT_EXPO }}
                                    >
                                        <SectionLink
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className="block py-2 text-5xl font-medium tracking-tight"
                                        >
                                            {link.label}
                                        </SectionLink>
                                    </motion.div>
                                ))}
                            </nav>
                            <div onClick={() => setOpen(false)}>
                                <Button href={ctas.contact.href} className="w-full">
                                    {ctas.contact.label}
                                </Button>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
