import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"

/**
 * Single container for language and theme selectors, matching a unified
 * control group pattern. Uses project colors (zinc) and typography.
 */
export default function SettingsBar() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 mt-1 sm:mt-5 bg-zinc-100 dark:bg-zinc-900"
      role="group"
      aria-label="Settings"
    >
      <LanguageSelector embedded />
      <span
        className="mx-0.1 h-1 w-px shrink-0 bg-zinc-300 dark:bg-zinc-600"
        aria-hidden
      />
      <ThemeToggle embedded />
    </div>
  )
}
