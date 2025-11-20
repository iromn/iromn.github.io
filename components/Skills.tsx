'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import Badge from './ui/Badge'
import { skillsByCategory } from '@/data/skills'
import { staggerContainer, fadeInUp } from '@/lib/animations'


export default function Skills() {
    const categories = Object.entries(skillsByCategory)

    return (
        <Section id="skills" className="bg-slate-900/50">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
                    Skills & <span className="gradient-text">Technologies</span>
                </motion.h2>

                <div className="space-y-10">
                    {categories.map(([category, skills]) => (
                        <motion.div key={category} variants={fadeInUp} className="skill-box bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-700">
                            <h3 className="skill-category text-xl md:text-2xl font-semibold text-cyan-400 mb-5">{category}</h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {skills.map((skill) => (
                                    <Badge key={skill.name} variant="default" className="text-xs md:text-sm">
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    )
}
