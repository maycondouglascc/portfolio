/* ─────────────────────────────────────────────────────────
 * PAGE TRANSITION - ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Exit plays first, then enter.
 *
 * EXIT (old content):
 *    0ms   fade out begins
 *  200ms   fade complete, page unmounts
 *
 * ENTER (new content):
 *    0ms   container mounts, invisible
 *  100ms   container fades in + slides up
 *  200ms   children begin staggered entrance
 *  ...     each child slides up with stagger delay
 * ───────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "motion/react"
import type { Location } from "react-router-dom"
import { useDialKit } from "dialkit"
import {
  ReactNode,
  ReactElement,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
} from "react"

/* ─────────────────────────────────────────────────────────
 * TIMING (ms after stage trigger)
 * ───────────────────────────────────────────────────────── */
const DEFAULT_TIMING = {
  exitDuration: 0.2,      // seconds for exit fade
  enterDelay: 0.1,        // delay before enter starts
  enterDuration: 0.4,     // seconds for container enter
  childDelay: 0.1,        // delay after container starts before children
  childStagger: 0.08,     // seconds between each child
  childDuration: 0.35,    // seconds for each child animation
}

/* ─────────────────────────────────────────────────────────
 * EXIT CONFIG - fade out old content
 * ───────────────────────────────────────────────────────── */
const EXIT = {
  targetOpacity: 0,       // fade to invisible
  ease: "easeInOut" as const,
}

/* ─────────────────────────────────────────────────────────
 * ENTER CONFIG - container slides up
 * ───────────────────────────────────────────────────────── */
const CONTAINER = {
  initialY: 24,           // px to slide up from
  initialOpacity: 0,      // start invisible
  finalY: 0,              // resting position
  finalOpacity: 1,        // fully visible
  ease: "easeOut" as const,
}

/* ─────────────────────────────────────────────────────────
 * CHILD CONFIG - staggered children slide up
 * ───────────────────────────────────────────────────────── */
const CHILD = {
  initialY: 20,           // px to slide up from
  initialOpacity: 0,      // start invisible
  finalY: 0,              // resting position
  finalOpacity: 1,        // fully visible
  ease: "easeOut" as const,
}

type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut"

interface TransitionChildConfig {
  enterDelay: number
  childDelay: number
  childStagger: number
  childDuration: number
  childY: number
  childStartOpacity: number
  childEase: Easing
}

const TransitionChildContext = createContext<TransitionChildConfig | null>(null)

/* ─────────────────────────────────────────────────────────
 * PageTransition - wraps route content with animated transitions
 * ───────────────────────────────────────────────────────── */
interface PageTransitionProps {
  children: ReactNode
  routeLocation: Location
}

export function PageTransition({ children, routeLocation }: PageTransitionProps) {

  // DialKit controls for tuning all timing values
  const params = useDialKit("Page Transition", {
    timing: {
      exitDuration: [DEFAULT_TIMING.exitDuration, 0.05, 0.8],
      enterDelay: [DEFAULT_TIMING.enterDelay, 0, 0.8],
      enterDuration: [DEFAULT_TIMING.enterDuration, 0.1, 1.6],
      childDelay: [DEFAULT_TIMING.childDelay, 0, 1],
      childStagger: [DEFAULT_TIMING.childStagger, 0, 0.5],
      childDuration: [DEFAULT_TIMING.childDuration, 0.05, 1.2],
    },
    offsets: {
      containerY: [CONTAINER.initialY, 0, 100],
      childY: [CHILD.initialY, 0, 80],
    },
    opacity: {
      exitTarget: [EXIT.targetOpacity, 0, 1],
      containerStart: [CONTAINER.initialOpacity, 0, 1],
      childStart: [CHILD.initialOpacity, 0, 1],
    },
    easing: {
      exit: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: EXIT.ease,
      },
      enter: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: CONTAINER.ease,
      },
      child: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: CHILD.ease,
      },
    },
  })

  const frozenChildren = isValidElement(children)
    ? cloneElement(children as ReactElement<{ location?: Location }>, {
        location: routeLocation,
      })
    : children

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeLocation.pathname + routeLocation.search}
        initial={{
          opacity: params.opacity.containerStart,
          y: params.offsets.containerY,
        }}
        animate={{
          opacity: CONTAINER.finalOpacity,
          y: CONTAINER.finalY,
        }}
        exit={{
          opacity: params.opacity.exitTarget,
          transition: {
            duration: params.timing.exitDuration,
            ease: params.easing.exit,
          },
        }}
        transition={{
          delay: params.timing.enterDelay,
          duration: params.timing.enterDuration,
          ease: params.easing.enter,
          opacity: {
            duration: params.timing.enterDuration,
            ease: params.easing.enter,
          },
          y: {
            duration: params.timing.enterDuration,
            ease: params.easing.enter,
          },
        }}
      >
        <TransitionChildContext.Provider
          value={{
            enterDelay: params.timing.enterDelay,
            childDelay: params.timing.childDelay,
            childStagger: params.timing.childStagger,
            childDuration: params.timing.childDuration,
            childY: params.offsets.childY,
            childStartOpacity: params.opacity.childStart,
            childEase: params.easing.child,
          }}
        >
          {frozenChildren}
        </TransitionChildContext.Provider>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────
 * TransitionChild - explicit wrapper for staggered children
 * Use this to mark specific elements for stagger animation
 * ───────────────────────────────────────────────────────── */
export function TransitionChild({
  children,
  className,
  index = 0,
}: {
  children: ReactNode
  className?: string
  index?: number
}) {
  const config = useContext(TransitionChildContext)

  if (!config) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: config.childStartOpacity,
        y: config.childY,
      }}
      animate={{
        opacity: CHILD.finalOpacity,
        y: CHILD.finalY,
      }}
      transition={{
        delay: config.enterDelay + config.childDelay + index * config.childStagger,
        duration: config.childDuration,
        ease: config.childEase,
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
