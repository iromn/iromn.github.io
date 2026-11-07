// Case studies for "Selected work" and /work/[slug].
// Facts come from docs/profile.md only. Lines marked [CONFIRM] are reasonable readings
// of the profile that Nganba should verify before launch.

export type NodeKind = 'actor' | 'service' | 'data' | 'external' | 'fleet'

export type DiagramNode = {
    id: string
    label: string
    sub?: string
    kind: NodeKind
    /** Top-left corner in the 1000 x 560 diagram space. */
    x: number
    y: number
}

export type DiagramEdge = { from: string; to: string; label?: string }

export type Metric = { value: string; label: string }

export type Project = {
    slug: string
    title: string
    client: string
    period: string
    role: string
    oneLiner: string
    summary: string
    stack: string[]
    metrics: Metric[]
    context: string
    challenge: string
    approach: { title: string; body: string }[]
    results: string[]
    links?: { label: string; href: string }[]
    /**
     * Cover image (16:10) produced by `npm run images`, e.g. { src: '/images/work/botlune', alt: '...' }.
     * Without one, Surface shows a typographic poster and the card opens on Engine.
     */
    cover?: { src: string; alt: string }
    diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] }
}

// Diagram grid: columns at x = 40, 290, 540, 790 and rows at y = 60, 250, 440.
export const projects: Project[] = [
    {
        slug: 'appyverse',
        title: 'Appyverse',
        client: 'Appiness Interactive',
        period: '2025 to now',
        role: 'Lead developer and delivery owner',
        oneLiner: 'WhatsApp and voice AI agents that businesses configure themselves.',
        summary:
            'A platform for building conversational AI agents that talk to customers over WhatsApp and phone calls, configured per client instead of rebuilt each time.',
        stack: ['WhatsApp Business API', 'Telephony integration', 'LLM prompt engineering', 'REST APIs'], // [CONFIRM] add backend framework and database
        metrics: [
            { value: '2', label: 'channels: WhatsApp text and voice calls' },
            { value: 'End to end', label: 'from backend to client onboarding' },
        ],
        context:
            'Businesses want to answer customers on the channels those customers already use, WhatsApp and the phone, without building their own AI infrastructure. Appyverse is the platform Appiness Interactive built to offer that as a product.',
        challenge:
            'Every client needs its agent to behave differently, speak about different products and connect to different systems. The platform had to make that a matter of configuration, while keeping text and voice conversations reliable in production.',
        approach: [
            {
                title: 'Configurable agents',
                body: 'Agents are shaped by per-client configuration and custom LLM prompts, so a new client means new settings, not a new codebase.',
            },
            {
                title: 'Channel integrations',
                body: 'The backend connects the WhatsApp Business API for text and a telephony provider for voice to the same agent logic.',
            },
            {
                title: 'Built with AI tooling',
                body: 'Core backend logic, integrations and prompts were developed alongside Claude Code and Google Antigravity to move faster without lowering the bar.',
            },
            {
                title: 'Owning delivery',
                body: 'Beyond the code: client onboarding, demos and technical support, with feedback from those conversations going straight into the roadmap.',
            },
        ],
        results: [
            'Lead developer and cross-functional owner of the platform.',
            'Text and voice agents delivered on one configurable platform.',
            'Direct line from client feedback to product roadmap.',
        ], // [CONFIRM] add client count, conversation volume or other measurable outcomes if they can be shared
        diagram: {
            nodes: [
                { id: 'customer', label: 'Customer', sub: 'WhatsApp or phone', kind: 'actor', x: 40, y: 60 },
                { id: 'channels', label: 'Channels', sub: 'WhatsApp API, telephony', kind: 'external', x: 290, y: 60 },
                { id: 'core', label: 'Agent backend', sub: 'conversation logic', kind: 'service', x: 540, y: 60 },
                { id: 'llm', label: 'LLM', sub: 'custom prompts', kind: 'external', x: 790, y: 60 },
                { id: 'systems', label: 'Client systems', sub: 'API integrations', kind: 'external', x: 790, y: 250 },
                { id: 'team', label: 'Client team', sub: 'sets up the agent', kind: 'actor', x: 40, y: 440 },
                { id: 'config', label: 'Agent config', sub: 'per client', kind: 'data', x: 290, y: 440 },
            ],
            edges: [
                { from: 'customer', to: 'channels' },
                { from: 'channels', to: 'core', label: 'webhook' },
                { from: 'core', to: 'llm', label: 'prompt' },
                { from: 'core', to: 'systems' },
                { from: 'team', to: 'config' },
                { from: 'config', to: 'core' },
            ],
        },
    },
    {
        // Facts below come from the public site (pages, llms.txt, response headers).
        // [CONFIRM] role, period, and which parts Nganba built.
        slug: 'prime-business-navigator',
        title: 'Prime Business Navigator',
        client: 'Client project',
        period: '2025 to 2026', // [CONFIRM]
        role: 'Full-stack developer', // [CONFIRM]
        oneLiner: 'A business journal and verified B2B directory for Indian companies.',
        summary:
            'An editorial platform for Indian business news and analysis, combined with a directory where verified suppliers, manufacturers and founders list their businesses and publish their own stories.',
        stack: ['PHP', 'CodeIgniter', 'Tailwind CSS', 'Alpine.js', 'Google Analytics', 'AdSense'], // [CONFIRM] database
        metrics: [
            { value: '150+', label: 'articles published on the platform' },
            { value: '2 in 1', label: 'business journal and verified B2B directory' },
        ],
        context:
            'Prime Business Navigator helps Indian businesses grow through two connected parts: business journalism covering policy, finance, startups and leadership, and a directory of verified Indian suppliers, manufacturers and service providers.',
        challenge:
            'One site has to serve readers who come for the news and businesses that come to be found. Editorial content, business listings and community posts all need to live together, load fast and stay easy for the team to run.',
        approach: [
            {
                title: 'Editorial platform',
                body: 'Featured stories, category sections from finance to technology, and a running feed of latest insights, built in CodeIgniter with server-rendered pages.',
            },
            {
                title: 'Verified business directory',
                body: 'A listing and onboarding flow for Indian businesses, with GST-verified profiles in the PBN Business Community and product showcases in PBN Finds.',
            },
            {
                title: 'Community publishing',
                body: 'Verified members publish their own blogs and earn reward points that unlock product spotlight slots on the homepage.',
            },
            {
                title: 'Light, fast front end',
                body: 'Tailwind CSS and Alpine.js for interactivity without a heavy JavaScript framework, plus an llms.txt file so AI assistants can understand the site.',
            },
        ],
        results: [
            'Live at primebusinessnavigator.com with 150+ published articles.',
            'Editorial journal, business directory and community blogs on one platform.',
            'Reward-driven publishing that turns members into contributors.',
        ],
        links: [{ label: 'Visit the live site', href: 'https://primebusinessnavigator.com/' }],
        cover: {
            src: '/images/work/prime-business-navigator',
            alt: 'Prime Business Navigator homepage showing featured business stories and the latest insights feed',
        },
        diagram: {
            nodes: [
                { id: 'reader', label: 'Readers', sub: 'business news', kind: 'actor', x: 40, y: 60 },
                { id: 'site', label: 'Public site', sub: 'Tailwind + Alpine.js', kind: 'service', x: 290, y: 60 },
                { id: 'app', label: 'CodeIgniter app', sub: 'PHP, server-rendered', kind: 'service', x: 540, y: 60 },
                { id: 'db', label: 'Database', sub: 'articles, listings', kind: 'data', x: 790, y: 60 },
                { id: 'rewards', label: 'Reward points', sub: 'unlock spotlight slots', kind: 'service', x: 790, y: 250 },
                { id: 'business', label: 'Businesses', sub: 'suppliers, founders', kind: 'actor', x: 40, y: 440 },
                { id: 'portal', label: 'Listing portal', sub: 'GST verification', kind: 'service', x: 290, y: 440 },
                { id: 'blogs', label: 'Community blogs', sub: 'member posts', kind: 'service', x: 540, y: 440 },
            ],
            edges: [
                { from: 'reader', to: 'site' },
                { from: 'site', to: 'app', label: 'pages' },
                { from: 'app', to: 'db' },
                { from: 'business', to: 'portal' },
                { from: 'portal', to: 'blogs' },
                { from: 'blogs', to: 'app', label: 'publish' },
                { from: 'blogs', to: 'rewards', label: 'points' },
                { from: 'rewards', to: 'db' },
            ],
        },
    },
    {
        slug: 'botlune',
        title: 'Botlune',
        client: 'Own product',
        period: 'Side project',
        role: 'Design, architecture and build',
        oneLiner: 'A multi-tenant SaaS for AI customer-support chatbots.',
        summary:
            'Businesses get an embeddable chat widget backed by Google Gemini and their own knowledge base, with every tenant isolated at the database level.',
        stack: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini Flash', 'Tailwind CSS'],
        metrics: [
            { value: 'RLS', label: 'tenant isolation enforced in the database' },
            { value: '1 script', label: 'to embed the widget on any site' },
        ],
        context:
            'Small businesses want an AI assistant that answers questions about their own products, without building one. Botlune is a SaaS that gives each business its own bot, trained on its own content.',
        challenge:
            "Many businesses share one platform, so one tenant must never see another's conversations or knowledge base. The bot also has to answer from that tenant's content, not from general knowledge.",
        approach: [
            {
                title: 'Isolation in the database',
                body: 'Supabase Row-Level Security policies scope every row to its tenant, so isolation does not depend on remembering a filter in application code.',
            },
            {
                title: 'Grounded answers',
                body: "Each request to Gemini Flash is built with dynamic prompt injection and the tenant's knowledge base as context.",
            },
            {
                title: 'Embed anywhere',
                body: 'A responsive chat widget that clients drop onto their own websites.',
            },
            {
                title: 'Live dashboard',
                body: 'A real-time conversation dashboard and analytics for each tenant.',
            },
        ],
        results: [
            'Multi-tenant architecture secured with Supabase RLS.',
            'Gemini Flash answers grounded in each tenant\'s knowledge base.',
            'Embeddable widget plus real-time dashboard and analytics.',
        ],
        links: [{ label: 'View on GitHub', href: 'https://github.com/iromn/botlune' }],
        diagram: {
            nodes: [
                { id: 'visitor', label: 'Website visitor', sub: 'on a client site', kind: 'actor', x: 40, y: 60 },
                { id: 'widget', label: 'Chat widget', sub: 'embeddable script', kind: 'service', x: 290, y: 60 },
                { id: 'api', label: 'Next.js API', sub: 'TypeScript', kind: 'service', x: 540, y: 60 },
                { id: 'gemini', label: 'Gemini Flash', sub: 'prompt + KB context', kind: 'external', x: 790, y: 60 },
                { id: 'db', label: 'Supabase Postgres', sub: 'RLS per tenant', kind: 'data', x: 540, y: 250 },
                { id: 'admin', label: 'Tenant admin', sub: 'business owner', kind: 'actor', x: 40, y: 440 },
                { id: 'dashboard', label: 'Dashboard', sub: 'realtime analytics', kind: 'service', x: 290, y: 440 },
            ],
            edges: [
                { from: 'visitor', to: 'widget' },
                { from: 'widget', to: 'api', label: 'message' },
                { from: 'api', to: 'gemini', label: 'prompt' },
                { from: 'api', to: 'db' },
                { from: 'admin', to: 'dashboard' },
                { from: 'dashboard', to: 'db', label: 'realtime' },
            ],
        },
    },
    {
        slug: 'hr-portal',
        title: 'HR Portal',
        client: 'Stratacache',
        period: '2021 to 2023',
        role: 'Full-stack developer',
        oneLiner: 'An internal HR system that made everyday HR work fast.',
        summary:
            'Employee records, leave, attendance and performance reviews in one system, rebuilt with a Vue.js frontend and a Laravel backend.',
        stack: ['Vue.js', 'Vuex', 'Laravel', 'MySQL', 'REST APIs'],
        metrics: [
            { value: '40%', label: 'faster page loads' },
            { value: '50%', label: 'better backend query performance' },
            { value: '20%', label: 'more user engagement' },
        ],
        context:
            'Stratacache needed one place to manage employee data, leave, attendance and performance reviews.',
        challenge: 'The existing HR tools were slow and hard to use, which made routine tasks frustrating for staff.',
        approach: [
            {
                title: 'Reactive frontend',
                body: 'A Vue.js single-page app with Vuex for state, so moving between records and forms feels instant.',
            },
            {
                title: 'Laravel API',
                body: 'A REST backend in Laravel serving the app, with caching for frequently read data.',
            },
            {
                title: 'Query optimisation',
                body: 'Database queries were reworked, which is where the 50% backend performance gain came from.',
            },
            {
                title: 'Real-time notifications',
                body: 'HR events reach the right people as they happen instead of on the next page load.',
            },
        ],
        results: [
            '40% reduction in page load time.',
            '50% improvement in backend query performance.',
            '20% increase in user engagement.',
        ],
        diagram: {
            nodes: [
                { id: 'staff', label: 'Employees and HR', sub: 'daily users', kind: 'actor', x: 40, y: 60 },
                { id: 'spa', label: 'Vue.js app', sub: 'Vuex state', kind: 'service', x: 290, y: 60 },
                { id: 'api', label: 'Laravel API', sub: 'REST', kind: 'service', x: 540, y: 60 },
                { id: 'mysql', label: 'MySQL', sub: 'optimised queries', kind: 'data', x: 790, y: 60 },
                { id: 'cache', label: 'Cache layer', sub: 'hot reads', kind: 'data', x: 540, y: 250 },
                { id: 'notify', label: 'Notifications', sub: 'real-time HR events', kind: 'service', x: 290, y: 250 },
            ],
            edges: [
                { from: 'staff', to: 'spa' },
                { from: 'spa', to: 'api', label: 'REST' },
                { from: 'api', to: 'mysql' },
                { from: 'api', to: 'cache' },
                { from: 'api', to: 'notify' },
                { from: 'notify', to: 'spa' },
            ],
        },
    },
    {
        slug: 'information-displays',
        title: 'Flight and passenger displays',
        client: 'Stratacache',
        period: '2021 to 2023',
        role: 'Full-stack developer',
        oneLiner: 'Live departure and arrival screens for airports and metro stations.',
        summary:
            'Flight and passenger information display systems (FIDS and PIDS) that keep many public screens in sync with the latest schedule data.',
        stack: ['Laravel', 'Vue.js', 'MySQL', 'WebSockets', 'REST APIs'],
        metrics: [
            { value: '40%', label: 'better database performance' },
            { value: 'Live', label: 'updates pushed to every screen' },
        ],
        context:
            'Airports and metro stations rely on public screens to tell travellers where to go and when. Stratacache delivered these display systems for transit venues.',
        challenge:
            'Information changes constantly and has to appear on many screens at once. A delay or a stale screen sends people to the wrong place.',
        approach: [
            {
                title: 'Push, not poll',
                body: 'Updates go out over WebSockets, so screens change the moment the data does.',
            },
            {
                title: 'Built to scale out',
                body: 'The architecture supports many displays per venue without each one adding load to the database.',
            },
            {
                title: 'Faster data layer',
                body: 'Database work on the Laravel and MySQL side improved performance by 40%.',
            },
        ],
        results: [
            'Real-time flight and train information on every screen.',
            '40% improvement in database performance.',
            'Scalable architecture for multiple displays.',
        ],
        diagram: {
            nodes: [
                { id: 'ops', label: 'Operations staff', sub: 'update schedules', kind: 'actor', x: 40, y: 60 },
                { id: 'admin', label: 'Admin panel', sub: 'Vue.js', kind: 'service', x: 290, y: 60 },
                { id: 'api', label: 'Laravel API', sub: 'REST', kind: 'service', x: 540, y: 60 },
                { id: 'mysql', label: 'MySQL', sub: 'schedule data', kind: 'data', x: 790, y: 60 },
                { id: 'ws', label: 'WebSocket server', sub: 'pushes changes', kind: 'service', x: 540, y: 250 },
                { id: 'screens', label: 'Display screens', sub: 'airports, metro', kind: 'fleet', x: 540, y: 440 },
            ],
            edges: [
                { from: 'ops', to: 'admin' },
                { from: 'admin', to: 'api', label: 'REST' },
                { from: 'api', to: 'mysql' },
                { from: 'api', to: 'ws', label: 'event' },
                { from: 'ws', to: 'screens', label: 'WebSocket' },
            ],
        },
    },
]

export function getProject(slug: string) {
    return projects.find((project) => project.slug === slug)
}

/** The fields the work cards and Surface/Engine panels use, without the long case-study text. */
export type ProjectCard = Pick<Project, 'slug' | 'title' | 'client' | 'period' | 'role' | 'oneLiner' | 'stack' | 'metrics' | 'cover' | 'diagram'>

export function toCard({ slug, title, client, period, role, oneLiner, stack, metrics, cover, diagram }: Project): ProjectCard {
    return { slug, title, client, period, role, oneLiner, stack, metrics, cover, diagram }
}
