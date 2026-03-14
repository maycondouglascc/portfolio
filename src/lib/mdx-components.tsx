import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes } from "react"
import CaseImage from "../components/case-study/CaseImage"
import ImageGrid from "../components/case-study/ImageGrid"
import ImageStack from "../components/case-study/ImageStack"
import MetricsRow from "../components/case-study/MetricsRow"
import type { HighlightCardProps } from "../components/case-study/HighlightCard"

type BaseSectionProps = {
  id?: string
}

type MetricsProps = BaseSectionProps & {
  label?: string
  layout?: "horizontal" | "vertical"
  disclaimer?: string
  items: HighlightCardProps[]
}

type ProblemsProps = BaseSectionProps & {
  title: string
  intro?: string
  items: HighlightCardProps[]
}

type ResultsProps = BaseSectionProps & {
  title: string
  intro?: string
  disclaimer?: string
  items: HighlightCardProps[]
}

type CaseImageProps = BaseSectionProps & {
  src: string
  alt: string
  priority?: boolean
  rounded?: boolean
}

type ImageStackProps = BaseSectionProps & {
  images: { src: string; alt: string }[]
}

type ImageGridProps = BaseSectionProps & {
  images: { src: string; alt: string }[]
}

const textBlockClass =
  "max-w-[720px] mx-auto text-body-15-regular font-normal text-zinc-700 dark:text-zinc-400 leading-[24px]"
const headingClass =
  "max-w-[720px] mx-auto text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100 mt-12 mb-3"
const subheadingClass =
  "max-w-[720px] mx-auto text-body-15-medium font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-2"
const listClass =
  "max-w-[720px] mx-auto list-disc pl-5 space-y-2 text-body-15-regular font-normal text-zinc-700 dark:text-zinc-400"

function Metrics({ id, label, layout, disclaimer, items }: MetricsProps) {
  return (
    <section
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[720px] mx-auto space-y-2 my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <h2 className="text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100">
          {label}
        </h2>
      )}
      <MetricsRow items={items} layout={layout} disclaimer={disclaimer} />
    </section>
  )
}

function Problems({ id, title, intro, items }: ProblemsProps) {
  return (
    <section
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[720px] mx-auto space-y-2 my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="mb-3 text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {intro && (
        <p className="pb-4 text-body-15-regular font-normal text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      )}
      <MetricsRow items={items} layout="vertical" />
    </section>
  )
}

function Results({ id, title, intro, items, disclaimer }: ResultsProps) {
  return (
    <section
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[720px] mx-auto space-y-6 my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="mb-3 text-subheading-20-medium font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {intro && (
        <p className="mb-3 text-body-15-regular font-normal text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      )}
      <MetricsRow items={items} layout="vertical" disclaimer={disclaimer} />
    </section>
  )
}

function CaseImageBlock({ id, src, alt, priority, rounded }: CaseImageProps) {
  return (
    <div
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[1200px] mx-auto my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CaseImage src={src} alt={alt} priority={priority} rounded={rounded} />
    </div>
  )
}

function ImageStackBlock({ id, images }: ImageStackProps) {
  return (
    <div
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[1200px] mx-auto my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ImageStack images={images} />
    </div>
  )
}

function ImageGridBlock({ id, images }: ImageGridProps) {
  return (
    <div
      id={id}
      className={[
        id ? "scroll-mt-24" : "",
        "max-w-[1200px] mx-auto my-12",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ImageGrid images={images} />
    </div>
  )
}

export const mdxComponents = {
  Metrics,
  Problems,
  Results,
  CaseImage: CaseImageBlock,
  ImageStack: ImageStackBlock,
  ImageGrid: ImageGridBlock,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className={[headingClass, props.className].filter(Boolean).join(" ")} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className={[subheadingClass, props.className].filter(Boolean).join(" ")} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={[textBlockClass, "mb-4 last:mb-0", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className={[listClass, "mb-4 last:mb-0", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  li: (props: LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className={["text-body-15-regular", props.className].filter(Boolean).join(" ")} />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className={[
        "font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
}
