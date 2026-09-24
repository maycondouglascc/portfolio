import LanguageSelector from "./LanguageSelector"
import ColorPaletteButton from "./ColorPaletteButton"
import { useLanguage } from "../context/LanguageContext"

/**
 * Single container for language and palette selectors, matching a unified
 * control group pattern. Uses project colors (zinc) and typography.
 */
export default function SettingsBar() {
  const { t } = useLanguage()

  return (
    <div
      className="palette-transition inline-flex items-center gap-2 rounded-md px-3 py-2 mt-1 bg-zinc-100 dark:bg-zinc-900 sm:mt-5"
      role="group"
      aria-label={t("settings.label")}
    >
      <LanguageSelector embedded />
      <span
        className="mx-0.1 h-1 w-px shrink-0 bg-zinc-300 dark:bg-zinc-600"
        aria-hidden
      />
      <ColorPaletteButton />
    </div>
  )
}
