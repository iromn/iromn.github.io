// Shared audio context singleton
let globalAudioContext: AudioContext | null = null

export const getAudioContext = (): AudioContext | null => {
    if (!globalAudioContext && typeof window !== 'undefined') {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext
            if (AudioContext) {
                globalAudioContext = new AudioContext()
            }
        } catch (e) {
            console.error('Failed to create AudioContext:', e)
        }
    }
    return globalAudioContext
}

export const initAudioContext = (): void => {
    const ctx = getAudioContext()
    if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(e => console.error('Failed to resume AudioContext:', e))
    }
}
