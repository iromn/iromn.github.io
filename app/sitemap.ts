import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { site } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${site.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        { url: `${site.url}/trinket-and-layers/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${site.url}/colophon/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        ...projects.map((project) => ({
            url: `${site.url}/work/${project.slug}/`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.8,
        })),
    ]
}
