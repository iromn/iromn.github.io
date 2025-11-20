import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost'
    children: React.ReactNode
}

export default function Button({
    variant = 'primary',
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        'px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2'

    const variants = {
        primary:
            'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105',
        secondary:
            'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 hover:scale-105',
        ghost: 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800',
    }

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </button>
    )
}
