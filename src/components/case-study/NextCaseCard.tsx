import { Link } from "react-router-dom"
import { ArrowRight } from "react-feather"
import { useLanguage } from "../../context/LanguageContext"
import { getProjects } from "../../data/projects"
import { caseStudySlugs } from "../../data/case-studies"

interface NextCaseCardProps {
  currentSlug: string
}

export function NextCaseCard({ currentSlug }: NextCaseCardProps) {
  const { language, t } = useLanguage()
  const projects = getProjects(language)
  const available = projects.filter((p) => caseStudySlugs.has(p.slug))

  if (available.length <= 1) return null

  const currentIndex = available.findIndex((p) => p.slug === currentSlug)
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % available.length : 0
  const nextProject = available[nextIndex]

  if (!nextProject) return null

  return (
    <section className="mx-auto mt-16 max-w-[1200px]" aria-label={t("caseStudy.nextCaseEyebrow")}>
      <div className="mb-4">
        <span className="text-body-14-medium font-medium uppercase tracking-wider text-accent">
          {t("caseStudy.nextCaseEyebrow")}
        </span>
      </div>

      <Link
        to={`/projects/${nextProject.slug}`}
        className="group relative flex flex-col md:flex-row overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
      >
        {/* Thumbnail Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 md:w-1/2 dark:bg-zinc-800">
          <img
            src={nextProject.thumbnail}
            alt={nextProject.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Info & CTA */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-heading-28-medium font-medium text-zinc-900 transition-colors group-hover:text-accent dark:text-zinc-100 dark:group-hover:text-accent">
              {nextProject.title}
            </h3>
            <p className="text-body-15-medium text-zinc-600 line-clamp-3 dark:text-zinc-400">
              {nextProject.description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-body-15-medium font-medium text-accent">
            <span>{t("caseStudy.readNextCase")}</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </div>
        </div>
      </Link>
    </section>
  )
}
