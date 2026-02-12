import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { en } from "../locales/en"
import { pt } from "../locales/pt"

export type Language = "en" | "pt"

type LocaleShape = typeof en
type TranslationKey = DotPath<LocaleShape>

type DotPath<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? `${K}` | `${K}.${DotPath<T[K]>}` : `${K}`
    }[keyof T & string]
  : never

const STORAGE_KEY = "language"
const translations: Record<Language, LocaleShape> = { en, pt }

type LanguageContextValue = {
  language: Language
  setLanguage: (value: Language) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function getStoredOrDefaultLanguage(): Language {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "en" || stored === "pt") return stored
  return window.navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en"
}

function getByPath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!acc || typeof acc !== "object") return undefined
    return (acc as Record<string, unknown>)[segment]
  }, obj)
}

function interpolate(template: string, params?: Record<string, string>) {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) => params[key] ?? `{${key}}`)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredOrDefaultLanguage)

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value)
    window.localStorage.setItem(STORAGE_KEY, value)
  }, [])

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      t: (key, params) => {
        const text = getByPath(translations[language], key)
        if (typeof text === "string") return interpolate(text, params)
        return key
      },
    }
  }, [language, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
