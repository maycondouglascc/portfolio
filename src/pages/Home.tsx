import { useEffect, useState, startTransition } from "react"
import Wrapper from "../components/Wrapper"
import Intro from "../components/Intro"
import ProjectsGrid from "../components/ProjectsGrid"
import ExperienceList from "../components/ExperienceList"
import Footer from "../components/Footer"
import { TransitionChild } from "../components/PageTransition"
import { useLanguage } from "../context/LanguageContext"
import {
  getExperience,
  getHomeContent,
  getProjects,
  type Experience,
  type HomeContent,
  type Project,
} from "../lib/tina"

function Home() {
  const { language } = useLanguage()
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [experience, setExperience] = useState<Experience[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const [homeData, projectData, experienceData] = await Promise.all([
        getHomeContent(language),
        getProjects(language),
        getExperience(language),
      ])

      if (cancelled) return
      startTransition(() => {
        setHomeContent(homeData)
        setProjects(projectData)
        setExperience(experienceData)
      })
    }

    load().catch(() => {
    })

    return () => {
      cancelled = true
    }
  }, [language])

  return (
    <Wrapper>
      <div className="max-w-[720px] mx-auto">
        <main id="main-content" className="flex flex-col gap-12">
          <TransitionChild index={0}>
            <Intro content={homeContent} />
          </TransitionChild>
          <TransitionChild index={1}>
            <ProjectsGrid projects={projects} />
          </TransitionChild>
          <TransitionChild index={2}>
            <ExperienceList experience={experience} />
          </TransitionChild>
        </main>
        <TransitionChild index={3}>
          <Footer />
        </TransitionChild>
      </div>
    </Wrapper>
  )
}

export default Home
