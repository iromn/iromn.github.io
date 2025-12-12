import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-react'

export interface SocialLink {
    name: string
    url: string
    icon: LucideIcon
    username?: string
}

export const socialLinks: SocialLink[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/iromn',
        icon: Github,
        username: '@iromn',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/nganba-irom/',
        icon: Linkedin,
        username: 'nganba-irom',
    },
    {
        name: 'Email',
        url: 'mailto:nganba.irom47@gmail.com',
        icon: Mail,
        username: 'nganba.irom47@gmail.com',
    },
]

export const resumeUrl = '#' // Placeholder for resume download
