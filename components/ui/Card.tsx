import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
    return (
        <div
            className={cn(
                'card-container bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all duration-300',
                hover && 'hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    )
}
