import { Sun, Moon, Monitor } from "react-feather"
import { useTheme } from "../context/ThemeContext"
import { useLanguage } from "../context/LanguageContext"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()

  const options = [
    { value: "light" as const, icon: Sun, label: t("theme.light") },
    { value: "dark" as const, icon: Moon, label: t("theme.dark") },
    { value: "system" as const, icon: Monitor, label: t("theme.system") },
  ]

  return (
    <div
      role="radiogroup"
      aria-label={t("theme.selectorLabel")}
      className="inline-flex items-center gap-0.5 rounded-full border border-zinc-200 bg-zinc-200/50 p-1 dark:border-zinc-800 dark:bg-zinc-800/50"
    >
      {options.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={`rounded-full p-1.5 transition-colors duration-200 ${
              isActive
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <Icon size={14} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
