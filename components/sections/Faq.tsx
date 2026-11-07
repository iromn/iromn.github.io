import { Plus } from '@phosphor-icons/react/ssr'
import Container from '@/components/ui/Container'
import SplitHeading from '@/components/motion/SplitHeading'
import { faq } from '@/content/faq'

export default function Faq() {
    return (
        <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-16 md:py-24">
            <Container className="grid grid-cols-1 gap-12 md:grid-cols-12">
                <div className="md:col-span-4">
                    <SplitHeading id="faq-title" text={faq.title} className="text-h2 font-medium" />
                </div>
                <div className="border-b border-line md:col-span-7 md:col-start-6">
                    {faq.items.map((item) => (
                        <details key={item.question} className="group border-t border-line">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                                {item.question}
                                <Plus
                                    size={20}
                                    aria-hidden="true"
                                    className="shrink-0 transition-transform duration-500 ease-out-expo group-open:rotate-45 group-open:text-accent"
                                />
                            </summary>
                            <div className="faq-answer pb-6 pr-10">
                                <p className="max-w-[60ch] text-lead text-muted">{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </Container>
        </section>
    )
}
