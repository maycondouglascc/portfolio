import danone from '../assets/lottie/danoneNorthAmerica.json' 

export interface Project {
  slug: string
  title: string
  description: string
  href?: string
  thumbnailHeight?: number
  hoverLottie?: object
}

export const projects: Project[] = [
  {
    slug: 'danone-north-america',
    title: 'Danone North America',
    description: 'Product design and UX refresh for a global food portfolio.',
    hoverLottie: danone,
  },
  {
    slug: 'gskpromx',
    title: 'GSK Pro México',
    description: 'Design system updates for scalable insurance experiences.',
    hoverLottie: danone,

  },
  {
    slug: 'vendd-web',
    title: 'Vendd Web',
    description: 'Web app redesign focused on onboarding and conversions.',
    hoverLottie: danone,

  },
]
