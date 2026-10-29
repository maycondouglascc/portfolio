import profilePic from '../assets/profilepic.webp'
import resumePdfEn from '../assets/resume/maycondouglasresume.pdf'
import resumePdfPt from '../assets/resume/curriculomaycondouglas.pdf'
import { useLanguage } from '../context/LanguageContext'

function Intro() {
  const { language, t } = useLanguage()
  const resumePdf = language === 'pt' ? resumePdfPt : resumePdfEn

  return (
    <section className="flex flex-col gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <img
          className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover"
          src={profilePic}
          alt="Maycon's profile picture"
          width={80}
          height={80}
          fetchPriority="high"
        />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
            {`👋🏽 ${t('intro.greeting')}`}
          </h1>
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-14-medium font-medium text-accent hover:underline dark:text-accent"
          >
            {t('intro.resume')}
          </a>
        </div>
      </div>
      <p className="text-body-15-medium font-normal text-zinc-600 dark:text-zinc-400">
        {language === 'pt' ? (
          <>
            Trabalho como designer há 8 anos e tenho experiência em criar e manter websites, aplicações, SaaS e design systems.
            {' '}Minha experiência inclui projetos para empresas multinacionais via{' '}
            <a href="https://dtidigital.com.br" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-100">dti digital</a> &{' '}
            <a href="https://base.digital/" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-100">BASE</a>, e trabalhos freelancer para diferentes startups.
          </>
        ) : (
          <>
            I&apos;ve worked as a designer for 8 years and have experience in creating and maintaining websites, applications, SaaS, and design systems.
            {' '}My experience includes projects for multinational companies via{' '}
            <a href="https://dtidigital.com.br" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-100">dti digital</a> &{' '}
            <a href="https://base.digital/" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-100">BASE</a>, and freelance work for different startups.
          </>
        )}
      </p>
    </section>
  )
}

export default Intro
