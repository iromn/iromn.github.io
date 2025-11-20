import React from 'react'
import { socialLinks } from '@/data/social'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-4">
            <div className="mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4 footer-copyright">
                    {/* Copyright */}
                    <p className="text-slate-400 text-sm">
                        © {currentYear} Nganba Irom. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                                    aria-label={link.name}
                                >
                                    <Icon size={20} />
                                </a>
                            )
                        })}
                    </div>

                    {/* Built With */}
                    <p className="text-slate-500 text-xs font-mono footer-text text-center">
                        Built with Next.js + TypeScript + Tailwind
                    </p>
                </div>
            </div>
        </footer>
    )
}
