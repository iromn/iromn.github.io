'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './ui/Section'
import { caseStudyProjects } from '@/data/projects'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Target, Lightbulb, TrendingUp, FileText, FolderOpen, ChevronRight } from 'lucide-react'

export default function CaseStudies() {
    const [activeFolder, setActiveFolder] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingStep, setLoadingStep] = useState(0)
    const [showFiles, setShowFiles] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [closingStep, setClosingStep] = useState(0)
    const audioCtxRef = useRef<AudioContext | null>(null)

    // Initialize audio context
    useEffect(() => {
        const initAudio = () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext
                if (AudioContext && !audioCtxRef.current) {
                    audioCtxRef.current = new AudioContext()
                }
            } catch (e) {
                console.error('Audio init failed', e)
            }
        }

        document.addEventListener('click', initAudio, { once: true })
        return () => document.removeEventListener('click', initAudio)
    }, [])

    const playSound = (type: 'click' | 'close') => {
        try {
            if (!audioCtxRef.current) return
            const ctx = audioCtxRef.current
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            const now = ctx.currentTime

            if (type === 'click') {
                // Three-tone ascending sine wave
                osc.type = 'sine'
                osc.frequency.setValueAtTime(400, now)
                osc.frequency.setValueAtTime(700, now + 0.04)
                osc.frequency.setValueAtTime(900, now + 0.08)

                gain.gain.setValueAtTime(0.2, now)
                gain.gain.setValueAtTime(0.2, now + 0.08)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

                osc.start(now)
                osc.stop(now + 0.12)
            } else if (type === 'close') {
                // Three-tone descending sine wave
                osc.type = 'sine'
                osc.frequency.setValueAtTime(900, now)
                osc.frequency.setValueAtTime(700, now + 0.04)
                osc.frequency.setValueAtTime(400, now + 0.08)

                gain.gain.setValueAtTime(0.15, now)
                gain.gain.setValueAtTime(0.15, now + 0.08)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

                osc.start(now)
                osc.stop(now + 0.12)
            }
        } catch (e) {
            // Silently fail
        }
    }

    const caseStudyDetails = {
        'ci4-cms': {
            problem:
                'Developers often need a robust, secure, and modern foundation for content-driven websites, but starting from scratch with CodeIgniter 4 can be time-consuming and lacks modern frontend integration.',
            solution:
                'Built a comprehensive CMS starter kit integrating CodeIgniter 4 with Tailwind CSS, featuring a complete authentication system, role-based access control, and a user-friendly admin dashboard.',
            impact: [
                'Accelerates development for content-driven sites',
                'Provides secure, role-based user management out of the box',
                'Modern, responsive UI with Tailwind CSS integration',
                'SEO-friendly structure and clean URLs',
            ],
        },
        'uploadit': {
            problem:
                'Users needed a way to quickly search and query information across multiple documents without manually reading through everything.',
            solution:
                'Built a complete RAG (Retrieval-Augmented Generation) pipeline using FastAPI, Pinecone vector database, and Next.js. Documents are processed into embeddings, enabling semantic search and natural language querying.',
            impact: [
                'Session-based isolation ensures user privacy',
                'Auto-expiration prevents data persistence',
                'Semantic search provides contextual answers',
                'Supports PDF, DOCX, and TXT formats',
            ],
        },
        'hr-portal': {
            problem:
                'Stratacache needed a modern HR system to manage employee data, but existing solutions were slow and had poor user experience.',
            solution:
                'Developed a custom HR portal using Vue.js for a reactive frontend and Laravel for a robust backend. Implemented caching, optimized database queries, and used Vuex for state management.',
            impact: [
                '40% reduction in page load time',
                '20% increase in user engagement',
                '50% improvement in backend query performance',
                'Real-time notifications for HR events',
            ],
        },
    }

    const loadingSteps = [
        'Accessing secure database...',
        'Scanning classified directory...',
        'Opening folder...',
        'Searching through files...',
        'Retrieving document...',
        'Decrypting contents...',
    ]

    const handleFileAccess = (index: number) => {
        playSound('click')
        setIsLoading(true)
        setLoadingStep(0)
        setShowFiles(false)

        setTimeout(() => setLoadingStep(1), 400)
        setTimeout(() => setLoadingStep(2), 800)

        setTimeout(() => {
            setLoadingStep(3)
            setShowFiles(true)
        }, 1200)

        setTimeout(() => setLoadingStep(4), 2000)
        setTimeout(() => setLoadingStep(5), 2400)

        setTimeout(() => {
            setIsLoading(false)
            setActiveFolder(index)
            setShowFiles(false)
        }, 3000)
    }

    const handleCloseFile = () => {
        playSound('close')
        setIsClosing(true)
        setClosingStep(0)

        setTimeout(() => setClosingStep(1), 300)
        setTimeout(() => setClosingStep(2), 600)
        setTimeout(() => setClosingStep(3), 900)

        setTimeout(() => {
            setIsClosing(false)
            setActiveFolder(null)
        }, 1400)
    }

    return (
        <Section id="case-studies" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <FolderOpen className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        MISSION.<span className="text-[#00F0FF]">REPORTS</span>
                    </motion.h2>
                </div>

                <div className="max-w-5xl mx-auto min-h-[500px] md:min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeFolder === null || isLoading ? (
                            <motion.div
                                key="terminal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#0a0e27] border-2 border-[#00F0FF]/30 rounded-lg overflow-hidden"
                            >
                                <div className="bg-[#00F0FF]/10 border-b border-[#00F0FF]/30 px-4 py-2 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-[#00F0FF] font-mono text-sm ml-2">CLASSIFIED_DATABASE.terminal</span>
                                </div>

                                <div className="p-4 md:p-6 font-mono text-xs md:text-sm min-h-[300px] md:min-h-[500px] relative overflow-x-auto">
                                    {!isLoading ? (
                                        <>
                                            <div className="text-[#00F0FF] mb-4 whitespace-nowrap">
                                                <span className="text-emerald-400">root@mission-control</span>
                                                <span className="text-slate-500">:</span>
                                                <span className="text-cyan-400">~/classified/reports</span>
                                                <span className="text-slate-500">$</span>
                                                <span className="ml-2">ls -la</span>
                                            </div>

                                            <div className="space-y-2 mb-6">
                                                <div className="text-slate-500">total {caseStudyProjects.length} classified files</div>
                                                {caseStudyProjects.map((project, index) => (
                                                    <motion.button
                                                        key={project.id}
                                                        onClick={() => handleFileAccess(index)}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex flex-wrap items-center gap-2 md:gap-3 text-left w-full hover:bg-[#00F0FF]/5 px-2 py-1 rounded transition-colors group"
                                                    >
                                                        <FileText className="text-[#00F0FF] group-hover:text-cyan-300 flex-shrink-0" size={16} />
                                                        <span className="text-slate-400 group-hover:text-white whitespace-nowrap text-xs md:text-sm">
                                                            -rw-r----- 1 root {(index + 1) * 1234}K
                                                        </span>
                                                        <span className="text-[#00F0FF] group-hover:text-cyan-300 break-all">
                                                            CONFIDENTIAL_{project.id.toUpperCase()}.dat
                                                        </span>
                                                        <ChevronRight className="text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" size={16} />
                                                    </motion.button>
                                                ))}
                                            </div>

                                            <div className="text-[#00F0FF] flex items-center whitespace-nowrap">
                                                <span className="text-emerald-400">root@mission-control</span>
                                                <span className="text-slate-500">:</span>
                                                <span className="text-cyan-400">~/classified/reports</span>
                                                <span className="text-slate-500">$</span>
                                                <span className="ml-2 animate-pulse">_</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="relative">
                                            <div className="space-y-3 mb-8">
                                                {loadingSteps.slice(0, loadingStep + 1).map((step, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <ChevronRight className="text-[#00F0FF]" size={14} />
                                                        <span className="text-emerald-400">{step}</span>
                                                        {index === loadingStep && <span className="text-[#00F0FF] animate-pulse">█</span>}
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {showFiles && (
                                                <div className="hidden md:block absolute left-2/3 top-9 -translate-x-1/2">
                                                    <div className="relative w-52 h-64">
                                                        {[0, 1, 2, 3, 4].map((fileIndex) => (
                                                            <motion.div
                                                                key={fileIndex}
                                                                initial={{
                                                                    rotateY: 0,
                                                                    x: 0,
                                                                    y: 0,
                                                                    opacity: 1,
                                                                    scale: 1 - fileIndex * 0.05,
                                                                    zIndex: 5 - fileIndex
                                                                }}
                                                                animate={{
                                                                    rotateY: [0, 90, 180],
                                                                    x: [0, 50, 100],
                                                                    y: [0, -10, -20],
                                                                    opacity: [1, 0.5, 0],
                                                                }}
                                                                transition={{
                                                                    duration: 0.6,
                                                                    delay: fileIndex * 0.15,
                                                                    ease: "easeInOut"
                                                                }}
                                                                className="absolute inset-0 bg-[#00F0FF]/10 border-2 border-[#00F0FF]/30 rounded-lg p-4"
                                                                style={{
                                                                    transformStyle: 'preserve-3d',
                                                                    backfaceVisibility: 'hidden'
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <FileText className="text-[#00F0FF]" size={16} />
                                                                    <div className="h-1.5 bg-[#00F0FF]/20 rounded flex-1"></div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <div className="h-1.5 bg-[#00F0FF]/10 rounded w-full"></div>
                                                                    <div className="h-1.5 bg-[#00F0FF]/10 rounded w-3/4"></div>
                                                                    <div className="h-1.5 bg-[#00F0FF]/10 rounded w-5/6"></div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : isClosing ? (
                            <motion.div
                                key="closing"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-[#0a0e27] border-2 border-[#00F0FF]/30 rounded-lg overflow-hidden"
                            >
                                <div className="bg-[#00F0FF]/10 border-b border-[#00F0FF]/30 px-4 py-2 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-[#00F0FF] font-mono text-sm ml-2">CLASSIFIED_DATABASE.terminal</span>
                                </div>

                                <div className="p-6 font-mono text-sm min-h-[300px] md:min-h-[400px]">
                                    <div className="space-y-3">
                                        {['Closing file...', 'Clearing buffer...', 'Returning to directory...', 'Ready.'].slice(0, closingStep + 1).map((step, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <ChevronRight className="text-[#00F0FF]" size={14} />
                                                <span className="text-emerald-400">{step}</span>
                                                {index === closingStep && <span className="text-[#00F0FF] animate-pulse">█</span>}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="report"
                                initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {(() => {
                                    const project = caseStudyProjects[activeFolder]
                                    const details = caseStudyDetails[project.id as keyof typeof caseStudyDetails]

                                    return (
                                        <>
                                            <button
                                                onClick={handleCloseFile}
                                                className="mb-2 flex items-center gap-2 text-[#00F0FF] hover:text-cyan-300 font-mono text-xs transition-colors"
                                            >
                                                <ChevronRight className="rotate-180" size={14} />
                                                RETURN_TO_DIRECTORY
                                            </button>

                                            <div className="relative">
                                                <div className="bg-[#00F0FF]/10 border-t border-l border-r border-[#00F0FF]/20 px-4 md:px-6 py-2 rounded-t-lg font-mono text-xs text-[#00F0FF] inline-block">
                                                    CONFIDENTIAL // {project.id.toUpperCase()}
                                                </div>

                                                <div className="bg-[#080A1F]/90 border border-[#00F0FF]/20 p-4 md:p-8 rounded-b-lg rounded-tr-lg relative overflow-hidden group">
                                                    <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                                                        <FileText size={200} />
                                                    </div>

                                                    <div className="relative z-10">
                                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-mono border-b border-[#00F0FF]/20 pb-4">
                                                            {project.title}
                                                        </h3>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <Target className="text-red-500" size={18} />
                                                                    <h4 className="text-base md:text-lg font-bold text-red-500 font-mono">THREAT_ASSESSMENT</h4>
                                                                </div>
                                                                <p className="text-slate-400 text-sm font-mono leading-relaxed">{details.problem}</p>
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <Lightbulb className="text-yellow-500" size={18} />
                                                                    <h4 className="text-base md:text-lg font-bold text-yellow-500 font-mono">TACTICAL_RESPONSE</h4>
                                                                </div>
                                                                <p className="text-slate-400 text-sm font-mono leading-relaxed">{details.solution}</p>
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <TrendingUp className="text-emerald-500" size={18} />
                                                                    <h4 className="text-base md:text-lg font-bold text-emerald-500 font-mono">MISSION_OUTCOME</h4>
                                                                </div>
                                                                <ul className="space-y-2">
                                                                    {details.impact.map((item, i) => (
                                                                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm font-mono">
                                                                            <span className="text-[#A335FF] mt-1">»</span>
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className='border-t border-[#A335FF]/20 pt-4 mt-6'>
                                                            <h4 className="text-xs font-bold text-slate-500 mb-3 font-mono uppercase tracking-widest">Arsenal Deployed</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.tech.map((tech) => (
                                                                    <span key={tech} className="px-2 py-1 bg-[#A335FF]/10 border border-[#A335FF]/20 text-[#A335FF] text-xs font-mono rounded">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </Section>
    )
}
