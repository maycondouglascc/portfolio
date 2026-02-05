import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import SectionTree, { SectionTreeItem } from '../components/SectionTree'
import { projects } from '../data/projects'

const sectionTree: SectionTreeItem[] = [
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'approach',
    label: 'Approach',
    children: [
      { id: 'research', label: 'Research' },
      { id: 'design', label: 'Design' },
      { id: 'build', label: 'Build' },
    ],
  },
  {
    id: 'outcomes',
    label: 'Outcomes',
  },
]

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    const title = project?.title ?? slug
    document.title = `${title} - Maycon Douglas`
    return () => {
      document.title = 'Maycon Douglas - Product Designer'
    }
  }, [project?.title, slug])

  return (
    <Wrapper wide>
      <nav aria-label="Breadcrumb" className="mb-4">
        <Link to="/" className="inline-block text-sm">
          &larr; Voltar para o in&iacute;cio
        </Link>
      </nav>
      <main id="main-content">
        <h1 className="text-2xl font-medium mb-8">
          {project?.title ?? slug}
        </h1>
        <div className="flex flex-col gap-10 md:flex-row">
          <aside className="md:w-56 md:shrink-0">
            <SectionTree items={sectionTree} />
          </aside>
          <div className="flex-1 min-w-0 space-y-12">
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-lg font-medium mb-3">Overview</h2>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>

            <section id="approach" className="scroll-mt-24">
              <h2 className="text-lg font-medium mb-3">Approach</h2>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>

            <section id="research" className="scroll-mt-24">
              <h3 className="text-base font-medium mb-2">Research</h3>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>

            <section id="design" className="scroll-mt-24">
              <h3 className="text-base font-medium mb-2">Design</h3>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>

            <section id="build" className="scroll-mt-24">
              <h3 className="text-base font-medium mb-2">Build</h3>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>

            <section id="outcomes" className="scroll-mt-24">
              <h2 className="text-lg font-medium mb-3">Outcomes</h2>
              <p className="text-secondary">
                Content coming soon&hellip;
              </p>
            </section>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default CaseStudy
