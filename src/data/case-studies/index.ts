import type { CaseStudyData } from '../projects'
import danoneStudy from './danone'

const caseStudies: Record<string, CaseStudyData> = {
  'danone-north-america': danoneStudy,
}

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudies[slug]
}
