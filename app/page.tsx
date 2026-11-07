import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Services from '@/components/sections/Services'
import Proof from '@/components/sections/Proof'
import Process from '@/components/sections/Process'
import Labs from '@/components/sections/Labs'
import About from '@/components/sections/About'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact'
import JsonLd, { personSchema, websiteSchema } from '@/components/JsonLd'

export default function Home() {
    return (
        <>
            <JsonLd data={[personSchema, websiteSchema]} />
            <Hero />
            <Work />
            <Services />
            <Proof />
            <Process />
            <Labs />
            <About />
            <Faq />
            <Contact />
        </>
    )
}
