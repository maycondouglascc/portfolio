import Wrapper from "../components/Wrapper";
import Intro from "../components/Intro";
import ProjectsGrid from "../components/ProjectsGrid";
import ExperienceList from "../components/ExperienceList";
import VisitorHeatmap from "../components/VisitorHeatmap";
import Footer from "../components/Footer";
import { TransitionChild } from "../components/PageTransition";

function Home() {
  return (
    <Wrapper>
      <div className="max-w-[600px] mx-auto">
        <main id="main-content" className="flex flex-col gap-12">
          <TransitionChild index={0}>
            <Intro />
          </TransitionChild>
          <TransitionChild index={1}>
            <ProjectsGrid />
          </TransitionChild>
          <TransitionChild index={2}>
            <ExperienceList />
          </TransitionChild>
          <TransitionChild index={3}>
            <VisitorHeatmap />
          </TransitionChild>
        </main>
        <TransitionChild index={4}>
          <Footer />
        </TransitionChild>
      </div>
    </Wrapper>
  );
}

export default Home;
