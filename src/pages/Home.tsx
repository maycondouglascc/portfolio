import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Download } from 'react-feather'
import { useLanguage } from '../context/LanguageContext'
import { usePageSeo } from '../hooks/usePageSeo'
import resumePdfPt from '../assets/resume/curriculomaycondouglas.pdf'
import resumePdfEn from '../assets/resume/maycondouglasresume.pdf'
import './Home.css'

interface Testimonial {
  name: string
  role: { en: string; pt: string }
  paragraphs: { en: ReactNode[]; pt: ReactNode[] }
}

const testimonials: Testimonial[] = [
  {
    name: 'Isaías Ramos',
    role: { en: 'CTO at Vendd', pt: 'CTO na Vendd' },
    paragraphs: {
      pt: [
        <>
          O Maycon é super atencioso e sempre demonstra muita paciência em todo o processo de construção e refinamento das ideias.{' '}
          <mark className="redesign-highlight">
            Ele não se contenta só em fazer algo bonito, está sempre disposto a entender o negócio, os objetivos por trás do projeto e como aquilo vai impactar de verdade o usuário.
          </mark>{' '}
          Se dedica de verdade e faz questão de entregar algo que funcione bem pra todos os lados.
        </>
      ],
      en: [
        <>
          Maycon is extremely thoughtful and patient throughout the entire process of building and refining ideas.{' '}
          <mark className="redesign-highlight">
            He never settles for just making things look good; he’s always invested in understanding the business, the project goals, and the real impact on the user.
          </mark>{' '}
          He is genuinely dedicated and makes sure the solution works well for everyone involved.
        </>
      ]
    }
  },
  {
    name: 'Florencia Rodriguez',
    role: { en: 'Design Coordinator at VML', pt: 'Coordenadora de Design na VML' },
    paragraphs: {
      pt: [
        <>
          <mark className="redesign-highlight">Contar com o Maycon em um projeto é ter tranquilidade. É saber que vai sair bem feito</mark>, nas mãos de alguém que sempre quer dar o seu melhor.
        </>,
        <>
          Nos quase quatro anos em que trabalhamos juntos, acompanhei de perto o talento do Maycon, que já era evidente desde o início, se desdobrar em algo ainda maior:{' '}
          <mark className="redesign-highlight">consistência, curiosidade e um senso genuíno de responsabilidade</mark>.
        </>,
        <>
          Inconformidade com o status quo, sempre questionando. sede por conhecimento, sempre em treinamento, e empatia tanto com seus pares quanto usuários.
        </>
      ],
      en: [
        <>
          <mark className="redesign-highlight">Having Maycon on a project brings peace of mind. You know it will be done right</mark>, in the hands of someone who always strives to give their best.
        </>,
        <>
          Over the nearly four years we worked together, I watched his talent—evident from day one—unfold into something even greater:{' '}
          <mark className="redesign-highlight">consistency, curiosity, and a genuine sense of accountability</mark>.
        </>,
        <>
          Challenging the status quo, always asking questions, thirsty for knowledge, and demonstrating deep empathy for both peers and users.
        </>
      ]
    }
  },
  {
    name: 'Paula Vio',
    role: { en: 'Design Lead at VML', pt: 'Líder de Design na VML' },
    paragraphs: {
      pt: [
        <>
          Sempre aprendemos alguma coisa quando trabalhamos com o Maycon;{' '}
          <mark className="redesign-highlight">do Discovery à Prototipação sua entrega se destaca</mark>.
        </>,
        <>
          Super atento, criativo e com um olhar crítico,{' '}
          <mark className="redesign-highlight">traz inovação, agilidade e qualidade para os projetos</mark>. Tem sempre na manga uma nova ferramenta, um novo processo e está sempre estudando para levar sua entrega a um outro nível.
        </>,
        <>
          Além disso, como sua gestora, vejo no Maycon um{' '}
          <mark className="redesign-highlight">perfil receptivo à feedbacks e sempre em busca de aprender e evoluir</mark>.
        </>
      ],
      en: [
        <>
          We always learn something when working with Maycon;{' '}
          <mark className="redesign-highlight">from Discovery to Prototyping, his delivery stands out</mark>.
        </>,
        <>
          Exceptionally attentive, creative, and critical,{' '}
          <mark className="redesign-highlight">he brings innovation, speed, and quality to every project</mark>. He always has a new tool or process up his sleeve and is constantly studying to take his craft to the next level.
        </>,
        <>
          Moreover, as his manager, I saw in Maycon{' '}
          <mark className="redesign-highlight">someone remarkably receptive to feedback and always eager to learn and evolve</mark>.
        </>
      ]
    }
  },
  {
    name: 'Verusa Domethildes',
    role: { en: 'Product Owner at VML', pt: 'Product Owner na VML' },
    paragraphs: {
      pt: [
        <>
          Trabalhei com o Maycon e pude constatar sua criatividade e foco em soluções.{' '}
          <mark className="redesign-highlight">
            Mesmo diante das limitações técnicas impostas pela framework do cliente, ele sempre encontrava alternativas inovadoras para atender às demandas.
          </mark>{' '}
          Destaco também sua parceria e apoio em reuniões desafiadoras, registrando combinados e defendendo aspectos técnicos. Ah, e ele tem{' '}
          <mark className="redesign-highlight">muita habilidade no uso de IA para otimizar soluções</mark>. Além de ser uma pessoa de ótima convivência.
        </>
      ],
      en: [
        <>
          I worked with Maycon and witnessed firsthand his creativity and focus on solutions.{' '}
          <mark className="redesign-highlight">
            Even when facing technical constraints imposed by client frameworks, he consistently found innovative ways to deliver.
          </mark>{' '}
          I also highlight his partnership in challenging meetings, aligning decisions and defending technical rigor. Plus, he has{' '}
          <mark className="redesign-highlight">great skill in using AI to optimize design solutions</mark>—and is a wonderful person to work alongside.
        </>
      ]
    }
  },
  {
    name: 'Micael Ilieff Porto',
    role: { en: 'Product Designer at VML', pt: 'Product Designer na VML' },
    paragraphs: {
      pt: [
        <>
          Um colega de equipe valioso, sempre se mostrou aberto a conversas e trocas de experiências. Quaisquer sejam os desafios, Maycon se empenha em sempre trazer novos assuntos, práticas e técnicas para discussão,{' '}
          <mark className="redesign-highlight">
            construindo assim, um ambiente saudável e que estimule o desenvolvimento de todos na equipe
          </mark>. Tenho um prazer enorme em participar dos mesmos projetos!
        </>
      ],
      en: [
        <>
          A valuable teammate, always open to conversations and exchanging knowledge. Whatever the challenge, Maycon strives to bring new ideas, practices, and techniques to the table,{' '}
          <mark className="redesign-highlight">
            fostering a healthy environment that inspires growth across the entire team
          </mark>. It's an absolute pleasure sharing projects with him!
        </>
      ]
    }
  }
]

