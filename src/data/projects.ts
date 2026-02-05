export interface Project {
  slug: string
  title: string
  description: string
  thumbnail: string
  href?: string
  thumbnailHeight?: number
}

export const projects: Project[] = [
  {
    slug: 'danone-north-america',
    title: 'Danone North America',
    description: 'Product design and UX refresh for a global food portfolio.',
    thumbnail: '/files/case-thumbnails/project-thumbnail-1.png',
  },
  {
    slug: 'metlife',
    title: 'Metlife',
    description: 'Design system updates for scalable insurance experiences.',
    thumbnail: '/files/case-thumbnails/project-thumbnail-2.png',
  },
  {
    slug: 'vendd-web',
    title: 'Vendd Web',
    description: 'Web app redesign focused on onboarding and conversions.',
    thumbnail: '/files/case-thumbnails/project-thumbnail-3.png',
  },
]
