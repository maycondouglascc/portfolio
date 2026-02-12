import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'

type CaseCardProps = {
  title: string
  description: string
  href: string
  imageAlt: string
  hoverLottie?: object
}

export function CaseCard({
  title,
  description,
  href,
  hoverLottie,
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  const isInternal = href.startsWith('/')
  const linkClass =
    'group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:focus-visible:outline-zinc-100'

  const startAnimation = useCallback(() => {
    const animate = () => {
      setSmoothPos((prev) => {
        const dx = mousePosRef.current.x - prev.x
        const dy = mousePosRef.current.y - prev.y

        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return prev

        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = undefined
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY }
    setSmoothPos({ x: e.clientX, y: e.clientY })
    setIsHovered(true)
    startAnimation()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    stopAnimation()
  }

  const mouseHandlers = hoverLottie
    ? { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {}

  const floatingLottie = hoverLottie && (
    <div
      className={`rounded-md overflow-hidden pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${smoothPos.x - 600}px, ${smoothPos.y - 230}px)`,
        willChange: 'transform',
      }}
    >
      <Lottie
        animationData={hoverLottie}
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