const copy = {
  en: {
    hero: (
      <>
        I’ve been creating and maintaining websites, applications, SaaS, and design systems. My experience includes projects for multinational companies, via <a href="https://dtidigital.com.br" target="_blank" rel="noreferrer">dti digital</a> &amp; <a href="https://base.digital/" target="_blank" rel="noreferrer">BASE</a>, and freelance work for different startups.
      </>
    ),
    sections: [
      ['case-studies', 'Case studies'],
      ['side-projects', 'Side projects'],
      ['experience', 'Experience'],
      ['recommendations', 'Recommendations'],
    ] as const,
    caseStudiesLabel: 'Case studies',
    danoneTitle: 'Danone North America',
    danoneDesc: 'Website redesign',
    sideProjectsLabel: 'Side projects',
    glanceDesc: 'Process monitor for Linux',
    experienceLabel: 'Experience',
    wppDesc: 'I design scalable interfaces and systems for global brands in finance and healthcare. My work spans discovery to interactive prototyping, collaborating directly with engineering and leadership to ship resilient, high-quality products.',
    wppTools: 'Figma, Claude, Codex, Motion, Tailwind CSS',
    wppPeriod: 'Jan 2022 - Present',
    baseDesc: 'Designed user interfaces and visual systems for digital platforms and loyalty programs at Duratex and Oncoclínicas, connecting business requirements to telemedicine and gamification flows.',
    baseTools: 'Figma, Suite Adobe',
    basePeriod: 'Dec 2020 - Jan 2022',
    resumeText: 'Resume',
    resumePdf: resumePdfEn,
    recommendationsLabel: 'Recommendations',
    contactLabel: 'Contact',
    emailText: 'Email',
    copiedText: 'Copied!',
    langAria: 'Language selector',
  },
  pt: {
    hero: (
      <>
        Crio e mantenho websites, aplicativos, SaaS e design systems. Minha experiência inclui projetos para empresas multinacionais, via <a href="https://dtidigital.com.br" target="_blank" rel="noreferrer">dti digital</a> &amp; <a href="https://base.digital/" target="_blank" rel="noreferrer">BASE</a>, e trabalhos freelancer para diferentes startups.
      </>
    ),
    sections: [
      ['case-studies', 'Estudos de caso'],
      ['side-projects', 'Side projects'],
      ['experience', 'Experiência'],
      ['recommendations', 'Recomendações'],
    ] as const,
    caseStudiesLabel: 'Estudos de caso',
    danoneTitle: 'Danone América do Norte',
    danoneDesc: 'Redesign de website',
    sideProjectsLabel: 'Side projects',
    glanceDesc: 'Monitor de processos para Linux',
    experienceLabel: 'Experiência',
    wppDesc: 'Desenho interfaces e sistemas escaláveis para grandes marcas globais em finanças e saúde. Meu trabalho vai do discovery à prototipação interativa, colaborando diretamente com engenharia e lideranças para entregar produtos consistentes e de alta qualidade.',
    wppTools: 'Figma, Claude, Codex, Motion, Tailwind CSS',
    wppPeriod: 'Jan 2022 - Atual',
    baseDesc: 'Desenvolvi interfaces de usuário e sistemas visuais para plataformas digitais e programas de relacionamento na Duratex e Oncoclínicas, conectando regras de negócio a fluxos de fidelidade e telemedicina.',
    baseTools: 'Figma, Suite Adobe',
    basePeriod: 'Dez 2020 - Jan 2022',
    resumeText: 'Currículo',
    resumePdf: resumePdfPt,
    recommendationsLabel: 'Recomendações',
    contactLabel: 'Contato',
    emailText: 'Email',
    copiedText: 'Copiado!',
    langAria: 'Seletor de idioma',
  },
}

