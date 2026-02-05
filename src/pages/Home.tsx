import Wrapper from '../components/Wrapper'
import Intro from '../components/Intro'
import ProjectsGrid from '../components/ProjectsGrid'
import ExperienceList from '../components/ExperienceList'
import Footer from '../components/Footer'

function Home() {
  return (
    <Wrapper>
      <main id="main-content" className="flex flex-col gap-12">
        <Intro />
        <ProjectsGrid />
        <ExperienceList />
      </main>
      <Footer />
    </Wrapper>
  )
}

export default Home
