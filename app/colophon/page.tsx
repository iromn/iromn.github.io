import type { Metadata } from 'next'
import { ArrowUpRight } from '@phosphor-icons/react/ssr'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import Rise from '@/components/ui/Rise'
import LiveVitals from '@/components/motion/LiveVitals'
import { colophon } from '@/content/colophon'

export const metadata: Metadata = {
    title: colophon.title,
    description: colophon.intro,
    alternates: { canonical: '/colophon/' },
}

const scoreKeys = [
    { key: 'performance', label: 'Performance' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'bestPractices', label: 'Best practices' },
    { key: 'seo', label: 'SEO' },
] as const

export default function Colophon() {
    return (
        <>
            <header className="pb-12 pt-28 md:pb-16 md:pt-32">
                <Container className="flex flex-col gap-8">
                    <Rise as="h1" className="text-display font-medium">
                        {colophon.title}
                    </Rise>
                    <Rise delay={0.1} as="p" className="max-w-[52ch] text-lead text-muted">
                        {colophon.intro}
                    </Rise>
                </Container>
            </header>

            <section aria-labelledby="live-title" className="blueprint border-y border-line py-16 md:py-24">
                <Container className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <h2 id="live-title" className="text-3xl font-medium tracking-tight">
                            Your visit, measured live
                        </h2>
                        <p className="max-w-[60ch] text-muted">
                            Read from your own browser&apos;s Performance APIs as this page loaded. Nothing is tracked or sent
                            anywhere.
                        </p>
                    </div>
                    <LiveVitals />
                </Container>
            </section>

            {colophon.lighthouse.pages.length > 0 && (
                <section aria-labelledby="lighthouse-title" className="py-16 md:py-24">
                    <Container className="grid grid-cols-1 gap-10 md:grid-cols-12">
                        <Reveal className="flex flex-col gap-3 md:col-span-4">
                            <h2 id="lighthouse-title" className="text-3xl font-medium tracking-tight">
                                Lighthouse
                            </h2>
                            <p className="text-muted">
                                {colophon.lighthouse.method}. Measured on {colophon.lighthouse.measuredOn}.
                            </p>
                        </Reveal>
                        <div className="flex flex-col md:col-span-8">
                            {colophon.lighthouse.pages.map((page) => (
                                <Reveal key={page.page} className="grid grid-cols-2 gap-4 border-t border-line py-6 sm:grid-cols-5">
                                    <p className="col-span-2 font-medium sm:col-span-1">{page.page}</p>
                                    {scoreKeys.map(({ key, label }) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="font-mono text-3xl tabular-nums">{page[key]}</span>
                                            <span className="text-sm text-muted">{label}</span>
                                        </div>
                                    ))}
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <section aria-labelledby="stack-title" className="border-t border-line py-16 md:py-24">
                <Container className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <Reveal className="md:col-span-4">
                        <h2 id="stack-title" className="text-3xl font-medium tracking-tight">
                            Stack
                        </h2>
                    </Reveal>
                    <dl className="flex flex-col md:col-span-8">
                        {colophon.stack.map((item) => (
                            <Reveal key={item.name} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                                <dt className="font-mono text-sm">{item.name}</dt>
                                <dd className="text-muted">{item.detail}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </Container>
            </section>

            <section aria-labelledby="principles-title" className="border-t border-line py-16 md:py-24">
                <Container className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <Reveal className="md:col-span-4">
                        <h2 id="principles-title" className="text-3xl font-medium tracking-tight">
                            Principles
                        </h2>
                    </Reveal>
                    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-8">
                        {colophon.principles.map((principle) => (
                            <Reveal as="li" key={principle.title} className="flex flex-col gap-2 border-t border-line pt-5">
                                <h3 className="font-medium">{principle.title}</h3>
                                <p className="text-muted">{principle.body}</p>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            <section className="border-t border-line py-16 md:py-24">
                <Container>
                    <Button href={colophon.sourceUrl} variant="secondary">
                        Read the source on GitHub
                        <ArrowUpRight size={16} />
                    </Button>
                </Container>
            </section>
        </>
    )
}
