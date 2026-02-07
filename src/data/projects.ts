import { type ReactNode } from 'react'
import danone from '../assets/lottie/danoneNorthAmerica.json'
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
}

// ── Project card (home page) ──
export interface Project {
  slug: string
  title: string
  description: string
  hoverLottie?: object
}

export const projects: Project[] = [
  {
    slug: 'danone-north-america',
    title: 'Danone North America',
    description: 'Revitalizing the Danone NorAm digital presence by renewing its design language and migrating their institutional portal to the Adobe Experience Manager platform.',
    hoverLottie: danone,
  },
  {
    slug: 'gskpromx',
    title: 'GSK Pro México',
    description: "Redesigning GSK México's portal with a scalable template system and personalized content architecture tailored to medical specialties",
  },
  {
    slug: 'vendd-web',
    title: 'Vendd Web',
    description: "Establishing Vendd's product design foundation as solo designer, building and scaling a unified design system across web and mobile platforms"},
]
