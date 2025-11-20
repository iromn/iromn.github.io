'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import Card from './ui/Card'
import { socialLinks } from '@/data/social'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Copy, Check } from 'lucide-react'

export default function Contact() {
    const [copied, setCopied] = useState(false)
    const email = 'nganba.irom47@gmail.com'

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Section id="contact">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Get In <span className="gradient-text">Touch</span>
                </motion.h2>

                <motion.div variants={fadeInUp} className="mx-auto text-center mb-12">
                    <p className="text-lg text-slate-300">
                        I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mx-auto">
                    {socialLinks.map((link) => {
                        const Icon = link.icon
                        const isEmail = link.name === 'Email'

                        return (
                            <motion.div key={link.name} variants={fadeInUp}>
                                <Card className="text-center group cursor-pointer">
                                    {isEmail ? (
                                        <button onClick={handleCopyEmail} className="w-full flex flex-row justify-start md:justify-center items-center gap-2">
                                            <Icon className="w-12 h-12 mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                                            <div className='text-start'>
                                                <h3 className="text-xl font-semibold text-white mb-2">{link.name}</h3>
                                                <p className="text-slate-400 text-sm mb-2">{link.username}</p>
                                            </div>
                                        </button>
                                    ) : (
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="block flex flex-row justify-start md:justify-center items-center gap-2">
                                            <Icon className="w-12 h-12 mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                                            <div className='text-start'>
                                                <h3 className="text-xl font-semibold text-white mb-2">{link.name}</h3>
                                                <p className="text-slate-400 text-sm">{link.username}</p>
                                            </div>
                                        </a>
                                    )}
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Section>
    )
}
