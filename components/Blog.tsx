'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import Card from './ui/Card'
import { fadeInUp } from '@/lib/animations'
import { Newspaper, Clock } from 'lucide-react'

export default function Blog() {
    return (
        <Section id="blog" className="bg-slate-900/50">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Blog & <span className="gradient-text">Articles</span>
                </motion.h2>

                <motion.div variants={fadeInUp}>
                    <Card className="text-center py-16 flex flex-col items-center blog-icon">
                        <Newspaper className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                        <h3 className="text-2xl font-semibold text-slate-400 mb-2">Coming Soon</h3>
                        <p className="text-slate-500">
                            I'm working on sharing my knowledge and experiences through blog posts. Stay tuned!
                        </p>
                    </Card>
                </motion.div>
            </motion.div>
        </Section>
    )
}
