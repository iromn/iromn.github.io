import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/ssr'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import Rise from '@/components/ui/Rise'
import SurfaceEngine from '@/components/motion/SurfaceEngine'
import SectionLink from '@/components/ui/SectionLink'
import { getProject, projects } from '@/content/projects'
import { ctas } from '@/content/site'
import JsonLd, { caseStudySchema } from '@/components/JsonLd'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const project = getProject((await params).slug)
    if (!project) return {}
    const title = `${project.title} case study`
    const image = { url: `/og/work/${project.slug}.png`, width: 1200, height: 630, alt: title }
    return {
        title,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}/` },
        openGraph: { type: 'article', url: `/work/${project.slug}/`, title, description: project.summary, images: [image] },
        twitter: { card: 'summary_large_image', title, description: project.summary, images: [image.url] },
    }
}

export default async function CaseStudy({ params }: Params) {
    const project = getProject((await params).slug)
    if (!project) notFound()

    const index = projects.findIndex((item) => item.slug === project.slug)
    const next = projects[(index + 1) % projects.length]

    const facts = [
        { label: 'Client', value: project.client },
        { label: 'When', value: project.period },
        { label: 'Role', value: project.role },
        { label: 'Stack', value: project.stack.join(', ') },
    ]

    return (
        <article>
            <JsonLd data={caseStudySchema(project)} />
            <header className="pb-12 pt-28 md:pb-16 md:pt-32">
                <Container className="flex flex-col gap-10">
                    <SectionLink
                        href="/#work"
                        className="hit inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                    >
                        <ArrowLeft size={16} />
                        All work
                    </SectionLink>
                    <Rise as="h1" className="text-display font-medium">
                        {project.title}
                    </Rise>
                    <Rise delay={0.1} as="p" className="max-w-[52ch] text-lead text-muted">
                        {project.summary}
                    </Rise>
                    <Rise delay={0.2}>
                        <dl className="grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
                            {facts.map((fact) => (
                                <div key={fact.label} className="flex flex-col gap-1">
                                    <dt className="font-mono text-xs text-muted">{fact.label}</dt>
                                    <dd className="text-[15px]">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Rise>
                </Container>
            </header>

            <Container>
                <Reveal>
                    <SurfaceEngine project={project} />
                </Reveal>
            </Container>

            <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-y-14 md:py-24">
                <StoryBlock title="Context">
                    <p>{project.context}</p>
                </StoryBlock>
                <StoryBlock title="The challenge">
                    <p>{project.challenge}</p>
                </StoryBlock>
                <StoryBlock title="How it was built">
                    <ul className="grid gap-8 sm:grid-cols-2">
                        {project.approach.map((step) => (
                            <li key={step.title} className="flex flex-col gap-2 border-t border-line pt-5">
                                <h3 className="text-ink font-medium">{step.title}</h3>
                                <p>{step.body}</p>
                            </li>
                        ))}
                    </ul>
                </StoryBlock>
                <StoryBlock title="Results">
                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {project.metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-col gap-2">
                                <dt className="sr-only">{metric.label}</dt>
                                <dd className="font-mono text-4xl text-ink tabular-nums">{metric.value}</dd>
                                <dd className="text-sm">{metric.label}</dd>
                            </div>
                        ))}
                    </dl>
                    <ul className="mt-10 flex list-disc flex-col gap-2 pl-5 marker:text-accent">
                        {project.results.map((result) => (
                            <li key={result}>{result}</li>
                        ))}
                    </ul>
                    {project.links && (
                        <div className="mt-10 flex flex-wrap gap-3">
                            {project.links.map((link) => (
                                <Button key={link.href} href={link.href} variant="secondary">
                                    {link.label}
                                    <ArrowUpRight size={16} />
                                </Button>
                            ))}
                        </div>
                    )}
                </StoryBlock>
            </Container>

            <section aria-label="Next case study" className="border-t border-line">
                <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
                    <Link href={`/work/${next.slug}`} className="group flex flex-col gap-3">
                        <span className="font-mono text-xs text-muted">Next case study</span>
                        <span className="flex items-center gap-4 text-h2 font-medium">
                            {next.title}
                            <ArrowUpRight
                                size={40}
                                className="shrink-0 text-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                            />
                        </span>
                    </Link>
                    <Button href={ctas.contact.href}>{ctas.contact.label}</Button>
                </Container>
            </section>
        </article>
    )
}

function StoryBlock({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <Reveal className="md:col-span-3">
                <h2 className="text-xl font-medium">{title}</h2>
            </Reveal>
            <Reveal className="text-lead text-muted md:col-span-8 md:col-start-5" delay={0.05}>
                {children}
            </Reveal>
        </>
    )
}
