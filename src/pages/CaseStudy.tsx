import { useParams, Link } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import SectionTree, { SectionTreeItem } from '../components/SectionTree'

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

  return (
    <Wrapper>
      <Link to="/" className="inline-block text-sm mb-4">
        ← Voltar para o início
      </Link>
      <h1 className="text-2xl font-medium mb-8">Case Study: {slug}</h1>
      <div className="flex flex-col gap-10 md:flex-row">
        <aside className="md:w-56 md:shrink-0">
          <SectionTree items={sectionTree} />
        </aside>
        <div className="flex-1 space-y-12">
          <section id="overview" className="scroll-mt-24">
            <h2 className="text-lg font-medium mb-3">Overview</h2>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>

          <section id="approach" className="scroll-mt-24">
            <h2 className="text-lg font-medium mb-3">Approach</h2>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>

          <section id="research" className="scroll-mt-24">
            <h3 className="text-base font-medium mb-2">Research</h3>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>

          <section id="design" className="scroll-mt-24">
            <h3 className="text-base font-medium mb-2">Design</h3>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>

          <section id="build" className="scroll-mt-24">
            <h3 className="text-base font-medium mb-2">Build</h3>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>

          <section id="outcomes" className="scroll-mt-24">
            <h2 className="text-lg font-medium mb-3">Outcomes</h2>
            <p className="text-secondary">
              Content coming soon...
            </p>
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

export default CaseStudy
