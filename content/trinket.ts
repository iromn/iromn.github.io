// /trinket-and-layers: the story behind Nganba's 3D print studio, in the portfolio's
// own style. Facts are from Nganba; anything marked [CONFIRM] is a gap to fill.

export const trinket = {
    name: 'Trinket & Layers',
    shopUrl: 'https://www.trinketandlayers.in',
    logo: { src: '/images/trinket/logo', alt: 'Trinket & Layers logo: a stack of colourful printed layers' },
    meta: {
        title: 'Trinket & Layers, my 3D print studio',
        description:
            'Why I started Trinket & Layers: from a 3D art internship in college to a 3D printer at home, and a small studio that makes custom prints.',
    },
    intro: {
        kicker: 'Side studio',
        lead: 'A small 3D print studio I run alongside my development work. It exists because I have always wanted to make things I can hold, not just things on a screen.',
    },
    story: {
        title: 'How it started',
        chapters: [
            {
                label: 'Curiosity',
                title: 'I wanted to know how 3D worked.',
                body: 'Long before any printer, I was curious about 3D: how objects on a screen are built, and how something flat turns into something with depth and weight.',
            },
            {
                label: 'College',
                // [CONFIRM] year, company or studio, and what the work involved (modelling, texturing, tools)
                title: 'An internship as a 3D artist.',
                body: 'In college I interned as a 3D artist. It was my first real introduction to 3D work, and it taught me to think in volumes, surfaces and detail instead of pixels.',
            },
            {
                label: 'Making',
                title: 'I keep building new things.',
                body: "Whether it's software or something physical, I'm always looking for the next thing to build. Writing code scratches part of that itch. Making an object you can pick up scratches the rest.",
            },
            {
                label: 'The printer',
                // [CONFIRM] when the first printer arrived, which one, and the first thing printed
                title: 'A 3D printer, as a hobby.',
                body: 'Getting a 3D printer meant I could stop settling for whatever was in the shops and make custom things for myself: parts that fit exactly, gifts for people, and small pieces just because I wanted them to exist.',
            },
            {
                label: 'The studio',
                title: 'Then it became Trinket & Layers.',
                body: 'The hobby grew into a small studio. Trinket & Layers makes custom prints, collectibles and personalised pieces in small batches, each one printed and finished by hand.',
            },
        ],
    },
    studio: {
        title: 'The studio today',
        body: 'Small batches, careful finishing and direct conversations with the person printing your piece. If you have an idea you want to hold, the studio is where to start.',
        cta: 'Visit Trinket & Layers',
    },
} as const
