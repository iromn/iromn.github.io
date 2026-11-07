import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Rise from '@/components/ui/Rise'
import Magnetic from '@/components/motion/Magnetic'
import HeroBackdrop from '@/components/motion/HeroBackdrop'
import { XrayHeadline, XrayProvider, XrayToggle } from '@/components/motion/Xray'
import { ctas, hero } from '@/content/site'

export default function Hero() {
    return (
        <section id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden pb-14 pt-28 md:pb-20">
            <HeroBackdrop />
            <XrayProvider>
                <Container className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-y-12">
                    <div className="md:col-span-12">
                        <XrayHeadline lines={hero.headline} />
                    </div>

                    <Rise delay={0.4} className="order-last md:order-none md:col-span-5 md:self-end">
                        <XrayToggle onLabel={hero.lensOn} offLabel={hero.lensOff} />
                    </Rise>

                    <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7">
                        <Rise delay={0.25} as="p" className="max-w-[46ch] text-lead text-muted">
                            {hero.subtext}
                        </Rise>
                        <Rise delay={0.32} className="flex flex-wrap items-center gap-3">
                            <Magnetic>
                                <Button href={ctas.contact.href}>{ctas.contact.label}</Button>
                            </Magnetic>
                            <Button href={ctas.work.href} variant="secondary">
                                {ctas.work.label}
                            </Button>
                        </Rise>
                    </div>
                </Container>
            </XrayProvider>
        </section>
    )
}
