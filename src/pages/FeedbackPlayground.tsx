import { useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react"
import { MessageCircle, ArrowDownRight, RotateCcw } from "react-feather"
import { getGenieHitPath, isGenieSettled, type GenieRect } from "./genieGeometry"
import { createGenieRenderer, type GenieRenderer } from "./genieRenderer"
import "./FeedbackPlayground.css"

const spring = { type: "spring", duration: 0.5, bounce: 0.2 } as const

export default function FeedbackPlayground() {
  const [collapsed, setCollapsed] = useState(false)
  const [genieReady, setGenieReady] = useState(false)
  const [deforming, setDeforming] = useState(false)
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLButtonElement>(null)
  const originRef = useRef<HTMLSpanElement>(null)
  const dockRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GenieRenderer | null>(null)
  const geometryRef = useRef<{ card: GenieRect; dock: GenieRect } | null>(null)
  // Critical damping (2 * sqrt(stiffness * mass)): no rubbery recoil in the neck.
  // Retargeting this spring preserves position and velocity on a rapid reversal.
  const progress = useSpring(0, {
    mass: 1, stiffness: 100, damping: 20, restDelta: 0.0005, restSpeed: 0.001,
  })

  useMotionValueEvent(progress, "change", (value) => {
    if (!deforming) return
    const rows = rendererRef.current?.draw(value)
    if (rows && cardRef.current) cardRef.current.style.setProperty("--genie-hit-path", getGenieHitPath(rows))
    const target = collapsed ? geometryRef.current?.dock : geometryRef.current?.card
    if (rows && target && isGenieSettled(rows, target)) {
      // Show the exact endpoint until React returns ownership to native text.
      // Let the spring keep its velocity so a reversal can still retarget it.
      rendererRef.current?.draw(collapsed ? 1 : 0)
      setDeforming(false)
    }
  })

  useMotionValueEvent(progress, "animationComplete", () => {
    if (Math.abs(progress.get() - (collapsed ? 1 : 0)) < 0.0005) {
      setDeforming(false)
    }
  })

  useEffect(() => {
    const target = collapsed ? 1 : 0
    if (reducedMotion) progress.jump(target)
    else progress.set(target)
    // A reversal before the first frame can already be at its destination.
    // Motion skips that spring, so there is no completion event to hand back on.
    if (progress.get() === target) setDeforming(false)
  }, [collapsed, reducedMotion, progress])

  useEffect(() => {
    if (reducedMotion) {
      setGenieReady(false)
      return
    }

    const stage = stageRef.current
    const canvas = canvasRef.current
    const origin = originRef.current
    const dock = dockRef.current
    const button = cardRef.current
    if (!stage || !canvas || !origin || !dock || !button) return

    let cancelled = false
    let observer: ResizeObserver | undefined

    const fallback = () => {
      setGenieReady(false)
      setDeforming(false)
      observer?.disconnect()
      rendererRef.current?.dispose()
      rendererRef.current = null
      button.style.removeProperty("--genie-hit-path")
    }
    canvas.addEventListener("webglcontextlost", fallback)

    // Rasterize once after Inter loads; every moving frame only updates mesh vertices.
    void document.fonts.ready.then(() => {
      if (cancelled) return
      const renderer = createGenieRenderer(canvas)
      if (!renderer) return
      rendererRef.current = renderer

      const resize = () => {
        const bounds = stage.getBoundingClientRect()
        const localRect = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect()
          return { x: rect.x - bounds.x, y: rect.y - bounds.y, width: rect.width, height: rect.height }
        }
        const cardBounds = localRect(origin)
        const dockBounds = localRect(dock)
        geometryRef.current = { card: cardBounds, dock: dockBounds }
        renderer.resize(bounds.width, bounds.height, cardBounds, dockBounds)
        button.style.setProperty("--genie-hit-path", getGenieHitPath(renderer.draw(progress.get())))
      }
      try {
        resize()
        observer = new ResizeObserver(resize)
        observer.observe(stage)
        setGenieReady(true)
      } catch {
        fallback()
      }
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      canvas.removeEventListener("webglcontextlost", fallback)
      rendererRef.current?.dispose()
      rendererRef.current = null
      button.style.removeProperty("--genie-hit-path")
    }
  }, [reducedMotion, progress])

  const focusSurface = (focused: boolean) => {
    rendererRef.current?.focus(focused)
    rendererRef.current?.draw(progress.get())
  }

  const changeCollapsed = (next: boolean) => {
    if (next === collapsed) return
    setDeforming(genieReady && !reducedMotion)
    setCollapsed(next)
  }

  return (
    <main
      ref={stageRef}
      id="main-content"
      className="feedback-playground"
      onKeyDown={(event) => {
        if (event.key === "Escape") changeCollapsed(false)
      }}
    >
      <header className="feedback-header">
        <div className="feedback-heading">
          <MessageCircle size={19} aria-hidden="true" />
          <h1>Feedback, in motion.</h1>
        </div>
        <button
          type="button"
          className="feedback-reset"
          onClick={() => changeCollapsed(false)}
          disabled={!collapsed}
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset
        </button>
      </header>

      <span ref={originRef} className="feedback-card feedback-card-origin" aria-hidden="true" />
      <span ref={dockRef} className="feedback-card feedback-card--collapsed feedback-card-origin" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className={`feedback-genie${genieReady && deforming ? " feedback-genie--ready" : ""}`}
        aria-hidden="true"
      />

      <motion.button
        ref={cardRef}
        layout={!reducedMotion && !genieReady}
        type="button"
        className={`feedback-card${collapsed ? " feedback-card--collapsed" : ""}${genieReady && deforming ? " feedback-card--genie" : ""}`}
        initial={false}
        animate={{ borderRadius: collapsed ? 18 : 28 }}
        transition={reducedMotion ? { duration: 0 } : spring}
        onClick={() => changeCollapsed(!collapsed)}
        onFocus={(event) => focusSurface(event.currentTarget.matches(":focus-visible"))}
        onBlur={() => focusSurface(false)}
        aria-label={collapsed ? "Give Feedback" : "Minimize feedback card"}
        aria-expanded={!collapsed}
        aria-describedby="feedback-instructions"
      >
        <motion.span
          layout={reducedMotion || genieReady ? false : "position"}
          className="feedback-card-content"
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ layout: spring, opacity: { duration: collapsed ? 0.1 : 0.2 } }}
          aria-hidden="true"
        >
          <span className="feedback-card-icon">
            <MessageCircle size={27} strokeWidth={1.6} />
          </span>
          <span className="feedback-card-title">Have a thought?</span>
          <span className="feedback-card-description">
            There’s always room for a little feedback.
          </span>
          <span className="feedback-card-action">
            Click to minimize <ArrowDownRight size={17} />
          </span>
        </motion.span>

        <motion.span
          layout={reducedMotion || genieReady ? false : "position"}
          className="feedback-button-content"
          initial={false}
          animate={{ opacity: collapsed ? 1 : 0 }}
          transition={{ layout: spring, opacity: { duration: collapsed ? 0.2 : 0.1 } }}
          aria-hidden="true"
        >
          <MessageCircle size={18} strokeWidth={1.8} />
          Give Feedback
        </motion.span>
      </motion.button>

      <p id="feedback-instructions" className="feedback-instructions" aria-live="polite">
        {collapsed
          ? "Click Give Feedback to bring it back."
          : "Click the card. Watch it find a smaller home."}
      </p>
    </main>
  )
}
