import { Link } from 'react-router-dom'

type CaseCardProps = {
  title: string
  description: string
  thumbnail: string
  thumbnailAlt: string
  href?: string
}

export function CaseCard({
  title,
  description,
  thumbnail,
  thumbnailAlt,
  href,
}: CaseCardProps) {
  const isInternal = href?.startsWith('/') ?? false
  const linkClass =
    'group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:focus-visible:outline-zinc-100'

  const content = (
    <div className="flex flex-col overflow-hidden rounded-md bg-zinc-200/40 transition-colors duration-75 ease-in hover:bg-zinc-200/70 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70">
      <div className="w-full overflow-hidden bg-zinc-300/50 dark:bg-zinc-700/50">
        <img
          src={thumbnail}
          alt={thumbnailAlt}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </div>
      <div className="flex flex-col flex-1 gap-1 p-4">
        <span className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </span>
        <span className="flex-1 break-words text-body-14-regular font-normal text-zinc-600 dark:text-zinc-400">
          {description}
        </span>
      </div>
    </div>
  )

  if (!href) {
    return <div className="group block">{content}</div>
  }

  if (isInternal) {
    return <Link to={href} className={linkClass}>{content}</Link>
  }

  return <a href={href} className={linkClass}>{content}</a>
}
