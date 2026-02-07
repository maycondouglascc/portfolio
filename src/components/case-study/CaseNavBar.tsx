import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'react-feather'
import Button from '../Button'

type CaseNavBarProps = {
  externalHref?: string
}

function CaseNavBar({ externalHref }: CaseNavBarProps) {
  return (
    <nav
      className="flex items-center justify-between mb-10"
      aria-label="Case study navigation"
    >
      <Button
        as={Link}
        to="/"
        variant="icon"
        aria-label="Back to home"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
      </Button>

      {externalHref && (
        <Button
          as="a"
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="icon"
          aria-label="Open project in a new tab"
        >
          <ExternalLink size={16} strokeWidth={1.5} aria-hidden="true" />
        </Button>
      )}
    </nav>
  )
}

export default CaseNavBar
