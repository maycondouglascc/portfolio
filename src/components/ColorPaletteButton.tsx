import { Droplet } from "react-feather"
import { useColorPalette, type ColorPalette } from "../context/ColorPaletteContext"
import { useLanguage } from "../context/LanguageContext"

const paletteNameKeys: Record<
  ColorPalette,
  | "palette.names.studio"
  | "palette.names.tide"
  | "palette.names.moss"
  | "palette.names.clay"
  | "palette.names.iris"
> = {
  studio: "palette.names.studio",
  tide: "palette.names.tide",
  moss: "palette.names.moss",
  clay: "palette.names.clay",
  iris: "palette.names.iris",
}

export default function ColorPaletteButton() {
  const { palette, randomizePalette } = useColorPalette()
  const { t } = useLanguage()
  const label = t("palette.generate", { name: t(paletteNameKeys[palette]) })

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={randomizePalette}
      className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-zinc-600 transition-colors duration-200 hover:bg-zinc-200/70 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
    >
      <Droplet size={14} strokeWidth={2} aria-hidden="true" />
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
        <span className="h-1.5 w-1.5 rounded-sm bg-zinc-400 dark:bg-zinc-600" />
        <span className="h-1.5 w-1.5 rounded-sm bg-accent dark:bg-accent" />
        <span className="h-1.5 w-1.5 rounded-sm bg-zinc-900 dark:bg-zinc-100" />
      </span>
    </button>
  )
}
