import { createContext, useCallback, useContext, useState } from "react"
import type { ViewMode } from "../data/projects"

interface ViewModeContextValue {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined)

const STORAGE_KEY = "viewMode"

function getStoredOrDefault(): ViewMode {
  if (typeof window === "undefined") return "overview"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "visual" || stored === "overview" || stored === "detailed") return stored
  return "overview"
}

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>(getStoredOrDefault)

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode)
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [])

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useViewMode() {
  const context = useContext(ViewModeContext)
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider")
  }
  return context
}
