// Site-wide copy and links. Mirrors docs/CONTENT.md.

export const site = {
    name: 'Nganba Irom',
    url: 'https://iromn.github.io',
    title: 'Nganba Irom | Full-Stack Developer for Hire',
    description:
        'Freelance full-stack developer building web platforms, AI agents, interactive websites and event invitation sites with PHP (CodeIgniter, Laravel), WordPress, Next.js, React and Vue.',
    email: 'nganba.irom47@gmail.com',
} as const

export const ctas = {
    contact: { label: 'Start a project', href: '/#contact' },
    work: { label: 'See the work', href: '/#work' },
} as const

export const navLinks = [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/#about' },
] as const

export const socials = [
    { label: 'GitHub', handle: '@iromn', href: 'https://github.com/iromn' },
    { label: 'LinkedIn', handle: 'nganba-irom', href: 'https://www.linkedin.com/in/nganba-irom/' },
] as const

export const hero = {
    headline: ['Good on the surface.', 'Solid underneath.'],
    subtext:
        "I'm Nganba, a full-stack developer building web platforms, AI agents and interactive sites for founders, agencies and growing teams.",
    lensOn: 'Look underneath',
    lensOff: 'Back to the surface',
} as const
