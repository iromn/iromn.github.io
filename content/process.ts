// Mirrors docs/CONTENT.md > Process.

export const processContent = {
    title: 'How a project runs',
    stages: [
        {
            title: 'Discover',
            body: 'We agree on the goal, the users and what success looks like.',
            youGet: 'A written scope and estimate.',
        },
        {
            title: 'Architect',
            body: 'I plan the system, the stack and the risks before writing code.',
            youGet: 'A technical plan you can review.',
        },
        {
            title: 'Build',
            body: 'Weekly progress you can click through on a live preview link. No silent months.',
            youGet: 'A preview link that updates every week.',
        },
        {
            title: 'Launch',
            body: 'Testing, performance checks and a calm deployment.',
            youGet: 'Handover docs and access to everything.',
        },
        {
            title: 'Support',
            body: 'Fixes, improvements and monitoring after launch.',
            youGet: 'A retainer, or help as and when you need it.',
        },
    ],
    modelsTitle: 'Ways to work together',
    models: [
        {
            title: 'Fixed-scope project',
            body: 'A defined outcome, timeline and price. Best for new builds and redesigns.',
        },
        {
            title: 'Monthly retainer',
            body: 'Ongoing development and care for a product that keeps growing.',
        },
        {
            title: 'Embedded with your team',
            body: 'I join your stack, standups and codebase as an extra senior developer.',
        },
    ],
    // [CONFIRM] pricing approach and response time
    pricingNote: "Tell me about your project and I'll send an estimate within two working days.",
} as const
