import { useLanguage, type Language } from "../context/LanguageContext"

const options: { value: Language; shortLabelKey: "language.english" | "language.portuguese"; longLabelKey: "language.englishLong" | "language.portugueseLong" }[] = [
  { value: "en", shortLabelKey: "language.english", longLabelKey: "language.englishLong" },
  { value: "pt", shortLabelKey: "language.portuguese", longLabelKey: "language.portugueseLong" },
]

interface LanguageSelectorProps {
  /** When true, omit outer wrapper (border/padding) for use inside SettingsBar */
  embedded?: boolean
}

export default function LanguageSelector({ embedded }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()

  const content = (
    <>
      {options.map(({ value, shortLabelKey, longLabelKey }) => {
        const isActive = language === value
        const shortLabel = t(shortLabelKey)
        const longLabel = t(longLabelKey)
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={longLabel}
            title={longLabel}
            onClick={() => setLanguage(value)}
            className={`h-8 w-8 rounded-md text-caption-12-regular font-medium transition-colors duration-200 ${
              isActive
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {shortLabel}
          </button>
        )
      })}
    </>
  )

  if (embedded) {
    return (
      <div
        role="radiogroup"
        aria-label={t("language.selectorLabel")}
        className="inline-flex items-center gap-0.5"
      >
        {content}
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={t("language.selectorLabel")}
    >
      {content}
    </div>
  )
}
