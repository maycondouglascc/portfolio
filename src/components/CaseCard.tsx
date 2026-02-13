import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

type LottieComponentType = (props: {
  animationData: object
  loop?: boolean
  autoplay?: boolean
  className?: string
}) => JSX.Element

async function loadAnimationData(key: string): Promise<object | null> {
  switch (key) {
    case 'danoneNorthAmerica': {
      const module = await import('../assets/lottie/danoneNorthAmerica.json')
      return module.default as object
    }
    default:
      return null
  }
}

type CaseCardProps = {
  title: string
  description: string
  href: string
  imageAlt: string
  hoverLottie?: string
}

export function CaseCard({
  title,
  description,
  href,
  hoverLottie,
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 })
  const [LottieComponent, setLottieComponent] = useState<LottieComponentType | null>(null)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const isLoadingLottieRef = useRef(false)

  const isInternal = href.startsWith('/')
  const linkClass =
    'group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:focus-visible:outline-zinc-100'

  const handleMouseMove = (e: React.MouseEvent) => {
    setPointerPos({ x: e.clientX, y: e.clientY })
  }

  const loadLottieAssets = useCallback(async (lottieKey: string) => {
    if (isLoadingLottieRef.current || (LottieComponent && animationData)) return
    isLoadingLottieRef.current = true

    try {
      const [{ default: LoadedLottie }, loadedAnimationData] = await Promise.all([
        import('lottie-react'),
        loadAnimationData(lottieKey),
      ])

      if (!loadedAnimationData) return
      setLottieComponent(() => LoadedLottie as LottieComponentType)
      setAnimationData(loadedAnimationData)
    } finally {
      isLoadingLottieRef.current = false
    }
  }, [LottieComponent, animationData])

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPointerPos({ x: e.clientX, y: e.clientY })
    setIsHovered(true)
    if (hoverLottie) {
      void loadLottieAssets(hoverLottie)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const mouseHandlers = hoverLottie
    ? { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {}

  const floatingLottie = hoverLottie && LottieComponent && animationData && (
    <div
      className={`rounded-md overflow-hidden pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${pointerPos.x + 24}px, ${pointerPos.y - 200}px)`,
        willChange: 'transform',
      }}
    >
      <LottieComponent
        animationData={animationData}
        loop
        autoplay
        className="w-64"
      />
    </div>
  )

  const content = (
    <div className="rounded-md bg-zinc-200/40 p-4 transition-colors duration-75 ease-in hover:bg-zinc-200/70 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70">
      <span className="text-body-15-medium font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </span>
      <span className="mt-1 block break-words text-body-14-regular font-normal text-zinc-600 dark:text-zinc-400">
        {description}
      </span>
    </div>
  )

  if (isInternal) {
    return (
      <>
        <Link to={href} className={linkClass} {...mouseHandlers}>
          {content}
        </Link>
        {floatingLottie}
      </>
    )
  }

  return (
    <>
      <a href={href} className={linkClass} {...mouseHandlers}>
        {content}
      </a>
      {floatingLottie}
    </>
  )
}
