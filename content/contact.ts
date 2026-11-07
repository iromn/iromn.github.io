import { services } from './services'

// Mirrors docs/CONTENT.md > Contact.

export const contact = {
    title: 'Start a project',
    // [CONFIRM] response time
    intro: "Tell me what you're building. I reply to every enquiry within two working days.",
    serviceOptions: [...services.map((service) => service.title), 'Something else'],
    timelineOptions: ['As soon as possible', 'Within a month', 'In 1 to 3 months', 'Flexible'],
    submit: 'Send brief',
    sending: 'Sending',
    success: "Thanks, your brief is in. I'll reply within two working days.",
    sendAnother: 'Send another brief',
    error: 'Something went wrong sending that. Please try again or email me directly.',
    notConfigured: "The form isn't connected yet. Please email me directly.",
    directTitle: 'Prefer email?',
} as const
