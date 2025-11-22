'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Terminal, Github, Linkedin, Mail } from 'lucide-react'
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
                        &lt;FULL_STACK_DEVELOPER | AI_ENTHUSIAST /&gt;
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto px-4 leading-relaxed font-mono"
                    >
                        Crafting scalable, modern web applications from robust backend architectures to seamless frontend experiences.
                        <br />
                        Specializing in the Laravel/PHP ecosystem, WordPress, and cutting-edge JavaScript frameworks.
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
                            className="w-full sm:w-auto btn-container cursor-pointer group bg-[#00F0FF]/10 border-2 border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
                        >
                            <Terminal size={20} className="text-[#00F0FF]" />
                            <span className="text-white">EXECUTE_PROJECTS</span>
                        </Button>

                        {/* Social Media Buttons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/iromn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#00F0FF]/10 border-2 border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group"
                                aria-label="GitHub"
                            >
                                <Github size={20} className="text-[#00F0FF]" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nganba-irom/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#00F0FF]/10 border-2 border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} className="text-[#00F0FF]" />
                            </a>
                            <a
                                href="mailto:nganba.irom47@gmail.com"
                                className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#00F0FF]/10 border-2 border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group"
                                aria-label="Email"
                            >
                                <Mail size={20} className="text-[#00F0FF]" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
