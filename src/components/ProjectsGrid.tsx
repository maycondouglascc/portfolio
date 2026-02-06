import { CaseCard } from './CaseCard'
import { projects } from '../data/projects'

function ProjectsGrid() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-15-medium font-medium text-primary">
        Projetos
      </h2>
      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li key={project.slug} className="min-w-0">
            <CaseCard
              href={`/projects/${project.slug}`}
              imageAlt={project.title}
              title={project.title}
              description={project.description}
              thumbnailHeight={project.thumbnailHeight}
              hoverLottie={project.hoverLottie}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectsGrid
