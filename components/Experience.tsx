'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { experiences } from '@/data/experience'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react'

export default function Experience() {
    return (
        <Section id="experience">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Work <span className="gradient-text">Experience</span>
                </motion.h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                variants={fadeInUp}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-950 transform -translate-x-[7px] md:-translate-x-1/2 z-10" />

                                {/* Content */}
                                <div className={`flex-1`}>
                                    <div className="career-box bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 ml-8 md:ml-0">
                                        <div className="flex items-start justify-between mb-4 flex-col md:flex-row gap-2">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                                                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                                                    <Briefcase size={16} />
                                                    <span>{exp.role}</span>
                                                </div>
                                                {exp.promoted && (
                                                    <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                                                        <TrendingUp size={14} />
                                                        <span>
                                                            Promoted to {exp.promoted.newRole} ({exp.promoted.promotionDate})
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                <span>
                                                    {exp.startDate} - {exp.endDate}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 text-slate-300">
                                            {exp.responsibilities.map((resp, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-cyan-400 mt-1">▹</span>
                                                    <span>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
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
