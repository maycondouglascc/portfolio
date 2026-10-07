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
        </main>
        <TransitionChild index={3}>
          <Footer />
        </TransitionChild>
        <TransitionChild index={4}>
          <div className="mt-12 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <VisitorHeatmap />
          </div>
        </TransitionChild>
      </div>
    </Wrapper>
  );
}

export default Home;
