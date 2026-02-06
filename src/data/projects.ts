import { type ReactNode } from 'react'
import danone from '../assets/lottie/danoneNorthAmerica.json'
import type { SectionTreeItem } from '../components/SectionTree'
import type { StatusIconVariant } from '../components/case-study/StatusIcon'

// ── Card item used by metrics / problems / results ──
export type HighlightCardData = {
  variant: StatusIconVariant
  title: string
  description: string
}

// ── Discriminated union for every section type in a case study ──
export type CaseStudySection =
  | { type: 'text'; id?: string; title?: string; body: ReactNode }
  | {
      type: 'metrics'
      id?: string
      label?: string
      items: HighlightCardData[]
      layout?: 'horizontal' | 'vertical'
      disclaimer?: string
    }
  | {
      type: 'problems'
      id?: string
      title: string
      intro: string
      items: HighlightCardData[]
    }
  | { type: 'image'; id?: string; src: string; alt: string; priority?: boolean; rounded?: boolean }
  | { type: 'imageStack'; id?: string; images: { src: string; alt: string }[] }
  | { type: 'imageGrid'; id?: string; images: { src: string; alt: string }[] }
  | {
      type: 'results'
      id?: string
      title: string
      intro: string
      items: HighlightCardData[]
      disclaimer?: string
    }

// ── Full case study data object ──
export type CaseStudyData = {
  title: string
  description: string
  role: string
  goal: string
  externalHref?: string
  sections: CaseStudySection[]
  sectionTree: SectionTreeItem[]
}

// ── Project card (home page) ──
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
