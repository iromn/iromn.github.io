import Container from '@/components/ui/Container'
import SplitHeading from '@/components/motion/SplitHeading'
import ServiceList from '@/components/motion/ServiceList'
import { services } from '@/content/services'

export default function Services() {
    return (
        <section id="services" aria-labelledby="services-title" className="border-t border-line py-16 md:py-24">
            <Container className="flex flex-col gap-10 md:gap-12">
                <SplitHeading id="services-title" text="What I can build for you" className="text-h2 font-medium" />
                <ServiceList services={services} />
            </Container>
        </section>
    )
}
