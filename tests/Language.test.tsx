import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { LanguageProvider, useLanguage } from "../src/context/LanguageContext"

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="greeting">{t("intro.greeting")}</span>
      <span data-testid="next-case-eyebrow">{t("caseStudy.nextCaseEyebrow")}</span>
      <button onClick={() => setLanguage("en")}>Set EN</button>
      <button onClick={() => setLanguage("pt")}>Set PT</button>
    </div>
  )
}

describe("LanguageContext & document.documentElement.lang", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = "en"
  })

  it("renders with default language and sets document.documentElement.lang", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    const lang = screen.getByTestId("current-lang").textContent
    expect(lang === "en" || lang === "pt").toBe(true)
    expect(document.documentElement.lang).toBe(lang === "pt" ? "pt-BR" : "en")
  })

  it("updates document.documentElement.lang dynamically when language switches", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    fireEvent.click(screen.getByText("Set PT"))
    expect(screen.getByTestId("current-lang").textContent).toBe("pt")
    expect(document.documentElement.lang).toBe("pt-BR")
    expect(window.localStorage.getItem("language")).toBe("pt")
    expect(screen.getByTestId("next-case-eyebrow").textContent).toBe("Próximo estudo de caso")

    fireEvent.click(screen.getByText("Set EN"))
    expect(screen.getByTestId("current-lang").textContent).toBe("en")
    expect(document.documentElement.lang).toBe("en")
    expect(window.localStorage.getItem("language")).toBe("en")
    expect(screen.getByTestId("next-case-eyebrow").textContent).toBe("Next case study")
  })
})
