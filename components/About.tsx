'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import Card from './ui/Card'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Code2, Zap, Users } from 'lucide-react'


export default function About() {
    const stats = [
        { icon: Code2, label: 'Years Experience', value: '4+' },
        { icon: Zap, label: 'Projects Completed', value: '50+' },
        { icon: Users, label: 'Technologies', value: '25+' },
    ]

    return (
        <Section id="about">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
                    About <span className="gradient-text">Me</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div key={stat.label} variants={fadeInUp}>
                                <Card className="text-center h-full flex flex-col items-center justify-center py-8">
                                    <Icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                                    <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                                    <p className="text-slate-400 text-sm md:text-base">{stat.label}</p>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div variants={fadeInUp} className="about-me mx-auto space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
                    <p className="text-center">
                        I'm <span className="text-cyan-400 font-semibold">Nganba Irom</span>, a full-stack software developer
                        specializing in PHP, CI4 , Laravel, WordPress, and modern JavaScript frameworks. Across my career, I've worked on
                        enterprise-grade systems, complex migrations, AI-enabled apps, payment gateway integrations, and custom
                        plugin development.
                    </p>
                    <p className="text-center">
                        I enjoy taking a problem from idea to execution — designing clean, usable interfaces and building solid
                        backends that are fast, scalable, and easy to maintain. Recently, I’ve been diving deeper into Next.js,
                        FastAPI, and vector databases to create more AI-driven applications.
                    </p>
                    <p className="text-center">
                        I focus heavily on <span className="text-purple-400 font-semibold">performance</span>,{' '}
                        <span className="text-purple-400 font-semibold">maintainability</span>, and{' '}
                        <span className="text-purple-400 font-semibold">clean architecture</span> while delivering practical,
                        user-first experiences.
                    </p>
                </motion.div>
            </motion.div>
        </Section>
    )
}
