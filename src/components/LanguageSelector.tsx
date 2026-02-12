import { useLanguage, type Language } from "../context/LanguageContext"

const options: { value: Language; shortLabelKey: "language.english" | "language.portuguese"; longLabelKey: "language.englishLong" | "language.portugueseLong" }[] = [
  { value: "en", shortLabelKey: "language.english", longLabelKey: "language.englishLong" },
  { value: "pt", shortLabelKey: "language.portuguese", longLabelKey: "language.portugueseLong" },
]

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      role="radiogroup"
      aria-label={t("language.selectorLabel")}
      className="inline-flex items-center gap-0.5 rounded-full border border-zinc-200 bg-zinc-200/50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50"
    >
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
            className={`min-h-6 min-w-6 rounded-full px-2 py-1 text-caption-12-regular font-medium transition-colors duration-200 ${
              isActive
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {shortLabel}
          </button>
        )
      })}
    </div>
  )
}
