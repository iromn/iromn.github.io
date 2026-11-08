import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import SplitHeading from '@/components/motion/SplitHeading'
import ContactForm from '@/components/ContactForm'
import { contact } from '@/content/contact'
import { site, socials } from '@/content/site'

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-16 md:py-24">
            <Container className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-8">
                <div className="flex flex-col gap-12 md:col-span-7">
                    <div className="flex flex-col gap-6">
                        <SplitHeading id="contact-title" text={contact.title} className="text-display font-medium" />
                        <Reveal as="p" delay={0.2} className="max-w-[46ch] text-lead text-muted">
                            {contact.intro}
                        </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                        <ContactForm />
                    </Reveal>
                </div>

                {/* Desktop: sits level with the heading and stays in view while the form is filled in. */}
                <Reveal delay={0.15} className="flex flex-col gap-7 md:sticky md:top-28 md:col-span-4 md:col-start-9 md:self-start md:pt-4">
                    <div className="flex flex-col gap-3">
                        <p className="font-mono text-xs text-muted">{contact.directTitle}</p>
                        <a
                            href={`mailto:${site.email}`}
                            className="hit w-fit break-all text-xl font-medium underline decoration-line underline-offset-8 transition-colors hover:decoration-accent md:text-2xl"
                        >
                            {site.email}
                        </a>
                    </div>
                    <ul className="flex flex-col">
                        {socials.map((social) => (
                            <li key={social.href}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink"
                                >
                                    <span>
                                        {social.label} <span className="font-mono text-xs">{social.handle}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </Container>
        </section>
    )
}
