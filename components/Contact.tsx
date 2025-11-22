'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { socialLinks } from '@/data/social'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Mail, Copy, Check, Terminal, Radio } from 'lucide-react'

export default function Contact() {
    const [copied, setCopied] = useState(false)
    const email = 'nganba.irom47@gmail.com'

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Section id="contact" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-6 md:mb-12">
                    <Radio className="text-[#00F0FF] animate-pulse" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono">
                        ESTABLISH.<span className="text-[#00F0FF]">CONNECTION</span>
                    </motion.h2>
                </div>

                <motion.div variants={fadeInUp} className="mx-auto text-center mb-6 md:mb-12 max-w-2xl">
                    <p className="text-sm md:text-lg text-slate-400 font-mono">
                        &gt; Channel open for secure transmission.
                        <br />
                        &gt; Awaiting input...
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mx-auto max-w-5xl">
                    {socialLinks.map((link) => {
                        const Icon = link.icon
                        const isEmail = link.name === 'Email'

                        return (
                            <motion.div key={link.name} variants={fadeInUp}>
                                <div className="bg-[#080A1F]/80 backdrop-blur-sm border border-[#00F0FF]/20 rounded-xl p-4 md:p-6 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(163,53,255,0.15)] transition-all duration-300 group cursor-pointer h-full">
                                    {isEmail ? (
                                        <button onClick={handleCopyEmail} className="w-full h-full flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 text-left md:text-center">
                                            <div className="p-3 md:p-4 rounded-full bg-[#00F0FF]/10 group-hover:bg-[#00F0FF]/20 transition-colors shrink-0">
                                                <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#00F0FF]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg md:text-xl font-bold text-white font-mono mb-0.5 md:mb-1">{link.name}</h3>
                                                <p className="text-slate-400 text-xs md:text-sm font-mono truncate">{link.username}</p>
                                            </div>
                                            {copied ? (
                                                <span className="text-emerald-400 text-xs font-mono flex items-center gap-1 md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2">
                                                    <Check size={12} /> <span className="hidden md:inline">COPIED</span>
                                                </span>
                                            ) : (
                                                <span className="text-[#00F0FF] text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                                    CLICK_TO_COPY
                                                </span>
                                            )}
                                        </button>
                                    ) : (
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 text-left md:text-center">
                                            <div className="p-3 md:p-4 rounded-full bg-[#00F0FF]/10 group-hover:bg-[#00F0FF]/20 transition-colors shrink-0">
                                                <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#00F0FF]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg md:text-xl font-bold text-white font-mono mb-0.5 md:mb-1">{link.name}</h3>
                                                <p className="text-slate-400 text-xs md:text-sm font-mono truncate">{link.username}</p>
                                            </div>
                                            <span className="text-[#00F0FF] text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                                OPEN_LINK &gt;
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Section>
    )
}
