'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Terminal } from 'lucide-react'
import Button from './ui/Button'
import HeroScene from './HeroScene'

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-8 pt-16">
            {/* 3D Background Scene */}
            <HeroScene />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080A1F]/30 via-[#080A1F]/80 to-[#080A1F] z-0 pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-[#00F0FF] font-mono mb-6 text-sm md:text-base border border-[#00F0FF]/30 px-4 py-1 rounded-full bg-[#00F0FF]/5 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                        SYSTEM.INIT_SEQUENCE_START
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight"
                    >
                        NGANBA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-cyan-400">IROM</span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl sm:text-2xl md:text-3xl font-mono text-slate-300 mb-8 px-4 max-w-4xl"
                    >
                        &lt;FULL_STACK_DEVELOPER /&gt;
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto px-4 leading-relaxed font-mono"
                    >
                        Architecting scalable digital solutions.
                        <br />
                        Specialized in modern web technologies and AI integration.
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
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="w-full sm:w-auto btn-container cursor-pointer group"
                        >
                            <Terminal size={20} className="group-hover:text-[#00F0FF] transition-colors" />
                            EXECUTE_PROJECTS
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
