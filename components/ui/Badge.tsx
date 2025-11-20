import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'accent'
}

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
    const variants = {
        default: 'bg-slate-800 text-slate-300 border-slate-700',
        accent: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    }

    return (
        <span
            className={cn(
                'skill-container inline-block px-3 py-1 text-sm rounded-full border font-mono',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
