import { site, socials } from '@/content/site'
import { services } from '@/content/services'
import type { Project } from '@/content/projects'

type Schema = Record<string, unknown>

/** Renders schema.org data for search engines. `<` is escaped so content can't close the tag. */
export default function JsonLd({ data }: { data: Schema | Schema[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    )
}

const personId = `${site.url}/#person`

export const personSchema: Schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: `${site.url}/`,
    email: `mailto:${site.email}`,
    jobTitle: 'Full-stack developer',
    image: `${site.url}/og/site.png`,
    sameAs: socials.map((social) => social.href),
    knowsAbout: ['PHP', 'CodeIgniter', 'Laravel', 'WordPress', 'Voice AI agents', 'ElevenLabs', 'Cartesia', 'Next.js', 'React', 'Vue.js', 'TypeScript', 'Conversational AI', 'Payment gateway integration'],
    makesOffer: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.body },
    })),
}

export const websiteSchema: Schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    author: { '@id': personId },
}

export function caseStudySchema(project: Project): Schema {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${project.title} case study`,
        headline: project.oneLiner,
        description: project.summary,
        url: `${site.url}/work/${project.slug}/`,
        image: `${site.url}/og/work/${project.slug}.png`,
        author: { '@type': 'Person', '@id': personId, name: site.name },
        keywords: project.stack.join(', '),
    }
}
