import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import HorizontalPan from '@/components/motion/HorizontalPan'
import SplitHeading from '@/components/motion/SplitHeading'
import { processContent } from '@/content/process'
import { ctas } from '@/content/site'

// Panel classes switch between a stacked row (mobile, reduced motion) and a fixed-width
// column in the horizontal track (group-data-[pan=on]/pan comes from HorizontalPan).
const pan = {
    intro: 'mx-auto w-full max-w-[1400px] group-data-[pan=on]/pan:mx-0 group-data-[pan=on]/pan:max-w-none group-data-[pan=on]/pan:w-[min(30rem,40vw)] group-data-[pan=on]/pan:shrink-0 group-data-[pan=on]/pan:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] group-data-[pan=on]/pan:pr-16',
    stage: 'xl:mx-[max(2rem,calc((100vw-1400px)/2+2rem))] group-data-[pan=on]/pan:flex group-data-[pan=on]/pan:w-[min(40rem,60vw)] group-data-[pan=on]/pan:shrink-0 group-data-[pan=on]/pan:flex-col group-data-[pan=on]/pan:justify-center group-data-[pan=on]/pan:border-l group-data-[pan=on]/pan:border-t-0 group-data-[pan=on]/pan:px-12 group-data-[pan=on]/pan:py-0 group-data-[pan=on]/pan:last:mr-[20vw]',
}

export default function Process() {
    return (
        <section id="process" aria-labelledby="process-title" className="border-t border-line">
            <HorizontalPan>
                <div className={`px-4 pb-8 pt-16 md:px-8 md:pt-24 group-data-[pan=on]/pan:p-0 ${pan.intro}`}>
                    <SplitHeading id="process-title" text={processContent.title} className="text-h2 font-medium" />
                </div>
                {processContent.stages.map((stage) => (
                    <div
                        key={stage.title}
                        className={`mx-4 grid grid-cols-1 gap-4 border-t border-line py-10 md:mx-8 md:grid-cols-12 ${pan.stage} group-data-[pan=on]/pan:mx-0`}
                    >
                        <h3 className="text-4xl font-medium tracking-tight md:col-span-4 md:text-5xl group-data-[pan=on]/pan:mb-10 group-data-[pan=on]/pan:text-[clamp(3.5rem,7vw,7rem)] group-data-[pan=on]/pan:leading-none">
                            {stage.title}
                        </h3>
                        <div className="flex flex-col gap-4 md:col-span-6 md:col-start-6">
                            <p className="max-w-[34ch] text-lead text-muted group-data-[pan=on]/pan:text-2xl group-data-[pan=on]/pan:leading-snug">{stage.body}</p>
                            <p className="font-mono text-xs text-accent group-data-[pan=on]/pan:text-sm">You get: {stage.youGet}</p>
                        </div>
                    </div>
                ))}
            </HorizontalPan>

            <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:py-24">
                <Reveal className="md:col-span-4">
                    <h3 className="text-3xl font-medium tracking-tight">{processContent.modelsTitle}</h3>
                </Reveal>
                <div className="flex flex-col md:col-span-7 md:col-start-6">
                    {processContent.models.map((model, index) => (
                        <Reveal key={model.title} delay={index * 0.06} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                            <h4 className="font-medium">{model.title}</h4>
                            <p className="text-muted">{model.body}</p>
                        </Reveal>
                    ))}
                    <Reveal className="flex flex-col items-start gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-[40ch] text-muted">{processContent.pricingNote}</p>
                        <Button href={ctas.contact.href}>{ctas.contact.label}</Button>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}
