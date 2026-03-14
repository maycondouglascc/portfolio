import { useLanguage } from "../context/LanguageContext"
import type { Experience } from "../lib/tina"

type ExperienceListProps = {
  experience: Experience[]
}

function ExperienceList({ experience }: ExperienceListProps) {
  const { t } = useLanguage()

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
        {t("home.experiences")}
      </h2>
      <ul className="flex flex-col gap-3">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-body-14-medium font-medium text-zinc-600 dark:text-zinc-400">
              {item.company}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-body-14-regular font-normal text-zinc-600 dark:text-zinc-400">
              <span>{item.role}</span>
              <span className="tabular-nums">{item.period}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExperienceList
