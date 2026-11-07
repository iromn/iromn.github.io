import type { ProjectCard } from '@/content/projects'

/**
 * Typographic Surface view for projects without a cover image: the project's own
 * facts set as a poster, with its headline number traced in Engine outline behind.
 */
export default function CoverPoster({ project }: { project: ProjectCard }) {
    const lead = project.metrics[0]

    return (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-surface p-6 pt-20 md:p-10 md:pt-24">
            <span
                aria-hidden="true"
                className="engine-text pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none font-medium leading-none tracking-[-0.06em] opacity-40 text-[clamp(7rem,22vw,20rem)]"
            >
                {lead?.value}
            </span>

            <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs text-muted">
                <span>{project.client}</span>
                <span>{project.period}</span>
            </div>

            <div className="relative flex flex-col gap-4">
                <p className="max-w-[12ch] text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                    {project.title}
                </p>
                <p className="max-w-[44ch] font-mono text-xs leading-relaxed text-muted">
                    {project.role}
                    <br />
                    {project.stack.join(' / ')}
                </p>
            </div>
        </div>
    )
}
