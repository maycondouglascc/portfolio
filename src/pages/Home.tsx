import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'
import './Home.css'

const sections = [
  ['case-studies', 'Case studies'],
  ['side-projects', 'Side projects'],
  ['experience', 'Experience'],
  ['recommendations', 'Recommendations'],
] as const

const testimonials = [
  {
    name: 'Isaías Ramos',
    role: 'CTO na Vendd',
    paragraphs: ['O Maycon é super atencioso e sempre demonstra muita paciência em todo o processo de construção e refinamento das ideias. Ele não se contenta só em fazer algo bonito, está sempre disposto a entender o negócio, os objetivos por trás do projeto e como aquilo vai impactar de verdade o usuário. Se dedica de verdade e faz questão de entregar algo que funcione bem pra todos os lados.']
  },
  {
    name: 'Florencia Rodriguez',
    role: 'Coordenadora de Design na VML',
    paragraphs: ['Contar com o Maycon em um projeto é ter tranquilidade. É saber que vai sair bem feito, nas mãos de alguém que sempre quer dar o seu melhor.', 'Nos quase quatro anos em que trabalhamos juntos, acompanhei de perto o talento do Maycon, que já era evidente desde o início, se desdobrar em algo ainda maior: consistência, curiosidade e um senso genuíno de responsabilidade.', 'Inconformidade com o status quo, sempre questionando. sede por conhecimento, sempre em treinamento, e empatia tanto com seus pares quanto usuários.']
  },
  {
    name: 'Paula Vio',
    role: 'Líder de Design na VML',
    paragraphs: ['Sempre aprendemos alguma coisa quando trabalhamos com o Maycon; do Discovery à Prototipação sua entrega se destaca.', 'Super atento, criativo e com um olhar crítico, traz inovação, agilidade e qualidade para os projetos. Tem sempre na manga uma nova ferramenta, um novo processo e está sempre estudando para levar sua entrega a um outro nível.', 'Além disso, como sua gestora, vejo no Maycon um perfil receptivo à feedbacks e sempre em busca de aprender e evoluir.']
  },
  {
    name: 'Verusa Domethildes',
    role: 'Product Owner na VML',
    paragraphs: ['Trabalhei com o Maycon no projeto [confidencial], onde pude constatar sua criatividade e foco em soluções. Mesmo diante das limitações técnicas impostas pela framework do cliente, ele sempre encontrava alternativas inovadoras para atender às demandas. Destaco também sua parceria e apoio em reuniões desafiadoras, registrando combinados e defendendo aspectos técnicos. Ah, e ele tem muita habilidade no uso de IA para otimizar soluções. Além de ser uma pessoa de ótima convivência.']
  },
  {
    name: 'Micael Ilieff Porto',
    role: 'Product Designer na VML',
    paragraphs: ['Um colega de equipe valioso, sempre se mostrou aberto a conversas e trocas de experiências. Quaisquer sejam os desafios, Maycon se empenha em sempre trazer novos assuntos, práticas e técnicas para discussão, construindo assim, um ambiente saudável e que estimule o desenvolvimento de todos na equipe. Tenho um prazer enorme em participar dos mesmos projetos!']
  },
]

function Home() {
  usePageSeo()
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('case-studies')

  useEffect(() => {
    const updateActiveSection = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const marker = window.innerHeight * 0.3
      let activeIndex = 0
      for (const [index, [id]] of sections.entries()) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) activeIndex = index
      }
      if (atBottom) activeIndex = sections.length - 1
      setActiveSection(sections[activeIndex][0])
    }
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

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
      <div className="redesign-shell">
        <header className="redesign-hero">
          <div className="redesign-hero-content">
            <h1>Maycon Douglas</h1>
            <p>I’ve been creating and maintaining websites, applications, SaaS, and design systems. My experience includes projects for multinational companies, via <a href="https://dtidigital.com.br" target="_blank" rel="noreferrer">dti digital</a> &amp; <a href="https://base.digital/" target="_blank" rel="noreferrer">BASE</a>, and freelance work for different startups.</p>
          </div>
        </header>

        <div className="redesign-sections">
          <aside className="redesign-sidebar">
            <nav className="redesign-nav" aria-label="Page sections" data-active={activeSection} data-scrolled={activeSection !== 'case-studies'}>
              {sections.map(([id, label]) => (
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
        <section className="redesign-row redesign-projects" id="case-studies" aria-label="Case studies">
          <h2 className="redesign-label">Case studies</h2>
          <div className="redesign-list">
            <Link className="redesign-card redesign-case" to="/projects/danone-north-america">
              <img className="redesign-case-image" src="/files/redesign/danone.png" alt="" />
              <div className="redesign-card-copy"><h2>Danone America do Norte</h2><p>Website redesign</p></div>
            </Link>
          </div>
        </section>

        <section className="redesign-row" id="side-projects">
          <h2 className="redesign-label">Side projects</h2>
          <div className="redesign-list">
            <a
              className="redesign-card redesign-side-card"
              href="https://glance.maycondouglas.work/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="redesign-side-image"><img src="/files/redesign/glance.svg" alt="" /></span>
              <span className="redesign-card-copy"><strong>Glance</strong><span>Monitor de processos para Linux</span></span>
            </a>
          </div>
        </section>

        <section className="redesign-row" id="experience">
          <h2 className="redesign-label">Experience</h2>
          <div className="redesign-experience">
            <div className="redesign-job"><div><div className="redesign-job-company"><span className="redesign-logo"><img src="/files/redesign/wpp.svg" alt="" /></span><strong>WPP Enterprise Solutions</strong></div><div className="redesign-job-description"><p>Product Designer</p><p>Atuação em projetos internacionais, com foco em reestruturação de produtos digitais.</p></div></div><time>Jan 2022 - Now</time></div>
            <div className="redesign-job"><div><div className="redesign-job-company"><span className="redesign-logo"><img src="/files/redesign/base.svg" alt="" /></span><strong>WPP Enterprise Solutions</strong></div><div className="redesign-job-description"><p>UI Designer</p></div></div><time>Dec 2020 - Jan 2022</time></div>
          </div>
        </section>

        <section className="redesign-row" id="recommendations">
          <h2 className="redesign-label">Recommendations</h2>
          <div className="redesign-list">
            {testimonials.map(({ name, role, paragraphs }) => (
              <figure className="redesign-testimonial" key={name}>
                <blockquote>
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className="redesign-row" id="contact">
          <h2 className="redesign-label">Contact</h2>
          <div className="redesign-contacts"><button onClick={copyEmail} type="button">{copied ? 'Copied!' : 'Email'}</button><a href="https://linkedin.com/in/maycondouglascc" target="_blank" rel="noreferrer">Linkedin</a><a href="https://github.com/maycondouglascc" target="_blank" rel="noreferrer">Github</a><span>X</span></div>
        </footer>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
