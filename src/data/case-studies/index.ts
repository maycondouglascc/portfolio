import type { CaseStudyData } from '../projects'
import type { Language } from '../../context/LanguageContext'
import danoneStudy from './danone'
import gskpromxStudy from './gskpromx'
import thriventStudy from './thrivent'

type CaseStudyFactory = (language: Language) => CaseStudyData

const caseStudies: Record<string, CaseStudyFactory> = {
  'danone-north-america': danoneStudy,
  'gskpromx': gskpromxStudy,
  'thrivent-fp': thriventStudy,
}

export const caseStudySlugs = new Set<string>(Object.keys(caseStudies))

export function getCaseStudy(slug: string, language: Language): CaseStudyData | undefined {
  return caseStudies[slug]?.(language)
}
