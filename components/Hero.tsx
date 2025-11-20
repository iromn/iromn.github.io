'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Briefcase } from 'lucide-react'
import Button from './ui/Button'
import { resumeUrl } from '@/data/social'


export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-8 pt-16">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-cyan-400 font-mono mb-4 text-base md:text-lg"
                    >
                        Hi, my name is
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text px-4"
                    >
                        Nganba Irom
                    </motion.h1>

                    {/* Tagline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-300 mb-6 px-4 max-w-4xl"
                    >
                        Full-Stack Developer | AI Enthusiast
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto px-4 leading-relaxed"
                    >
                        Building scalable web applications with modern technologies. Specializing in PHP, Laravel,
                        WordPress, and cutting-edge JavaScript frameworks.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
                    >
                        <Button
                            variant="primary"
                            onClick={() => {
                                const element = document.getElementById('projects');
                                if (element) {
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                    const offsetPosition = elementPosition - 50;
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className="w-full sm:w-auto btn-container cursor-pointer"
                        >
                            <Briefcase size={20} />
                            View Projects
                        </Button>
                        {/* <Button
                            variant="secondary"
                            onClick={() => window.open(resumeUrl, '_blank')}
                            className="w-full sm:w-auto btn-container"
                        >
                            <Download size={20} />
                            Download Resume
                        </Button> */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
