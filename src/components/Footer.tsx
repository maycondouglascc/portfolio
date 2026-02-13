import { CopyEmailLink } from './CopyEmailLink'
import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
      <h2 className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
        {t('home.contact')}
      </h2>
      <ul className="mt-4 flex flex-wrap items-center gap-4 text-body-15-medium font-medium">
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
          <CopyEmailLink email="hi@maycondouglas.work" label={t('copyEmail.label')} />
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
  )
}

export default Footer
