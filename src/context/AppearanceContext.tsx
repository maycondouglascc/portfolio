import { createContext, useCallback, useContext, useEffect, useState } from "react"

const COLOR_PALETTES = ["studio", "tide", "moss", "clay", "iris"] as const

export type ColorPalette = (typeof COLOR_PALETTES)[number]

interface AppearanceContextValue {
  palette: ColorPalette
  randomizePalette: () => void
}

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined)
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

function applySystemTheme(isDark: boolean) {
  const root = document.documentElement
  root.classList.toggle("dark", isDark)
  root.style.colorScheme = isDark ? "dark" : "light"
  syncBrowserThemeColor()
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
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
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => applySystemTheme(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.palette = palette
    syncBrowserThemeColor()
  }, [palette])

  return (
    <AppearanceContext.Provider value={{ palette, randomizePalette }}>
      {children}
    </AppearanceContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColorPalette() {
  const context = useContext(AppearanceContext)
  if (!context) {
    throw new Error("useColorPalette must be used within an AppearanceProvider")
  }
  return context
}
