export interface Experience {
    company: string
    role: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    promoted?: {
        newRole: string
        promotionDate: string
    }
    responsibilities: string[]
}

export const experiences: Experience[] = [
    {
        company: 'Appiness Interactive',
        role: 'PHP Developer / Full-Stack',
        location: 'Bengaluru, Karnataka',
        startDate: 'June 2024',
        endDate: 'Present',
        current: true,
        promoted: {
            newRole: 'Senior PHP & WordPress Developer',
            promotionDate: 'July 2025',
        },
        responsibilities: [
            'Built custom WordPress plugins tailored for enterprise hospital clients',
            'Integrated LeadSquared, Docpulse, and Razorpay APIs across multiple systems',
            'Adopted CodeIgniter 4 for backend services',
            'Implemented secure, optimized, and scalable form workflows',
            'Developed high-quality, production-ready full-stack features across multiple projects',
        ],
    },
    {
        company: 'Global Software Technologies',
        role: 'Laravel Developer',
        location: 'Bengaluru, Karnataka',
        startDate: 'Oct 2023',
        endDate: 'Feb 2024',
        current: false,
        responsibilities: [
            'Improved application security by 60% with authentication + 2FA systems',
            'Boosted transaction success rate by 40% through payment gateway integrations',
            'Reduced downtime by 30% via proactive issue resolution',
            'Developed RESTful APIs for mobile and web applications',
        ],
    },
    {
        company: 'Stratacache',
        role: 'Software Developer',
        location: 'Bengaluru, Karnataka',
        startDate: 'Sept 2021',
        endDate: 'July 2023',
        current: false,
        responsibilities: [
            'Improved functionality & engagement by 40% using Vue.js + Laravel',
            'Delivered email systems, wayfinding apps, and WordPress sites (35% UX improvement)',
            'Migrated major sites to WordPress using Divi/WP Bakery, boosting traffic by 30%',
            'Built FIDS/PIDS systems for airports and metro stations',
            'Developed HR portal with real-time features',
        ],
    },
]
