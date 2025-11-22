'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SnapSectionProps {
    children: ReactNode
    id?: string
    className?: string
}

export default function SnapSection({ children, id, className = '' }: SnapSectionProps) {
    return (
        <section
            id={id}
            className={`min-h-screen w-full snap-start flex flex-col justify-center items-center relative md:pl-24 ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </section>
    )
}
