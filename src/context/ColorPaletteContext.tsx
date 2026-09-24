import { createContext, useCallback, useContext, useEffect, useState } from "react"

const COLOR_PALETTES = ["studio", "tide", "moss", "clay", "iris"] as const

export type ColorPalette = (typeof COLOR_PALETTES)[number]

interface ColorPaletteContextValue {
  palette: ColorPalette
  randomizePalette: () => void
}

const ColorPaletteContext = createContext<ColorPaletteContextValue | undefined>(undefined)
const STORAGE_KEY = "color-palette"

function getStoredPalette(): ColorPalette {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return COLOR_PALETTES.find((palette) => palette === stored) ?? "studio"
}

function syncBrowserThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return

  const pageColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--palette-page-color")
    .trim()
  if (pageColor) meta.setAttribute("content", pageColor)
}

export function ColorPaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<ColorPalette>(getStoredPalette)

  const randomizePalette = useCallback(() => {
    const currentIndex = COLOR_PALETTES.indexOf(palette)
    const offset = 1 + Math.floor(Math.random() * (COLOR_PALETTES.length - 1))
    const nextPalette = COLOR_PALETTES[(currentIndex + offset) % COLOR_PALETTES.length]

    window.localStorage.setItem(STORAGE_KEY, nextPalette)
    document.documentElement.dataset.palette = nextPalette
    setPalette(nextPalette)
  }, [palette])

  useEffect(() => {
    document.documentElement.dataset.palette = palette
    syncBrowserThemeColor()
  }, [palette])

  return (
    <ColorPaletteContext.Provider value={{ palette, randomizePalette }}>
      {children}
    </ColorPaletteContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorPalette() {
  const context = useContext(ColorPaletteContext)
  if (!context) {
    throw new Error("useColorPalette must be used within a ColorPaletteProvider")
  }
  return context
}
