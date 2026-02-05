import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"

const CaseStudy = lazy(() => import("./pages/CaseStudy"))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <div className="px-2 py-8 sm:px-10 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={null}>
                <CaseStudy />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
