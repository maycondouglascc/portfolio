import profilePic from '../assets/profilepic.webp'
import resumePdfEn from '../assets/resume/maycondouglasresume.pdf'
import resumePdfPt from '../assets/resume/curriculomaycondouglas.pdf'
import { useLanguage } from '../context/LanguageContext'

function Intro() {
  const { language, t } = useLanguage()
  const resumePdf = language === 'pt' ? resumePdfPt : resumePdfEn

  return (
    <section className="flex flex-col gap-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <img
        className="rounded object-cover"
        src={profilePic}
        alt="Maycon's profile picture"
        width={80}
        height={80}
        fetchPriority="high"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
          {`👋🏽 ${t('intro.greeting')}`}
        </h1>

      <p className="text-body-15-medium font-normal text-zinc-600 dark:text-zinc-400">
      {language === 'pt' ? (
        <>
          Trabalho como designer ha 8 anos e tenho experiencia em criar e manter websites, aplicacoes, SaaS e design systems.
          <br />
          Minha experiencia inclui projetos para empresas multinacionais, via{' '}
          <a href="https://dtidigital.com.br" target="_blank" rel="noopener noreferrer" className="font-medium">dti digital</a> &{' '}
          <a href="https://base.digital/" target="_blank" rel="noopener noreferrer" className="font-medium">BASE</a>, e trabalhos freelancer para diferentes startups.
        </>
      ) : (
        <>
          I&apos;ve worked as a designer for 8 years and have experience in creating and maintaining websites, applications, SaaS, and design systems.
          <br />
          My experience includes projects for multinational companies, via{' '}
          <a href="https://dtidigital.com.br" target="_blank" rel="noopener noreferrer" className="font-medium">dti digital</a> &{' '}
          <a href="https://base.digital/" target="_blank" rel="noopener noreferrer" className="font-medium">BASE</a>, and freelance work for different startups.
        </>
      )}
      </p>
        <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="mt-4 text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">{t('intro.resume')}</a>
      </div>
    </section>
  )
}

export default Intro
