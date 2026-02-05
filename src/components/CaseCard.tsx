type CaseCardProps = {
  title: string
  href: string
  imageSrc: string
  imageAlt: string
}

export function CaseCard({ title, href, imageSrc, imageAlt }: CaseCardProps) {
  return (
    <a
      href={href}
      className="group block focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <div className="relative h-[180px] overflow-hidden rounded-xl shadow-xs transition-[transform,box-shadow] duration-200 ease-in group-hover:-translate-y-0.5 group-hover:shadow-xl motion-reduce:transition-none">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          width={200}
          height={200}
          loading="lazy"
        />
      </div>
      <span className="mt-2 block text-body-14-medium font-medium text-primary">
        {title}
      </span>
    </a>
  )
}
