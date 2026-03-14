import { startTransition, useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronUp } from "react-feather"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import Wrapper from "../components/Wrapper"
import CaseNavBar from "../components/case-study/CaseNavBar"
import { CaseCard } from "../components/CaseCard"
import Button from "../components/Button"
import { TransitionChild } from "../components/PageTransition"
import { useLanguage } from "../context/LanguageContext"
import { mdxComponents } from "../lib/mdx-components"
import { getCaseStudy, getProjects, type CaseStudy as CaseStudyContent, type Project } from "../lib/tina"

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { language, t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [caseStudy, setCaseStudy] = useState<CaseStudyContent | null>(null)
  const introRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const [projectsData, caseStudyData] = await Promise.all([
        getProjects(language),
        slug ? getCaseStudy(slug, language) : Promise.resolve(null),
      ])

      if (cancelled) return
      startTransition(() => {
        setProjects(projectsData)
        setCaseStudy(caseStudyData)
      })
    }

    load().catch(() => {
    })

    return () => {
      cancelled = true
    }
  }, [language, slug])

  const project = projects.find((item) => item.slug === slug)

  const handleScrollTop = () => {
    if (typeof window === "undefined") return
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  useEffect(() => {
    const title = caseStudy?.title ?? project?.title ?? slug
    if (title) {
      document.title = `${title} - ${t("meta.caseTitleSuffix")}`
    }
    return () => {
      document.title = t("meta.defaultTitle")
    }
  }, [caseStudy?.title, project?.title, slug, t])

  if (!caseStudy) {
    return (
      <Wrapper>
        <TransitionChild index={0}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <Link to="/" className="inline-block text-sm">
              {`← ${t("app.backToHome")}`}
            </Link>
          </nav>
        </TransitionChild>
        <TransitionChild index={1}>
          <main id="main-content">
            <h1 className="text-subheading-24-medium font-semibold mb-4">
              {project?.title ?? slug}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t("caseStudy.contentComingSoon")}
            </p>
          </main>
        </TransitionChild>
      </Wrapper>
    )
  }

  const relatedProjects = projects.filter(
    (item) => item.slug !== slug && item.hasCaseStudy
  )

  return (
    <Wrapper>
      <TransitionChild index={0}>
        <div className="max-w-[720px] mx-auto">
          <CaseNavBar
            externalHref={caseStudy.externalHref ? caseStudy.externalHref : undefined}
          />
        </div>
      </TransitionChild>

      <main id="main-content" lang={language}>
        <TransitionChild index={1}>
          <header ref={introRef} className="max-w-[720px] mx-auto space-y-2 mb-10">
            <h1 className="text-subheading-24-medium font-semibold text-zinc-900 dark:text-zinc-100">
              {caseStudy.title}
            </h1>
            <p className="text-body-15-regular leading-[24px] text-zinc-600 dark:text-zinc-400">
              {caseStudy.description}
            </p>
            <div>
              <h3 className="text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100">
                {t("caseStudy.myRole")}
              </h3>
              <p className="mt-1 text-body-15-regular font-normal text-zinc-600 dark:text-zinc-400">
                {caseStudy.role}
              </p>
            </div>
            <div>
              <h3 className="text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100">
                {t("caseStudy.coreGoal")}
              </h3>
              <p className="mt-1 text-body-15-regular font-normal text-zinc-600 dark:text-zinc-400">
                {caseStudy.goal}
              </p>
            </div>
          </header>
        </TransitionChild>

        <TransitionChild index={2}>
          <div className="flex-1 min-w-0">
            <TinaMarkdown content={caseStudy.body} components={mdxComponents} />
          </div>
        </TransitionChild>

        <TransitionChild index={3}>
          <div className="max-w-[720px] mx-auto">
            <Button
              onClick={handleScrollTop}
              variant="icon"
              className="mt-4"
              aria-label={t("caseStudy.scrollTop")}
            >
              <ChevronUp size={16} strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        </TransitionChild>

        {!caseStudy.hideOtherProjects && relatedProjects.length > 0 && (
          <>
            <TransitionChild index={4}>
              <hr className="mx-auto mb-0 mt-16 max-w-[720px] border-0 border-t border-zinc-200 dark:border-zinc-800" />
            </TransitionChild>

            <TransitionChild index={5}>
              <section className="flex flex-col gap-4 max-w-[720px] mx-auto mt-16">
                <h2 className="text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100">
                  {t("caseStudy.seeOtherProjects")}
                </h2>
                <ul className="flex flex-col gap-2">
                  {relatedProjects.map((item) => (
                    <li key={item.slug} className="min-w-0">
                      <CaseCard
                        href={`/projects/${item.slug}`}
                        thumbnail={item.thumbnail}
                        thumbnailAlt={item.title}
                        title={item.title}
                        description={item.description}
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
