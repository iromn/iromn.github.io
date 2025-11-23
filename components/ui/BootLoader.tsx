'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAudioContext, initAudioContext } from '@/lib/audioContext'

interface BootLoaderProps {
    onComplete: () => void
}

const bootSequence = [
    '> INITIALIZING SYSTEM...',
    '> LOADING KERNEL MODULES...',
    '> MOUNTING FILE SYSTEMS...',
    '> CONNECTING TO SECURE SERVER...',
    '> ESTABLISHING UPLINK...',
]

export default function BootLoader({ onComplete }: BootLoaderProps) {
    const [textLines, setTextLines] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showCursor, setShowCursor] = useState(true)
    const [isStarted, setIsStarted] = useState(false)
    const [showGridAnimation, setShowGridAnimation] = useState(false)

    const targetUsername = 'guest_user'
    const targetPassword = '••••••••'

    // Create grid cells (10x10 grid)
    const gridSize = 10
    const totalCells = gridSize * gridSize

    const playSound = (type: 'bootup' | 'type' | 'line' | 'success') => {
        try {
            const ctx = getAudioContext()
            if (!ctx) return

            if (type === 'bootup') {
                // Three-tone ascending sine wave
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.connect(gain)
                gain.connect(ctx.destination)

                const now = ctx.currentTime
                osc.type = 'sine'

                // Smooth, pleasant ascending tones
                osc.frequency.setValueAtTime(400, now)
                osc.frequency.setValueAtTime(700, now + 0.04)
                osc.frequency.setValueAtTime(900, now + 0.08)

                gain.gain.setValueAtTime(0.15, now)
                gain.gain.setValueAtTime(0.15, now + 0.08)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

                osc.start(now)
                osc.stop(now + 0.12)
            } else if (type === 'type') {
                // Retro keyboard mechanical click
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.connect(gain)
                gain.connect(ctx.destination)

                const now = ctx.currentTime
                osc.type = 'square'

                // Randomize slightly for realism
                const freq = 900 + Math.random() * 300
                osc.frequency.setValueAtTime(freq, now)
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.02)

                gain.gain.setValueAtTime(0.06, now)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

                osc.start(now)
                osc.stop(now + 0.02)
            } else if (type === 'line') {
                // Terminal message received - quick double beep
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.connect(gain)
                gain.connect(ctx.destination)

                const now = ctx.currentTime
                osc.type = 'square'

                // Classic terminal "blip" - quick double beep
                osc.frequency.setValueAtTime(800, now)
                osc.frequency.setValueAtTime(800, now + 0.03)
                osc.frequency.setValueAtTime(1000, now + 0.04)

                gain.gain.setValueAtTime(0.05, now)
                gain.gain.setValueAtTime(0.05, now + 0.03)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

                osc.start(now)
                osc.stop(now + 0.08)
            } else if (type === 'success') {
                // Access granted - triumphant retro confirmation
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.connect(gain)
                gain.connect(ctx.destination)

                const now = ctx.currentTime
                osc.type = 'square'

                // Ascending victory beeps
                osc.frequency.setValueAtTime(800, now)
                osc.frequency.setValueAtTime(1000, now + 0.1)
                osc.frequency.setValueAtTime(1200, now + 0.2)
                osc.frequency.setValueAtTime(1600, now + 0.3)

                gain.gain.setValueAtTime(0.08, now)
                gain.gain.linearRampToValueAtTime(0.08, now + 0.3)
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

                osc.start(now)
                osc.stop(now + 0.5)
            }
        } catch (e) {
            console.error('Audio playback failed', e)
        }
    }

    const handleStart = () => {
        initAudioContext()
        playSound('bootup')
        setShowGridAnimation(true)

        // Wait for grid animation to complete before starting boot sequence
        setTimeout(() => {
            setShowGridAnimation(false)
            setIsStarted(true)
        }, 1500)
    }

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    // Boot sequence text
    useEffect(() => {
        if (!isStarted) return

        if (currentStep < bootSequence.length) {
            const timeout = setTimeout(() => {
                setTextLines((prev) => [...prev, bootSequence[currentStep]])
                setCurrentStep((prev) => prev + 1)
                playSound('line')
            }, 400)
            return () => clearTimeout(timeout)
        } else if (currentStep === bootSequence.length) {
            const timeout = setTimeout(() => {
                setCurrentStep((prev) => prev + 1)
            }, 800)
            return () => clearTimeout(timeout)
        }
    }, [currentStep, isStarted])

    // Username typing
    useEffect(() => {
        if (!isStarted) return

        if (currentStep === bootSequence.length + 1) {
            if (username.length < targetUsername.length) {
                const timeout = setTimeout(() => {
                    setUsername(targetUsername.slice(0, username.length + 1))
                    playSound('type')
                }, 100)
                return () => clearTimeout(timeout)
            } else {
                const timeout = setTimeout(() => {
                    setCurrentStep((prev) => prev + 1)
                }, 800)
                return () => clearTimeout(timeout)
            }
        }
    }, [currentStep, username, isStarted])

    // Password typing
    useEffect(() => {
        if (!isStarted) return

        if (currentStep === bootSequence.length + 2) {
            if (password.length < targetPassword.length) {
                const timeout = setTimeout(() => {
                    setPassword(targetPassword.slice(0, password.length + 1))
                    playSound('type')
                }, 100)
                return () => clearTimeout(timeout)
            } else {
                const timeout = setTimeout(() => {
                    setCurrentStep((prev) => prev + 1)
                    playSound('success')
                }, 800)
                return () => clearTimeout(timeout)
            }
        }
    }, [currentStep, password, isStarted])

    // Completion
    useEffect(() => {
        if (!isStarted) return

        if (currentStep === bootSequence.length + 3) {
            const timeout = setTimeout(() => {
                onComplete()
            }, 1500)
            return () => clearTimeout(timeout)
        }
    }, [currentStep, onComplete, isStarted])

    return (
        <motion.div
            className="fixed inset-0 bg-[#020617] z-50 flex items-center justify-center font-mono text-sm md:text-base overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            {/* Skip Button */}
            {isStarted && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={onComplete}
                    className="fixed bottom-8 right-8 z-50 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded text-[#00F0FF] font-mono text-xs hover:bg-[#00F0FF]/20 hover:border-[#00F0FF] transition-all duration-300"
                >
                    SKIP &gt;&gt;
                </motion.button>
            )}

            <div className="w-full max-w-2xl p-8 text-[#00F0FF]">
                <AnimatePresence mode="wait">
                    {!isStarted && !showGridAnimation ? (
                        <motion.button
                            key="start-button"
                            onClick={handleStart}
                            className="flex flex-col items-center justify-center w-full h-full gap-4 animate-pulse hover:text-white transition-colors"
                            exit={{ opacity: 0 }}
                        >
                            <div className="text-xl md:text-2xl font-bold">&gt; CLICK_TO_INITIALIZE_SYSTEM</div>
                            <div className="text-xs md:text-sm opacity-50">[ SECURE CONNECTION REQUIRED ]</div>
                        </motion.button>
                    ) : showGridAnimation ? (
                        <motion.div
                            key="grid-animation"
                            className="grid gap-2"
                            style={{
                                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                width: '100%',
                                maxWidth: '250px',
                                margin: '0 auto'
                            }}
                        >
                            {Array.from({ length: totalCells }).map((_, index) => {
                                const row = Math.floor(index / gridSize)
                                const col = index % gridSize
                                const delay = (row + col) * 0.03

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay,
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                        className="aspect-square bg-[#00F0FF] rounded-sm"
                                        style={{
                                            boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                                        }}
                                    />
                                )
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="boot-sequence"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-2"
                        >
                            {textLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {line}
                                </motion.div>
                            ))}

                            {/* Login Prompt */}
                            {currentStep >= bootSequence.length && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>LOGIN:</span>
                                        <span>{username}</span>
                                        {currentStep === bootSequence.length + 1 && showCursor && (
                                            <span className="w-2 h-4 bg-[#00F0FF]" />
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Password Prompt */}
                            {currentStep >= bootSequence.length + 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>PASSWORD:</span>
                                        <span>{password}</span>
                                        {currentStep === bootSequence.length + 2 && showCursor && (
                                            <span className="w-2 h-4 bg-[#00F0FF]" />
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Access Granted */}
                            {currentStep >= bootSequence.length + 3 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 text-emerald-400 font-bold text-lg md:text-xl border border-emerald-400/50 p-4 rounded bg-emerald-400/10 text-center"
                                >
                                    &gt; ACCESS GRANTED
                                    <br />
                                    &gt; WELCOME, USER.
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
