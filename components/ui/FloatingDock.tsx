'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { User, Code, Briefcase, Layers, FileText, Mail } from 'lucide-react'
import { getAudioContext } from '@/lib/audioContext'

const links = [
    { name: 'ABOUT', href: '#about', icon: User },
    { name: 'SKILLS', href: '#skills', icon: Code },
    { name: 'EXP', href: '#experience', icon: Briefcase },
    { name: 'PROJECTS', href: '#projects', icon: Layers },
    { name: 'CASES', href: '#case-studies', icon: FileText },
    { name: 'CONTACT', href: '#contact', icon: Mail },
]

export default function FloatingDock() {
    const [activeSection, setActiveSection] = useState('')

    const playSound = (type: 'hover' | 'click') => {
        try {
            const ctx = getAudioContext()
            if (!ctx) return

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            const now = ctx.currentTime

            if (type === 'hover') {
                // Subtle hover blip
                osc.type = 'sine'
                osc.frequency.setValueAtTime(1000, now)

                gain.gain.setValueAtTime(0.1, now)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

                osc.start(now)
                osc.stop(now + 0.05)
            } else if (type === 'click') {
                // Quick navigation chirp
                osc.type = 'sine'
                osc.frequency.setValueAtTime(1200, now)
                osc.frequency.setValueAtTime(1400, now + 0.03)

                gain.gain.setValueAtTime(0.2, now)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

                osc.start(now)
                osc.stop(now + 0.06)
            }
        } catch (e) {
            // Silently fail if audio doesn't work
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        links.forEach((link) => {
            const element = document.querySelector(link.href)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="fixed left-0 top-0 bottom-0 z-50 hidden md:flex flex-col justify-center bg-[#080A1F]/90 backdrop-blur-md border-r border-[#00F0FF]/20 w-20 hover:w-64 transition-all duration-300 group overflow-hidden">
            {/* Decorative Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F0FF]/0 via-[#00F0FF] to-[#00F0FF]/0 opacity-50" />

            <div className="flex flex-col gap-2 px-4 w-full">
                {links.map((link) => {
                    const isActive = activeSection === link.href.substring(1)
                    const Icon = link.icon

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => playSound('click')}
                            className={`relative flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group/item ${isActive
                                ? 'bg-[#00F0FF]/20 border border-[#00F0FF] text-white shadow-[0_0_15px_rgba(163,53,255,0.3)]'
                                : 'text-slate-400 hover:text-white hover:bg-[#00F0FF]/10 border border-transparent'
                                }`}
                        >
                            <div className="relative z-10 flex-shrink-0">
                                <Icon className={`w-6 h-6 ${isActive ? 'text-[#00F0FF]' : 'group-hover/item:text-[#00F0FF]'} transition-colors`} />
                            </div>

                            <span className={`font-mono text-sm tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'text-[#00F0FF] font-bold' : ''}`}>
                                {link.name}
                            </span>


                        </a>
                    )
                })}
            </div>
        </div>
    )
}
