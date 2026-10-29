import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import CaseStudy from "../src/pages/CaseStudy"
import { LanguageProvider } from "../src/context/LanguageContext"
import { AppearanceProvider } from "../src/context/AppearanceContext"
import { ViewModeProvider } from "../src/context/ViewModeContext"

function renderCaseStudy(initialEntry: string) {
  return render(
    <LanguageProvider>
      <AppearanceProvider>
        <ViewModeProvider>
          <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
              <Route path="/projects/:slug" element={<CaseStudy />} />
            </Routes>
          </MemoryRouter>
        </ViewModeProvider>
      </AppearanceProvider>
    </LanguageProvider>
  )
}

describe("CaseStudy Page & NextCaseCard", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.title = ""
  })

  it("renders case study details for thrivent-fp", () => {
    renderCaseStudy("/projects/thrivent-fp")

    expect(screen.getByRole("heading", { level: 1, name: "Thrivent Design System Foundation" })).toBeInTheDocument()
    expect(document.title).toContain("Thrivent Design System Foundation")
  })

  it("renders NextCaseCard at the bottom with next project link and CTA", () => {
    renderCaseStudy("/projects/thrivent-fp")

    // In sequence (thrivent -> danone -> gskpromx), next after thrivent-fp is danone-north-america
    const nextHeading = screen.getByRole("heading", { level: 3, name: "Danone North America" })
    expect(nextHeading).toBeInTheDocument()

    const nextLink = nextHeading.closest("a")
    expect(nextLink).toHaveAttribute("href", "/projects/danone-north-america")
  })

  it("renders fallback for unknown project slug", () => {
    renderCaseStudy("/projects/non-existent-slug")

    expect(screen.getByText("non-existent-slug")).toBeInTheDocument()
  })
})
