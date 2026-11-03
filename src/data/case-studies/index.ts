import type { CaseStudyData } from '../projects'
import type { Language } from '../../context/LanguageContext'
import danoneStudy from './danone'

type CaseStudyFactory = (language: Language) => CaseStudyData

const caseStudies: Record<string, CaseStudyFactory> = {
  'danone-north-america': danoneStudy,
}

export const caseStudySlugs = new Set<string>(Object.keys(caseStudies))

export function getCaseStudy(slug: string, language: Language): CaseStudyData | undefined {
  return caseStudies[slug]?.(language)
}
