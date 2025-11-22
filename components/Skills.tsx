'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { skillsByCategory } from '@/data/skills'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Cpu, Code, Database, Wrench } from 'lucide-react'

const icons: Record<string, any> = {
    "Frontend": Code,
    "Backend": Database,
    "Tools": Wrench,
    "Other": Cpu
}

export default function Skills() {
    const categories = Object.entries(skillsByCategory)

    return (
        <Section id="skills" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Cpu className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        TECH.<span className="text-[#00F0FF]">STACK</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {categories.map(([category, skills]) => {
                        const Icon = icons[category] || Cpu
                        return (
                            <motion.div
                                key={category}
                                variants={fadeInUp}
                                className="bg-[#080A1F]/80 backdrop-blur-sm border border-[#00F0FF]/20 rounded-xl p-6 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(163,53,255,0.15)] transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-6 border-b border-[#00F0FF]/10 pb-4">
                                    <Icon className="text-[#00F0FF]" size={24} />
                                    <h3 className="text-xl font-bold text-white font-mono">{category.toUpperCase()}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="relative group/skill"
                                        >
                                            <div className="px-3 py-1.5 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded text-sm text-slate-300 font-mono hover:bg-[#00F0FF]/20 hover:text-white hover:border-[#00F0FF]/50 transition-all cursor-default">
                                                {skill.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Section>
    )
}
