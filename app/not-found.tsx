import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
    return (
        <section className="flex min-h-[100dvh] items-center pt-24">
            <Container className="flex flex-col gap-8">
                <h1 className="text-h2 font-medium">This page doesn&apos;t exist.</h1>
                <p className="max-w-[46ch] text-lead text-muted">The link may be old, or the page moved.</p>
                <div>
                    <Button href="/">Back to home</Button>
                </div>
            </Container>
        </section>
    )
}
