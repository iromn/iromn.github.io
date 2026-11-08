import Container from '@/components/ui/Container'
import SplitHeading from '@/components/motion/SplitHeading'
import ProjectIndex from '@/components/motion/ProjectIndex'
import WorkStage from '@/components/WorkStage'
import { projects, toCard } from '@/content/projects'

// Cards only need a summary of each project; the long case-study text stays on its page.
const cards = projects.map(toCard)

export default function Work() {
    return (
        <section id="work" aria-labelledby="work-title" className="border-t border-line pt-16 md:pt-24">
            {/* Desktop: pinned frame with the heading held on top, an index on the left
                and a deck of projects on the right. Elsewhere it is just the heading. */}
            <ProjectIndex
                projects={cards}
                heading={<SplitHeading id="work-title" text="Selected work" className="text-h2 font-medium" />}
                skip={{ href: '/#services', label: 'Skip to services' }}
            />

            {/* Mobile, short screens and reduced motion: a plain list, one project after another. */}
            <ol className="mt-10 flex flex-col pinned:hidden">
                {cards.map((project, index) => (
                    <li key={project.slug} className="border-t border-line py-10">
                        {/* From md up (short screens or reduced motion) the title sits beside the stage. */}
                        <Container className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-12">
                            <div className="flex flex-col gap-6 md:col-span-4 md:gap-3">
                                <p className="font-mono text-xs text-muted">
                                    <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> {project.client}, {project.period}
                                </p>
                                <h3 className="text-h2 font-medium md:text-3xl md:tracking-tight">{project.title}</h3>
                            </div>
                            <div className="md:col-span-8">
                                <WorkStage project={project} />
                            </div>
                        </Container>
                    </li>
                ))}
            </ol>
        </section>
    )
}
