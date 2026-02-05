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
  return (
    <a
      href={href}
      className="group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <div
        className="relative overflow-hidden rounded-md shadow-xs transition-[transform,box-shadow] duration-200 ease-in group-hover:-translate-y-0.5 group-hover:shadow-xl motion-reduce:transition-none"
        style={{ height: thumbnailHeight }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          width={200}
          height={thumbnailHeight}
          loading="lazy"
        />
      </div>
      <span className="mt-2 block text-body-14-medium font-medium text-primary">
        {title}
      </span>
      <span className="mt-1 block text-body-14-regular font-normal text-secondary break-words">
        {description}
      </span>
    </a>
  )
}
