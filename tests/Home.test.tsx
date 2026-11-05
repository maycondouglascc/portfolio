import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
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

    expect(screen.getByText("CTO at Vendd")).toBeInTheDocument()
    expect(screen.getByText("Design Coordinator at VML")).toBeInTheDocument()
    expect(screen.getByText("Design Lead at VML")).toBeInTheDocument()
    expect(screen.getByText("Product Owner at VML")).toBeInTheDocument()
    expect(screen.getByText("Product Designer at VML")).toBeInTheDocument()

    const glanceLink = screen.getByRole("link", { name: /Glance/i })
    expect(glanceLink).toHaveAttribute("href", "https://glance.maycondouglas.work/")
    expect(glanceLink).toHaveAttribute("target", "_blank")
    expect(glanceLink).toHaveAttribute("rel", "noreferrer")
  })

  it("renders updated experience with BASE Digital and resume download link", () => {
    renderHome()

    expect(screen.getByText("BASE Digital")).toBeInTheDocument()
    expect(screen.getByText("WPP Enterprise Solutions")).toBeInTheDocument()
    expect(screen.getByText(/Interfaces and systems for global brands/)).toBeInTheDocument()
    expect(screen.getByText(/Visual UI design and high-fidelity prototyping/)).toBeInTheDocument()
    expect(screen.getByText(/Claude, Codex, Motion, Tailwind CSS/)).toBeInTheDocument()
    expect(screen.getByText(/Figma, Suite Adobe/)).toBeInTheDocument()

    const resumeLink = screen.getByRole("link", { name: /resume/i })
    expect(resumeLink).toBeInTheDocument()
    expect(resumeLink).toHaveAttribute("target", "_blank")
    expect(resumeLink).toHaveAttribute("download", "maycon-douglas-resume.pdf")
  })

  it("toggles language between English and Portuguese using the minimal language selector", () => {
    renderHome()

    const ptButton = screen.getByRole("radio", { name: "PT" })
    fireEvent.click(ptButton)

    expect(screen.getByText("CTO na Vendd")).toBeInTheDocument()
    expect(screen.getByText("Coordenadora de Design na VML")).toBeInTheDocument()
    expect(screen.getByText("Líder de Design na VML")).toBeInTheDocument()
    expect(screen.getByText("Danone América do Norte")).toBeInTheDocument()
    expect(screen.getByText(/Interfaces e sistemas para marcas globais/)).toBeInTheDocument()
    expect(screen.getByText(/Criação de interfaces visuais e protótipos de alta fidelidade/)).toBeInTheDocument()

    const ptResumeLink = screen.getByRole("link", { name: /currículo/i })
    expect(ptResumeLink).toBeInTheDocument()
    expect(ptResumeLink).toHaveAttribute("download", "curriculo-maycon-douglas.pdf")

    const enButton = screen.getByRole("radio", { name: "EN" })
    fireEvent.click(enButton)

    expect(screen.getByText("CTO at Vendd")).toBeInTheDocument()
    expect(screen.getByText("Danone North America")).toBeInTheDocument()
  })
})
