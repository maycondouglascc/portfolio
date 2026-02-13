import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronUp } from 'react-feather'
import Wrapper from '../components/Wrapper'
import { getProjects, type CaseStudySection } from '../data/projects'
import { caseStudySlugs, getCaseStudy } from '../data/case-studies'
import CaseNavBar from '../components/case-study/CaseNavBar'
import CaseImage from '../components/case-study/CaseImage'
import ImageStack from '../components/case-study/ImageStack'
import ImageGrid from '../components/case-study/ImageGrid'
import MetricsRow from '../components/case-study/MetricsRow'
import { CaseCard } from '../components/CaseCard'
import Button from '../components/Button'
import { TransitionChild } from '../components/PageTransition'
import { useLanguage } from '../context/LanguageContext'

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
            <h2 className="mb-2 text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h2>
          )}
          <div className="space-y-4 text-body-15-regular font-medium text-zinc-600 dark:text-zinc-400 [&_p]:leading-[24px]">
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
            <p className="text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100">
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
          <h2 className="text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100">
            {section.title}
          </h2>
          <p className="text-body-15-regular font-medium leading-[24px] text-zinc-600 dark:text-zinc-400">
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
          <h2 className="text-body-18-medium font-semibold text-zinc-900 dark:text-zinc-100">
            {section.title}
          </h2>
          <div className="space-y-2">
            <p className="text-body-15-regular font-medium leading-[24px] text-zinc-600 dark:text-zinc-400">
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
  const { language, t } = useLanguage()
  const projects = getProjects(language)
  const project = projects.find((p) => p.slug === slug)
  const caseStudy = slug ? getCaseStudy(slug, language) : undefined
  const introRef = useRef<HTMLElement | null>(null)

  const handleScrollTop = () => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  useEffect(() => {
    const title = caseStudy?.title ?? project?.title ?? slug
    document.title = `${title} - ${t('meta.caseTitleSuffix')}`
    return () => {
      document.title = t('meta.defaultTitle')
    }
  }, [caseStudy?.title, project?.title, slug, t])



  // ── No case study data yet — show placeholder ──
  if (!caseStudy) {
    return (
      <Wrapper>
        <TransitionChild index={0}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <Link to="/" className="inline-block text-sm">
              {`← ${t('app.backToHome')}`}
            </Link>
          </nav>
        </TransitionChild>
        <TransitionChild index={1}>
          <main id="main-content">
            <h1 className="text-subheading-24-medium font-semibold mb-4">
              {project?.title ?? slug}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">{t('caseStudy.contentComingSoon')}</p>
          </main>
        </TransitionChild>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <TransitionChild index={0}>
        <CaseNavBar externalHref={caseStudy.externalHref} />
      </TransitionChild>

      <main id="main-content" lang={language}>
      
        {/* ── Header ── */}
        <TransitionChild index={1}>
          <header
            ref={introRef}
            className="max-w-[600px] mx-auto space-y-2 mb-10"
          >
            <h1 className="text-subheading-24-medium font-semibold text-zinc-900 dark:text-zinc-100">
              {caseStudy.title}
            </h1>
            <p className="text-body-15-regular leading-[24px] text-zinc-600 dark:text-zinc-400">
              {caseStudy.description}
            </p>
            <div className="text-body-15-regular font-medium text-zinc-600 dark:text-zinc-400">
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('caseStudy.myRole')}</span>
                <br />
                {caseStudy.role}
              </p>
            </div>
            <div className="text-body-15-regular text-zinc-600 dark:text-zinc-400">
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('caseStudy.coreGoal')}</span>
                <br />
                {caseStudy.goal}
              </p>
            </div>
          </header>
        </TransitionChild>

        {/* ── Content ── */}
        <TransitionChild index={2}>
          <div className="flex-1 min-w-0 space-y-16 max-w-[600px] mx-auto">
            {caseStudy.sections.map((section, i) => renderSection(section, i))}
          </div>
        </TransitionChild>
        <TransitionChild index={3}>
          <Button
            onClick={handleScrollTop}
            variant="icon"
            className="mt-4"
            aria-label={t('caseStudy.scrollTop')}
          >
            <ChevronUp size={16} strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </TransitionChild>

        {!caseStudy.hideOtherProjects && (
          <>
            {/* ── Divider ── */}
            <TransitionChild index={4}>
              <hr className="mx-auto mb-0 mt-16 max-w-[600px] border-0 border-t border-zinc-200 dark:border-zinc-800" />
            </TransitionChild>

            {/* ── See other projects ── */}
            <TransitionChild index={5}>
              <section className="flex flex-col gap-4 max-w-[600px] mx-auto mt-16">
                <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
                  {t('caseStudy.seeOtherProjects')}
                </h2>
                <ul className="flex flex-col gap-2">
                  {projects
                    .filter((project) => project.slug !== slug)
                    .map((project) => (
                      <li key={project.slug} className="min-w-0">
                        <CaseCard
                          href={caseStudySlugs.has(project.slug) ? `/projects/${project.slug}` : undefined}
                          imageAlt={project.title}
                          title={project.title}
                          description={project.description}
                          hoverLottie={project.hoverLottie}
                        />
                      </li>
                    ))}
                </ul>
              </section>
            </TransitionChild>
          </>
        )}
      </main>
    
    </Wrapper>
  )
}

export default CaseStudy
