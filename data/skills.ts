export interface Skill {
    name: string
    category: 'Languages' | 'Frameworks' | 'Tools' | 'WordPress' | 'Concepts'
}

export const skills: Skill[] = [
    // Languages
    { name: 'PHP', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'HTML', category: 'Languages' },
    { name: 'CSS', category: 'Languages' },

    // Frameworks & Libraries
    { name: 'Laravel', category: 'Frameworks' },
    { name: 'Vue.js', category: 'Frameworks' },
    { name: 'jQuery', category: 'Frameworks' },
    { name: 'Next.js', category: 'Frameworks' },
    { name: 'React', category: 'Frameworks' },
    { name: 'Tailwind CSS', category: 'Frameworks' },
    { name: 'CodeIgniter 4', category: 'Frameworks' },
    { name: 'FastAPI', category: 'Frameworks' },

    // Tools & Technologies
    { name: 'MySQL', category: 'Tools' },
    { name: 'WordPress', category: 'Tools' },
    { name: 'Wix', category: 'Tools' },
    { name: 'Pinecone', category: 'Tools' },
    { name: 'REST APIs', category: 'Tools' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'XAMPP', category: 'Tools' },
    { name: 'Postman', category: 'Tools' },
    { name: 'Figma', category: 'Tools' },
    { name: 'Canva', category: 'Tools' },

    // WordPress Expertise
    { name: 'Divi', category: 'WordPress' },
    { name: 'WPBakery', category: 'WordPress' },
    { name: 'Elementor', category: 'WordPress' },
    { name: 'Custom Plugins', category: 'WordPress' },

    // Concepts
    { name: 'Authentication', category: 'Concepts' },
    { name: 'Authorization', category: 'Concepts' },
    { name: 'Two-Factor Authentication (2FA)', category: 'Concepts' },
    { name: 'Payment Gateway Integration', category: 'Concepts' },
    { name: 'Agile Methodology', category: 'Concepts' },
    { name: 'Web Application Security', category: 'Concepts' },
    { name: 'User Experience Design', category: 'Concepts' },
    { name: 'Responsive Web Design', category: 'Concepts' },
    { name: 'Website Migration', category: 'Concepts' },
    { name: 'E-commerce Solutions', category: 'Concepts' },
    { name: 'Bug Resolution', category: 'Concepts' },
    { name: 'Performance Optimization', category: 'Concepts' },
]

export const skillsByCategory = {
    Languages: skills.filter((s) => s.category === 'Languages'),
    Frameworks: skills.filter((s) => s.category === 'Frameworks'),
    Tools: skills.filter((s) => s.category === 'Tools'),
    WordPress: skills.filter((s) => s.category === 'WordPress'),
    Concepts: skills.filter((s) => s.category === 'Concepts'),
}
