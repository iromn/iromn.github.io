import {
    siFastapi,
    siCodeigniter,
    siElevenlabs,
    siLaravel,
    siMysql,
    siNextdotjs,
    siNodedotjs,
    siPhp,
    siPostgresql,
    siPython,
    siReact,
    siSupabase,
    siTailwindcss,
    siThreedotjs,
    siTypescript,
    siVuedotjs,
    siWordpress,
} from 'simple-icons'

// Mirrors docs/CONTENT.md > About.

export const about = {
    title: "Hi, I'm Nganba",
    paragraphs: [
        // [CONFIRM] hometown and current city
        "I'm a full-stack developer from Imphal, Manipur, based in Bengaluru. For over four years I've built software across the whole stack: PHP backends in CodeIgniter and Laravel, WordPress, React, Next.js and Vue frontends, and lately AI agents that talk to customers over WhatsApp and voice, using voice platforms like ElevenLabs and Cartesia.",
        "I've worked on airport display systems, enterprise HR tools, payment platforms and healthcare websites. I care about the parts people see and the parts they don't: clean architecture, fast pages and code the next developer can read.",
        'I work AI-native, with Claude Code, Google Antigravity, Codex and OpenCode in my daily workflow. That means faster delivery, while the architecture and quality decisions stay mine.',
    ],
    characterLabel: 'An animated stand-in for Nganba, until a real photo arrives.',
    toolbelt: [
        siPhp,
        siCodeigniter,
        siLaravel,
        siNextdotjs,
        siReact,
        siVuedotjs,
        siTypescript,
        siWordpress,
        siTailwindcss,
        siNodedotjs,
        siMysql,
        siPostgresql,
        siSupabase,
        siPython,
        siFastapi,
        siThreedotjs,
        siElevenlabs,
    ].map((icon) => ({ title: icon.title, slug: icon.slug, path: icon.path })),
}
