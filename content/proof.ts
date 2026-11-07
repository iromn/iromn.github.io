// Numbers confirmed by Nganba (2026-11-07). Mirrors docs/CONTENT.md > Proof.
// The industries count shown on the page is derived from the list below, so it can't drift.

export const proof = {
    title: 'The short version',
    numbers: [
        { value: 30, suffix: '+', decimals: 0, label: 'projects delivered' },
        { value: 4, suffix: '+', decimals: 0, label: 'years shipping production software' },
    ],
    industries: ['E-commerce', 'Healthcare', 'Education', 'Airports and metro', 'HR', 'SaaS', 'Weddings and events'],
} as const
