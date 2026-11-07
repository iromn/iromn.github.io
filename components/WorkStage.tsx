import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/ssr'
import SurfaceEngine from '@/components/motion/SurfaceEngine'
import type { ProjectCard } from '@/content/projects'

/**
 * One project in Selected work: Surface/Engine panel, one-liner, link and two numbers.
 * `panelClassName` lets the pinned deck reshape the panel to fit a short viewport.
 */
export default function WorkStage({ project, panelClassName }: { project: ProjectCard; panelClassName?: string }) {
    return (
        <article className="flex flex-col gap-6">
            <SurfaceEngine project={project} className={panelClassName} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-end">
                <div className="flex flex-col gap-4 sm:col-span-7">
                    <p className="max-w-[44ch] text-lead text-muted">{project.oneLiner}</p>
                    <Link href={`/work/${project.slug}`} className="group inline-flex w-fit items-center gap-2 text-[15px] font-medium">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
                            Read the case study
                        </span>
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
                <dl className="grid grid-cols-2 gap-6 sm:col-span-5">
                    {project.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="flex flex-col gap-1 border-t border-line pt-3">
                            <dt className="sr-only">{metric.label}</dt>
                            <dd className="font-mono text-2xl tabular-nums">{metric.value}</dd>
                            <dd className="text-sm text-muted">{metric.label}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </article>
    )
}
