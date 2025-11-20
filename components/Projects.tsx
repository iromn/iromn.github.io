'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Section from './ui/Section'
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { projects } from '@/data/projects'
import { fadeInUp } from '@/lib/animations'
import { Github, ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <Section id="projects" className="bg-slate-900/50">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>

                <motion.p variants={fadeInUp} className="text-center text-slate-400 mb-12 mx-auto">
                    Explore my portfolio of projects showcasing full-stack development, AI integration, and enterprise solutions.
                </motion.p>

                {/* Carousel Container */}
                <div className="relative">
                    <div className="overflow-hidden carousel-container" ref={emblaRef}>
                        <div className="flex gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                                >
                                    <Card className="h-full flex flex-col">
                                        {/* Project Image */}
                                        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-slate-800">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="carousel-image object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="carousel-info flex-grow flex flex-col">
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{project.title}</h3>
                                            <p className="project-description text-slate-400 mb-4 flex-grow text-sm md:text-base leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="tech-stack flex flex-wrap gap-2 mb-4">
                                                {project.tech.slice(0, 4).map((tech) => (
                                                    <Badge key={tech} variant="accent">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {project.tech.length > 4 && (
                                                    <Badge variant="default">+{project.tech.length - 4}</Badge>
                                                )}
                                            </div>

                                            {/* Links */}
                                            <div className="project-link flex items-center gap-3 pt-4 border-t border-slate-800">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                                                        aria-label="View on GitHub"
                                                    >
                                                        <Github size={20} />
                                                    </a>
                                                )}
                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                                                        aria-label="View live demo"
                                                    >
                                                        <ExternalLink size={20} />
                                                    </a>
                                                )}
                                                {project.caseStudy && (
                                                    <a
                                                        href={`#case-study-${project.id}`}
                                                        className="ml-auto text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                                                    >
                                                        <FileText size={16} />
                                                        Case Study
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                            className="p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-cyan-400 w-8' : 'bg-slate-600 hover:bg-slate-500'
                                        }`}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                            className="p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            aria-label="Next project"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Section>
    )
}
