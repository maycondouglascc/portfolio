import { CaseCard } from './CaseCard'
import { getProjects } from '../data/projects'
import { caseStudySlugs } from '../data/case-studies'
import { useLanguage } from '../context/LanguageContext'

function ProjectsGrid() {
  const { language, t } = useLanguage()
  const projects = getProjects(language)
  const withCaseStudy = projects.filter((p) => caseStudySlugs.has(p.slug))
  const caseStudySoon = projects.filter((p) => !caseStudySlugs.has(p.slug))

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
        {t('home.projects')}
      </h2>
      <ul className="flex flex-col gap-12 mb-8">
        {withCaseStudy.map((project) => (
          <li key={project.slug} className="min-w-0">
            <CaseCard
              href={`/projects/${project.slug}`}
              thumbnail={project.thumbnail}
              thumbnailAlt={project.title}
              title={project.title}
              description={project.description}
            />
          </li>
        ))}
      </ul>
      {caseStudySoon.length > 0 && (
        <>
          <h2 className="text-body-15-medium font-medium text-zinc-600 dark:text-zinc-400">
            {t('home.caseStudySoon')}
          </h2>
          <ul className="flex flex-col gap-12">
            {caseStudySoon.map((project) => (
              <li key={project.slug} className="min-w-0">
                <CaseCard
                  thumbnail={project.thumbnail}
                  thumbnailAlt={project.title}
                  title={project.title}
                  description={project.description}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default ProjectsGrid
