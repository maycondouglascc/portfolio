import { CaseCard } from './CaseCard'
import { projects } from '../data/projects'

function ProjectsGrid() {
  return (
    <>
      <h2 className="text-[15px] font-medium text-secondary mb-4">Projects</h2>
      <ul className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <li key={project.slug} className="flex-1 min-w-0">
            <CaseCard
              href={`/projects/${project.slug}`}
              imageSrc={project.thumbnail}
              imageAlt={project.title}
              title={project.title}
              description={project.description}
              thumbnailHeight={project.thumbnailHeight}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProjectsGrid
