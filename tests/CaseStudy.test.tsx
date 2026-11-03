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

  it("renders the Danone case study", () => {
    renderCaseStudy("/projects/danone-north-america")
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(document.title).toContain("Danone")
  })

  it("renders fallback for unknown project slug", () => {
    renderCaseStudy("/projects/non-existent-slug")

    expect(screen.getByText("non-existent-slug")).toBeInTheDocument()
  })
})
