import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Wrapper from "./components/Wrapper"
import { ThemeProvider } from "./context/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"

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
        <div className="h-8 w-48 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
          <div className="h-4 w-3/4 rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
        </div>
        <div className="aspect-[632/442] w-full rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60" />
      </div>
    </Wrapper>
  )
}

function NotFound() {
  return (
    <Wrapper>
      <main id="main-content" className="flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-subheading-24-medium font-semibold text-zinc-900 dark:text-zinc-100">
          P&aacute;gina n&atilde;o encontrada
        </h1>
        <p className="text-body-15-regular text-zinc-600 dark:text-zinc-400">
          O conteúdo;do que você; procura não;o existe ou foi movido.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-zinc-200 px-4 py-2 text-body-15-medium font-medium text-zinc-900 no-underline transition-colors duration-200 hover:bg-zinc-300 hover:no-underline dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          &larr; Voltar para o início
        </Link>
      </main>
    </Wrapper>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <div className="fixed right-3 top-3 z-40 sm:right-5 sm:top-5">
          <ThemeToggle />
        </div>
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
    </ThemeProvider>
  )
}
