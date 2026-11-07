// Mirrors docs/CONTENT.md > Labs. Screenshots arrive in phase 5 (docs/ASSETS.md rows 12-14).

export type Lab = {
    title: string
    body: string
    stack: string[]
    href: string
    /** Overrides the default "View on GitHub" link label. */
    linkLabel?: string
    /** 4:3 screenshot base path from `npm run images`, e.g. '/images/labs/uploadit'. */
    image?: string
    /** 'contain' for logos: shown whole on a light tile instead of cropped. */
    imageFit?: 'cover' | 'contain'
}

export const labs: { title: string; linkLabel: string; items: Lab[] } = {
    title: 'Things I build for fun',
    linkLabel: 'View on GitHub',
    items: [
        {
            title: 'Trinket & Layers',
            body: 'My 3D print studio, and the story of how a college 3D art internship turned into a printer at home and then a small business.',
            stack: ['3D printing'],
            href: '/trinket-and-layers/',
            linkLabel: 'Read the story',
            image: '/images/trinket/logo',
            imageFit: 'contain',
        },
        {
            title: 'Some Stupid FPS Game',
            body: 'A multiplayer voxel shooter in the browser, synced at 60 FPS.',
            stack: ['Three.js', 'Node.js', 'Socket.io', 'Web Audio API'],
            href: 'https://github.com/iromn/some-stupid-fps-game',
        },
        {
            title: 'UploadiT',
            body: 'Upload documents and ask them questions in plain English.',
            stack: ['FastAPI', 'Pinecone', 'Next.js', 'Python'],
            href: 'https://github.com/iromn/uploadit',
        },
        {
            title: 'CI4 CMS Starter',
            body: 'A CodeIgniter 4 starter kit with auth, roles and a blog built in.',
            stack: ['CodeIgniter 4', 'MySQL', 'Tailwind CSS', 'CKEditor 5'],
            href: 'https://github.com/iromn/ci4-cms-starter',
        },
    ],
}
