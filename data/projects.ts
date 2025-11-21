export interface Project {
    id: string
    title: string
    description: string
    longDescription?: string
    tech: string[]
    achievements: string[]
    github?: string
    demo?: string
    image: string
    featured: boolean
    caseStudy?: boolean
}

export const projects: Project[] = [
    {
        id: 'ci4-cms',
        title: 'CI4 CMS Starter',
        description:
            'A modern, feature-rich Content Management System built with CodeIgniter 4.',
        longDescription:
            'This starter kit provides a solid foundation for building content-driven websites with user management, role-based access control, and a flexible blog system. It\'s designed to help developers start projects faster with clean architecture and essential features already in place.',
        tech: ['CodeIgniter 4', 'Tailwind CSS', 'MySQL', 'CKEditor 5', 'PHP'],
        achievements: [
            'Authentication System with session management',
            'Role-Based Access Control (RBAC)',
            'Blog Management with rich text editor',
            'Modern UI with Tailwind CSS',
        ],
        github: 'https://github.com/iromn/ci4-cms-starter',
        image: '/images/ci4-cms.webp',
        featured: true,
        caseStudy: true,
    },
    {
        id: 'uploadit',
        title: 'UploadiT',
        description:
            'A full-stack AI document Q&A system capable of processing PDFs, DOCX, and text files into embeddings, enabling natural-language search and chat-like querying.',
        longDescription:
            'UploadiT is a complete RAG (Retrieval-Augmented Generation) pipeline that allows users to upload documents and ask questions in natural language. The system processes documents into vector embeddings, stores them in Pinecone, and uses semantic search to retrieve relevant context for AI-powered responses.',
        tech: ['FastAPI', 'Pinecone', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Python'],
        achievements: [
            'Built a complete RAG pipeline from scratch',
            'Implemented vector search and semantic embeddings',
            'Integrated secure session-based isolation',
            'Auto-expiration for privacy protection',
        ],
        github: 'https://github.com/iromn/uploadit',
        image: '/images/uploadit.webp',
        featured: true,
        caseStudy: true,
    },
    {
        id: 'payment-gateway',
        title: 'Payment Gateway Integration',
        description:
            'Integrated multiple payment gateways into Laravel applications and WordPress websites with improved transaction processing.',
        longDescription:
            'Led the integration of multiple payment gateway solutions including Razorpay, Stripe, and PayPal across various Laravel and WordPress projects. Focused on security, reliability, and user experience optimization.',
        tech: ['PHP', 'Laravel', 'MySQL', 'WordPress', 'Razorpay', 'REST APIs'],
        achievements: [
            'Reduced transaction processing time by 40%',
            'Improved user satisfaction by 30% with smoother checkout flow',
            'Implemented secure payment workflows with PCI compliance',
            'Built reusable payment integration modules',
        ],
        image: '/images/payment-gateway.webp',
        featured: true,
    },
    {
        id: 'hr-portal',
        title: 'HR Portal (Stratacache)',
        description:
            "Built Stratacache's HR System using Vue.js & Laravel with significant performance improvements.",
        longDescription:
            'Developed a comprehensive HR management system for Stratacache, handling employee data, leave management, attendance tracking, and performance reviews. The system was built with a modern Vue.js frontend and Laravel backend.',
        tech: ['Vue.js', 'Laravel', 'MySQL', 'REST APIs', 'Vuex'],
        achievements: [
            'Cut page load time by 40%',
            'Increased user engagement by 20%',
            'Improved backend query performance by 50%',
            'Implemented real-time notifications',
        ],
        image: '/images/hr-portal.webp',
        featured: true,
        caseStudy: true,
    },
    {
        id: 'fids-pids',
        title: 'Information Display System (FIDS/PIDS)',
        description:
            'Developed Passenger & Flight Information Display Systems for airports and metro stations.',
        tech: ['Laravel', 'MySQL', 'Vue.js', 'WebSockets', 'REST APIs'],
        achievements: [
            'Enhanced database performance by 40%',
            'Real-time flight/train information updates',
            'Scalable architecture for multiple displays',
        ],
        image: '/images/fids-pids.webp',
        featured: false,
    },
    {
        id: 'way-finder',
        title: 'Way Finder',
        description: 'Built digital indoor wayfinding systems for diverse venues.',
        tech: ['Vue.js', 'PHP', 'MySQL', 'Interactive Maps'],
        achievements: [
            'Improved user engagement by 30%',
            'Enhanced UX by 35% using Vue.js',
            'Interactive touch-screen navigation',
        ],
        image: '/images/wayfinder.webp',
        featured: false,
    },
    {
        id: 'hospital-websites',
        title: 'Hospital Websites',
        description:
            'Development of new features as per client requests and website optimizations for healthcare clients.',
        tech: ['WordPress', 'PHP', 'CodeIgniter 4', 'Custom Plugins', 'REST APIs'],
        achievements: [
            'Built custom WordPress plugins for enterprise clients',
            'Integrated LeadSquared, Docpulse, and Razorpay APIs',
            'Optimized website performance and SEO',
        ],
        image: '/images/hospital-websites.webp',
        featured: false,
    },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const caseStudyProjects = projects.filter((p) => p.caseStudy)
