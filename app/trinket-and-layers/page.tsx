import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react/ssr'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Rise from '@/components/ui/Rise'
import SectionLink from '@/components/ui/SectionLink'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import Reveal from '@/components/motion/Reveal'
import SplitHeading from '@/components/motion/SplitHeading'
import StoryLine from '@/components/motion/StoryLine'
import { trinket } from '@/content/trinket'

export const metadata: Metadata = {
    title: trinket.meta.title,
    description: trinket.meta.description,
    alternates: { canonical: '/trinket-and-layers/' },
    openGraph: {
        type: 'article',
        url: '/trinket-and-layers/',
        title: trinket.meta.title,
        description: trinket.meta.description,
        images: [{ url: '/og/trinket.png', width: 1200, height: 630, alt: trinket.meta.title }],
    },
    twitter: { card: 'summary_large_image', title: trinket.meta.title, description: trinket.meta.description, images: ['/og/trinket.png'] },
}

export default function TrinketPage() {
    const { intro, story, studio, logo } = trinket

    return (
        <article>
            <header className="pb-12 pt-28 md:pb-16 md:pt-32">
                <Container className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
                    <div className="flex flex-col gap-8 md:col-span-7">
                        <SectionLink
                            href="/#labs"
                            className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                        >
                            <ArrowLeft size={16} />
                            {intro.kicker}
                        </SectionLink>
                        <Rise as="h1" className="text-display font-medium">
                            {trinket.name}
                        </Rise>
                        <Rise delay={0.1} as="p" className="max-w-[48ch] text-lead text-muted">
                            {intro.lead}
                        </Rise>
                    </div>

                    {/* The logo prints in, layer by layer. */}
                    <Rise delay={0.15} className="md:col-span-5 md:col-start-8">
                        <div>
                            <div className="print-in">
                                <ResponsiveImage
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={704}
                                    height={665}
                                    sizes="(min-width: 768px) 38vw, 90vw"
                                    className="mx-auto w-[88%] object-contain"
                                    priority
                                />
                                <span aria-hidden="true" className="print-cover" />
                                <span aria-hidden="true" className="print-nozzle" />
                            </div>
                        </div>
                    </Rise>
                </Container>
            </header>

            <section aria-labelledby="story-title" className="border-t border-line py-16 md:py-24">
                <Container className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="md:sticky md:top-28">
                            <SplitHeading id="story-title" text={story.title} className="text-h2 font-medium" />
                        </div>
                    </div>
                    <div className="md:col-span-7 md:col-start-6">
                        <StoryLine>
                            {story.chapters.map((chapter, index) => (
                                <Reveal as="li" key={chapter.label} delay={0.05} className="relative flex flex-col gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="absolute -left-8 top-1.5 size-[11px] rounded-full border-2 border-accent bg-bg md:-left-12 md:size-[15px]"
                                    />
                                    <span className="font-mono text-xs text-accent">
                                        {String(index + 1).padStart(2, '0')} / {chapter.label}
                                    </span>
                                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{chapter.title}</h3>
                                    <p className="max-w-[58ch] text-lead text-muted">{chapter.body}</p>
                                </Reveal>
                            ))}
                        </StoryLine>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="studio-title" className="border-t border-line">
                <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
                    <div className="flex flex-col gap-5">
                        <SplitHeading id="studio-title" text={studio.title} className="text-h2 font-medium" />
                        <Reveal as="p" className="max-w-[52ch] text-lead text-muted">
                            {studio.body}
                        </Reveal>
                    </div>
                    <Button href={trinket.shopUrl}>
                        {studio.cta}
                        <ArrowUpRight size={16} />
                    </Button>
                </Container>
            </section>
        </article>
    )
}
