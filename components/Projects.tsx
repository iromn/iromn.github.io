'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Section from './ui/Section'
import { projects } from '@/data/projects'
import { fadeInUp } from '@/lib/animations'
import { Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Terminal } from 'lucide-react'
import Image from 'next/image'

export default function Projects() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
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

    const playSlideSound = () => {
        try {
            if (!audioCtxRef.current) return
            const ctx = audioCtxRef.current
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            const now = ctx.currentTime

            // Pleasant ascending chime (like a gentle notification)
            osc.type = 'sine'
            osc.frequency.setValueAtTime(600, now)
            osc.frequency.setValueAtTime(800, now + 0.08)

            gain.gain.setValueAtTime(0.025, now)
            gain.gain.setValueAtTime(0.025, now + 0.08)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

            osc.start(now)
            osc.stop(now + 0.2)
        } catch (e) {
            // Silently fail
        }
    }

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev()
            playSlideSound()
        }
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext()
            playSlideSound()
        }
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <Section id="projects" className="bg-transparent">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Terminal className="text-[#00F0FF]" size={32} />
                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono">
                        SYSTEM.<span className="text-[#00F0FF]">PROJECTS</span>
                    </motion.h2>
                </div>

                <motion.p variants={fadeInUp} className="text-center text-slate-400 mb-12 mx-auto font-mono max-w-2xl">
                    &gt; Accessing project archives...
                    <br />
                    &gt; Loaded {projects.length} modules successfully.
                </motion.p>

                {/* Carousel Container */}
                <div className="relative px-4 md:px-12">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                                >
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="h-full flex flex-col bg-[#080A1F]/80 backdrop-blur-md border border-[#00F0FF]/20 rounded-xl overflow-hidden hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(163,53,255,0.2)] transition-all duration-300 group"
                                    >
                                        {/* Project Image */}
                                        <div className="relative aspect-video overflow-hidden border-b border-[#00F0FF]/20">
                                            <div className="absolute inset-0 bg-[#00F0FF]/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-6 flex-grow flex flex-col font-mono">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="text-xs text-[#00F0FF] border border-[#00F0FF] px-2 py-0.5 rounded">
                                                    v1.0
                                                </div>
                                            </div>

                                            <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.slice(0, 4).map((tech) => (
                                                    <span key={tech} className="text-xs text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-1 rounded border border-[#00F0FF]/20">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 4 && (
                                                    <span className="text-xs text-slate-500 px-2 py-1">
                                                        +{project.tech.length - 4}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Links */}
                                            <div className="flex items-center gap-4 pt-4 border-t border-[#00F0FF]/20 mt-auto">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-[#00F0FF] transition-colors"
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
                                                        className="text-slate-400 hover:text-[#00F0FF] transition-colors"
                                                        aria-label="View live demo"
                                                    >
                                                        <ExternalLink size={20} />
                                                    </a>
                                                )}
                                                {project.caseStudy && (
                                                    <a
                                                        href={`#case-study-${project.id}`}
                                                        className="ml-auto text-xs text-[#00F0FF] hover:text-white transition-colors flex items-center gap-1"
                                                    >
                                                        <FileText size={14} />
                                                        READ_LOGS
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#080A1F]/80 border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-white disabled:opacity-0 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#080A1F]/80 border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-white disabled:opacity-0 transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                            className={`h-1 transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-[#00F0FF]' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </Section>
    )
}
