import { useLanguage } from "../context/LanguageContext"
import type { HomeContent } from "../lib/tina"

type IntroProps = {
  content?: HomeContent | null
}

function Intro({ content }: IntroProps) {
  const { language, t } = useLanguage()
  const greeting = content?.greeting ?? t("intro.greeting")
  const resumeLabel = content?.resumeLabel ?? t("intro.resume")
  const profilePic = content?.profilePic || "/files/profilepic.webp"
  const resumePdf =
    content?.resumePdf ||
    (language === "pt"
      ? "/files/resume/curriculomaycondouglas.pdf"
      : "/files/resume/maycondouglasresume.pdf")

  return (
    <section className="flex flex-col gap-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <img
        className="rounded object-cover"
        src={profilePic}
        alt="Maycon's profile picture"
        width={80}
        height={80}
        fetchPriority="high"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
          {`👋🏼 ${greeting}`}
        </h1>

        {content?.bioHtml ? (
          <p
            className="text-body-15-medium font-normal text-zinc-600 dark:text-zinc-400 [&_a]:font-medium [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-zinc-100"
            dangerouslySetInnerHTML={{ __html: content.bioHtml }}
          />
        ) : (
          <p className="text-body-15-medium font-normal text-zinc-600 dark:text-zinc-400">
            {t("intro.bio")}
          </p>
        )}

        <a
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100"
        >
          {resumeLabel}
        </a>
      </div>
    </section>
  )
}

export default Intro
