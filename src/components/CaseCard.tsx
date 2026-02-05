import { Link } from 'react-router-dom'

type CaseCardProps = {
  title: string
  description: string
  href: string
  imageSrc: string
  imageAlt: string
  thumbnailHeight?: number
}

export function CaseCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  thumbnailHeight = 320,
}: CaseCardProps) {
  const isInternal = href.startsWith('/')
  const linkClass =
    'group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'

  const content = (
    <>
      <div
        className="relative overflow-hidden rounded-md shadow-xs transition-[transform,box-shadow] duration-200 ease-in group-hover:-translate-y-0.5 group-hover:shadow-xl motion-reduce:transition-none"
        style={{ height: thumbnailHeight }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          width={660}
          height={thumbnailHeight}
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="mt-2 block text-body-14-medium font-medium text-primary">
        {title}
      </span>
      <span className="mt-1 block text-body-14-regular font-normal text-secondary break-words">
        {description}
      </span>
    </>
  )

  if (isInternal) {
    return (
      <Link to={href} className={linkClass}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={linkClass}>
      {content}
    </a>
  )
}
