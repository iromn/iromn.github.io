'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { fadeInUp } from '@/lib/animations'
import { Newspaper, Radio } from 'lucide-react'

export default function Blog() {
    return (
        <Section id="blog" className="bg-transparent">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Newspaper className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        DATA.<span className="text-[#00F0FF]">LOGS</span>
                    </motion.h2>
                </div>

                <motion.div variants={fadeInUp}>
                    <div className="max-w-2xl mx-auto bg-[#080A1F]/80 backdrop-blur-sm border border-[#00F0FF]/20 p-12 rounded-xl text-center relative overflow-hidden group">
                        {/* Scanning effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#00F0FF]/50 animate-scan opacity-50" />

                        <Radio className="w-16 h-16 mx-auto mb-6 text-[#00F0FF] animate-pulse" />

                        <h3 className="text-2xl font-bold text-white mb-4 font-mono">TRANSMISSION_PENDING</h3>
                        <p className="text-slate-400 font-mono">
                            &gt; Establishing uplink...
                            <br />
                            &gt; No data packets found in current sector.
                            <br />
                            &gt; Stand by for future updates.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    )
}
