'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { experiences } from '@/data/experience'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Briefcase, MapPin, Calendar, TrendingUp, Terminal } from 'lucide-react'

export default function Experience() {
    return (
        <Section id="experience" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-8">
                    <Briefcase className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        CAREER.<span className="text-[#00F0FF]">LOGS</span>
                    </motion.h2>
                </div>

                {/* Career Cards Grid */}
                <div className="relative pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.company}
                                variants={fadeInUp}
                                className="relative flex flex-col"
                            >
                                {/* Timeline Dot */}
                                <div className={`w-3 h-3 rounded-full border z-10 mb-4 mx-auto ${exp.current
                                    ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_20px_#00F0FF] animate-pulse'
                                    : 'bg-[#080A1F] border-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                                    }`} />

                                {/* Content Card */}
                                <div className={`backdrop-blur-sm rounded-lg p-5 transition-all duration-300 group relative overflow-hidden h-full ${exp.current
                                    ? 'bg-[#00F0FF]/10 border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]'
                                    : 'bg-[#080A1F]/80 border border-[#00F0FF]/20 hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                                    }`}>
                                    {/* Glitch overlay effect */}
                                    <div className="absolute inset-0 bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-3 flex-col gap-1">
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
                                        </div>

                                        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3 font-mono border-b border-[#00F0FF]/10 pb-3">
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
                                        </div>

                                        <ul className="space-y-1.5 text-slate-400 text-sm font-mono">
                                            {exp.responsibilities.map((resp, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-[#00F0FF] mt-0.5 flex-shrink-0">›</span>
                                                    <span className="leading-snug">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    )
}
