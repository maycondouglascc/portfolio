import { useEffect } from "react"

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

export function SystemThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => applySystemTheme(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return <>{children}</>
}
