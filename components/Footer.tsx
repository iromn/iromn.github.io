import React from 'react'
import { socialLinks } from '@/data/social'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#080A1F] border-t border-[#00F0FF]/20 py-8">
            <div className="mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-slate-500 text-xs font-mono">
                        © {currentYear} NGANBA_IROM. SYSTEM_ONLINE.
                    </p>

                    {/* Built With */}
                    <p className="text-slate-600 text-[10px] font-mono text-center">
                        NEXT.JS // TAILWIND // FRAMER_MOTION // THREE.JS
                    </p>
                </div>
            </div>
        </footer>
    )
}
