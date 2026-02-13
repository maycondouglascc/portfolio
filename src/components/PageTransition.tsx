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
import {
  ReactNode,
  ReactElement,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
  lazy,
  Suspense,
} from "react"

/* ─────────────────────────────────────────────────────────
 * TIMING (ms after stage trigger)
 * ───────────────────────────────────────────────────────── */
export const DEFAULT_TIMING = {
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
export const EXIT = {
  targetOpacity: 0,       // fade to invisible
  ease: "easeInOut" as const,
}

/* ─────────────────────────────────────────────────────────
 * ENTER CONFIG - container slides up
 * ───────────────────────────────────────────────────────── */
export const CONTAINER = {
  initialY: 24,           // px to slide up from
  initialOpacity: 0,      // start invisible
  finalY: 0,              // resting position
  finalOpacity: 1,        // fully visible
  ease: "easeOut" as const,
}

/* ─────────────────────────────────────────────────────────
 * CHILD CONFIG - staggered children slide up
 * ───────────────────────────────────────────────────────── */
export const CHILD = {
  initialY: 20,           // px to slide up from
  initialOpacity: 0,      // start invisible
  finalY: 0,              // resting position
  finalOpacity: 1,        // fully visible
  ease: "easeOut" as const,
}

type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut"

/** Params shape used by both DEFAULT_PARAMS (prod) and useDialKit (dev). */
export interface TransitionParams {
  timing: {
    exitDuration: number
    enterDelay: number
    enterDuration: number
    childDelay: number
    childStagger: number
    childDuration: number
  }
  offsets: { containerY: number; childY: number }
  opacity: { exitTarget: number; containerStart: number; childStart: number }
  easing: { exit: Easing; enter: Easing; child: Easing }
}

/** Production defaults – DialKit is dev-only; prod never loads it. */
export const DEFAULT_PARAMS: TransitionParams = {
  timing: { ...DEFAULT_TIMING },
  offsets: { containerY: CONTAINER.initialY, childY: CHILD.initialY },
  opacity: {
    exitTarget: EXIT.targetOpacity,
    containerStart: CONTAINER.initialOpacity,
    childStart: CHILD.initialOpacity,
  },
  easing: { exit: EXIT.ease, enter: CONTAINER.ease, child: CHILD.ease },
}

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

interface PageTransitionProps {
  children: ReactNode
  routeLocation: Location
}

interface PageTransitionInnerProps extends PageTransitionProps {
  params: TransitionParams
}

/** Inner transition UI – used with DEFAULT_PARAMS in prod, useDialKit in dev. */
export function PageTransitionInner({
  children,
  routeLocation,
  params,
}: PageTransitionInnerProps) {
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

const PageTransitionWithDialKit = lazy(
  () =>
    import("./PageTransitionDev").then((m) => ({
      default: m.PageTransitionWithDialKit,
    }))
)

/** Public component: prod uses DEFAULT_PARAMS, dev lazy-loads DialKit version. */
export function PageTransition({ children, routeLocation }: PageTransitionProps) {
  if (!import.meta.env.DEV) {
    return (
      <PageTransitionInner
        children={children}
        routeLocation={routeLocation}
        params={DEFAULT_PARAMS}
      />
    )
  }
  return (
    <Suspense fallback={null}>
      <PageTransitionWithDialKit children={children} routeLocation={routeLocation} />
    </Suspense>
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
