import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    text: string
    id?: string
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'p'
}

/**
 * Heading whose words rise out of a mask one after another when it scrolls into view.
 * Server-rendered and CSS-driven (`.reveal-words`, flipped by RevealObserver). Words stay
 * separated by real spaces, so screen readers and search engines read normal text.
 */
export default function SplitHeading({ text, id, className, as: Tag = 'h2' }: Props) {
    const words = text.split(' ')
    return (
        <Tag id={id} className={cn('reveal-words', className)}>
            {words.map((word, index) => (
                <span key={`${word}-${index}`}>
                    <span className="word-mask">
                        <span className="word" style={{ '--i': index } as CSSProperties}>
                            {word}
                        </span>
                    </span>
                    {index < words.length - 1 && ' '}
                </span>
            ))}
        </Tag>
    )
}
