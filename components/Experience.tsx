'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './ui/Section'
import { experiences } from '@/data/experience'
import { fadeInUp } from '@/lib/animations'
import { Briefcase, MapPin, Calendar, TrendingUp, Terminal } from 'lucide-react'

export default function Experience() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

    return (
        <Section id="experience" className="bg-transparent">
            <div ref={sectionRef}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Briefcase className="text-[#00F0FF]" size={32} />
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                            CAREER.<span className="text-[#00F0FF]">LOGS</span>
                        </motion.h2>
                    </div>

                    {/* Career Cards Grid */}
                    <div className="relative pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.company}
                                    className="relative flex flex-col"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                delay: index * 0.6, // Each card loads 600ms after previous
                                                when: "beforeChildren" // Start children animations after this starts
                                            }
                                        }
                                    }}
                                >
                                    {/* Timeline Dot */}
                                    <motion.div
                                        variants={{
                                            hidden: { scale: 0 },
                                            visible: {
                                                scale: 1,
                                                transition: { type: "spring", stiffness: 200, damping: 10 }
                                            }
                                        }}
                                        className={`w-3 h-3 rounded-full border z-10 mb-4 mx-auto ${exp.current
                                            ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_20px_#00F0FF] animate-pulse'
                                            : 'bg-[#080A1F] border-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                                            }`}
                                    />

                                    {/* Content Card */}
                                    <div className="relative h-full">
                                        {/* Animated border container - slides from top to bottom */}
                                        <motion.div
                                            variants={{
                                                hidden: { height: 0 },
                                                visible: {
                                                    height: '100%',
                                                    transition: { duration: 0.5, ease: "easeOut" }
                                                }
                                            }}
                                            className={`absolute inset-0 backdrop-blur-sm rounded-lg overflow-hidden ${exp.current
                                                ? 'border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                                                : 'border border-[#00F0FF]/20'
                                                }`}
                                            style={{ transformOrigin: 'top' }}
                                        >
                                            {/* Background */}
                                            <div className={`absolute inset-0 ${exp.current
                                                ? 'bg-[#00F0FF]/10'
                                                : 'bg-[#080A1F]/80'
                                                }`} />
                                        </motion.div>

                                        {/* Content that appears after border animation */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                    opacity: 1,
                                                    transition: { delay: 0.5, duration: 0.3 } // Wait 0.5s for border
                                                }
                                            }}
                                            className="relative z-10 p-5 h-full group"
                                        >
                                            {/* Glitch overlay effect */}
                                            <div className="absolute inset-0 bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            <div className="relative z-10">
                                                {/* Company name & role */}
                                                <motion.div
                                                    variants={{
                                                        hidden: { opacity: 0, y: -10 },
                                                        visible: { opacity: 1, y: 0, transition: { delay: 0.6 } }
                                                    }}
                                                    className="flex items-start justify-between mb-3 flex-col gap-1"
                                                >
                                                    <div className="flex items-center gap-2 w-full">
                                                        <h3 className={`text-lg font-bold font-mono transition-colors flex-1 ${exp.current ? 'text-[#00F0FF]' : 'text-white group-hover:text-[#00F0FF]'
                                                            }`}>
                                                            {exp.company}
                                                        </h3>
                                                        {exp.current && (
                                                            <span className="px-2 py-0.5 text-xs font-mono bg-[#00F0FF] text-[#080A1F] rounded animate-pulse">
                                                                ACTIVE
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-sm">
                                                        <Terminal size={14} />
                                                        <span>{exp.role}</span>
                                                    </div>
                                                    {exp.promoted && (
                                                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mt-1">
                                                            <TrendingUp size={12} />
                                                            <span>
                                                                UPGRADE: {exp.promoted.newRole} ({exp.promoted.promotionDate})
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                {/* Date & location */}
                                                <motion.div
                                                    variants={{
                                                        hidden: { opacity: 0, y: -10 },
                                                        visible: { opacity: 1, y: 0, transition: { delay: 0.7 } }
                                                    }}
                                                    className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3 font-mono border-b border-[#00F0FF]/10 pb-3"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={12} />
                                                        <span>
                                                            {exp.startDate} - {exp.endDate}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={12} />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </motion.div>

                                                {/* Responsibilities list */}
                                                <motion.ul
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { delay: 0.8 } }
                                                    }}
                                                    className="space-y-1.5 text-slate-400 text-sm font-mono"
                                                >
                                                    {exp.responsibilities.map((resp, i) => (
                                                        <motion.li
                                                            key={i}
                                                            variants={{
                                                                hidden: { opacity: 0, x: -10 },
                                                                visible: {
                                                                    opacity: 1,
                                                                    x: 0,
                                                                    transition: { delay: 0.8 + (i * 0.05) }
                                                                }
                                                            }}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <span className="text-[#00F0FF] mt-0.5 flex-shrink-0">›</span>
                                                            <span className="leading-snug">{resp}</span>
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}
