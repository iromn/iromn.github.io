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
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Briefcase className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        CAREER.<span className="text-[#00F0FF]">LOGS</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00F0FF]/0 via-[#00F0FF]/50 to-[#00F0FF]/0" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                variants={fadeInUp}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-[#080A1F] rounded-full border border-[#00F0FF] shadow-[0_0_10px_#00F0FF] transform -translate-x-[5px] md:-translate-x-1/2 z-10 mt-6" />

                                {/* Content */}
                                <div className={`flex-1 ml-8 md:ml-0`}>
                                    <div className="bg-[#080A1F]/80 backdrop-blur-sm border border-[#00F0FF]/20 rounded-lg p-6 hover:border-[#00F0FF]/50 transition-all duration-300 group relative overflow-hidden">
                                        {/* Glitch overlay effect */}
                                        <div className="absolute inset-0 bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4 flex-col gap-1">
                                                <h3 className="text-xl font-bold text-white font-mono group-hover:text-[#00F0FF] transition-colors">
                                                    {exp.company}
                                                </h3>
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

                                            <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4 font-mono border-b border-[#00F0FF]/10 pb-4">
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

                                            <ul className="space-y-2 text-slate-400 text-sm font-mono">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-[#00F0FF] mt-1">›</span>
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    )
}
