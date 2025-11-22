'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Code2, Zap, Users, Terminal, Cpu } from 'lucide-react'

export default function About() {
    const stats = [
        { icon: Code2, label: 'YEARS_EXP', value: '04+' },
        { icon: Zap, label: 'PROJECTS_COMPLETED', value: '50+' },
        { icon: Users, label: 'TECH_STACK_COUNT', value: '25+' },
    ]

    return (
        <Section id="about" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Terminal className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        USER.<span className="text-[#00F0FF]">PROFILE</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div key={stat.label} variants={fadeInUp}>
                                <div className="bg-[#080A1F]/80 backdrop-blur-sm border border-[#00F0FF]/20 p-6 flex flex-col items-center justify-center hover:border-[#00F0FF] transition-all group">
                                    <Icon className="w-8 h-8 mb-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                                    <p className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">{stat.value}</p>
                                    <p className="text-slate-500 text-xs font-mono tracking-widest">{stat.label}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div variants={fadeInUp} className="max-w-3xl mx-auto bg-[#080A1F]/50 border-l-2 border-[#00F0FF] p-6 md:p-8 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 p-2">
                        <Cpu className="text-[#00F0FF]/20 w-16 h-16" />
                    </div>

                    <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-mono relative z-10">
                        <p>
                            &gt; IDENTITY: <span className="text-[#00F0FF]">Nganba Irom</span>
                            <br />
                            &gt; ROLE: Full-Stack Software Developer
                            <br />
                            &gt; STATUS: Online
                        </p>

                        <div className="h-px w-full bg-[#00F0FF]/20 my-4" />

                        <p>
                            Specializing in PHP, CI4, Laravel, WordPress, and modern JavaScript frameworks.
                            Executing operations on enterprise-grade systems, complex migrations, and AI-enabled applications.
                        </p>
                        <p>
                            Objective: Transform ideas into execution.
                            Focus: <span className="text-[#00F0FF]">Performance</span>, <span className="text-[#00F0FF]">Maintainability</span>, <span className="text-[#00F0FF]">Clean Architecture</span>.
                        </p>
                        <p>
                            Current Subroutine: Exploring Next.js, FastAPI, and Vector Databases for advanced AI integration.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    )
}
