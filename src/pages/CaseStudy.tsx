import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import SectionTree from '../components/SectionTree'
import { projects, type CaseStudySection } from '../data/projects'
import { getCaseStudy } from '../data/case-studies'

import CaseNavBar from '../components/case-study/CaseNavBar'
import CaseImage from '../components/case-study/CaseImage'
import ImageStack from '../components/case-study/ImageStack'
import ImageGrid from '../components/case-study/ImageGrid'
import MetricsRow from '../components/case-study/MetricsRow'

// ── Section renderer ──────────────────────────────────────────────

function renderSection(section: CaseStudySection, index: number) {
  const sectionId = section.id

  switch (section.type) {
    case 'text':
      return (
        <section
          key={`text-${index}`}
          id={sectionId}
          className={sectionId ? 'scroll-mt-24' : undefined}
        >
          {section.title && (
            <h2 className="text-body-15-medium font-semibold text-[#0c0a09] mb-2">
              {section.title}
            </h2>
          )}
          <div className="text-body-15-regular font-medium text-[#57534d] space-y-4 [&_p]:leading-[24px]">
            {section.body}
          </div>
        </section>
      )

    case 'metrics':
      return (
        <section
          key={`metrics-${index}`}
          id={sectionId}
          className={[sectionId ? 'scroll-mt-24' : '', 'space-y-2']
            .filter(Boolean)
            .join(' ')}
        >
          {section.label && (
            <p className="text-body-15-medium font-semibold text-[#0c0a09]">
              {section.label}
            </p>
          )}
          <MetricsRow
            items={section.items}
            layout={section.layout}
            disclaimer={section.disclaimer}
          />
        </section>
      )

    case 'image':
      return (
        <div
          key={`image-${index}`}
          id={sectionId}
          className={sectionId ? 'scroll-mt-24' : undefined}
        >
          <CaseImage
            src={section.src}
            alt={section.alt}
            priority={section.priority}
            rounded={section.rounded}
          />
        </div>
      )

    case 'imageStack':
      return (
        <div
          key={`stack-${index}`}
          id={sectionId}
          className={sectionId ? 'scroll-mt-24' : undefined}
        >
          <ImageStack images={section.images} />
        </div>
      )

    case 'imageGrid':
      return (
        <div
          key={`grid-${index}`}
          id={sectionId}
          className={sectionId ? 'scroll-mt-24' : undefined}
        >
          <ImageGrid images={section.images} />
        </div>
      )

    case 'problems':
      return (
        <section
          key={`problems-${index}`}
          id={sectionId}
          className={[sectionId ? 'scroll-mt-24' : '', 'space-y-2']
            .filter(Boolean)
            .join(' ')}
        >
          <h2 className="text-body-15-medium font-semibold text-[#0c0a09]">
            {section.title}
          </h2>
          <p className="text-body-15-regular font-medium text-[#57534d] leading-[24px]">
            {section.intro}
          </p>
          <MetricsRow items={section.items} layout="vertical" />
        </section>
      )

    case 'results':
      return (
        <section
          key={`results-${index}`}
          id={sectionId}
          className={[sectionId ? 'scroll-mt-24' : '', 'space-y-6']
            .filter(Boolean)
            .join(' ')}
        >
          <h2 className="text-body-18-medium font-semibold text-[#0c0a09]">
            {section.title}
          </h2>
          <div className="space-y-2">
            <p className="text-body-15-regular font-medium text-[#57534d] leading-[24px]">
              {section.intro}
            </p>
            <MetricsRow
              items={section.items}
              layout="vertical"
              disclaimer={section.disclaimer}
            />
          </div>
        </section>
      )

    default:
      return null
  }
}

// ── Page ──────────────────────────────────────────────────────────

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const caseStudy = slug ? getCaseStudy(slug) : undefined

  useEffect(() => {
    const title = caseStudy?.title ?? project?.title ?? slug
    document.title = `${title} - Maycon Douglas`
    return () => {
      document.title = 'Maycon Douglas - Product Designer'
    }
  }, [caseStudy?.title, project?.title, slug])

  // ── No case study data yet — show placeholder ──
  if (!caseStudy) {
    return (
      <Wrapper>
        <nav aria-label="Breadcrumb" className="mb-4">
          <Link to="/" className="inline-block text-sm">
            &larr; Voltar para o in&iacute;cio
          </Link>
        </nav>
        <main id="main-content">
          <h1 className="text-subheading-24-medium font-semibold mb-4">
            {project?.title ?? slug}
          </h1>
          <p className="text-secondary">Content coming soon&hellip;</p>
        </main>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <CaseNavBar externalHref={caseStudy.externalHref} />

      <main id="main-content">
        {/* ── Header ── */}
        <header className="max-w-[468px] mx-auto space-y-2 mb-10">
          <h1 className="text-subheading-24-medium font-semibold text-[#0c0a09]">
            {caseStudy.title}
          </h1>
          <p className="text-body-16-regular font-medium text-[#57534d] leading-[24px]">
            {caseStudy.description}
          </p>
          <div className="text-body-15-regular font-medium text-[#57534d] leading-[24px]">
            <p>
              <span className="font-semibold text-[#0c0a09]">My role</span>
              <br />
              {caseStudy.role}
            </p>
          </div>
          <div className="text-body-15-regular font-medium text-[#57534d] leading-[24px]">
            <p>
              <span className="font-semibold text-[#0c0a09]">Core Goal</span>
              <br />
              {caseStudy.goal}
            </p>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="flex flex-col gap-10 md:flex-row">
          <aside className="hidden md:block md:w-48 md:shrink-0 sticky top-8 self-start">
            <SectionTree items={caseStudy.sectionTree} />
          </aside>

          <div className="flex-1 min-w-0 space-y-10 max-w-[468px] mx-auto md:mx-0 md:max-w-none">
            {caseStudy.sections.map((section, i) => renderSection(section, i))}
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default CaseStudy
