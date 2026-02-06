import { Link } from 'react-router-dom'

type CaseNavBarProps = {
  externalHref?: string
}

function CaseNavBar({ externalHref }: CaseNavBarProps) {
  return (
    <nav
      className="flex items-center justify-between mb-10"
      aria-label="Case study navigation"
    >
      <Link
        to="/"
        className="relative inline-flex items-center justify-center rounded-2xl bg-[#f5f5f4] p-2 text-primary no-underline transition-colors duration-200 hover:bg-[#e7e5e4] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 touch-manipulation before:absolute before:inset-[-6px] before:content-[''] sm:before:inset-0"
        aria-label="Back to home"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 12L2 8M2 8L6 4M2 8H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {externalHref && (
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center rounded-2xl bg-[#f5f5f4] p-2 text-primary no-underline transition-colors duration-200 hover:bg-[#e7e5e4] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 touch-manipulation before:absolute before:inset-[-6px] before:content-[''] sm:before:inset-0"
          aria-label="Open project in a new tab"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6.5 3.5H3.5V12.5H12.5V9.5M9.5 3.5H12.5V6.5M12.5 3.5L7 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </nav>
  )
}

export default CaseNavBar
