import { CaseCard } from './CaseCard'
import { projects } from '../data/projects'
import { caseStudySlugs } from '../data/case-studies'

function ProjectsGrid() {
  const withCaseStudy = projects.filter((p) => caseStudySlugs.has(p.slug))
  const caseStudySoon = projects.filter((p) => !caseStudySlugs.has(p.slug))

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-15-medium font-medium text-primary">
        Projetos
      </h2>
      <ul className="flex flex-col gap-2">
        {withCaseStudy.map((project) => (
          <li key={project.slug} className="min-w-0">
            <CaseCard
              href={`/projects/${project.slug}`}
              imageAlt={project.title}
              title={project.title}
              description={project.description}
              hoverLottie={project.hoverLottie}
            />
          </li>
        ))}
      </ul>
      {caseStudySoon.length > 0 && (
        <>
          <h2 className="text-body-15-medium font-medium text-secondary">
            Case study soon
          </h2>
          <ul className="flex flex-col gap-2">
            {caseStudySoon.map((project) => (
              <li key={project.slug} className="min-w-0">
                <CaseCard
                  href={`/projects/${project.slug}`}
                  imageAlt={project.title}
                  title={project.title}
                  description={project.description}
                  hoverLottie={project.hoverLottie}
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
