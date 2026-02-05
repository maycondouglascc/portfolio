import { CaseCard } from "./components/CaseCard"
import { CopyEmailLink } from "./components/CopyEmailLink"
import SectionTree, { SectionTreeItem } from "./components/SectionTree"

const projects = [
  {
    title: "Project title 1",
    description: "Project description 1",
    href: "#",
    imageSrc: "/files/case-thumbnails/project-thumbnail-1.png",
    imageAlt: "Project title 1",
  },
  {
    title: "Project title 2",
    description: "Project description 2",
    href: "#",
    imageSrc: "/files/case-thumbnails/project-thumbnail-2.png",
    imageAlt: "Project title 2",
  },
  {
    title: "Project title 3",
    description: "Project description 3",
    href: "#",
    imageSrc: "/files/case-thumbnails/project-thumbnail-3.png",
    imageAlt: "Project title 3",
  },

]

const experiences = [
  {
    company: "dti digital",
    role: "Product Designer",
    period: "Current",
  },
  {
    company: "Wunderman Thompson",
    role: "Product Designer",
    period: "2022-23",
  },
  {
    company: "BASE",
    role: "UI Designer",
    period: "2020-22",
  },
  {
    company: "Ôpa!",
    role: "Diretor de Arte",
    period: "2018-20",
  },
]

const caseStudySections: SectionTreeItem[] = [
  { id: "case-overview", label: "Overview" },
  {
    id: "case-approach",
    label: "Approach",
    children: [
      { id: "case-research", label: "Research" },
      { id: "case-design", label: "Design" },
      { id: "case-build", label: "Build" },
    ],
  },
  { id: "case-outcomes", label: "Outcomes" },
]

export default function App() {
  return (
    <div className="px-2 py-8 sm:px-10 sm:py-10">
      <div className="relative mx-auto w-full max-w-[680px] rounded-2xl bg-white px-1 pb-10 pt-10 shadow-sm sm:px-10 sm:pt-16 animate-fade-in motion-reduce:animate-none">
        

        <main className="flex flex-col gap-12">
          <section className="flex flex-col gap-6">
            <img
              className="rounded object-cover"
              src="/files/profile-pic.jpg"
              alt="Maycon's profile picture"
              width={80}
              height={80}
              loading="lazy"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-body-18-medium font-medium text-primary">
                👋🏿 Oi, eu sou o Maycon
              </h1>
              <p className="text-body-16-regular font-normal text-secondary">
                Atuo como designer há 8 anos e tenho
                experiência em projetos de criação e manutenção de websites,
                aplicativos, SaaS e design systems
              </p>
              <p className="text-body-16-regular font-normal text-secondary">
                Minha experiência inclui projetos para multinacionais, via{" "}
                <a
                  href="http://dtidigital.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium"
                >
                  dti digital
                </a>{" "}
                &{" "}
                <a
                  href="http://base.digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium"
                >
                  BASE
                </a>
                , e trabalhos autônomos para diferentes startups
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-body-18-medium font-medium text-primary">
              Projetos
            </h2>
            <ul className="flex flex-col gap-12">
              {projects.map((project) => (
                <li key={project.title} className="min-w-0">
                  <CaseCard {...project} />
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-body-18-medium font-medium text-primary">
              Experiências
            </h2>
            <ul className="flex flex-col gap-3">
              {experiences.map((experience) => (
                <li
                  key={`${experience.company}-${experience.period}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-body-14-medium font-medium text-secondary">
                    {experience.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-body-14-regular font-normal text-secondary">
                    <span>{experience.role}</span>
                    <span className="tabular-nums">{experience.period}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="mt-12 border-t border-border pt-6">
          <h2 className="text-body-18-medium font-medium text-primary">
            Contato
          </h2>
          <ul className="mt-4 flex flex-wrap items-center gap-4 text-body-16-medium font-medium">
            <li>
              <a
                href="https://linkedin.com/in/maycondouglascc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li>
              <CopyEmailLink email="hellomaycondouglas@gmail.com" />
            </li>
            <li>
              <a
                href="https://literal.club/wzk000"
                target="_blank"
                rel="noopener noreferrer"
              >
                Literal
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
