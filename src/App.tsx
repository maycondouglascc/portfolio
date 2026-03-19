import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import Wrapper from "./components/Wrapper"
import { ThemeProvider } from "./context/ThemeContext"
import { ViewModeProvider } from "./context/ViewModeContext"
import SettingsBar from "./components/SettingsBar"
import { LanguageProvider, useLanguage } from "./context/LanguageContext"

const Home = lazy(() => import("./pages/Home"))
const CaseStudy = lazy(() => import("./pages/CaseStudy"))
const PageTransition = lazy(() =>
  import("./components/PageTransition").then((m) => ({ default: m.PageTransition }))
)

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
      <div className="mx-auto animate-pulse space-y-6 motion-reduce:animate-none">
        <div className="rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
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
  const { t } = useLanguage()

  return (
    <Wrapper>
      <main id="main-content" className="max-w-[720px] mx-auto flex flex-col items-center gap-4 py-20 text-center">
        <h1 className="text-subheading-24-medium font-semibold text-zinc-900 dark:text-zinc-100">
          {t("app.notFoundTitle")}
        </h1>
        <p className="text-body-15-regular text-zinc-600 dark:text-zinc-400">
          {t("app.notFoundDescription")}
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-zinc-200 px-4 py-2 text-body-15-medium font-medium text-zinc-900 no-underline transition-colors duration-200 hover:bg-zinc-300 hover:no-underline dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          {`← ${t("app.backToHome")}`}
        </Link>
      </main>
    </Wrapper>
  )
}

function AppContent() {
  const { t } = useLanguage()
  const location = useLocation()
  const routeElements = (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        }
      />
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
  )

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        {t("app.skipToContent")}
      </a>
      <div className="fixed right-3 top-3 z-40 sm:right-5 sm:top-5">
        <SettingsBar />
      </div>
      <div className="px-1 py-1 sm:px-2 sm:py-2">
        <Suspense fallback={routeElements}>
          <PageTransition routeLocation={location}>{routeElements}</PageTransition>
        </Suspense>
      </div>
    </>
  )
}


export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ViewModeProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ViewModeProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
