// Mirrors docs/CONTENT.md > FAQ.

export const faq = {
    title: 'Questions clients ask',
    items: [
        {
            question: 'What does a typical project cost?',
            answer: "It depends on scope. Send a short brief and you'll get a clear estimate, broken down by stage.",
        },
        {
            // [CONFIRM] ranges
            question: 'How long does a project take?',
            answer: "Most marketing sites take 3 to 6 weeks and most web apps 6 to 12 weeks. You'll get a timeline before we start.",
        },
        {
            // [CONFIRM]
            question: 'Which time zones do you work with?',
            answer: "I'm in India (IST) and overlap with UK and European working hours, plus early mornings for US teams.",
        },
        {
            question: 'Can you work with our existing codebase?',
            answer: 'Yes. Much of my work has been extending, fixing and speeding up existing PHP (CodeIgniter and Laravel), WordPress and Vue systems.',
        },
        {
            question: 'Will you sign an NDA?',
            answer: 'Yes, happy to before we discuss details.',
        },
    ],
} as const
