import { Link } from 'react-router-dom'
import { CornerUpLeft, ExternalLink } from 'react-feather'
import Button from '../Button'
import { useLanguage } from '../../context/LanguageContext'

type CaseNavBarProps = {
  externalHref?: string
}

function CaseNavBar({ externalHref }: CaseNavBarProps) {
  const { t } = useLanguage()

  return (
    <nav
      className="flex items-center justify-between mb-10"
      aria-label={t('caseStudy.navLabel')}
    >
      <Button
        as={Link}
        to="/"
        variant="icon"
        aria-label={t('caseStudy.backHomeAria')}
      >
        <CornerUpLeft size={16} strokeWidth={1.5} aria-hidden="true" />
      </Button>

      {externalHref && (
        <Button
          as="a"
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="icon"
          aria-label={t('caseStudy.openProjectAria')}
        >
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
        </Button>
      )}
    </nav>
  )
}

export default CaseNavBar
