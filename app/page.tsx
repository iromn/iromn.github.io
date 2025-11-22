'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import CaseStudies from '@/components/CaseStudies'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import FloatingDock from '@/components/ui/FloatingDock'
import SnapSection from '@/components/ui/SnapSection'
import BootLoader from '@/components/ui/BootLoader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <BootLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[var(--background)] text-[var(--foreground)] scroll-smooth">
          <Navbar />
          <FloatingDock />

          <SnapSection id="hero">
            <Hero />
          </SnapSection>

          <SnapSection id="about">
            <About />
          </SnapSection>

          <SnapSection id="skills">
            <Skills />
          </SnapSection>

          <SnapSection id="experience">
            <Experience />
          </SnapSection>

          <SnapSection id="projects">
            <Projects />
          </SnapSection>

          <SnapSection id="case-studies">
            <CaseStudies />
          </SnapSection>

          <SnapSection id="blog">
            <Blog />
          </SnapSection>

          <SnapSection id="contact">
            <Contact />
          </SnapSection>

          {/* Footer needs to be in a snap section or it will be skipped */}
          <section className="snap-start w-full">
            <Footer />
          </section>
        </div>
      )}
    </>
  )
}

