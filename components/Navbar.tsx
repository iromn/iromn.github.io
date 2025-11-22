'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        handleScroll() // Set initial state
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Track active section based on scroll position
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
            threshold: 0
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        // Observe all sections
        navLinks.forEach((link) => {
            const element = document.getElementById(link.href.replace('#', ''))
            if (element) {
                observer.observe(element)
            }
        })

        // Handle scroll to detect hero section (top) and bottom
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // If at the very top (hero section), clear active section
            if (scrollTop < 100) {
                setActiveSection('')
            }
            // If at the very bottom, highlight Contact
            else if (scrollTop + windowHeight >= documentHeight - 50) {
                setActiveSection('contact')
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial state

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])




    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mounted && scrolled ? 'bg-[#0a0e27]/95 backdrop-blur-lg border-b border-[#00F0FF]/30' : 'bg-transparent'
                }`}
        >
            <div className="nav-bar mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#"
                        className={`text-xl font-bold font-mono transition-opacity duration-300 ${scrolled ? 'opacity-100 text-[#00F0FF]' : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        Nganba Irom
                    </a>

                    {/* Desktop Navigation - Hidden since we use FloatingDock */}
                    <div className="hidden md:hidden items-center gap-8">
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-[#00F0FF] hover:text-cyan-300 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0e27]/98 backdrop-blur-lg border-b border-[#00F0FF]/30"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '')
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block transition-all duration-200 py-2 px-3 rounded cursor-pointer font-mono ${isActive
                                            ? 'text-[#00F0FF] font-semibold bg-[#00F0FF]/10 border-l-2 border-[#00F0FF]'
                                            : 'text-slate-300 hover:text-[#00F0FF] hover:bg-[#00F0FF]/5'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
