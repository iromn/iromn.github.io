import { IMAGE_WIDTHS } from '@/lib/constants'

type Props = {
    /** Base path written by `npm run images`, e.g. "/images/work/botlune" (no width or extension). */
    src: string
    alt: string
    width: number
    height: number
    sizes: string
    className?: string
    priority?: boolean
}

/**
 * AVIF with WebP fallback at the widths `npm run images` generates. Explicit
 * dimensions reserve space so nothing shifts while it loads.
 */
export default function ResponsiveImage({ src, alt, width, height, sizes, className, priority }: Props) {
    const srcSet = (format: string) => IMAGE_WIDTHS.map((w) => `${src}-${w}.${format} ${w}w`).join(', ')

    return (
        <picture>
            <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
            <img
                src={`${src}-${IMAGE_WIDTHS[1]}.webp`}
                srcSet={srcSet('webp')}
                sizes={sizes}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : undefined}
                decoding="async"
                className={className}
            />
        </picture>
    )
}
