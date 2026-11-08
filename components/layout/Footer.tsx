import Link from 'next/link'
import Container from '@/components/ui/Container'
import FooterWordmark from '@/components/motion/FooterWordmark'
import { site, socials } from '@/content/site'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="overflow-hidden border-t border-line pt-10">
            <Container className="mb-6 md:mb-10">
                <FooterWordmark text={site.name} />
            </Container>
            {/* Rule on an inner element so it spans the content width, not the container's padding. */}
            <Container>
                <div className="flex flex-col gap-2 border-t border-line py-5 md:gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
                    <p>
                        © {year} {site.name}
                    </p>
                    <ul className="flex flex-wrap gap-x-6">
                        <li>
                            <Link href="/colophon/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                                How this site is built
                            </Link>
                        </li>
                        <li>
                            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
                                Email
                            </a>
                        </li>
                        {socials.map((social) => (
                            <li key={social.href}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center transition-colors hover:text-ink"
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </footer>
    )
}
