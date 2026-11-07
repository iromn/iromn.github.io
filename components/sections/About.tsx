import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SplitHeading from '@/components/motion/SplitHeading'
import Character from '@/components/motion/Character'
import { about } from '@/content/about'

export default function About() {
    return (
        <section id="about" aria-labelledby="about-title" className="border-t border-line py-16 md:py-24">
            <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-8">
                <Reveal className="md:col-span-5">
                    <Character label={about.characterLabel} />
                </Reveal>
                <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7 md:pt-8">
                    <SplitHeading id="about-title" text={about.title} className="text-h2 font-medium" />
                    {about.paragraphs.map((paragraph, index) => (
                        <Reveal key={index} delay={0.05 * index}>
                            <p className="max-w-[60ch] text-lead text-muted">{paragraph}</p>
                        </Reveal>
                    ))}
                </div>
            </Container>

            <Toolbelt />
        </section>
    )
}

function Toolbelt() {
    const track = (hidden: boolean) => (
        <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
            {about.toolbelt.map((tool) => (
                <li key={tool.title} className="flex shrink-0 items-center gap-3 text-muted">
                    <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
                        <path d={tool.path} />
                    </svg>
                    <span className="text-lg">{tool.title}</span>
                </li>
            ))}
        </ul>
    )

    return (
        <div
            role="region"
            aria-label="Tools I work with"
            className="marquee mt-16 overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:mt-20"
        >
            <div className="marquee-track flex w-max">
                {track(false)}
                {track(true)}
            </div>
        </div>
    )
}
