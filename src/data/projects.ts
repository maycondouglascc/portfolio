import { type ReactNode } from 'react'
import type { StatusIconVariant } from '../components/case-study/StatusIcon'
import type { Language } from '../context/LanguageContext'

// ── View modes ──
export type ViewMode = 'visual' | 'overview'
export const VIEW_MODES: ViewMode[] = ['visual', 'overview']

// ── Card item used by metrics / problems / results ──
export type HighlightCardData = {
  variant: StatusIconVariant
  title: string
  description: string
}

// ── Discriminated union for every section type in a case study ──
export type CaseStudySection =
  | { type: 'text'; id?: string; visibility?: ViewMode[]; title?: string; body: ReactNode }
  | {
      type: 'metrics'
      id?: string
      visibility?: ViewMode[]
      label?: string
      items: HighlightCardData[]
      layout?: 'horizontal' | 'vertical'
      disclaimer?: string
    }
  | {
      type: 'problems'
      id?: string
      visibility?: ViewMode[]
      title: string
      intro: string
      items: HighlightCardData[]
    }
  | { type: 'image'; id?: string; visibility?: ViewMode[]; src: string; alt: string; priority?: boolean; rounded?: boolean }
  | { type: 'imageStack'; id?: string; visibility?: ViewMode[]; images: { src: string; alt: string }[] }
  | { type: 'imageGrid'; id?: string; visibility?: ViewMode[]; images: { src: string; alt: string }[] }
  | {
      type: 'results'
      id?: string
      visibility?: ViewMode[]
      title: string
      intro: string
      items: HighlightCardData[]
      disclaimer?: string
    }
  | {
      type: 'process'
      id?: string
      visibility?: ViewMode[]
      title?: string
      steps: ProcessStep[]
    }

export type ProcessStep = {
  label: string
  description: string
}

// ── Full case study data object ──
export type CaseStudyData = {
  title: string
  description: string
  role: string
  goal: string
  externalHref?: string
  hideOtherProjects?: boolean
  sections: CaseStudySection[]
}

// ── Project card (home page) ──
export interface Project {
  slug: string
  title: string
  description: string
  thumbnail: string
  hoverLottie?: string
}

type LocalizedText = Record<Language, string>

type LocalizedProject = {
  slug: string
  title: LocalizedText
  description: LocalizedText
  thumbnail: string
  hoverLottie?: string
}

const projectsCatalog: LocalizedProject[] = [
  {
    slug: 'thrivent-fp',
    title: {
      en: 'Thrivent FP',
      pt: 'Thrivent FP',
    },
    description: {
      en: 'Building a design system foundation from scratch for a financial portal serving investment professionals, shipped in 4 weeks.',
      pt: 'Construção da fundação do design system do zero para um portal financeiro voltado para profissionais de investimento, entregue em 4 semanas.',
    },
    thumbnail: '/files/case-thumbnails/project-thumbnail-4.png',
  },
  {
    slug: 'danone-north-america',
    title: {
      en: 'Danone North America',
      pt: 'Danone America do Norte',
    },
    description: {
      en: 'Revitalizing the Danone NorAm digital presence by renewing its design language and migrating their institutional portal to the Adobe Experience Manager platform.',
      pt: 'Revitalizacao da presenca digital da Danone NorAm com renovacao da linguagem visual e migracao do portal institucional para a plataforma Adobe Experience Manager.',
    },
    thumbnail: '/files/case-thumbnails/project-thumbnail-1.png',
    hoverLottie: 'danoneNorthAmerica',
  },
  {
    slug: 'gskpromx',
    title: {
      en: 'GSK Pro Mexico',
      pt: 'GSK Pro Mexico',
    },
    description: {
      en: "Redesigning GSK Mexico's portal with a scalable template system and personalized content architecture tailored to medical specialties",
      pt: 'Redesign do portal da GSK Mexico com um sistema de templates escalavel e arquitetura de conteudo personalizada para especialidades medicas.',
    },
    thumbnail: '/files/case-thumbnails/project-thumbnail-2.png',
  },
  {
    slug: 'vendd-web',
    title: {
      en: 'Vendd Web',
      pt: 'Vendd Web',
    },
    description: {
      en: "Establishing Vendd's product design foundation as solo designer, building and scaling a unified design system across web and mobile platforms",
      pt: 'Estruturacao da base de design de produto da Vendd como designer solo, criando e escalando um design system unificado para web e mobile.',
    },
    thumbnail: '/files/case-thumbnails/project-thumbnail-3.png',
  },
]

export function getProjects(language: Language): Project[] {
  return projectsCatalog.map((project) => ({
    slug: project.slug,
    title: project.title[language],
    description: project.description[language],
    thumbnail: project.thumbnail,
    hoverLottie: project.hoverLottie,
  }))
}
