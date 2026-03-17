import type { CaseStudySection, ViewMode } from "../data/projects"

export function filterSectionsByMode(
  sections: CaseStudySection[],
  mode: ViewMode
): CaseStudySection[] {
  return sections.filter(
    (section) => !section.visibility || section.visibility.includes(mode)
  )
}