function Home() {
  usePageSeo()
  const { language, setLanguage } = useLanguage()
  const currentCopy = copy[language]
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('case-studies')

  useEffect(() => {
    const updateActiveSection = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const marker = window.innerHeight * 0.3
      let activeIndex = 0
      for (const [index, [id]] of currentCopy.sections.entries()) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) activeIndex = index
      }
      if (atBottom) activeIndex = currentCopy.sections.length - 1
      setActiveSection(currentCopy.sections[activeIndex][0])
    }
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [currentCopy.sections])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hi@maycondouglas.work')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = 'mailto:hi@maycondouglas.work'
    }
  }

  return (
    <main id="main-content" className="redesign-home">
      {/* Top-right flat, sober, minimal language selector */}
      <div
        className="redesign-lang-selector"
        role="radiogroup"
        aria-label={currentCopy.langAria}
      >
        <button
          type="button"
          role="radio"
          aria-checked={language === 'en'}
          className="redesign-lang-btn"
          data-active={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <span className="redesign-lang-divider">/</span>
        <button
          type="button"
          role="radio"
          aria-checked={language === 'pt'}
          className="redesign-lang-btn"
          data-active={language === 'pt'}
          onClick={() => setLanguage('pt')}
        >
          PT
        </button>
      </div>

      <div className="redesign-shell">
        <header className="redesign-hero">
          <div className="redesign-hero-content">
            <h1>Maycon Douglas</h1>
            <p>{currentCopy.hero}</p>
          </div>
        </header>

        <div className="redesign-sections">
          <aside className="redesign-sidebar">
            <nav className="redesign-nav" aria-label="Page sections" data-active={activeSection} data-scrolled={activeSection !== 'case-studies'}>
              {currentCopy.sections.map(([id, label]) => (
                <div className="redesign-nav-item" key={id}>
                  <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
                  {id === 'experience' && activeSection === id && (
                    <a className="redesign-label-link" href="https://linkedin.com/in/maycondouglascc" target="_blank" rel="noreferrer">Linkedin <img src="/files/redesign/external-link.svg" alt="" /></a>
                  )}
                </div>
              ))}
            </nav>
          </aside>
          <div className="redesign-content">
            <section className="redesign-row redesign-projects" id="case-studies" aria-label={currentCopy.caseStudiesLabel}>
              <h2 className="redesign-label">{currentCopy.caseStudiesLabel}</h2>
              <div className="redesign-list">
                <Link className="redesign-card redesign-case" to="/projects/danone-north-america">
                  <img className="redesign-case-image" src="/files/redesign/danone.png" alt="" />
                  <div className="redesign-card-copy">
                    <h2>{currentCopy.danoneTitle}</h2>
                    <p>{currentCopy.danoneDesc}</p>
                  </div>
                </Link>
              </div>
            </section>

            <section className="redesign-row" id="side-projects">
              <h2 className="redesign-label">{currentCopy.sideProjectsLabel}</h2>
              <div className="redesign-list">
                <a
                  className="redesign-card redesign-side-card"
                  href="https://glance.maycondouglas.work/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="redesign-side-image"><img src="/files/redesign/glance.svg" alt="" /></span>
                  <span className="redesign-card-copy"><strong>Glance</strong><span>{currentCopy.glanceDesc}</span></span>
                </a>
              </div>
            </section>

            <section className="redesign-row" id="experience">
              <h2 className="redesign-label">{currentCopy.experienceLabel}</h2>
              <div className="redesign-experience">
                <div className="redesign-job">
                  <div>
                    <div className="redesign-job-company">
                      <span className="redesign-logo"><img src="/files/redesign/wpp.svg" alt="" /></span>
                      <strong>WPP Enterprise Solutions</strong>
                    </div>
                    <div className="redesign-job-description">
                      <p>Product Designer</p>
                      <p>{currentCopy.wppDesc}</p>
                      <p>{currentCopy.wppTools}</p>
                    </div>
                  </div>
                  <time>{currentCopy.wppPeriod}</time>
                </div>
                <div className="redesign-job">
                  <div>
                    <div className="redesign-job-company">
                      <span className="redesign-logo"><img src="/files/redesign/base.svg" alt="" /></span>
                      <strong>BASE Digital</strong>
                    </div>
                    <div className="redesign-job-description">
                      <p>UI Designer</p>
                      <p>{currentCopy.baseDesc}</p>
                      <p>{currentCopy.baseTools}</p>
                    </div>
                  </div>
                  <time>{currentCopy.basePeriod}</time>
                </div>
              </div>
              <div className="redesign-experience-actions">
                <a
                  className="redesign-resume-link"
                  href={currentCopy.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  download={language === 'pt' ? 'curriculo-maycon-douglas.pdf' : 'maycon-douglas-resume.pdf'}
                >
                  <Download size={16} aria-hidden="true" />
                  <span>{currentCopy.resumeText}</span>
                </a>
              </div>
            </section>

            <section className="redesign-row" id="recommendations">
              <h2 className="redesign-label">{currentCopy.recommendationsLabel}</h2>
              <div className="redesign-list">
                {testimonials.map(({ name, role, paragraphs }) => (
                  <figure className="redesign-testimonial" key={name}>
                    <blockquote>
                      {paragraphs[language].map((paragraph, index) => (
                        <p key={`p-${index}`}>{paragraph}</p>
                      ))}
                    </blockquote>
                    <figcaption>
                      <strong>{name}</strong>
                      <span>{role[language]}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <footer className="redesign-row" id="contact">
              <h2 className="redesign-label">{currentCopy.contactLabel}</h2>
              <div className="redesign-contacts">
                <button onClick={copyEmail} type="button">{copied ? currentCopy.copiedText : currentCopy.emailText}</button>
                <a href="https://linkedin.com/in/maycondouglascc" target="_blank" rel="noreferrer">Linkedin</a>
                <a href="https://github.com/maycondouglascc" target="_blank" rel="noreferrer">Github</a>
                <span>X</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
