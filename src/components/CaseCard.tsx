import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'

type CaseCardProps = {
  title: string
  description: string
  href: string
  imageSrc: string
  imageAlt: string
  thumbnailHeight?: number
  hoverLottie?: object
}

export function CaseCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  thumbnailHeight = 320,
  hoverLottie,
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  const isInternal = href.startsWith('/')
  const linkClass =
    'group block no-underline hover:no-underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // Smooth position interpolation
  useEffect(() => {
    if (!isHovered) return

    const animate = () => {
      setSmoothPos((prev) => {
        const dx = mousePos.x - prev.x
        const dy = mousePos.y - prev.y
        
        // Only update if difference is significant (reduces jitter)
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          return prev
        }
        
        // Smooth interpolation factor (0.15 = smooth, higher = faster)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePos.x, mousePos.y, isHovered])

  // Reset smooth position when hover starts
  useEffect(() => {
    if (isHovered) {
      setSmoothPos({ x: mousePos.x, y: mousePos.y })
    }
  }, [isHovered])

  const mouseHandlers = hoverLottie
    ? { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {}

  const floatingLottie = hoverLottie && (
    <div
      className={`rounded-md overflow-hidden pointer-events-none fixed z-50 transition-opacity duration-300 ease-out ${
        isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        left: smoothPos.x + 10,
        top: smoothPos.y + -190,
        transition: 'opacity 300ms ease-out',
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
    <>
      <div className="p-4 rounded-md bg-stone-50 hover:bg-stone-200 transition-all duration-50 ease-in">
        <span className=" text-body-16-medium font-medium text-primary">
          {title}
        </span>
        <span className="mt-1 block text-body-14-regular font-normal text-secondary break-words">
          {description}
        </span>
      </div>
    </>
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
