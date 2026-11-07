import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SplitHeading from '@/components/motion/SplitHeading'
import CountUp from '@/components/motion/CountUp'
import { proof } from '@/content/proof'

export default function Proof() {
    const [lead, ...rest] = proof.numbers
    const supporting = [
        ...rest,
        { value: proof.industries.length, suffix: '', decimals: 0, label: 'industries, from airports to weddings' },
    ]

    return (
        <section id="proof" aria-labelledby="proof-title" className="border-t border-line py-16 md:py-24">
            <Container className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-8">
                <div className="md:col-span-12">
                    <SplitHeading id="proof-title" text={proof.title} className="text-h2 font-medium" />
                </div>

                {/* The lead number is set in Geist rather than Geist Mono: at this size the mono
                    slashed zero reads as a letter. The supporting numbers stay mono. */}
                <Reveal className="flex flex-col justify-end gap-4 md:col-span-6">
                    <CountUp
                        value={lead.value}
                        decimals={lead.decimals}
                        suffix={lead.suffix}
                        className="text-[clamp(6rem,16vw,14rem)] font-medium leading-[0.85] tracking-[-0.05em] tabular-nums"
                    />
                    <p className="max-w-[28ch] text-lead text-muted">{lead.label}</p>
                </Reveal>

                <dl className="flex flex-col md:col-span-5 md:col-start-8">
                    {supporting.map((item, index) => (
                        <Reveal key={item.label} delay={index * 0.08} className="flex items-baseline gap-6 border-t border-line py-6">
                            <dt className="sr-only">{item.label}</dt>
                            <dd className="w-[5ch] shrink-0 font-mono text-4xl tabular-nums md:text-5xl">
                                <CountUp value={item.value} decimals={item.decimals} suffix={item.suffix} />
                            </dd>
                            <dd className="text-muted">{item.label}</dd>
                        </Reveal>
                    ))}
                </dl>

                <Reveal className="md:col-span-12">
                    <p className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-8 text-lead">
                        <span className="font-mono text-xs text-muted">Industries</span>
                        {proof.industries.map((industry) => (
                            <span key={industry}>{industry}</span>
                        ))}
                    </p>
                </Reveal>
            </Container>
        </section>
    )
}
