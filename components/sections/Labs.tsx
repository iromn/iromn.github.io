import Link from 'next/link'
import { ArrowRight, GithubLogo } from '@phosphor-icons/react/ssr'
import Container from '@/components/ui/Container'
import SplitHeading from '@/components/motion/SplitHeading'
import DragScroll from '@/components/motion/DragScroll'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { labs } from '@/content/labs'

export default function Labs() {
    return (
        <section id="labs" aria-labelledby="labs-title" className="border-t border-line py-16 md:py-24">
            <Container>
                <SplitHeading id="labs-title" text={labs.title} className="text-h2 font-medium" />
            </Container>

            {/* Row starts on the container's left edge and bleeds off the right of the viewport.
                Scroll padding matches the padding, or snapping pulls the first card off that edge. */}
            <DragScroll
                label={labs.title}
                className="mt-12 scroll-px-4 px-4 md:mt-16 md:scroll-px-[max(2rem,calc((100vw-1400px)/2+2rem))] md:px-[max(2rem,calc((100vw-1400px)/2+2rem))]"
            >
                {labs.items.map((lab) => (
                    <article key={lab.title} className="flex w-[min(85vw,30rem)] shrink-0 snap-start flex-col gap-5">
                        {lab.image ? (
                            lab.imageFit === 'contain' ? (
                                <div className="flex aspect-[4/3] items-center justify-center [&>picture]:block [&>picture]:w-[78%]">
                                    <ResponsiveImage
                                        src={lab.image}
                                        alt={`${lab.title} logo`}
                                        width={704}
                                        height={665}
                                        sizes="(min-width: 768px) 20rem, 60vw"
                                        className="w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <ResponsiveImage
                                    src={lab.image}
                                    alt={`${lab.title} screenshot`}
                                    width={1200}
                                    height={900}
                                    sizes="(min-width: 768px) 30rem, 85vw"
                                    className="aspect-[4/3] w-full border border-line object-cover"
                                />
                            )
                        ) : (
                            <div className="blueprint flex aspect-[4/3] flex-col justify-between border border-line p-6">
                                <span className="engine-label">Built with</span>
                                <ul className="flex flex-wrap gap-2">
                                    {lab.stack.map((item) => (
                                        <li key={item} className="border border-accent/40 bg-bg px-2.5 py-1 font-mono text-xs">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-medium tracking-tight">{lab.title}</h3>
                            <p className="text-muted">{lab.body}</p>
                        </div>
                        {lab.href.startsWith('/') ? (
                            <Link
                                href={lab.href}
                                draggable={false}
                                className="hit inline-flex w-fit items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
                            >
                                {lab.linkLabel ?? labs.linkLabel}
                                <ArrowRight size={16} />
                            </Link>
                        ) : (
                            <a
                                href={lab.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                draggable={false}
                                className="hit inline-flex w-fit items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
                            >
                                <GithubLogo size={18} />
                                {lab.linkLabel ?? labs.linkLabel}
                                <span className="sr-only">: {lab.title}</span>
                            </a>
                        )}
                    </article>
                ))}
            </DragScroll>
        </section>
    )
}
