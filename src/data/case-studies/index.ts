import type { CaseStudyData } from '../projects'
import danoneStudy from './danone'

const caseStudies: Record<string, CaseStudyData> = {
  'danone-north-america': danoneStudy,
}

export const caseStudySlugs = new Set<string>(Object.keys(caseStudies))

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudies[slug]
}
