'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Section from './ui/Section'
import Card from './ui/Card'
import Badge from './ui/Badge'
import { caseStudyProjects } from '@/data/projects'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Target, Lightbulb, TrendingUp } from 'lucide-react'

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
        <Section id="case-studies">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Case <span className="gradient-text">Studies</span>
                </motion.h2>

                <div className="space-y-12">
                    {caseStudyProjects.map((project) => {
                        const details = caseStudyDetails[project.id as keyof typeof caseStudyDetails]
                        return (
                            <motion.div key={project.id} variants={fadeInUp} id={`case-study-${project.id}`} className="case-study-title">
                                <Card hover={false} className="border-l-4 border-l-cyan-500">
                                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>

                                    <div className="grid md:grid-cols-3 gap-8 mb-6">
                                        {/* Problem */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Target className="text-red-400" size={20} />
                                                <h4 className="text-xl font-semibold text-red-400">Problem</h4>
                                            </div>
                                            <p className="text-slate-300">{details.problem}</p>
                                        </div>

                                        {/* Solution */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Lightbulb className="text-yellow-400" size={20} />
                                                <h4 className="text-xl font-semibold text-yellow-400">Solution</h4>
                                            </div>
                                            <p className="text-slate-300">{details.solution}</p>
                                        </div>

                                        {/* Impact */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <TrendingUp className="text-green-400" size={20} />
                                                <h4 className="text-xl font-semibold text-green-400">Impact</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {details.impact.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                                        <span className="text-cyan-400 mt-1">✓</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className='tech-used'>
                                        <h4 className="text-lg font-semibold text-slate-400 mb-3">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <Badge key={tech} variant="accent">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Section>
    )
}
