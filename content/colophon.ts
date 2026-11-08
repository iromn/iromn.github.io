// /colophon: how this site is built. Lighthouse numbers are real measurements;
// re-run and update them (with the date) whenever the site changes meaningfully.

export const colophon = {
    title: 'How this site is built',
    intro: 'The site makes the same argument as the work: it should look considered and hold up underneath. This is the Engine view of the site itself.',
    sourceUrl: 'https://github.com/iromn/iromn.github.io',
    stack: [
        { name: 'Next.js', detail: 'App Router, exported as static HTML for GitHub Pages.' },
        { name: 'TypeScript', detail: 'Strict mode. Content lives in typed files, never hard-coded in components.' },
        { name: 'Tailwind CSS v4', detail: 'Design tokens as CSS variables, light and dark from one set of components.' },
        { name: 'Motion', detail: 'Reveals, the hero lens, the work deck and every interactive state.' },
        { name: 'GSAP ScrollTrigger', detail: 'Only for the pinned horizontal process section.' },
        { name: 'Lenis', detail: 'Smooth scrolling, driven by the same frame loop as Motion.' },
        { name: 'Geist', detail: 'Sans and Mono, self-hosted with no layout shift.' },
    ],
    principles: [
        {
            title: 'Motion with a job',
            body: 'Every animation explains something, gives feedback or tells the story in order. Nothing loops just to look busy.',
        },
        {
            title: 'Reduced motion respected',
            body: 'With reduced motion on, smooth scrolling, pinning, the lens and the count-ups switch off and the content is all still there.',
        },
        {
            title: 'Animate the cheap properties',
            body: 'Only transform and opacity animate, driven by motion values outside React renders. No scroll event listeners.',
        },
        {
            title: 'Accessible by default',
            body: 'Real headings, labelled form fields, visible focus, a skip link, keyboard-reachable everything and AA contrast in both themes.',
        },
        {
            title: 'Real numbers only',
            body: 'The measurements in the hero lens, the diagrams and this page come from the live page or the work itself.',
        },
    ],
    // Lighthouse 12.8, mobile profile with applied (devtools) throttling, production build
    // served with gzip like GitHub Pages (`npm run serve`), median of three runs.
    // Re-measure and update after meaningful changes.
    lighthouse: {
        measuredOn: '9 November 2026',
        method: 'Lighthouse mobile profile with applied throttling, served compressed as in production, median of three runs',
        pages: [
            { page: 'Home', performance: 94, accessibility: 100, bestPractices: 100, seo: 100 },
            { page: 'Case study', performance: 95, accessibility: 100, bestPractices: 100, seo: 100 },
            { page: 'This page', performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
        ],
    },
} as const
