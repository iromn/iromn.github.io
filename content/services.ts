// Mirrors docs/CONTENT.md > Services. "stack" and "deliverables" feed the Engine panel.

export type Service = {
    id: string
    title: string
    body: string
    stack: string[]
    deliverables: string[]
}

export const services: Service[] = [
    {
        id: 'platforms',
        title: 'Web platforms and SaaS',
        body: 'Custom web apps, dashboards and internal tools in PHP or Next.js, from first version to production.',
        stack: ['PHP', 'CodeIgniter', 'Laravel', 'Next.js', 'React', 'Vue.js', 'MySQL'],
        deliverables: ['Technical plan', 'Production app', 'Admin and dashboards', 'Handover docs'],
    },
    {
        id: 'ai',
        title: 'AI agents and automation',
        body: 'WhatsApp and voice agents, support chatbots and document Q&A that work with your own data.',
        stack: ['WhatsApp Business API', 'ElevenLabs', 'Cartesia', 'Telephony', 'Gemini', 'RAG', 'Pinecone'],
        deliverables: ['Agent design and prompts', 'Channel integrations', 'Knowledge base', 'Conversation analytics'],
    },
    {
        id: 'wordpress',
        title: 'WordPress, engineered',
        body: 'Custom themes, plugins and headless builds that stay fast and easy to edit.',
        stack: ['WordPress', 'PHP', 'Custom plugins', 'Elementor', 'Divi', 'WPBakery'],
        deliverables: ['Custom theme', 'Bespoke plugins', 'Migration', 'Editor training'],
    },
    {
        id: 'commerce',
        title: 'E-commerce and payments',
        body: 'Checkout flows and payment integrations with Razorpay, Stripe and PayPal, done securely.',
        stack: ['Razorpay', 'Stripe', 'PayPal', 'PHP', 'WordPress', 'REST APIs'],
        deliverables: ['Checkout flow', 'Gateway integration', 'Webhooks and reconciliation', 'Security review'],
    },
    {
        id: 'invitations',
        title: 'Invitation websites',
        body: 'Invitation sites for weddings, corporate events and celebrations, designed around the occasion and easy to share.',
        stack: ['Next.js', 'Motion', 'WordPress', 'Responsive design'],
        // [CONFIRM] which of these you usually include (RSVP, maps, schedules)
        deliverables: ['Custom invitation design', 'Event details and schedule', 'Venue map and directions', 'RSVP form'],
    },
    {
        id: 'interactive',
        title: 'Interactive and 3D web',
        body: 'Motion-rich sites and browser experiences, including real-time multiplayer with Three.js.',
        stack: ['Three.js', 'Socket.io', 'Web Audio API', 'Motion', 'GSAP', 'Next.js'],
        deliverables: ['Interaction design in code', 'Performance budget', 'Reduced-motion fallbacks', 'Launch-ready build'],
    },
    {
        id: 'care',
        title: 'Performance and care',
        body: 'Speeding up slow sites, hardening security and keeping production stable after launch.',
        stack: ['Query optimisation', 'Caching', '2FA and RBAC', 'Monitoring', 'Core Web Vitals'],
        deliverables: ['Audit with priorities', 'Fixes shipped', 'Uptime monitoring', 'Monthly report'],
    },
]
