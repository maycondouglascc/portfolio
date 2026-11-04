import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Home from "../src/pages/Home"
import { LanguageProvider } from "../src/context/LanguageContext"
import { AppearanceProvider } from "../src/context/AppearanceContext"
import { ViewModeProvider } from "../src/context/ViewModeContext"

function renderHome() {
  return render(
    <LanguageProvider>
      <AppearanceProvider>
        <ViewModeProvider>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </ViewModeProvider>
      </AppearanceProvider>
    </LanguageProvider>
  )
}

describe("Home Page", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.title = ""
  })

  it("renders intro with avatar, greeting and resume link", () => {
    renderHome()

    expect(screen.getByRole("heading", { name: "Maycon Douglas" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByText(/designer/i).length).toBeGreaterThan(0)
  })

  it("renders projects section with case study cards", () => {
    renderHome()

    expect(screen.queryByText("Thrivent FP")).not.toBeInTheDocument()
    expect(screen.queryByText("GSK Pro Mexico")).not.toBeInTheDocument()
    expect(screen.getAllByText(/Danone/i).length).toBeGreaterThan(0)
  })

  it("updates page title and meta description via usePageSeo", () => {
    renderHome()

    expect(document.title).toContain("Maycon Douglas")
    const metaDesc = document.querySelector('meta[name="description"]')
    expect(metaDesc).not.toBeNull()
    expect(metaDesc?.getAttribute("content")).toContain("Maycon Douglas")
  })

  it("renders recommendations with updated roles and Glance external link", () => {
    renderHome()

    expect(screen.getByText("CTO na Vendd")).toBeInTheDocument()
    expect(screen.getByText("Coordenadora de Design na VML")).toBeInTheDocument()
    expect(screen.getByText("Líder de Design na VML")).toBeInTheDocument()
    expect(screen.getByText("Product Owner na VML")).toBeInTheDocument()
    expect(screen.getByText("Product Designer na VML")).toBeInTheDocument()

    const glanceLink = screen.getByRole("link", { name: /Glance/i })
    expect(glanceLink).toHaveAttribute("href", "https://glance.maycondouglas.work/")
    expect(glanceLink).toHaveAttribute("target", "_blank")
    expect(glanceLink).toHaveAttribute("rel", "noreferrer")
  })
})
