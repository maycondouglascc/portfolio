import Wrapper from '../components/Wrapper'
import Intro from '../components/Intro'
import ProjectsGrid from '../components/ProjectsGrid'
import ExperienceList from '../components/ExperienceList'
import Footer from '../components/Footer'

function Home() {
  return (
    <Wrapper>
      <main>
        <section className="flex flex-col mb-12">
          <Intro />
        </section>

        <section className="flex flex-col mb-12">
          <ProjectsGrid />
        </section>

        <section className="flex flex-col mb-12">
          <ExperienceList />
        </section>
      </main>
      <Footer />
    </Wrapper>
  )
}

export default Home
