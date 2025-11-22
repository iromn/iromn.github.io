'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import { caseStudyProjects } from '@/data/projects'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Target, Lightbulb, TrendingUp, FileText, FolderOpen } from 'lucide-react'

export default function CaseStudies() {
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

    return (
        <Section id="case-studies" className="bg-transparent">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <FolderOpen className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        MISSION.<span className="text-[#00F0FF]">REPORTS</span>
                    </motion.h2>
                </div>

                <div className="space-y-12 max-w-5xl mx-auto">
                    {caseStudyProjects.map((project) => {
                        const details = caseStudyDetails[project.id as keyof typeof caseStudyDetails]
                        return (
                            <motion.div key={project.id} variants={fadeInUp} id={`case-study-${project.id}`} className="relative">
                                {/* Folder Tab Effect */}
                                <div className="absolute -top-8 left-0 bg-[#00F0FF]/10 border-t border-l border-r border-[#00F0FF]/20 px-6 py-2 rounded-t-lg font-mono text-xs text-[#00F0FF]">
                                    CONFIDENTIAL // {project.id.toUpperCase()}
                                </div>

                                <div className="bg-[#080A1F]/90 border border-[#00F0FF]/20 p-8 rounded-b-lg rounded-tr-lg relative overflow-hidden group hover:border-[#00F0FF]/50 transition-all">
                                    {/* Watermark */}
                                    <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                                        <FileText size={200} />
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold text-white mb-6 font-mono border-b border-[#00F0FF]/20 pb-4">
                                            {project.title}
                                        </h3>

                                        <div className="grid md:grid-cols-3 gap-8 mb-6">
                                            {/* Problem */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Target className="text-red-500" size={18} />
                                                    <h4 className="text-lg font-bold text-red-500 font-mono">THREAT_ASSESSMENT</h4>
                                                </div>
                                                <p className="text-slate-400 text-sm font-mono leading-relaxed">{details.problem}</p>
                                            </div>

                                            {/* Solution */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Lightbulb className="text-yellow-500" size={18} />
                                                    <h4 className="text-lg font-bold text-yellow-500 font-mono">TACTICAL_RESPONSE</h4>
                                                </div>
                                                <p className="text-slate-400 text-sm font-mono leading-relaxed">{details.solution}</p>
                                            </div>

                                            {/* Impact */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <TrendingUp className="text-emerald-500" size={18} />
                                                    <h4 className="text-lg font-bold text-emerald-500 font-mono">MISSION_OUTCOME</h4>
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

                                        {/* Tech Stack */}
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
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Section>
    )
}
