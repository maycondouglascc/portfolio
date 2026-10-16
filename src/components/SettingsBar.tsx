import LanguageSelector from "./LanguageSelector"
import { useLanguage } from "../context/LanguageContext"

/**
 * Top bar with language selector. Uses project colors (zinc) and typography.
 */
export default function SettingsBar() {
  const { t } = useLanguage()

  return (
    <div
      className="inline-flex items-center rounded-md px-3 py-2 mt-1 bg-zinc-100 dark:bg-zinc-900 sm:mt-5"
      role="group"
      aria-label={t("settings.label")}
    >
      <LanguageSelector embedded />
    </div>
  )
}
