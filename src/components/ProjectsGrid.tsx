import { CaseCard } from "./CaseCard"
import { useLanguage } from "../context/LanguageContext"
import type { Project } from "../lib/tina"

type ProjectsGridProps = {
  projects: Project[]
}

function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { t } = useLanguage()
  const withCaseStudy = projects.filter((project) => project.hasCaseStudy)
  const caseStudySoon = projects.filter((project) => !project.hasCaseStudy)

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
        {t("home.projects")}
      </h2>
      <ul className="flex flex-col gap-2">
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
            {t("home.caseStudySoon")}
          </h2>
          <ul className="flex flex-col gap-2">
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
