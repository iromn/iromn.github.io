'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className={cn('py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12', className)}
        >
            <div className="max-w-6xl mx-auto w-full">{children}</div>
        </motion.section>
    )
}
