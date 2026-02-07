import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Wrapper from "./components/Wrapper"

const CaseStudy = lazy(() => import("./pages/CaseStudy"))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function LoadingFallback() {
  return (
    <Wrapper>
      <div className="animate-pulse space-y-6 motion-reduce:animate-none">
        <div className="h-8 w-48 rounded bg-stone-100" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-stone-100" />
          <div className="h-4 w-3/4 rounded bg-stone-100" />
        </div>
        <div className="aspect-[632/442] w-full rounded-lg bg-stone-100" />
      </div>
    </Wrapper>
  )
}

function NotFound() {
  return (
    <Wrapper>
      <main id="main-content" className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-subheading-24-medium font-semibold text-primary">
          P&aacute;gina n&atilde;o encontrada
        </h1>
        <p className="text-body-15-regular text-secondary">
          O conte&uacute;do que voc&ecirc; procura n&atilde;o existe ou foi movido.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-stone-100 px-4 py-2 text-body-15-medium font-medium text-primary no-underline transition-colors duration-200 hover:bg-stone-200 hover:no-underline"
        >
          &larr; Voltar para o in&iacute;cio
        </Link>
      </main>
    </Wrapper>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo
      </a>
      <div className="px-1 py-1 sm:px-10 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CaseStudy />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
